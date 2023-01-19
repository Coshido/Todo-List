class Project {
  constructor(name) {
    this.project = [];
    this.name = name;
  }

  addTask(task) {
    this.project.push(task);
  }

  deleteTask(name) {
    this.project = this.project.filter((task) => task.name != name);
  }

  editName(newName) {
    this.name = newName;
  }
}

export default Project;
