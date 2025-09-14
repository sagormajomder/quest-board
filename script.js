'use strict';
const data = [];
const planningTaskListEl = document.getElementById('planningTaskList');
const modalEl = document.getElementById('addTaskModal');

const addTaskBtnEl = document.getElementById('addTaskBtn');

document.getElementById('openModalBtn').addEventListener('click', e => {
  modalEl.showModal();
});
