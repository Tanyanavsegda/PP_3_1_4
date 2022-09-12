const url = '/api/user';
const urlHeader = '/api/header';
const header = document.getElementById('nav-name');
const headerRoles = document.getElementById('nav-roles');
const tBody = document.querySelector('tbody');
let result = '';

function getAuthenticationForUserPage() {
    fetch(urlHeader)
        .then(res => res.json())
        .then(user => {
            const loginName = user.login;
            const roleName = user.roles.map(r => r.roleName);
            header.innerHTML = loginName;
            headerRoles.innerHTML = roleName;
        })
}

getAuthenticationForUserPage()

const showTable = (user) => {
    result += `<tr>
        <td>${user.id}</td>   
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.login}</td>
        <td>${user.roles.map(r => r.roleName)}</td>
        </tr>`
    tBody.innerHTML = result
}

fetch(url)
    .then(response => response.json())
    .then(data => showTable(data))
    .catch(error => console.log(error))