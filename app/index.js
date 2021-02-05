import html from './view.js';
import TodoList from './list/index.js';
import TodoAlert from './alert/index.js';

export default class TodoApp extends HTMLElement {

  constructor() {
    super();

    // Ecoute pour alerte texte déjà existant
    this.addEventListener('alert-danger', () => {
      this.querySelector('#alert-danger').display = 'block';
    })
    // Ecoute pour alerte texte bien saisi mais pas affiché
    this.addEventListener('alert-success', () => { 
    this.querySelector('#alert-success').display = 'block';
    })
  }

  connectedCallback() {

    this.innerHTML = html();

    // Entrée pour un ajout de tâche
    this.querySelector('#add').addEventListener('keydown', e => {
      if(e.key === 'Enter') {
        this.addTask(e.target);
      }
    });
  }

  addTask(target) {    
    // Si le texte n'est pas vide
    if(target.value !== '') {
      this.querySelector('#alert-danger').display = 'none';
      this.querySelector('#alert-success').display = 'none';
      this.querySelector('todo-list').add(target.value);
      target.value = ''; 
    }   
  }
}

if (!customElements.get('todo-app')) {
  customElements.define('todo-app', TodoApp);
}