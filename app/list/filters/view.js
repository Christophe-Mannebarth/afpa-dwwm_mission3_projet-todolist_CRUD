export default (filter) =>  ` 
  <div class="form-group">  
    <label for="all" class="paper-radio">
      <input type="radio" name="filter" id="all" value="tous" ${ filter === 'tous' ? 'checked' : '' }>
      <span>Tous<span>
    </label>
    <label for="actifs" class="paper-radio">
      <input type="radio" name="filter" id="actifs" value="actifs" ${ filter === 'actifs' ? 'checked' : '' }>
      <span>Actifs<span>
    </label>
    <label for="completed" class="paper-radio">
      <input type="radio" name="filter" id="completed" value="finis" ${ filter === 'finis' ? 'checked' : '' }>
      <span>Finis<span>
    </label>
  </div>     
`;
