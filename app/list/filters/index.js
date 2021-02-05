import html from './view.js';

export default class TodoFilters extends HTMLElement {

  connectedCallback() {
    this.innerHTML = html(this.filter);

    this.querySelector('div').addEventListener('click', e => {
      if(e.target.matches('input')) {
        this.filter = e.target.value;
        this.dispatchEvent(new CustomEvent('filter', { bubbles: true }));  
      }
    })
  }

  set filter(value) {
    this.setAttribute('filter', value);
  }

  get filter() {
    return this.getAttribute('filter');
  }
}

if (!customElements.get('todo-filters')) {
  customElements.define('todo-filters', TodoFilters);
}