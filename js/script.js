// Profile info goes here
const overviewElement = document.querySelector(".overview");
const username = "Kacey-C";

// Repos unordered list
const repoListElement = document.querySelector(".repo-list");

// Display Repo Info
const repoSectionElement = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");

// ASYNC get user data
const getUserInfo = async function () {
    const getInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await getInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
getUserInfo();

// Display user data
const displayUserInfo = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add ("user-info");
    userInfo.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    overviewElement.append(userInfo);
    getRepos();
};

// ASYNC to fetch repos
const getRepos = async function() {
    const getRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getRepo.json();
    //console.log(repoData);
    displayRepoInfo(repoData);

}; 

// Display Repos
const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repos");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoListElement.append(repoItem);
    }
};

repoListElement.addEventListener ("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
       specificInfo(repoName);
    }
});

// Get specific repo info
const specificInfo = async function(repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    //console.log(repoInfo);
    
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    // language array
    languages = [];
    for (let key in languageData) {
        languages.push(key);
        //console.log(languages);
    }
    displaySpecificInfo(repoInfo, languages);
};

// Display specific repo info
const displaySpecificInfo = function(repoInfo, languages) {
    repoDataElement.innerHTML = ` `;
    repoDataElement.classList.remove("hide");
    repoListElement.classList.add ("hide");
    
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataElement.append(repoInfoDiv);
};
