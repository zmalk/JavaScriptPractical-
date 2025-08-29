const api = "4d384ec1c3954ef6b7dd90ab048918a9";
const pageSize = 10;

function getNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}&pageSize=${pageSize}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      displayNews(data.articles);
    })
    .catch((error) => console.log(error));
}

function displayNews(articles) {
  const newsList = document.querySelector(".news-list");
  newsList.innerHTML = "";
  articles.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="info">
    <div class="author" > 
    <span>Author</span>
  ${element.author || "UnKnown"}
    </div>
    <div class = "publish">${new Date(element.publishedAt).toDateString()} 
    </div>
     </div>
    <img src = "${element.urlToImage}" alt="${element.title}"</img>
    <a  class ='tittle' href ="${element.url}" target = "_blank">${element.title}</a>
    <p class ="des">${element.description}</p> 
    <div class = 'source'>
    <span>[Source]</span>
    ${element.source.name}
    </div>
    `;
    newsList.appendChild(listItem);
  });
}

window.onload = getNews();
