const wrapper = () => '<div class="row flex-edges"></div>';

const html = (number, btn) =>  `
  <div><span class="badge">reste à compléter ${ number } tâches</span></div>
  ${ parseInt(btn) ? '<button class="btn-small btn-warning">Purger tâches finies</button>' : '' }
`;

export {
  wrapper,
  html
}