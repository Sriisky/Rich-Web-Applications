document.addEventListener("DOMContentLoaded", () => {
    const GithubUsername = document.getElementById("GithubUsername");
    const searchButton = document.getElementById("searchButton");
    const userInfo = document.getElementById("userInfo");
    const repoList = document.getElementById("repoList");

    searchButton.addEventListener("click", () => {
        const username = GithubUsername.value.trim(); //remove whitespaces
        if (username === "") {
            alert("You must enter a GitHub GithubUsername");
            return;
        }

        //make a request to the GitHub API to fetch the users data
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (response.status === 404) {
                    throw new Error("User not found");
                }
                return response.json();
            })

            .then((userData) => {
                userInfo.innerHTML = `
                    <h2>User Profile</h2>
                    <img src="${userData.avatar_url}" alt="Profile picture" width="220em" height="200em">
                    <p>Name: ${userData.name}</p>
                    <p>Username: ${userData.login}</p>
                    <p>Email: ${userData.email || "Not available"}</p>
                    <p>Location: ${userData.location || "Not available"}</p>
                    <p>Number of Gists: ${userData.public_gists}</p>
                `;

                //request user's repositories
                return fetch(`https://api.github.com/users/${username}/repos`);
            })
            .then((response) => response.json())
            .then((repos) => {

                repoList.innerHTML = "<h2>User Repos</h2>";
                if (repos.length > 5) {
                    repoList.style.maxHeight = "400px"; //set a max height
                    repoList.style.overflowY = "auto";   //add a scrollbar
                }

                repos.forEach((repo) => {
                    repoList.innerHTML += `
                        <p>Name: ${repo.name}</p>
                        <p>Description: ${repo.description || "No description available"}</p>
                        <hr>
                    `;
                });
            })
            
            .catch((error) => {
                userInfo.innerHTML = `<p>${error.message}</p>`;
                repoList.innerHTML = "";
            });
    });
});