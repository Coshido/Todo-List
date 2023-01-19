import renderInfoDiv from "./form";
import render from "./index.js";
import { project } from "./index.js";

import {
  renderEditDiv,
  showInfoForm,
  hideInfoForm,
  showEditForm,
  hideEditForm,
} from "./form";

let projectDiv = document.querySelector(".main-content-tasks");
let body = document.querySelector("body");

function renderTask(task) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.innerHTML = "";

  let checkBox = document.createElement("input");
  let title = document.createElement("p");
  let info = document.createElement("button");
  let date = document.createElement("div");
  let edit = document.createElement("i");
  let remove = document.createElement("i");

  let checkBoxHandler = handleCheckBox.bind(this, { task, checkBox, title });
  checkBox.type = "checkbox";
  checkBox.addEventListener("click", checkBoxHandler);

  title.textContent = task.name;

  info.addEventListener("click", function () {
    handleInfo(task);
  });
  info.textContent = "Info";

  date.innerHTML = task.dueDate;

  edit.classList.add("fa-regular", "fa-pen-to-square");
  edit.addEventListener("click", function () {
    handleEdit(task);
  });

  remove.classList.add("fa-solid", "fa-trash");
  remove.addEventListener("click", function () {
    handleRemove(task);
  });

  taskDiv.appendChild(checkBox);
  taskDiv.appendChild(title);
  taskDiv.appendChild(date);
  taskDiv.appendChild(info);
  taskDiv.appendChild(edit);
  taskDiv.appendChild(remove);

  return taskDiv;
}

function handleCheckBox(obj) {
  obj.checkBox.checked == true
    ? (obj.title.style.textDecoration = "line-through")
    : (obj.title.style.textDecoration = "");
}
function handleInfo(task) {
  showInfoForm(task);
}
function handleEdit(task) {
  showEditForm(task);
}
function handleRemove(task) {
  project.deleteTask(task.name);
  render();
}
function renderProject(project) {
  projectDiv.innerHTML = "";

  project.project.map((task) => projectDiv.appendChild(renderTask(task)));
}

body.appendChild(renderInfoDiv());
body.appendChild(renderEditDiv());
hideInfoForm();
hideEditForm();

export default renderProject;
