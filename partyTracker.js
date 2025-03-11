// Joseph Teague's Term Project
// 133JS with Ron Little
// Dungeons and Dragons Character Tracker for a full group of players

//---------------------------------------------------------------------------------------//

const characters = JSON.parse(localStorage.getItem('characters')) || [];

//---------------------------------------------------------------------------------------//

document.getElementById('characterForm').addEventListener('submit', function (event) 
{
    event.preventDefault();

    const newCharacter = 
    {
        name: document.getElementById('name').value,
        race: document.getElementById('race').value,
        class: document.getElementById('class').value,
        subClass: document.getElementById('subClass').value,
        alignment: document.getElementById('alignment').value,
        specialAbility: document.getElementById('sAbility').value,
        familiar: document.getElementById('famSel').value,
        bio: document.getElementById('bio').value,        
        stats: 
        {
          level: 1,
          strength: 3,
          dexterity: 3,
          constitution: 3,
          intelligence: 3,
          wisdom: 3,
          charisma: 3
        },
        feats: [],
        skillsSpells: [],
        inventory: [],
        equipment: 
        {
            head: "",
            body: "",
            primaryHand: "",
            offHand: "",
            feet: "",
            belt: "",
            trinket: ""
        }
    };

    characters.push(newCharacter);
    saveCharacters();
    displayCharacters();
    document.getElementById('characterForm').reset();
});
//---------------------------------------------------------------------------------------//
function saveCharacters() 
{
  localStorage.setItem('characters', JSON.stringify(characters));
}
//---------------------------------------------------------------------------------------//

function displayCharacters() 
{
    const displaySection = document.getElementById('charactersDisplay');
    displaySection.innerHTML = '';

    characters.forEach((character, index) =>  
        {
        const charBox = document.createElement('div');
        charBox.className = 'character-box';
        charBox.innerHTML = `
        <div class="character-top">
          <div class="character-info">
            <strong>Name:</strong> ${character.name}<br />
            <strong>Race:</strong> ${character.race}<br />
            <strong>Class:</strong> ${character.class} (${character.subClass})<br />
            <strong>Alignment:</strong> ${character.alignment}<br>
            <strong>Special Ability:</strong> ${character.specialAbility}<br />
            <strong>Familiar:</strong> ${character.familiar}<br />
            <strong>Bio:</strong> ${character.bio}<br />
          </div>

          <div class="stats-box">
            <h3>Stats</h3>
              <div class="stats">
                <strong>Level:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="level" class="counter-display">${character.stats.level}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Strength:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="strength" class="counter-display">${character.stats.strength}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Dexterity:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="dexterity" class="counter-display">${character.stats.dexterity}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Constitution:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="constitution" class="counter-display">${character.stats.constitution}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Intelligence:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="intelligence" class="counter-display">${character.stats.intelligence}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Wisdom:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="wisdom" class="counter-display">${character.stats.wisdom}</span> 
                  <button class="plus">+</button>
                </div>

                <strong>Charisma:</strong>
                <div class="counter">
                  <button class="minus">-</button>
                  <span data-stat-type="charisma" class="counter-display">${character.stats.charisma}</span>
                  <button class="plus">+</button>
                </div>
              </div>
          </div>

          <div class="equipment-box">
            <h3>Equipment</h3>
              <div class="equipment">
                <div class="equipment">
                <br />
                  <div class="equipment-item">
                      <strong>Head:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="head" value="${character.equipment.head || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Body:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="body" value="${character.equipment.body || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Primary Hand:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="primaryHand" value="${character.equipment.primaryHand || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Off-Hand:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="offHand" value="${character.equipment.offHand || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Feet:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="feet" value="${character.equipment.feet || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Belt:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="belt" value="${character.equipment.belt || ''}">
                  </div>
                  <div class="equipment-item">
                      <strong>Trinket:</strong> <input type="text" class="equip-input" data-index="${index}" data-slot="trinket" value="${character.equipment.trinket || ''}">
                  </div>
              </div>
            </div>
          </div>

        <div class="character-bottom">
          <div class="feats-box">
            <strong>Feats:</strong>
            <input type="text" id="featInput-${index}" placeholder="Enter a Feat">
            <button class="addFeat" data-index="${index}">Add</button>
            <ul id="featList-${index}">
                ${character.feats.map(feat => `<li>${feat} <button class="removeFeat" data-index="${index}" data-feat="${feat}">X</button></li>`).join('')}
            </ul>
          </div>

          <div class="skills-box">
            <strong>Skills & Spells:</strong>
            <input type="text" id="skillInput-${index}" placeholder="Enter a Skill or Spell">
            <button class="addSkill" data-index="${index}">Add</button>
            <ul id="skillList-${index}">
                ${character.skillsSpells.map(skill => `<li>${skill} <button class="removeSkill" data-index="${index}" data-skill="${skill}">X</button></li>`).join('')}
            </ul>
          </div>

          <div class="inventory-box">
            <strong>Inventory:</strong>
            <input type="text" id="inventoryInput-${index}" placeholder="Enter an item">
            <button class="addInventory" data-index="${index}">Add</button>
            <ul id="inventoryList-${index}">
                ${character.inventory.map(item => `<li>${item} <button class="removeInventory" data-index="${index}" data-item="${item}">X</button></li>`).join('')}
            </ul>
          </div>
        </div>
        <button class="delete-character" data-index="${index}">Delete Character (!!!WARNING!!! Once Deleted, All Data Will Be Lost And CANNOT Be Retrieved!)</button>
        `;

        displaySection.appendChild(charBox);

        charBox.querySelector('.delete-character').addEventListener('click', function () 
          {
            characters.splice(index, 1); 
            saveCharacters(); 
            displayCharacters(); 
          });
        document.querySelectorAll('.equip-input').forEach(input => 
          {
        input.addEventListener('input', function() {
            const charIndex = this.dataset.index;
            const equipSlot = this.dataset.slot;
            characters[charIndex].equipment[equipSlot] = this.value;
            saveCharacters();
          });
          });        
        const counters = charBox.querySelectorAll('.counter');
        counters.forEach(counter =>
        {
            const plusButton = counter.querySelector('.plus');
            const minusButton = counter.querySelector('.minus');
            const counterDisplay = counter.querySelector('.counter-display');
            const statType = counterDisplay.getAttribute('data-stat-type');
            plusButton.addEventListener('click', () =>
            {
                const count = characters[index].stats[statType]
                characters[index].stats[statType] = count + 1;

                saveCharacters()
                displayCharacters()
            });
            minusButton.addEventListener('click', () =>
            {
                const count = characters[index].stats[statType]
                if (count > 0)
                {
                    characters[index].stats[statType] = count - 1;

                    saveCharacters()
                    displayCharacters()
                }
            });
        });
//---------------------------------------------------------------------------------------//
    charBox.querySelector('.addFeat').addEventListener('click', () => {
      const input = document.getElementById(`featInput-${index}`);
      if (input.value.trim() !== "") {
          characters[index].feats.push(input.value.trim());
          saveCharacters();
          displayCharacters();
      }
    });

    charBox.querySelectorAll('.removeFeat').forEach(button => {
      button.addEventListener('click', function () {
          const featToRemove = this.getAttribute('data-feat');
          characters[index].feats = characters[index].feats.filter(f => f !== featToRemove);
          displayCharacters();
      });
    });
//---------------------------------------------------------------------------------------//
    charBox.querySelector('.addSkill').addEventListener('click', () => {
      const input = document.getElementById(`skillInput-${index}`);
      if (input.value.trim() !== "") {
          characters[index].skillsSpells.push(input.value.trim());
          saveCharacters();
          displayCharacters();
      }
    });

    charBox.querySelectorAll('.removeSkill').forEach(button => {
      button.addEventListener('click', function () {
          const skillToRemove = this.getAttribute('data-skill');
          characters[index].skillsSpells = characters[index].skillsSpells.filter(s => s !== skillToRemove);
          saveCharacters();
          displayCharacters();
      });
    });
//---------------------------------------------------------------------------------------//
    charBox.querySelector('.addInventory').addEventListener('click', () => {
      const input = document.getElementById(`inventoryInput-${index}`);
      if (input.value.trim() !== "") {
          characters[index].inventory.push(input.value.trim());
          saveCharacters();
          displayCharacters();
      }
    });

    charBox.querySelectorAll('.removeInventory').forEach(button => {
      button.addEventListener('click', function () {
          const itemToRemove = this.getAttribute('data-item');
          characters[index].inventory = characters[index].inventory.filter(i => i !== itemToRemove);
          saveCharacters();
          displayCharacters();
      });
    });
  });
}
//---------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------//
window.addEventListener('load', displayCharacters);