// Profile info goes here
const overviewElement = document.querySelector(".overview");
const username = "Kacey-C";

// Repos unordered list
const repoListElement = document.querySelector(".repo-list");

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
    repoInfo(repoData);

}; 

// Display Repos
const repoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repos");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoListElement.append(repoItem);
    }
};
