// Dictionnaire
let tasks = new Map();

const setStorage = tasks => localStorage.setItem('TASKS', JSON.stringify(Array.from(tasks)));
const getStorage = () => JSON.parse(localStorage.getItem('TASKS'));

// Initialisation à partir du storage
const init = () => { 
  const values = getStorage();
  if(values) {
    tasks = new Map(values);
  }
};

// Actualisation du storage
const save = () => setStorage(tasks);

// test existence tâche
const hasTask = key => tasks.has(key);
 
// Ajout d'une tâche
const add = (key, value) => {
  // On ajoute la tâche
  tasks.set(key, value);
  // Actualisation du local storage
  save(); 
};

// Suppression d'une tâche
const del = key => {
  tasks.delete(key);
  // Actualisation du local storage
  save(); 
};

// Mise à jour d'une tâche
const update = (key, value) => {
  tasks.set(key, value);
  // Actualisation du local storage
  save();   
};

// Retour valeur à partir d'une clé
const getValue = key => tasks.get(key); 

// Changement clé
const changeKey = (key, newKey) => {
  // Transformation dictionnaire en tableau
  const elements = Array.from(tasks);
  // Changement de la clé
  elements[elements.findIndex(t => t[0] === key)][0] = newKey;
  // Transformation en dictionnaire
  tasks = new Map(elements);
  // Actualisation du local storage
  save();    
};

// Filtrage
const getFiltered = filter => {
  return filter === 'tous' ? tasks : new Map(Array.from(tasks).filter((task) => task[1] === (filter === 'finis')));
}; 

// Purge les tâches finies
const clean = () => {
  tasks = getFiltered('actifs');
  save();
};

// Nombre de tâches restantes
const checkStill = () => checkTasks() - checkComplete();

// Nombe de tâches finies
const checkComplete = () => getFiltered('finis').size;

// Nombre de tâches
const checkTasks = () => tasks.size;

export { 
  init, 
  add, 
  del, 
  update, 
  getFiltered, 
  getValue,
  changeKey,
  clean,
  checkComplete,
  checkTasks,
  hasTask,
  checkStill
};