import { createElement } from '../../utils/dom-utils.js';

const COLUMN_ORDER = ['todo', 'doing', 'done'];

export class Card {
  constructor({ id, title, description, status }, { onEdit, onDelete, onMove }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.$element = null;
    this.handleEdit = onEdit;
    this.handleDelete = onDelete;
    this.handleMove = onMove;
  }

  render($container) {
    this.$element = this.createElement();
    $container.appendChild(this.$element);
    this.attachEventListeners();
  }

  createElement() {
    const $card = createElement('li', 'card', {
      tabindex: '0',
      draggable: 'true',
      'data-id': this.id,
      'aria-label': `Task: ${this.title}`,
      role: 'listitem',
    });

    const $title = createElement('h3', 'card__title');
    $title.textContent = this.title;

    const $actions = createElement('div', 'card__actions');
    $actions.appendChild(this.createMoveButtons());
    $actions.appendChild(this.createEditButton());
    $actions.appendChild(this.createDeleteButton());

    $card.appendChild($title);

    if (this.description) {
      const $desc = createElement('p', 'card__description');
      $desc.textContent = this.description;
      $card.appendChild($desc);
    }

    $card.appendChild($actions);
    return $card;
  }

  createMoveButtons() {
    const $group = createElement('div', 'card__move-group');
    const currentIndex = COLUMN_ORDER.indexOf(this.status);

    if (currentIndex > 0) {
      const $prev = createElement('button', 'card__action-btn card__action-btn--move', {
        'aria-label': `Move to ${COLUMN_ORDER[currentIndex - 1]}`,
        title: `Move to ${COLUMN_ORDER[currentIndex - 1]}`,
      });
      $prev.textContent = '←';
      $prev.dataset.direction = 'prev';
      $group.appendChild($prev);
    }

    if (currentIndex < COLUMN_ORDER.length - 1) {
      const $next = createElement('button', 'card__action-btn card__action-btn--move', {
        'aria-label': `Move to ${COLUMN_ORDER[currentIndex + 1]}`,
        title: `Move to ${COLUMN_ORDER[currentIndex + 1]}`,
      });
      $next.textContent = '→';
      $next.dataset.direction = 'next';
      $group.appendChild($next);
    }

    return $group;
  }

  createEditButton() {
    const $btn = createElement('button', 'card__action-btn card__action-btn--edit', {
      'aria-label': `Edit task: ${this.title}`,
    });
    $btn.textContent = 'edit';
    return $btn;
  }

  createDeleteButton() {
    const $btn = createElement('button', 'card__action-btn card__action-btn--delete', {
      'aria-label': `Delete task: ${this.title}`,
    });
    $btn.textContent = 'delete';
    return $btn;
  }

  attachEventListeners() {
    this.$element.querySelector('.card__action-btn--edit').addEventListener('click', () =>
      this.handleEdit(this.toJSON())
    );

    this.$element.querySelector('.card__action-btn--delete').addEventListener('click', () =>
      this.handleDelete(this.id)
    );

    this.$element.querySelectorAll('[data-direction]').forEach(($btn) => {
      $btn.addEventListener('click', () => this.handleMoveDirection($btn.dataset.direction));
    });

    this.$element.addEventListener('dragstart', (e) => this.handleDragStart(e));
    this.$element.addEventListener('dragend', () => this.handleDragEnd());

    this.$element.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleMoveDirection(direction) {
    const currentIndex = COLUMN_ORDER.indexOf(this.status);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < COLUMN_ORDER.length) {
      this.handleMove(this.id, COLUMN_ORDER[nextIndex]);
    }
  }

  handleDragStart(e) {
    e.dataTransfer.setData('text/plain', this.id);
    e.dataTransfer.effectAllowed = 'move';
    this.$element.classList.add('card--dragging');
  }

  handleDragEnd() {
    this.$element.classList.remove('card--dragging');
  }

  handleKeyDown(e) {
    const currentIndex = COLUMN_ORDER.indexOf(this.status);
    if (e.key === 'ArrowRight' && currentIndex < COLUMN_ORDER.length - 1) {
      e.preventDefault();
      this.handleMove(this.id, COLUMN_ORDER[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      this.handleMove(this.id, COLUMN_ORDER[currentIndex - 1]);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      this.handleDelete(this.id);
    } else if (e.key === 'Enter' || e.key === 'e') {
      this.handleEdit(this.toJSON());
    }
  }

  updateTitle(newTitle) {
    this.title = newTitle;
    this.$element.querySelector('.card__title').textContent = newTitle;
  }

  remove() {
    this.$element.remove();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
    };
  }

  static fromJSON(data, callbacks) {
    return new Card(data, callbacks);
  }
}
