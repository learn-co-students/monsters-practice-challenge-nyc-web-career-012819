function postData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
}

function renderMonsters(monsters) {
    monstersContainerDiv.innerHTML = ""
    if (monsters.length === 0) {
        lastPage = currentPage
    } else {
        for (monster in monsters) {
            monstersContainerDiv.innerHTML += `
                <div>
                    <h2>${monsters[monster].name}</h2>
                    <h4>Age: ${monsters[monster].age}</h4>
                    <p>Bio: ${monsters[monster].description}</p>
                </div>`
        }
    }
}


let currentPage = 1
let lastPage

function fetchMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(apiData => renderMonsters(apiData))
}

const monstersContainerDiv = document.querySelector("#monster-container")
const createMonsterDiv = document.querySelector("#create-monster")
const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")

createMonsterDiv.innerHTML = `
    <form id="monster-form">
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button id="submit-btn">Create</button>
    </form>`

const submitBtn = document.querySelector("#submit-btn")
submitBtn.addEventListener("click", () => {
    postData(`http://localhost:3000/monsters`, {
        name: `${document.querySelector("#name").value}`,
        age: `${document.querySelector("#age").value}`,
        description: `${document.querySelector("#description").value}`
        })
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error(error)) 
})

forwardButton.addEventListener('click', function() {
    if (currentPage !== lastPage) {
        fetchMonsters(++currentPage)
    }
})

backButton.addEventListener('click', function() {
    if (--currentPage === 0) {
        currentPage = 1
    }
    fetchMonsters(currentPage)
})

fetchMonsters(currentPage)