let today = new Date().toISOString().split("T")[0];

// نعينه كـ "min" لحقل التاريخ
document.getElementById("inputField3").setAttribute("min", today);

/// selectors all main side in this app

let eventName = document.getElementById("inputField");
let eventOrg = document.getElementById("inputField2");
let eventDate = document.getElementById("inputField3");
let deleteBtn = document.querySelector(".bt2");
let addBtn = document.querySelector(".bt");
let box = document.querySelector(".box");

let days, hours, minutes, seconds;

addBtn.addEventListener("click", function () {
  if (
    eventName.value === "" ||
    eventOrg.value === "" ||
    eventDate.value === ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields before submitting.",
      confirmButtonText: "OK",
    });
    return;
  }

  let selectedDate = new Date(eventDate.value);

  // نضيف السلايد
  let slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `
      <h4>${eventName.value}</h4>
      <div>
          <p>BY</p>
          <p class="name">${eventOrg.value}</p>
      </div>
      <div>
          <p>ON</p>
          <p class="date">${eventDate.value}</p>
      </div>
      <div>
          <p>Time left</p>
          <p class="timeLeft"></p>
      </div>
      <button class="bt2">Delete Event</button>
  `;

  box.appendChild(slide);

  // نبدأ العداد لهذا السلايد
  let timeLeftEl = slide.querySelector(".timeLeft");

  function updateCountdown() {
    let now = new Date();
    let diff = selectedDate - now;

    if (diff <= 0) {
      timeLeftEl.textContent = "Event Passed!";
      clearInterval(timer); // نوقف العداد
      return;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timeLeftEl.textContent = `${days}d ${hours}h ${minutes}min ${seconds}sec`;
  }

  updateCountdown(); // أول تحديث مباشر
  let timer = setInterval(updateCountdown, 1000);

  // نفرغ الحقول
  eventName.value = "";
  eventOrg.value = "";
  eventDate.value = "";
});


box.addEventListener("click", function (e) {
  if (e.target.classList.contains("bt2")) {
    e.target.parentElement.remove(); // حذف السلايد اللي يحتوي الزر
  }
});
// lets deal with local storage


