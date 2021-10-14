// selects overview div
const overview = document.querySelector('.overview');

// github username
const username = 'sadiejay';

// fetches github API JSON Data
const getData = async function (){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayInfo(data);
};
getData();

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
  };