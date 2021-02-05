export default (type, text, display) =>  ` 
  <div id="alert" style="display: ${ display };">
    <input class="alert-state" id="alert" type="checkbox">
    <div class="alert ${ type } dismissible">
      ${ text }
      <label class="btn-close" for="alert">X</label>
    </div>
  </div>   
`;
