let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatStatus(status) {
  if (status === "notStarted") return "Not Started";
  if (status === "inProgress") return "In Progress";
  if (status === "completed") return "Completed";
  if (status === "overdue") return "Overdue";
  return status;
}

function addTask() {
  let name = document.getElementById("taskName").value;
  let category = document.getElementById("taskCategory").value;
  let deadline = document.getElementById("taskDeadline").value;
  let status = document.getElementById("taskStatus").value;

  if (name && deadline) {
    let task = {
      name: name,
      category: category,
      deadline: deadline,
      status: status,
    };
    tasks.push(task);
    saveTasks();
    displayTasks();
    clearInputs();
  }
}

function clearInputs() {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("taskStatus").value = "notStarted";
  document.getElementById("taskCategory").value = "work";
}

function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  saveTasks();
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  let today = new Date().toISOString().split("T")[0];
  tasks.forEach(function (task, index) {
    if (task.status !== "completed" && task.deadline < today) {
      task.status = "overdue";
    }

    let taskItem = document.createElement("li");
    let info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.name}</strong> | ${task.category} | ${
      task.deadline
    } | ${formatStatus(task.status)}`;

    let controls = document.createElement("div");
    controls.className = "task-controls";
    let select = document.createElement("select");
    ["notStarted", "inProgress", "completed"].forEach(function (s) {
      let option = document.createElement("option");
      option.value = s;
      option.text = formatStatus(s);
      if (task.status === s) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    select.onchange = function () {
      updateStatus(index, this.value);
    };
    controls.appendChild(select);
    taskItem.appendChild(info);
    taskItem.appendChild(controls);
    list.appendChild(taskItem);
  });
}

function filterTasks() {
  let catFilter = document.getElementById("filterCategory").value;
  let statFilter = document.getElementById("filterStatus").value;
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  let today = new Date().toISOString().split("T")[0];
  tasks.forEach(function (task, index) {
    if (task.status !== "completed" && task.deadline < today) {
      task.status = "overdue";
    }
    let show = true;
    if (catFilter !== "all" && task.category !== catFilter) {
      show = false;
    }
    if (statFilter !== "all" && task.status !== statFilter) {
      show = false;
    }
    if (show) {
      let taskItem = document.createElement("li");
      let info = document.createElement("div");
      info.className = "task-info";
      info.innerHTML = `<strong>${task.name}</strong> | ${task.category} | ${
        task.deadline
      } | ${formatStatus(task.status)}`;

      let controls = document.createElement("div");
      controls.className = "task-controls";
      let select = document.createElement("select");
      ["notStarted", "inProgress", "completed"].forEach(function (s) {
        let option = document.createElement("option");
        option.value = s;
        option.text = formatStatus(s);
        if (task.status === s) {
          option.selected = true;
        }
        select.appendChild(option);
      });
      select.onchange = function () {
        updateStatus(index, this.value);
      };
      controls.appendChild(select);
      taskItem.appendChild(info);
      taskItem.appendChild(controls);
      list.appendChild(taskItem);
    }
  });
}

displayTasks();
