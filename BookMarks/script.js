/// main

let websiteName = document.querySelector(".web-name");
let websiteUrl = document.querySelector(".web-url");
let catagoryName = document.querySelector(".newCatagory");
let addBtn = document.querySelector(".add-btn");
let catagList = document.querySelector(".catag");
let filtterList = document.querySelector(".specific-catagory");
let webList = document.querySelector(".filtter");
let deleteBtn = document.querySelector(".delete");
let listObj = {};

addBtn.addEventListener("click", function () {
  if (
    websiteName.value === "" ||
    websiteUrl.value === "" ||
    catagoryName.value === ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields before submitting.",
      confirmButtonText: "OK",
    });
    return;
  }

  webList.innerHTML += `
             <div class="box ${catagoryName.value}">
                <p>${websiteName.value}</p>
                <a href="${websiteUrl.value}" target ="_blank">${websiteUrl.value}</a>
                <button class="delete">Delete</button>
            </div>
`;

  listObj[catagoryName.value] = (listObj[catagoryName.value] || 0) + 1;

  catagList.innerHTML += `
    <span class=${catagoryName.value}>${catagoryName.value}</span>
`;
  filtterList.innerHTML += `
        <span class=${catagoryName.value}>${catagoryName.value}</span>
    `;
  // listObj[`${catagoryName.value}`] = document.querySelectorAll(`.box.${catagoryName.value}`).length;
  // console.log(document.querySelectorAll(`.box.${catagoryName.value}`).length);
  // console.log(listObj);

  let catagSpan = document.querySelectorAll(".catag span");
  for (let i = 0; i < catagSpan.length; i++) {
    for (let j = i + 1; j < catagSpan.length; j++) {
      if (catagSpan[i].className === catagSpan[j].className) {
        catagSpan[j].remove();
      }
    }
  }
  catagSpan.forEach((e) => {
    e.addEventListener("click", function () {
      catagoryName.value = e.className;
    });
  });


  let filtterSpan = document.querySelectorAll(".specific-catagory span");
  for (let i = 0; i < filtterSpan.length; i++) {
    for (let j = i + 1; j < filtterSpan.length; j++) {
      if (filtterSpan[i].className === filtterSpan[j].className) {
        filtterSpan[j].remove();
      }
    }
  }

  filtterSpan.forEach((e) => {
    e.addEventListener("click", function () {
      let allBox = document.querySelectorAll(".box");
      allBox.forEach((box) => {
        if (box.classList.contains(e.className)) {
          box.style.display = "flex";
        } else {
          box.style.display = "none";
        }
      });
    });
  });
  console.log(listObj);

  websiteName.value = "";
  websiteUrl.value = "";
  catagoryName.value = "";
});

webList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const box = e.target.parentElement;
    const category = box.className.split(" ")[1]; // استخراج اسم الكاتيغوري    box.remove();
    box.remove();
    listObj[category] = Math.max(0, (listObj[category] || 1) - 1);
    Object.keys(listObj).forEach((key) => {
      if (listObj[key] === 0) {
        const spansToRemove = document.querySelectorAll(`.${key}`);
        spansToRemove.forEach((span) => span.remove());
        delete listObj[key];
      }
    });
  }
});
