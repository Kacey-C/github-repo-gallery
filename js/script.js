// Profile info goes here
const overviewElement = document.querySelector(".overview");
const username = "Kacey-C";

// ASYNC get user data
const getUserInfo = async function () {
    const getInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await getInfo.json();
    console.log(data);
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
};
