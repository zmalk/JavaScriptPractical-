// Setting up var

let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tast-container");
let tasksCount = document.querySelector(".task-count span");
let tasksCompleted = document.querySelector(".task-completed span");
let todoContainer = document.querySelector(".todo-container");
let startContainer = document.querySelector(".start");
let deleteAllButton = document.querySelector(".delete-all button");
let completedAllButton = document.querySelector(".completedAll button");
//foucs on input field

window.onload = function () {
  theInput.focus();

  let initTasks = JSON.parse(localStorage.getItem("task")) || [];

  initTasks.forEach((task) => {
    let taskDom = `<span id=${task.key} class="task-box ${
      task.isCompleted ? "finished" : ""
    }">${task.text}<span class="delete">Delete</span></span>`;
    tasksContainer.innerHTML += taskDom;
  });

  // checkTasks();
};

// add task function

addButton.onclick = function () {
  let userInput = theInput.value.trim(); // trim to remove extra spaces
  if (userInput === "") {
    Swal.fire({
      icon: "info", // أو 'warning' إذا حابب
      text: "Please write a task",
      toast: true,
      position: "top-middle",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } else {
    startContainer.style.display = "flex";

    // check if task already exists
    let allTasks = document.querySelectorAll(".task-box");
    let taskExists = Array.from(allTasks).some((taskBox) => {
      return (
        taskBox.firstChild.textContent.trim().toLowerCase() ===
        userInput.toLowerCase()
      );
    });
    if (taskExists) {
      theInput.value = "";
      Swal.fire({
        icon: "warning",
        text: "Task already exists!",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    const currentTasks = JSON.parse(localStorage.getItem("task")) || [];

    let currentTaskId = Math.round(Math.random() * 10000)
    localStorage.setItem(
      "task",
      JSON.stringify([
        ...currentTasks,
        {
          key: currentTaskId,
          text: userInput,
          isCompleted: false,
        },
      ])
    );
    let taskDom = `<span id=${currentTaskId} class="task-box">${userInput}<span class="delete">Delete</span></span>`;
    // // create span
    // let mainSpan = document.createElement("span");
    // // create text node
    // let textNode = document.createTextNode(userInput);
    // // append text to span
    // mainSpan.appendChild(textNode);
    // // add class to span
    // mainSpan.className = "task-box";
    // // add span to tasks container
    // tasksContainer.appendChild(mainSpan);
    // clear input field
    theInput.value = "";
    // focus on input field again
    theInput.focus();
    // update tasks count and completed tasks
    calcTasks();

    // // create delete button
    // let deleteButton = document.createElement("span");
    // // create text node for delete button
    // let deleteText = document.createTextNode("Delete");
    // // append text to delete button
    // deleteButton.appendChild(deleteText);
    // // add class to delete button
    // deleteButton.className = "delete";

    // // append delete button to main span
    // mainSpan.appendChild(deleteButton);

    tasksContainer.innerHTML += taskDom;
    let noTasksMessage = document.querySelector(".no-task");
    if (document.body.contains(document.querySelector(".no-task"))) {
      // no tasks message
      noTasksMessage.remove();
      //
    }

    //delete All Tasks
  }
};

// Event delegation for delete and complete tasks
document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    let taskId = e.target.parentNode.id;
    e.target.parentNode.remove();

    const newTasks = JSON.parse(localStorage.getItem("task")).filter((task) => {
      return task.key !== Number(taskId);
    });

    localStorage.setItem("task", JSON.stringify(newTasks));

    checkTasks();
  }
  if (e.target.classList.contains("task-box")) {
    let taskId = e.target.id;
    e.target.classList.toggle("finished");

    const completedTask = JSON.parse(localStorage.getItem("task")).map(
      (task) => {
        if (task.key === Number(taskId)) {
          return {
            key: task.key,
            text: task.text,
            isCompleted: !task.isCompleted,
          };
        } else {
          return task;
        }
      }
    );

    localStorage.setItem("task", JSON.stringify(completedTask));
  }
  // update tasks count and completed tasks
  calcTasks();
});

// update tasks count and completed tasks
function calcTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tast-container .task-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tast-container .finished"
  ).length;
}
function checkTasks() {
  if (tasksContainer.children.length !== 0) {
    startContainer.style.display = "flex";
  }

  if (tasksContainer.children.length === 0) {
    startContainer.style.display = "hidden";
    todoContainer.innerHTML += `<span class="no-task">No Tasks to DO</span>`;
  }
}
deleteAllButton.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all tasks!",
  }).then((result) => {
    if (result.isConfirmed) {
      tasksContainer.innerHTML = "";
      noTasks();
      calcTasks();
      Swal.fire("Deleted!", "All tasks have been deleted.", "success");
    }
  });
};
completedAllButton.onclick = function () {
  let allTasks = document.querySelectorAll(".task-box");
  if (allTasks.length === 0) {
    startContainer.style.display = "none";
  }

  allTasks.forEach((task) => {
    task.classList.add("finished");
  });

  calcTasks();
  Swal.fire({
    icon: "success",
    text: "All tasks marked as completed!",
    toast: true,
    position: "top-middle",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};
