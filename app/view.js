export default () => `
  <todo-alert id="alert-danger" type="alert-danger" text="Cette tâche existe déjà !" display="none"></todo-alert>
  <todo-alert id="alert-success" type="alert-success" text="La tâche a bien été ajoutée !" display="none"></todo-alert>
  <div class="row flex-edges">
    <input id="add" type="text" placeholder="Nouvelle tâche">
    <label class="paper-btn btn-small btn-secondary" for="aide">Aide</label>
  </div>
  <input class="modal-state" id="aide" type="checkbox">
  <div class="modal">
    <label class="modal-bg" for="aide"></label>
    <div class="modal-body">
      <label class="btn-close" for="aide">X</label>
      <h4 class="modal-title">Un peu d'aide?</h4>
      <h5 class="modal-subtitle">Ajouter une tâche</h5>
      <p class="modal-text">Entrez le texte dans la zone de saisie et utilisez la touche "Entrée" pour valider.</p>
      <h5 class="modal-subtitle">Modifier une tâche</h5>
      <p class="modal-text">Pour changer l'état utilisez le bouton "Marquer/Démarquer".</p>
      <p class="modal-text">Pour changer le texte faites un double clic sur celui-ci et utilisez la zone de saisie qui apparait.</p>
      <h5 class="modal-subtitle">Supprimer une tâche</h5>
      <p class="modal-text">Utilisez le bouton rouge "Supprimer".</p>
      <h5 class="modal-subtitle">Filtrer les tâches</h5>
      <p class="modal-text">Utilisez les boutons radio en bas de la page.</p>
      <h5 class="modal-subtitle">Purger les tâches terminées</h5>
      <p class="modal-text">Utilisez le bouton jaune en bas à droite de la page.</p>
    </div>
  </div>
  <todo-list></todo-list>
`;
