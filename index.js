var renderers = {

};

var mainElement = document.querySelector('main');


/*      Main Pager Navigation     */


function createPagerNav(data, renderList) {
    var navElement = document.createElement('nav');

    if (data.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(data.previous, renderList);
        });
        navElement.appendChild(prevButton);
    }

    if (data.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(data.next, renderList);
        });
        navElement.appendChild(nextButton);
    }
    mainElement.appendChild(navElement);
}


/*      Render Cards     */


function renderCards(data, renderItem) {
    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards')

    data.results.forEach(function(object) {
        var sectionElement = document.createElement('section');
        renderItem(sectionElement, object);
        cardsElement.appendChild(sectionElement);
    });

    mainElement.appendChild(cardsElement);
}


/*      Load Data     */



function loadData(url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        done(response);
    };
    xhr.send();
}


/*      Render Menu     */


function renderMenu(data) {
    var menuElement = document.querySelector('body > header ul');
    var keys = Object.keys(data);
    keys.forEach(function(key) {
        var listElement = document.createElement('li');
        var linkElement = document.createElement('a');
        linkElement.textContent = key;
        linkElement.addEventListener('click', function() {
            if (!renderers[key]) return renderUnimplemented();
            loadData(data[key], renderers[key]);
        });

        listElement.appendChild(linkElement);
        menuElement.appendChild(listElement);
    });
}


/*      Load People    */


function loadPeople(done) {
    loadData('https://swapi.co/api/people', done);
}

/*      Load Planet     */

function loadPlanet(url, done) {
    loadData(url, done);
}


/*      Render People     */


function renderPeople(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderPeople);
    renderCards(data, function(sectionElement, person) {
        var genderSymbol;
        switch (person.gender) {
            case 'male':
                genderSymbol = '♂';
                break;
            case 'female':
                genderSymbol = '♀';
                break;
            default:
                genderSymbol = '?';
        }

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${person.name}
            <span class="gender" title="Gender: ${person.gender}">${genderSymbol}</span>
          </h1>
        </header>
        <button>Homeworld</button>
        <div>
          <ul>
            <li>
              <span class="label">Height</span>
              <span class="value">${person.height}</span>
            </li>
            <li>
              <span class="label">Mass</span>
              <span class="value">${person.mass}</span>
            </li>
            <li>
              <span class="label">Skin Color</span>
              <span class="value">${person.skin_color}</span>
            </li>
            <li>
              <span class="label">Eye Color</span>
              <span class="value">${person.eye_color}</span>
            </li>
            <li>
              <span class="label">Birth Year</span>
              <span class="value">${person.birth_year}</span>
            </li>
            
            <li>
              <span class="label">Hair Color</span>
              <span class="value">${person.hair_color}</span>
            </li>             
         </ul>
       </div>
            `;

        sectionElement
            .querySelector('button')
            .addEventListener('click', function() {
                loadPlanet(person.homeworld, renderPlanet);
            });

    });
}

renderers.people = renderPeople;


/*      Create modal    */


function createModal() {
    var element = document.createElement('div');
    element.classList.add('modal');
    element.innerHTML = `<div class="body">
                          <div class="controls">
                           <button>close</button></div>
                          <div class="content"></div>
                        </div>
                        <div class="underlay"></div>`;
    return element;
}


/*      Show modal     */


function showModal(contentElement) {
    modalContentElement.innerHTML = '';
    modalContentElement.appendChild(contentElement);
    modalElement.classList.add('open');
}


/*      hide modal     */


function hideModal() {
    modalElement.classList.remove('open');
}


var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);


/*      Render Planet for modal    */


function renderPlanet(planet) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('planet');
    sectionElement.innerHTML = `
        <div>
         <header>
          <h1>
            ${planet.name}
          </h1>
         </header>
          <ul>
            <li>
              <span class="label">Rotation Period</span>
              <span class="value">${planet.rotation_period}</span>
            </li>
            <li>
              <span class="label">Orbital Period</span>
              <span class="value">${planet.orbital_period}</span>
            </li>
            <li>
              <span class="label">Diameter</span>
              <span class="value">${planet.diameter}</span>
            </li>
            <li>
              <span class="label">Climate</span>
              <span class="value">${planet.climate}</span>
            </li>
            <li>
              <span class="label">Gravity</span>
              <span class="value">${planet.gravity}</span>
            </li>
            <li>
              <span class="label">Terrain</span>
              <span class="value">${planet.terrain}</span>
            </li>
             <li>
              <span class="label">Surface Water</span>
              <span class="value">${planet.surface_water}</span>
            </li>
            <li>
              <span class="label">Population</span>
              <span class="value">${planet.population}</span>
            </li>
        </ul>
      </div>`;
    showModal(sectionElement);
}


/*      Render Planets     */


function renderPlanets(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderFilms);

    renderCards(data, function(sectionElement, planet) {

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${planet.name}
          </h1>
        </header>
       
        <div>
         <ul>
            <li>
              <span class="label">Rotation Period</span>
              <span class="value">${planet.rotation_period}</span>
            </li>
            <li>
              <span class="label">Orbital Period</span>
              <span class="value">${planet.orbital_period}</span>
            </li>
            <li>
              <span class="label">Diameter</span>
              <span class="value">${planet.diameter}</span>
            </li>
            <li>
              <span class="label">Climate</span>
              <span class="value">${planet.climate}</span>
            </li>
            <li>
              <span class="label">Gravity</span>
              <span class="value">${planet.gravity}</span>
            </li>
            <li>
              <span class="label">Terrain</span>
              <span class="value">${planet.terrain}</span>
            </li>
             <li>
              <span class="label">Surface Water</span>
              <span class="value">${planet.surface_water}</span>
            </li>
            <li>
              <span class="label">Population</span>
              <span class="value">${planet.population}</span>
            </li>
        </ul>
       </div>
            `;
    });
}

renderers.planets = renderPlanets;


/*      Render Films     */


function renderFilms(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderFilms);

    renderCards(data, function(sectionElement, film) {

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${film.title}
          </h1>
        </header>
     
        <div>
         <ul>
            <li>
              <span class="label">Episode ID</span>
              <span class="value">${film.episode_id}</span>
            </li>
            <li>
              <span class="label">Opening Crawl</span>
              <span class="value">${film.opening_crawl}</span>
            </li>
            <li>
              <span class="label">Director</span>
              <span class="value">${film.director}</span>
            </li>
            <li>
              <span class="label">Producer</span>
              <span class="value">${film.producer}</span>
            </li>
            <li>
              <span class="label">Release Date</span>
              <span class="value">${film.release_date}</span>
            </li>
          </ul>
        </div>
            `;
    });
}

renderers.films = renderFilms;


/*      Render Species     */


function renderSpecies(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderSpecies);

    renderCards(data, function(sectionElement, specie) {

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${specie.name}
          </h1>
        </header>
       <button>Homeworld</button>
        <div>
         <ul>
            <li>
              <span class="label">Classification</span>
              <span class="value">${specie.classification}</span>
            </li>
            <li>
              <span class="label">Designation</span>
              <span class="value">${specie.designation}</span>
            </li>
            <li>
              <span class="label">Average Height</span>
              <span class="value">${specie.average_height}</span>
            </li>
            <li>
              <span class="label">Skin Colors</span>
              <span class="value">${specie.skin_colors}</span>
            </li>
            <li>
              <span class="label">Hair Colors</span>
              <span class="value">${specie.hair_colors}</span>
            </li>
            <li>
              <span class="label">Eye Colors</span>
              <span class="value">${specie.eye_colors}</span>
            </li>
             <li>
              <span class="label">Average Lifespan</span>
              <span class="value">${specie.average_lifespan}</span>
            </li>
            <li>
              <span class="label">Population</span>
              <span class="value">${specie.population}</span>
            </li>
        </ul>
       </div>
            `;

        sectionElement.querySelector('button')
            .addEventListener('click', function() {
                loadPlanet(specie.homeworld, renderPlanet);
            });

    });
}

renderers.species = renderSpecies;


/*      Render Vehicles     */


function renderVehicles(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderVehicles);

    renderCards(data, function(sectionElement, vehicle) {

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${vehicle.name}
          </h1>
        </header>
        <div>
         <ul>
            <li>
              <span class="label">Model</span>
              <span class="value">${vehicle.model}</span>
            </li>
            <li>
              <span class="label">Manufacturer</span>
              <span class="value">${vehicle.manufacturer}</span>
            </li>
            <li>
              <span class="label">Cost in Credits</span>
              <span class="value">${vehicle.cost_in_credits}</span>
            </li>
            <li>
              <span class="label">Length</span>
              <span class="value">${vehicle.length}</span>
            </li>
            <li>
              <span class="label">Max Atmosphering Speed</span>
              <span class="value">${vehicle.max_atmosphering_speed}</span>
            </li>
            <li>
              <span class="label">Crew</span>
              <span class="value">${vehicle.crew}</span>
            </li>
             <li>
              <span class="label">Passengers</span>
              <span class="value">${vehicle.passengers}</span>
            </li>
            <li>
              <span class="label">Cargo Capacity</span>
              <span class="value">${vehicle.cargo_capacity}</span>
            </li>
             <li>
              <span class="label">Consumables</span>
              <span class="value">${vehicle.consumables}</span>
            </li>
            <li>
              <span class="label">Vehicle Class</span>
              <span class="value">${vehicle.vehicle_class}</span>
            </li>
        </ul>
       </div>
            `;
    });

}

renderers.vehicles = renderVehicles;


/*      Render Starships     */


function renderStarships(data) {
    mainElement.innerHTML = '';
    createPagerNav(data, renderStarships);

    renderCards(data, function(sectionElement, starship) {

        sectionElement.innerHTML = `
        <header>
          <h1>
            ${starship.name}
          </h1>
        </header>
        <div>
         <ul>
            <li>
              <span class="label">Model</span>
              <span class="value">${starship.model}</span>
            </li>
            <li>
              <span class="label">Manufacturer</span>
              <span class="value">${starship.manufacturer}</span>
            </li>
            <li>
              <span class="label">Cost in Credits</span>
              <span class="value">${starship.cost_in_credits}</span>
            </li>
            <li>
              <span class="label">Length</span>
              <span class="value">${starship.length}</span>
            </li>
            <li>
              <span class="label">Max Atmosphering Speed</span>
              <span class="value">${starship.max_atmosphering_speed}</span>
            </li>
            <li>
              <span class="label">Crew</span>
              <span class="value">${starship.crew}</span>
            </li>
             <li>
              <span class="label">Passengers</span>
              <span class="value">${starship.passengers}</span>
            </li>
            <li>
              <span class="label">Cargo Capacity</span>
              <span class="value">${starship.cargo_capacity}</span>
            </li>
             <li>
              <span class="label">Consumables</span>
              <span class="value">${starship.consumables}</span>
            </li>
            <li>
              <span class="label">Hyperdrive Rating</span>
              <span class="value">${starship.hyperdrive_rating}</span>
            </li>
             <li>
              <span class="label">MGLT</span>
              <span class="value">${starship.MGLT}</span>
            </li>
            <li>
              <span class="label">starship Class</span>
              <span class="value">${starship.vehicle_class}</span>
            </li>
        </ul>
       </div>
            `;
    });
}

renderers.starships = renderStarships;


/*      Render Unimplemented when ther's no data     */


function renderUnimplemented() {
    mainElement.innerHTML = "Sorry, this is not implemented yet.";
}


loadPeople(renderPeople);


loadData('https://swapi.co/api/', renderMenu);