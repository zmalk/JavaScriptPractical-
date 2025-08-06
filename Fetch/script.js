// Main var
let theInput = document.querySelector("input");
let theButton = document.querySelector(".fetch-btn");
let repoData = document.querySelector(".show-data");
// Function to fetch data

theButton.addEventListener("click", function () {
  if (theInput.value == "") {
    // Swal.fire({
    //   icon: "info", // أو 'warning' إذا حابب
    //   text: "Please write a task",
    //   toast: true,
    //   position: "center",
    //   showConfirmButton: false,
    //   timer: 2000,
    //   timerProgressBar: true,
    // });
    repoData.innerHTML = "<span class='not-found'>Please write a task</span>";
  }
  else{
    fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response) => {
      return response.json();
    }).then((data) => { 
        repoData.innerHTML = "";
        // loop on data
        data.forEach((repo) => {
          repoData.innerHTML += `
            <div class="repo">
              <h3>${repo.name}</h3>
              <p>${repo.description ? repo.description : "No description"}</p>
              <span>Stars: ${repo.stargazers_count}</span>
              <span>Forks: ${repo.forks_count}</span>
              <a href="${repo.html_url}" target="_blank">Visit Repo</a>
            </div>
          `;
        });
      // console.log(data);
    })
  }
});

function getRepos() {
}
