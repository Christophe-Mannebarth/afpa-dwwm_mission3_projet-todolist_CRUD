import html from './view.js';
import * as tasks from './model.js';
import TodoFooter from './footer/index.js';
import TodoFilters from './filters/index.js';
import TodoLine from './line/index.js';

export default class TodoList extends HTMLElement {

  constructor() {

    super();
    
    this.page = window.location.hash.substr(1);
    if(this.page == '') this.page = 'tous';
    
    tasks.init();

    // Ecoute suppression de tâche
    this.addEventListener('delete', e => this.handleDelete(e));
    // Ecoute changement marquage
    this.addEventListener('toggle', e => this.handleToggle(e));
    // Ecoute des filtres
    this.addEventListener('filter', e => this.handleFilter(e));
    // Ecoute de la purge
    this.addEventListener('purge', () => this.handlePurge());
    // Ecoute changement d'un texte de tâche
    this.addEventListener('update', e => this.handleUpdate(e));
  }

  connectedCallback() {

    // Chargement HTMML
    this.innerHTML = html(this.page, tasks.checkStill(), tasks.checkComplete());

    // Chargement de la page
    window.addEventListener('load', () => this.reset());  
  }

  // Rafraichissement de la liste
  reset() {
    const ul = document.createElement('ul'); 
    Array.from(tasks.getFiltered(this.page)).map(([text, complete]) => ul.appendChild(new TodoLine(text, complete)));
    this.querySelector('ul').replaceWith(ul);   
  }

  // Ajout d'une ligne
  add(text) {
    // On vérifie que la tâche n'existe pas
    if(tasks.hasTask(text)) {
      // Alerte si la tâche existe déjà
      this.dispatchEvent(new CustomEvent('alert-danger', { bubbles: true })); 
    } else {
      // On ajoute la tâche dans le dictionnaire
      tasks.add(text, false);
      // On ajoute la tâche dans la liste si on n'affiche pas les tâches finies
      if(this.querySelector('todo-filters').filter !== 'finis') {
        this.querySelector('ul').appendChild(new TodoLine(text, false));
      } else {
        // Sinon on donne l'info
        this.dispatchEvent(new CustomEvent('alert-success', { bubbles: true })); 
      }
      // Footer
      this.updateFooter();
    }    
  }

  // Mise à jour footer
  updateFooter() {
    const footer = this.querySelector('todo-footer');
    footer.number = tasks.checkStill();
    footer.btn = tasks.checkComplete();
  }

  // Changement du filtre
  handleFilter(e) {
    location.href = './#' + e.target.filter;
    this.page = e.target.filter;
    this.reset();
  }

  // Purge des finis
  handlePurge() {
    // Purge dans le dictionnaire
    tasks.clean();
    // Rafraichissement de la liste 
    this.reset();
    // Footer
    this.updateFooter();
  }

  // Suppression d'une ligne
  handleDelete(e) {
    tasks.del(e.target.text);
    // Rafraichissement de la liste 
    this.reset();
    // Footer
    this.updateFooter();    
  }

  // changement marquage d'une ligne
  handleToggle(e) {
    // Changement dans le dictionnaire
    tasks.update(e.target.text, !e.target.complete);
    // Rafraichissement de la liste 
    this.reset();
    // Footer
    this.updateFooter();  
  }

  // Changement texte d'une ligne
  handleUpdate(e) {
    // On vérifie que la tâche n'existe pas
    if(tasks.hasTask(e.detail.new)) {
      // Alerte si la tâche existe déjà
      this.dispatchEvent(new CustomEvent('alert-danger', { bubbles: true }));
      // Raffraichissement de la ligne
      e.target.text = e.detail.old; 
    } else {
      // Sinon on met à jour
      tasks.changeKey(e.detail.old, e.detail.new);
      // Raffraichissement de la ligne
      e.target.text = e.detail.new; 
    }  
  }
}

if (!customElements.get('todo-list')) {
  customElements.define('todo-list', TodoList);
}

