import * as view from './view.js';

export default class TodoLine extends HTMLElement {

  constructor(text, complete) {
    super();
    this.text = text;
    this.complete = complete;
    // Ecoute pour alerte texte déjà existant
    this.addEventListener('alert-danger', () => this.alert(true));
  }

  connectedCallback() {
    this.init();
  }

  init() {

    this.innerHTML = view.html(this.text, this.complete);

    const li = this.querySelector('li'); 
  
    li.addEventListener('click', e => {
      if(e.target.matches('button')) {
        // Clic sur bouton suppression tâche
        if(e.target.matches('.btn-danger')) {
          this.sendEvent('delete');
        // Clic sur bouton toggle tâche
        } else {
          this.sendEvent('toggle');
        } 
      }
    })

    li.addEventListener('dblclick', () => {
      this.edit();
    })
  }

  set text(value) {
    this.setAttribute('text', value);
    this.init();
  }

  get text() {
    return this.getAttribute('text');
  }

  set complete(value) {
    this.setAttribute('complete', value);
  }

  get complete() {
    return this.getAttribute('complete') === 'true';
  }

  // Passage en édition de la tâche
  edit() {
    this.innerHTML = view.edit(this.text);
    const input = this.querySelector('input');
    input.focus();
    input.addEventListener('blur', () => this.init());
    input.addEventListener('keydown', e => {
      // Changement du texte
      if(e.key === 'Enter') {
        this.sendEvent('update', { old: this.text, new: e.target.value });
      // Sortie de l'édition
      } else if(e.key === 'Escape') {
        this.init();
      } 
    });
  }

  // Envoi événement
  sendEvent(name, detail = null) {
    this.dispatchEvent(new CustomEvent(name, { 
      bubbles: true,
      detail: detail
    }));
  }
}

if (!customElements.get('todo-line')) {
  customElements.define('todo-line', TodoLine);
}