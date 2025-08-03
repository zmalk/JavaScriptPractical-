// first
let slider = Array.from(document.querySelectorAll(".slider-container img"));
// 2
let sliderLenght = slider.length;
// 3
let currentSilde = 1;
// 4
let slideNumber = document.querySelector(".slider-number");
// 5
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

// 6
function nextt() {
  if (next.classList.contains("disabled")) {
    return false;
  } else {
    currentSilde++;
    cheker();
  }
}
function prevv() {
  if (prev.classList.contains("disabled")) {
    return false;
  } else {
    currentSilde--;
    cheker();
  }
}

//
prev.addEventListener("click", prevv);
next.addEventListener("click", nextt);

//

let ul = document.createElement("ul");
ul.setAttribute("id", "pagination-ul");

for (let i = 1; i <= sliderLenght; i++) {
  let li = document.createElement("li");
  li.setAttribute("data-index", i);
  li.appendChild(document.createTextNode(i));
  ul.appendChild(li);
}

///
document.querySelector(".indicators").appendChild(ul);


////my answer

// let test = document.querySelector("#pagination-ul");
// // console.log(test.length);
// test.addEventListener("click", function (e) {
//   for (let i = 0; i < slider.length; i++) {
//     slider[i].classList.remove("active");
//   }
//   slider[e.target.getAttribute("data-index") - 1].classList.add("active");
//   for (let i = 0; i < test.children.length; i++) {
//     test.children[i].classList.remove("active");
//   }
//   slideNumber.textContent = `Slide ${e.target.getAttribute("data-index")}`;
//   e.target.classList.add("active");
// });

// more good

var createdUl = document.getElementById("pagination-ul");
var bullets = Array.from(createdUl.children);
// loop on bullets
for(i=0;i<bullets.length;i++){
  bullets[i].onclick= function(){
    currentSilde = parseInt(this.getAttribute('data-index'))
    cheker();
  }
}

cheker();

function cheker() {
  slideNumber.textContent = `Slide   ${currentSilde}  of  ${sliderLenght}`;
  removeActive();
  slider[currentSilde - 1].classList.add("active");
  createdUl.children[currentSilde - 1].classList.add("active");
  if (currentSilde == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
  if (currentSilde == sliderLenght) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
// remove all active class from all images and pagination
function removeActive() {
  slider.forEach((img) => {
    img.classList.remove("active");
  });
  Array.from(createdUl.children).forEach((li) => {
    li.classList.remove("active");
  });
}
