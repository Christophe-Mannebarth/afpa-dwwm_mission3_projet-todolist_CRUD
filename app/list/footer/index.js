import * as view from './view.js';

export default class TodoFooter extends HTMLElement {

  connectedCallback() {
    this.innerHTML = view.wrapper();
    this.reset();

    this.querySelector('div').addEventListener('click', e => {
      if(e.target.matches('button')) {
        this.dispatchEvent(new CustomEvent('purge', { bubbles: true }));       
      }
    })
  }
 
  get number() {
    return this.getAttribute('number');
  }

  set number(value) {
    this.setAttribute('number', value);
    this.reset();
  }

  get btn() {
    return this.getAttribute('btn');
  }

  set btn(value) {
    this.setAttribute('btn', value);
    this.reset();
  }

  reset() {
    this.querySelector('.row').innerHTML = view.html(this.number, this.btn);
  }
}

if (!customElements.get('todo-footer')) {
  customElements.define('todo-footer', TodoFooter);
}