import html from './view.js';

export default class TodoAlert extends HTMLElement {

  connectedCallback() {

    this.innerHTML = html(this.getAttribute('type'), this.getAttribute('text'), this.display);

    this.querySelector('.btn-close').addEventListener('click', () => {
      this.display = 'none';
      this.reset();
    });
  }

  reset() {
    this.querySelector('#alert').style.display = this.display;
  }

  set display(value) {
    this.setAttribute('display', value);
    this.reset();    
  }

  get display() {
    return this.getAttribute('display');
  }
}

if (!customElements.get('todo-alert')) {
  customElements.define('todo-alert', TodoAlert);
}