// select

const num = document.querySelector('input[type="text"]');
const but = document.querySelector(".btn");
const checkbox1 = document.querySelector("#Number");

const checkbox2 = document.querySelector("#char");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const char = "!@#$%^&*()_-+=<>?";
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three ol");

window.onload= function(){
    const stored = JSON.parse(localStorage.getItem("passw")) || []; // استرجاع المصفوفة
  const three = document.querySelector(".three ol");
  three.innerHTML = ""; // تفريغ المحتوى القديم
  x= stored.length
if(x >= 10){
  x=10
}
  for (let i = 0; i < x; i++) {
    three.innerHTML += `<li>${stored[i]}</li>`;
  }
}

but.addEventListener("click", function () {
  const number = num.value;
  const isChecked1 = checkbox1.checked;
  const isChecked2 = checkbox2.checked;

  if (isNaN(number) || number < 1 || number > 32) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Number",
      text: "Please enter a number between 1 and 32.",
      confirmButtonText: "OK",
    });
  } else {
    let multiple = "";

    if (isChecked1 && isChecked2) {
      multiple = characters + char;
    } else if (isChecked1) {
      multiple = characters;
    } else if (isChecked2) {
      multiple = char;
    } else {
      Swal.fire({
        icon: "warning",
        title: "No Option Selected",
        text: "Please check at least one option.",
        confirmButtonText: "OK",
      });
      return;
    }

    let pass = "";
    for (let i = 0; i < number; i++) {
      const index = Math.floor(Math.random() * multiple.length);
      pass += multiple[index];
    }

    three.innerHTML += `<li>
    ${pass}
    </li>`;
stored = JSON.parse(localStorage.getItem("passw")) || [];
stored.push(pass);
localStorage.setItem("passw",JSON.stringify(stored))


    one.innerHTML = pass;
    num.value = null;
    checkbox1.checked = false;
    checkbox2.checked = false;
    console.log("Generated password:", pass);
    Swal.fire({
      icon: "success",
      title: "Your Password",
      text: pass,
      confirmButtonText: "OK",
    });
  }
});
