export default (page, number, btn) =>  `
  <ul></ul>
  <todo-filters filter="${ page }"></todo-filters>
  <todo-footer number="${ number }" btn="${ btn }"></todo-footer>
`;