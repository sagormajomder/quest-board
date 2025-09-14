'use strict';
const data = JSON.parse(localStorage.getItem('data')) || [];
const planningTaskListEl = document.getElementById('planningTaskList');
const modalEl = document.getElementById('addTaskModal');

const taskNameInputEl = document.getElementById('taskName');
const taskDetailsInputEl = document.getElementById('taskDetails');

let draggableEl = null;

document.getElementById('openModalBtn').addEventListener('click', e => {
  modalEl.showModal();
});

// Display Planning task
function displayTaskList() {
  if (data.length === 0) return;

  planningTaskListEl.innerHTML = '';

  let html = '';

  data.forEach(d => {
    html += `
    <li data-task-id="${d.id}" draggable="true" class="p-2 bg-white rounded-md font-semibold text-lg">${d.taskName}</li>
    `;
  });

  planningTaskListEl.innerHTML = html;

  // Drag El listener
  document.querySelectorAll("li[draggable='true']").forEach(el => {
    el.addEventListener('dragstart', e => {
      draggableEl = e.target;
    });
  });
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

  const newTask = { id: crypto.randomUUID(), taskName, taskDetails };

  data.push(newTask);
  localStorage.setItem('data', JSON.stringify(data));
  taskNameInputEl.value = '';
  taskDetailsInputEl.value = '';
  displayTaskList();
});

displayTaskList();

// Drop
document.querySelectorAll('.drop-zone').forEach(el => {
  // DragOver
  el.addEventListener('dragover', e => {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';

    if (e.target.classList.contains('min-h-[3.125rem]')) {
      e.target.classList.add('h-[6.25rem]');
      e.target.classList.remove('min-h-[3.125rem]');
    }
  });

  // DragLeave
  el.addEventListener('dragleave', e => {
    if (e.target.classList.contains('h-[6.25rem]')) {
      e.target.classList.add('min-h-[3.125rem]');
      e.target.classList.remove('h-[6.25rem]');
    }
  });

  // Drop
  el.addEventListener('drop', e => {
    e.preventDefault();

    if (e.target.classList.contains('drop-zone')) {
      e.target.classList.add('min-h-[3.125rem]');
      e.target.classList.remove('h-[6.25rem]');
      e.target.appendChild(draggableEl);
      console.log(draggableEl);
    }
  });
});
