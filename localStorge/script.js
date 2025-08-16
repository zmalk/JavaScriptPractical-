// Select the button and the input field

let theInput = document.getElementById("the-input");
// كل زر لوحده
let searchButt = document.querySelector("#search");
let addButt = document.querySelector("#add");
let removeButt = document.querySelector("#remove");
let clearButt = document.querySelector("#clear");
// الاب الخاص بالازرار

let Butt = document.querySelectorAll(".buttons button");

// the result
let theResult = document.querySelector(".result > span");

// span

Butt.forEach((butt) => {
  butt.addEventListener("click", (e) => {
    if (e.target.id === "search") {
      search();
    }
    if (e.target.id === "add") {
      add();
    }
    if (e.target.id === "remove") {
      remove();
    }
    if (e.target.id === "clear") {
      clear();
    }
    if (e.target.id === "show") {
      show();
    }
  });
});

function empty() {
  if (theInput.value === "") {
    theResult.innerHTML = "input can not be empty";
  }
}

function search() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      theResult.innerHTML = `found local item called <span>${theInput.value}</span> `;
    } else {
      theResult.innerHTML = `not found local item called <span>${theInput.value}</span> `;
    }
  } else {
    empty();
  }
}
function add() {
  if (theInput.value !== "") {
    localStorage.setItem(theInput.value, "Test");
    theResult.innerHTML = `local storge item <span>${theInput.value}</span> Added `;
    theInput.value = " ";
  } else {
    empty();
  }
}
function remove() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      localStorage.removeItem(theInput.value);
      theResult.innerHTML = ` local item called <span>${theInput.value}</span> Deleted`;
      theInput.value = " ";
    } else {
      theResult.innerHTML = `not found local item called <span>${theInput.value}</span> `;
    }
  } else {
    empty();
  }
}
function clear() {
  localStorage.clear();
  theResult.innerHTML = " nothing now in the local storge";
}

function show() {
  if (localStorage.length) {
    theResult.innerHTML=""
    for (let [key, value] of Object.entries(localStorage)) {
      theResult.innerHTML += `<span>${key}</span>`;
    }
  }
  else{
    theResult.innerHTML = 'local storge is empty'
  }
}
