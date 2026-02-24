export function createElement(tag, className, attributes = {}) {
  const $el = document.createElement(tag);
  if (className) $el.className = className;
  Object.entries(attributes).forEach(([key, val]) => $el.setAttribute(key, val));
  return $el;
}

export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
