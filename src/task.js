class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  editProp(prop, value) {
    switch (prop) {
      case "name":
        this.name = value;
        break;
      case "description":
        this.description = value;
        break;
      case "dueDate":
        this.dueDate = value;
        break;
      case "priority":
        this.priority = value;
      default:
        console.log("Property does not exist");
        break;
    }
  }
  completeTask() {
    this.complete = true;
  }
}

export default Task;
