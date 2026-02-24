import { Column } from '../../components/column/column.js';
import { Modal } from '../../components/modal/modal.js';
import { loadTasks, addTask, removeTask, updateTask } from '../../services/storage-service.js';
import { generateId } from '../../utils/dom-utils.js';

const COLUMN_STATUSES = ['todo', 'doing', 'done'];

export class Board {
  constructor() {
    this.columns = new Map();
    this.modal = null;
    this.$board = document.getElementById('BOARD');
  }

  init() {
    this.renderColumns();
    this.renderModal();
    this.loadSavedTasks();
  }

  renderColumns() {
    COLUMN_STATUSES.forEach((status) => {
      const column = new Column({
        status,
        onAddTask: (colStatus) => this.modal.open(colStatus),
        onEditTask: (taskData) => this.modal.open(taskData.status, taskData),
        onDeleteTask: (id) => this.deleteTask(id),
        onMoveTask: (id, newStatus) => this.moveTask(id, newStatus),
      });
      column.render(this.$board);
      this.columns.set(status, column);
    });
  }

  renderModal() {
    this.modal = new Modal({ onSubmit: (data) => this.handleModalSubmit(data) });
    this.modal.render(document.body);
  }

  loadSavedTasks() {
    const tasks = loadTasks();
    tasks.forEach((task) => {
      const column = this.columns.get(task.status);
      if (column) column.addCard(task);
    });

    this.columns.forEach((column) => column.showEmptyMessageIfNeeded());
  }

  handleModalSubmit(data) {
    if (data.isEdit) {
      this.updateTask(data);
    } else {
      this.createTask(data);
    }
  }

  createTask(data) {
    const task = {
      id: generateId(),
      title: data.title,
      description: data.description,
      status: data.status,
    };

    addTask(task);

    const column = this.columns.get(task.status);
    column.addCard(task);
  }

  deleteTask(id) {
    removeTask(id);
    this.columns.forEach((column) => column.removeCard(id));
    this.columns.forEach((column) => column.showEmptyMessageIfNeeded());
  }

  moveTask(id, newStatus) {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === newStatus) return;

    const updatedTask = { ...task, status: newStatus };
    updateTask(updatedTask);

    this.columns.forEach((column) => column.removeCard(id));
    this.columns.forEach((column) => column.showEmptyMessageIfNeeded());

    const targetColumn = this.columns.get(newStatus);
    targetColumn.addCard(updatedTask);
  }

  updateTask(data) {
    const tasks = loadTasks();
    const existing = tasks.find((t) => t.id === data.id);
    if (!existing) return;

    const updatedTask = {
      ...existing,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    updateTask(updatedTask);

    if (existing.status !== updatedTask.status) {
      this.columns.forEach((column) => column.removeCard(data.id));
      this.columns.forEach((column) => column.showEmptyMessageIfNeeded());
      this.columns.get(updatedTask.status).addCard(updatedTask);
    } else {
      this.columns.forEach((column) => column.removeCard(data.id));
      this.columns.get(updatedTask.status).addCard(updatedTask);
    }
  }
}
