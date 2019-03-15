document.addEventListener('DOMContentLoaded', function() {

  const allMonstersDiv = document.getElementById('monster-container');
  const forwardBtn = document.getElementById('forward');
  const backBtn = document.getElementById('back');
  const monsterForm = document.getElementById('create-monster');
  const submitButton = document.getElementById('submit-button');

  let counter = 1;


  fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(function(response) {
      return response.json();
    })
    .then(function(monsters) {
      monsters.forEach(function(monster) {
        allMonstersDiv.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
      })
    })


  forwardBtn.addEventListener('click', function() {
    allMonstersDiv.innerHTML = '';
    counter++;
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(monsters) {
        monsters.forEach(function(monster) {
          allMonstersDiv.innerHTML += `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>Bio: ${monster.description}</p>
          `
        })
    })
  })

  backBtn.addEventListener('click', function() {
    allMonstersDiv.innerHTML = '';
    counter--;
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(monsters) {
        monsters.forEach(function(monster) {
          allMonstersDiv.innerHTML += `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>Bio: ${monster.description}</p>
          `
        })
    })
  })

  monsterForm.addEventListener('click', (e) => {
      e.preventDefault();
      let newMonsterName = document.getElementById('name').value
      let newMonsterAge = document.getElementById('age').value
      let newMonsterDesc = document.getElementById('description').value

      if (e.target.tagName === 'BUTTON') {

        fetch('http://localhost:3000/monsters', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: newMonsterName, age: newMonsterAge, description: newMonsterDesc})
        })
        .then(function(resp) {
          return resp.json()
        }).then(function(jsonResp) {
          allMonstersDiv.innerHTML += `
          <div>
            <h2>${jsonResp.name}</h2>
            <h4>${jsonResp.age}</h4>
            <p>${jsonResp.description}</p>
          </div>
          `
        })
      }
    })



})
