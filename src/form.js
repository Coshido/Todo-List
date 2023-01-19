import render from "./index.js";
import { format, parseISO } from "date-fns";
import { createNewProject } from "./index.js";

let editFormContent = `
<div class="edit-content">
  <form id="task-info-form" action="" method="get">
    <div class="form-element">
      <label for="input-name">Name:</label>
      <input type="text" id="input-name" required/>
    </div>
    <div class="form-element">
      <label for="input-description">Description:</label>
      <input type="text-area" id="input-description" />
    </div>
    <div class="form-element">
      <label for="input-date">Date:</label>
      <input type="date" id="input-date" />
    </div>
    <div class="form-element">
        <label>Priority:</label>
        <div>
            <input type="radio" name="priority" id="low" value="low" checked>
            <label for="low">Low</label>
            <input type="radio" name="priority" id="normal" value="normal">
            <label for="normal">Normal</label>
            <input type="radio" name="priority" id="high" value="high">
            <label for="high">High</label>
        </div>
    </div>
    <div class="form-buttons">
        <div class="form-element">
          <input id="submit-button" class="button" type="submit" />
     </div>
        <div class="form-element">
        <button class="edit-cancel-button">Cancel</button>
    </div>
  </form>
</div>
`;

let infoFormContent = `
<div class="info-content">
    <div>
     <p>Title:</p>
     <p class="info-title"></p>
    </div>
    <div>
     <p>Description:</p>
     <p class="info-description"></p>
    </div>
    <div>
     <p>Due Date:</p>
     <p class="info-date"></p>
    </div>
    <div>
     <p>Priority:</p>
     <p class="info-priority"></p>
    </div>
    <button class="info-cancel-button">Cancel</button>
</div>
`;

let infoDiv = document.createElement("div");
infoDiv.classList.add("info-div");

let editDiv = document.createElement("div");
editDiv.classList.add("edit-div");

infoDiv.innerHTML = infoFormContent;
editDiv.innerHTML = editFormContent;

function showInfoForm(task) {
  infoDiv.classList.remove("hidden");
  let cancelButton = document.querySelector(".info-cancel-button");
  cancelButton.addEventListener("click", hideInfoForm, { once: true });

  document.querySelector(".info-title").textContent = task.name;
  document.querySelector(".info-description").textContent = task.description;
  document.querySelector(".info-date").textContent = task.dueDate;
  document.querySelector(".info-priority").textContent = task.priority;
}

function showEditForm(task) {
  editDiv.classList.remove("hidden");

  document.querySelector("#input-name").value = task.name;
  document.querySelector("#input-description").value = task.description;
  document.querySelector("#input-date").value = parseISO(task.dueDate);

  let cancelButton = document.querySelector(".edit-cancel-button");
  cancelButton.addEventListener("click", hideEditForm, { once: true });

  let submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    editForm(task);
  });
}

function editForm(task) {
  task.name = document.querySelector("#input-name").value;
  task.description = document.querySelector("#input-description").value;
  let dueDate = document.querySelector("#input-date");
  if (dueDate.value != "") {
    task.dueDate = format(parseISO(dueDate.value), "dd/MM/yyyy");
  } else if (task.dueDate == undefined) {
    task.dueDate = format(new Date(), "dd/MM/yyyy");
  }
  task.priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  hideEditForm();
  render();
}

function hideInfoForm() {
  infoDiv.classList.add("hidden");
}
function hideEditForm() {
  editDiv.classList.add("hidden");
}

function renderInfoDiv() {
  return infoDiv;
}
function renderEditDiv() {
  return editDiv;
}

// project form
let projectFormContent = `
<div class="project-form-content">
    <div>
     <p>Title:</p>
     <input type="text" class="project-form-title" required="required" ></input>
    </div>
    <button class="project-form-new">Confirm</button>
    <button class="project-cancel-button">Cancel</button>
</div>
`;
let projectDiv = document.createElement("div");
projectDiv.classList.add("project-div", "hidden");
projectDiv.innerHTML = projectFormContent;
let body = document.querySelector("body");
body.appendChild(projectDiv);

function showProjectDiv() {
  projectDiv.classList.remove("hidden");

  let cancelButton = document.querySelector(".project-cancel-button");
  cancelButton.addEventListener("click", hideProjectDiv, { once: true });

  let submitButton = document.querySelector(".project-form-new");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let name = document.querySelector(".project-form-title").value;
    if (name == "" || name == undefined) {
      name = "New Project";
    }
    createNewProject(name);
    hideProjectDiv();
    render();
  });
}

function hideProjectDiv() {
  projectDiv.classList.add("hidden");
}

export default renderInfoDiv;
export {
  renderEditDiv,
  showInfoForm,
  hideInfoForm,
  showEditForm,
  hideEditForm,
  showProjectDiv,
  hideProjectDiv,
};
