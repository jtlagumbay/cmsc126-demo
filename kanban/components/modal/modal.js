import { createElement } from '../../utils/dom-utils.js';

const COLUMN_LABELS = {
  todo: 'To Do',
  doing: 'Doing',
  done: 'Done',
};

export class Modal {
  constructor({ onSubmit }) {
    this.handleSubmit = onSubmit;
    this.$overlay = null;
    this.$titleInput = null;
    this.$descInput = null;
    this.$statusSelect = null;
    this.$modalTitle = null;
    this.isEditMode = false;
    this.editingId = null;
  }

  render($container) {
    this.$overlay = this.createElement();
    $container.appendChild(this.$overlay);
    this.attachEventListeners();
  }

  createElement() {
    const $overlay = createElement('div', 'modal-overlay modal-overlay--hidden', {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'MODAL_TITLE',
    });

    const $modal = createElement('div', 'modal');

    this.$modalTitle = createElement('h2', 'modal__title');
    this.$modalTitle.id = 'MODAL_TITLE';
    this.$modalTitle.textContent = 'New Task';

    $modal.appendChild(this.$modalTitle);
    $modal.appendChild(this.createTitleField());
    $modal.appendChild(this.createDescField());
    $modal.appendChild(this.createStatusField());
    $modal.appendChild(this.createActions());

    $overlay.appendChild($modal);
    return $overlay;
  }

  createTitleField() {
    const $field = createElement('div', 'modal__field');

    const $label = createElement('label', 'modal__label', { for: 'TASK_TITLE' });
    $label.textContent = 'Title';

    this.$titleInput = createElement('input', 'modal__input', {
      id: 'TASK_TITLE',
      type: 'text',
      placeholder: 'Task title...',
      required: 'true',
      maxlength: '100',
    });

    $field.appendChild($label);
    $field.appendChild(this.$titleInput);
    return $field;
  }

  createDescField() {
    const $field = createElement('div', 'modal__field');

    const $label = createElement('label', 'modal__label', { for: 'TASK_DESC' });
    $label.textContent = 'Description (optional)';

    this.$descInput = createElement('textarea', 'modal__textarea', {
      id: 'TASK_DESC',
      placeholder: 'Add details...',
      rows: '3',
      maxlength: '500',
    });

    $field.appendChild($label);
    $field.appendChild(this.$descInput);
    return $field;
  }

  createStatusField() {
    const $field = createElement('div', 'modal__field');

    const $label = createElement('label', 'modal__label', { for: 'TASK_STATUS' });
    $label.textContent = 'Column';

    this.$statusSelect = createElement('select', 'modal__select', { id: 'TASK_STATUS' });

    Object.entries(COLUMN_LABELS).forEach(([value, label]) => {
      const $option = createElement('option');
      $option.value = value;
      $option.textContent = label;
      this.$statusSelect.appendChild($option);
    });

    $field.appendChild($label);
    $field.appendChild(this.$statusSelect);
    return $field;
  }

  createActions() {
    const $actions = createElement('div', 'modal__actions');

    const $cancel = createElement('button', 'modal__btn modal__btn--cancel', { type: 'button' });
    $cancel.textContent = 'Cancel';
    $cancel.addEventListener('click', () => this.close());

    const $submit = createElement('button', 'modal__btn modal__btn--submit', { type: 'button' });
    $submit.textContent = 'Save Task';
    $submit.id = 'MODAL_SUBMIT';
    $submit.addEventListener('click', () => this.handleFormSubmit());

    $actions.appendChild($cancel);
    $actions.appendChild($submit);
    return $actions;
  }

  attachEventListeners() {
    this.$overlay.addEventListener('click', (e) => {
      if (e.target === this.$overlay) this.close();
    });

    this.$overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if (e.key === 'Tab') this.trapFocus(e);
    });

    this.$titleInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleFormSubmit();
    });
  }

  trapFocus(e) {
    const $focusable = this.$overlay.querySelectorAll(
      'input, textarea, select, button:not([disabled])'
    );
    const $first = $focusable[0];
    const $last = $focusable[$focusable.length - 1];

    if (e.shiftKey && document.activeElement === $first) {
      e.preventDefault();
      $last.focus();
    } else if (!e.shiftKey && document.activeElement === $last) {
      e.preventDefault();
      $first.focus();
    }
  }

  handleFormSubmit() {
    const title = this.$titleInput.value.trim();
    if (!title) {
      this.$titleInput.focus();
      return;
    }

    this.handleSubmit({
      id: this.editingId,
      title,
      description: this.$descInput.value.trim(),
      status: this.$statusSelect.value,
      isEdit: this.isEditMode,
    });

    this.close();
  }

  open(defaultStatus = 'todo', taskData = null) {
    this.isEditMode = !!taskData;
    this.editingId = taskData ? taskData.id : null;

    this.$modalTitle.textContent = taskData ? 'Edit Task' : 'New Task';
    this.$titleInput.value = taskData ? taskData.title : '';
    this.$descInput.value = taskData ? taskData.description : '';
    this.$statusSelect.value = taskData ? taskData.status : defaultStatus;

    this.$overlay.classList.remove('modal-overlay--hidden');
    this.$titleInput.focus();
  }

  close() {
    this.$overlay.classList.add('modal-overlay--hidden');
    this.isEditMode = false;
    this.editingId = null;
  }
}
