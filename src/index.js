import createFooter from "./footer.js";
import Project from "./project.js";
import Task from "./task.js";
import renderProject from "./render.js";
import { showEditForm, showProjectDiv } from "./form.js";
import { format, parse } from "date-fns";

const body = document.querySelector("body");
const footer = createFooter();

let project = new Project("project");
let project2 = new Project("project2");
let projectCollection = [project, project2];
let activeProject;

let date = format(new Date(2023, 0, 20), "dd/MM/yyyy");
let asd = new Task("asd", "lelelel", date, "low");
project.addTask(asd);
let asd2 = new Task("asd2", "lelelel", date, "medium");
project.addTask(asd2);
let asd3 = new Task("asd3", "lelelel", date, "high");
project2.addTask(asd3);

body.appendChild(footer);

let sidebarProject = document.querySelector(".sidebar-project-content");

function renderProjectCollection(projectCollection) {
  sidebarProject.innerHTML = "";
  projectCollection.map((project, i) => {
    let div = document.createElement("div");
    div.classList.add("project");
    div.innerHTML = project.name;
    div.addEventListener("click", () => {
      selectProjectHandler(projectCollection[i]);
    });
    sidebarProject.appendChild(div);
  });
}

function selectProjectHandler(project) {
  activeProject = project;
  render();
}

let newProjectDiv = document.querySelector(".new-project");
newProjectDiv.addEventListener("click", newProjectHandler);

function newProjectHandler() {
  showProjectDiv();
}

function createNewProject(name) {
  let newProject = new Project(name);
  projectCollection.push(newProject);
}

let newTask = document.querySelector(".new-task");
newTask.addEventListener("click", newTaskHandler);

function newTaskHandler() {
  let newTask = new Task("name", "description");
  console.log(activeProject);
  activeProject.addTask(newTask);
  showEditForm(newTask);
}

function localStorageSave() {
  const objToSave = {
    projectCollection,
    activeProject,
  };

  window.localStorage.setItem("save", JSON.stringify(objToSave));
}

function localStorageLoad() {
  const objLoad = window.localStorage.getItem("save");
  const parsedObj = JSON.parse(objLoad);
  activeProject = Object.assign(new Project(), parsedObj.activeProject);
  let collection = parsedObj.projectCollection;
  projectCollection = [];
  collection.map((x) => {
    let a = Object.assign(new Project(), x);
    projectCollection.push(a);
  });
  render();
}
localStorageLoad();

export default function render() {
  renderProject(activeProject);
  renderProjectCollection(projectCollection);
  localStorageSave();
}

export { project, projectCollection, createNewProject };
render();
