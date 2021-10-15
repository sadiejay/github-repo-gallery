// selects overview div
const overview = document.querySelector('.overview');

// github username
const username = 'sadiejay';

// selects unordered repo list
const repoList = document.querySelector('.repo-list');

// defines sort
const sort = 'updated';

// defines per page
const perPage = 100;

// selects repo section where repo info appears
const repoSection = document.querySelector('.repos');
 
// selects section where individual repo data appears
const repoDataSection = document.querySelector('.repo-data');

// fetches github API JSON Data
const getData = async function (){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayInfo(data);
};
getData();

// displays JSON data in div
const displayInfo = function (data) {
    let userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(userInfo);
  getRepoData();
  };

//  fetches repos with API
const getRepoData = async function (){
    // const resRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const resRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${perPage}`);
    let dataRepo = await resRepo.json();
    console.log(dataRepo);
    repoInfo (dataRepo);
};
getRepoData();

// displays Repo Info
const repoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement('li');
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
}

// click event listener
repoList.addEventListener('click', function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
        getRepoItem(repoName);
    }
});

const getRepoItem = async function (repoName) {
    const fetchRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);
    // array of languages
    const fetchLanguages = await fetch (repoInfo.languages_url)
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    let languages = [];
    for (const language in languageData) {
        languages.push(language);
        // console.log(languages);

    }
}