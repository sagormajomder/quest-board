'use strict';
const state = JSON.parse(localStorage.getItem('state')) || {
  planningTasks: [],
  progressTasks: [],
  completedTasks: [],
};

const planningTaskListEl = document.getElementById('planningTaskList');
const progressTaskListEl = document.getElementById('progressTaskList');
const completedTaskListEl = document.getElementById('completedTaskList');

const addTaskModalEl = document.getElementById('addTaskModal');
const taskModalEl = document.getElementById('taskModal');
const taskModalContainerEl = document.getElementById('taskModalContainer');

const taskNameInputEl = document.getElementById('taskName');
const taskDetailsInputEl = document.getElementById('taskDetails');

let draggableEl = null;

document.getElementById('openModalBtn').addEventListener('click', e => {
  addTaskModalEl.showModal();
});

// display Task details in modal
function displayTaskModal(taskId) {
  console.log(taskId);
  let task = null;
  if (state.planningTasks.find(t => t.id === taskId)) {
    task = state.planningTasks.find(t => t.id === taskId);
  } else if (state.progressTasks.find(t => t.id === taskId)) {
    task = state.progressTasks.find(t => t.id === taskId);
  } else if (state.completedTasks.find(t => t.id === taskId)) {
    task = state.completedTasks.find(t => t.id === taskId);
  }
  console.log(task);
  console.log(taskModalContainerEl);
  taskModalContainerEl.innerHTML = `
  <h3 class="text-2xl text-primary font-bold mb-3">${task.taskName} - (${task.emoji})</h3>
  <p class="text-lg text-primary font-medium">
            Task Details: <span class="font-normal">${task.taskDetails}</span>
  </p>
  `;
}

// Display TaskList
function displayTaskList(tasks, containerEl) {
  if (tasks.length === 0) return;

  containerEl.innerHTML = '';

  let html = '';

  tasks.forEach(d => {
    html += `
    <li data-task-id="${d.id}" draggable="true" class="p-2 bg-white rounded-md font-semibold text-lg cursor-pointer flex justify-between items-center">
    <span>${d.taskName}</span>
    <span>${d.emoji}</span>
    </li>
    `;
  });

  containerEl.innerHTML = html;

  // Drag El listener
  const draggableLiEls = document.querySelectorAll("li[draggable='true']");
  draggableLiEls.forEach(el => {
    if (!el.hasListener) {
      el.addEventListener('dragstart', e => {
        draggableEl = e.target;
      });

      el.addEventListener('click', e => {
        displayTaskModal(e.target.dataset.taskId);
        taskModalEl.showModal();
      });
      el.hasListener = true;
    }
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

  const newTask = {
    id: crypto.randomUUID(),
    taskName,
    taskDetails,
    emoji: '🔥',
  };

  state.planningTasks.push(newTask);
  localStorage.setItem('state', JSON.stringify(state));
  taskNameInputEl.value = '';
  taskDetailsInputEl.value = '';
  displayTaskList(state.planningTasks, planningTaskListEl);
});

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

      // Check is tasklist contain the task
      const taskId = draggableEl.dataset.taskId;

      if (state.planningTasks.find(t => t.id === taskId)) {
        const task = state.planningTasks.find(t => t.id === taskId);

        // remove the task
        const index = state.planningTasks.indexOf(task);
        if (index !== -1) {
          state.planningTasks.splice(index, 1);
        }

        // add the task
        if (el === progressTaskListEl) {
          state.progressTasks.push({ ...task, emoji: '🚀' });
        }
        if (el === completedTaskListEl) {
          state.completedTasks.push({ ...task, emoji: '✅' });
        }
      } else if (state.progressTasks.find(t => t.id === taskId)) {
        const task = state.progressTasks.find(t => t.id === taskId);

        // remove the task
        const index = state.progressTasks.indexOf(task);
        if (index !== -1) {
          state.progressTasks.splice(index, 1);
        }

        // add the task
        if (el === planningTaskListEl) {
          state.planningTasks.push({ ...task, emoji: '🔥' });
        }

        if (el === completedTaskListEl) {
          state.completedTasks.push({ ...task, emoji: '✅' });
        }
      } else if (state.completedTasks.find(t => t.id === taskId)) {
        const task = state.completedTasks.find(t => t.id === taskId);

        // remove the task
        const index = state.completedTasks.indexOf(task);
        if (index !== -1) {
          state.completedTasks.splice(index, 1);
        }

        // add the task
        if (el === planningTaskListEl) {
          state.planningTasks.push({ ...task, emoji: '🔥' });
        }

        if (el === progressTaskListEl) {
          state.progressTasks.push({ ...task, emoji: '🚀' });
        }
      }
      e.target.appendChild(draggableEl);
      displayTaskList(state.planningTasks, planningTaskListEl);
      displayTaskList(state.progressTasks, progressTaskListEl);
      displayTaskList(state.completedTasks, completedTaskListEl);

      //  Set state into localstorage
      localStorage.setItem('state', JSON.stringify(state));
    }
  });
});

displayTaskList(state.planningTasks, planningTaskListEl);
displayTaskList(state.progressTasks, progressTaskListEl);
displayTaskList(state.completedTasks, completedTaskListEl);
