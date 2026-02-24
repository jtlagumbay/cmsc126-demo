import { createElement } from '../../utils/dom-utils.js';
import { Card } from '../card/card.js';

const COLUMN_LABELS = {
  todo: 'To Do',
  doing: 'Doing',
  done: 'Done',
};

export class Column {
  constructor({ status, onAddTask, onEditTask, onDeleteTask, onMoveTask }) {
    this.status = status;
    this.cards = new Map();
    this.$element = null;
    this.$taskList = null;
    this.$count = null;
    this.handleAddTask = onAddTask;
    this.handleEditTask = onEditTask;
    this.handleDeleteTask = onDeleteTask;
    this.handleMoveTask = onMoveTask;
  }

  render($container) {
    this.$element = this.createElement();
    $container.appendChild(this.$element);
    this.attachEventListeners();
  }

  createElement() {
    const $column = createElement('section', `column column--${this.status}`, {
      'aria-label': `${COLUMN_LABELS[this.status]} column`,
    });

    $column.appendChild(this.createHeader());

    this.$taskList = createElement('ul', 'column__task-list', {
      role: 'list',
      'aria-label': `${COLUMN_LABELS[this.status]} tasks`,
    });
    $column.appendChild(this.$taskList);

    return $column;
  }

  createHeader() {
    const $header = createElement('div', 'column__header');

    const $titleGroup = createElement('div', 'column__title-group');

    const $indicator = createElement('span', 'column__indicator', {
      'aria-hidden': 'true',
    });

    const $title = createElement('h2', 'column__title');
    $title.textContent = COLUMN_LABELS[this.status];

    this.$count = createElement('span', 'column__count', { 'aria-live': 'polite' });
    this.$count.textContent = '0';

    $titleGroup.appendChild($indicator);
    $titleGroup.appendChild($title);
    $titleGroup.appendChild(this.$count);

    const $addBtn = createElement('button', 'column__add-btn', {
      'aria-label': `Add task to ${COLUMN_LABELS[this.status]}`,
      title: `Add task to ${COLUMN_LABELS[this.status]}`,
    });
    $addBtn.textContent = '+';
    $addBtn.addEventListener('click', () => this.handleAddTask(this.status));

    $header.appendChild($titleGroup);
    $header.appendChild($addBtn);
    return $header;
  }

  attachEventListeners() {
    this.$taskList.addEventListener('dragover', (e) => this.handleDragOver(e));
    this.$taskList.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    this.$taskList.addEventListener('drop', (e) => this.handleDrop(e));
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.$element.classList.add('column--drag-over');
  }

  handleDragLeave(e) {
    if (!this.$element.contains(e.relatedTarget)) {
      this.$element.classList.remove('column--drag-over');
    }
  }

  handleDrop(e) {
    e.preventDefault();
    this.$element.classList.remove('column--drag-over');
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) this.handleMoveTask(taskId, this.status);
  }

  addCard(taskData) {
    this.removeEmptyMessage();

    const card = new Card(taskData, {
      onEdit: this.handleEditTask,
      onDelete: this.handleDeleteTask,
      onMove: this.handleMoveTask,
    });

    card.render(this.$taskList);
    this.cards.set(taskData.id, card);
    this.updateCount();
  }

  removeCard(id) {
    const card = this.cards.get(id);
    if (!card) return;
    card.remove();
    this.cards.delete(id);
    this.updateCount();
    this.showEmptyMessageIfNeeded();
  }

  removeEmptyMessage() {
    const $empty = this.$taskList.querySelector('.column__empty');
    if ($empty) $empty.remove();
  }

  showEmptyMessageIfNeeded() {
    if (this.cards.size > 0) return;
    const $empty = createElement('li', 'column__empty');
    $empty.textContent = 'No tasks yet';
    this.$taskList.appendChild($empty);
  }

  updateCount() {
    this.$count.textContent = this.cards.size;
  }
}
