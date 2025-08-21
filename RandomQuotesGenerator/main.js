// selectors
let gernerateQuote = document.getElementById("generateQuote");
let autoQuote = document.getElementById("AutoQuote");
let stopQuote = document.getElementById("StopQuote");
let circle = document.querySelector(".circle");
const info = document.querySelector(".info");
let quote = document.getElementsByClassName("quote")[0];
///
console.log(info);
async function getRandomQuote() {
  const response = await fetch("quotes.json");
  const data = await response.json();
  console.log(quote);

  gernerateQuote.onclick = () => {
    let randomIndex = Math.floor(Math.random() * data.length);
    quote.innerHTML = `"${data[randomIndex].quote}"`;
    circle.innerHTML = `${randomIndex}`;
  };
  let intervalId;
  autoQuote.onclick = () => {
    info.style.display = "block";

    intervalId = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * data.length);
      quote.innerHTML = `"${data[randomIndex].quote}"`;
      circle.innerHTML = `${randomIndex}`;
    }, 3000); // Change quote every 2 seconds
  };
    stopQuote.onclick = () => {
        info.style.display = "none";
        clearInterval(intervalId);
    };
}

getRandomQuote();
