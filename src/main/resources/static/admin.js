const url = '/api/admin';
const urlForHeader = '/api/header'
const urlForRoles = '/api/roles';

function getAuthentication() {
    fetch(urlForHeader)
        .then(response => response.json())
        .then(user => {
            const loginName = user.login;
            const roleName = user.authorities.map(r => r.roleName);
            navName.innerHTML = loginName;
            navRoles.innerHTML = roleName;
        })
}

getAuthentication()

const navName = document.getElementById('nav-name');
const navRoles = document.getElementById('nav-roles');
const usersTable = document.getElementById('myTab');
const newUsersTable = bootstrap.Tab.getOrCreateInstance(usersTable);
const tbody = document.querySelector('tbody');

let resultTable = ''
const showUsersTable = () => {
    resultTable = `<tr></tr>`
    fetch(url)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {

                resultTable += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.login}</td>
                            <td>${user.authorities.map(r => r.roleName)}</td>
                            <td><button type="submit" class="btnEdit btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                            <td class="text-center"><button type="submit" class="btnDel btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button></td>
                        </tr>`
            })
            tbody.innerHTML = resultTable
        })
}

fetch(url)
    .then(response => response.json())
    .then(data => showUsersTable(data))
    .catch(error => console.log(error))

function getAllRoles(target) {
    fetch(urlForRoles)
        .then(response => response.json())
        .then(roles => {
            let optionsRoles = ''
            roles.forEach(role => {
                optionsRoles += `<option value='${role.id}'>${role.roleName}</option>`
            })
            target.innerHTML = optionsRoles
        })
}

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    for (let i =0; i < array.length; i++) {
        console.log(array[i])
    }
    return array;
}

const refreshUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            showUsersTable(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

const editModal = document.getElementById('editModal');
const newEditModal = bootstrap.Modal.getOrCreateInstance(editModal)
const editId = document.getElementById('updateId');
const editName = document.getElementById('nameUpdate');
const editLastName = document.getElementById('lastnameUpdate');
const editAge = document.getElementById('ageUpdate');
const editLogin = document.getElementById('loginUpdate');
const editPassword = document.getElementById('passwordUpdate');
const editRole = document.getElementById('roleUpdate');

on(document, 'click', '.btnEdit', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    editId.value = target.children[0].innerHTML
    editName.value = target.children[1].innerHTML
    editLastName.value = target.children[2].innerHTML
    editAge.value = target.children[3].innerHTML
    editLogin.value = target.children[4].innerHTML
    editPassword.value = ''
    editRole.value = getAllRoles(editRole)
})

editModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#roleUpdate');
    let setRoles = roleArray(options)
    fetch(url + `/${id}`, {
        method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            id: editId.value,
            name: editName.value,
            lastName: editLastName.value,
            age: editAge.value,
            login: editLogin.value,
            password: editPassword.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    newEditModal.hide()
})

const deleteModal = document.getElementById('deleteModal');
const newDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal);
const deleteId = document.getElementById('idD');
const deleteName = document.getElementById('nameD');
const deleteLastName = document.getElementById('lastnameD');
const deleteAge = document.getElementById('ageD');
const deleteLogin = document.getElementById('loginD');
const deleteRole = document.getElementById('roleD');

on(document, 'click', '.btnDel', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    deleteId.value = target.children[0].innerHTML
    deleteName.value = target.children[1].innerHTML
    deleteLastName.value = target.children[2].innerHTML
    deleteAge.value = target.children[3].innerHTML
    deleteLogin.value = target.children[4].innerHTML
})

deleteModal.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + `/${id}`, {
        method: 'DELETE',
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    newDeleteModal.hide()
})

const newUser = document.getElementById('newUser');
const name = document.getElementById('addName');
const lastName = document.getElementById('addLastName');
const age = document.getElementById('addAge');
const login = document.getElementById('addLogin');
const password = document.getElementById('addPassword');
const roles = document.getElementById('addRoles');


getAllRoles(roles)
newUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#addRoles');
    let setRoles = roleArray(options)
    fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            name: name.value,
            lastName: lastName.value,
            age: age.value,
            login: login.value,
            password: password.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    document.getElementById('nav-users-tab').click()
})