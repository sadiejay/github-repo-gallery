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
// Selects the back to repo gallery button
const button = document.querySelector('.view-repos');

// Selects the input with placeholder
const filterInput = document.querySelector('.filter-repos');
// fetches github API JSON Data
const getData = async function (){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayInfo(data);
};
getData();

// displays JSON data in div + search function
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
// getRepoData();

// displays Repo Info
const repoInfo = function (repos) {
    filterInput.classList.remove('hide'); 
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
    displayRepoItem(repoInfo, languages);
}

const displayRepoItem = function (repoInfo, languages) {
    repoDataSection.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(div);
    repoDataSection.classList.remove('hide');
    repoSection.classList.add('hide');
    button.classList.remove('hide');
};

// adds click event to back button
button.addEventListener('click', function () {
    repoSection.classList.remove('hide');    repoDataSection.classList.add('hide');
    button.classList.add('hide');

})

filterInput.addEventListener('input', function (e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll('.repo');
    const lowercase = searchText.toLowerCase();
    for (const repo of repos) {
        const repoLowercase = repo.innerText.toLowerCase();
        if (repoLowercase.includes(lowercase)) {
            repo.classList.remove('hide');
          } else {
            repo.classList.add('hide');
          }
    }
})