'use strict';
const data = [];
const planningTaskListEl = document.getElementById('planningTaskList');
const modalEl = document.getElementById('addTaskModal');

const taskNameInputEl = document.getElementById('taskName');
const taskDetailsInputEl = document.getElementById('taskDetails');

document.getElementById('openModalBtn').addEventListener('click', e => {
  modalEl.showModal();
});

// Display Planning task
function displayTaskList() {
  planningTaskListEl.innerHTML = '';

  let html = '';

  data.forEach(d => {
    html += `
    <li class="p-2 bg-white rounded-md font-semibold text-lg">${d.taskName}</li>
    `;
  });

  planningTaskListEl.innerHTML = html;
}

// ADD TASK
document.getElementById('addTaskBtn').addEventListener('click', e => {
  const taskErrorAlertEl = document.getElementById('taskNameAlert');
  const taskName = taskNameInputEl.value;
  const taskDetails = taskDetailsInputEl.value;
  if (!taskName) {
    e.preventDefault();
    taskErrorAlertEl.classList.remove('hidden');
    return;
  }

  if (!taskErrorAlertEl.classList.contains('hidden')) {
    document.getElementById('taskNameAlert').classList.add('hidden');
  }

  data.push({ id: crypto.randomUUID(), taskName, taskDetails });
  taskNameInputEl.value = '';
  taskDetailsInputEl.value = '';
  displayTaskList();
});
