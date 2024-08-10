const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const newTaskText = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function createTaskElement(task) {

  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item');

  const svg = document.createElement('svg');
  svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
  `;

  const taskContent = document.createElement('p');
  taskContent.classList.add('app__section-task-list-item-description');
  taskContent.textContent = task.descricao;

  const editBtn = document.createElement('button');
  editBtn.classList.add('app_button-edit');

  editBtn.onclick = () => {
    const newContent = prompt('Qual o novo conteúdo da tarefa?');
    taskContent.textContent = newContent;
  }

  const imgEditBtn = document.createElement('img');
  imgEditBtn.setAttribute('src', './imagens/edit.png');
  editBtn.appendChild(imgEditBtn);

  li.appendChild(svg);
  li.appendChild(taskContent);
  li.appendChild(editBtn);

  return li;
}

btnAddTask.addEventListener('click', () => {
  formAddTask.classList.toggle('hidden');
})

formAddTask.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const task = {
    descricao: newTaskText.value
  }
  tasks.push(task);
  const elementTask = createTaskElement(task);
  ulTasks.appendChild(elementTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  newTaskText.value = '';
  formAddTask.classList.add('hidden');
})

tasks.forEach(task => {
  const elementTask = createTaskElement(task);
  ulTasks.appendChild(elementTask);
});
