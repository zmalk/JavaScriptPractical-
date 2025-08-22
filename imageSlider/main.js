let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");
let sliderItems = document.querySelectorAll(".slider img");
const imgID = document.querySelector(".img-id"); //
let gallary = document.querySelector(".gallary");
gallary.style.gridTemplateColumns = `repeat(${sliderItems.length}, 1fr)`;
let currentItem = 0;
let totalItems = sliderItems.length;

function updateSlider(n) {
  sliderItems[currentItem].classList.remove("active");
  currentItem = (n + totalItems) % totalItems;
  sliderItems[currentItem].classList.add("active");
  updateCopyImage(currentItem);
  // ✅ تحديث العنوان
  imgID.textContent = "Image " + (currentItem + 1);
}

function next() {
  updateSlider(currentItem + 1);
}
function prev() {
  updateSlider(currentItem - 1);
}

nextBtn.onclick = next;
prevBtn.onclick = prev;

sliderItems.forEach((img, index) => {
  const copyImg = img.cloneNode();
  copyImg.addEventListener("click", () => {
    updateSlider(index);
  });
  gallary.appendChild(copyImg);
});

function updateCopyImage(index) {
  gallary
    .querySelectorAll("img")
    .forEach((img, i) => img.classList.toggle("active", i === index));
}

// updateCopyImage(5);
