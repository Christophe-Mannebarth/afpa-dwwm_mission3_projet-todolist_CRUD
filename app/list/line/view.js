const html =  (text, complete) => `
  <li>${ complete ? `<del>${ text }</del>` : text}  
    <button class="btn-small btn-danger">Supprimer</button>
    ${ complete ? 
      '<button class="btn-small demarquer">Démarquer</button>' :
      '<button class="btn-small marquer">Marquer</button>'
    }            
  </li>
`;

// Affichage input
const edit = (text) => `<input id="edit" type="text" value="${ text }"></input>`;

export {
  html,
  edit
}
