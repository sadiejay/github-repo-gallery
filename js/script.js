// selects overview div
const overview = document.querySelector('.overview');

// github username
const username = 'sadiejay';

// fetches github API JSON Data
const getData = async function (){
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
};
getData();