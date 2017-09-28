var renderers = {

};

var mainElement = document.querySelector('main');


function loadData(url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        done(response);
    };
    xhr.send();
}


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


loadData('https://swapi.co/api/', renderMenu);


function loadPeople(done) {
    loadData('https://swapi.co/api/people', done);
}


function loadPlanet(url, done) {
    loadData(url, done);
}


function renderPeople(people) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (people.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(people.previous, renderPeople);
        });
        navElement.appendChild(prevButton);
    }

    if (people.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(people.next, renderPeople);
        });
        navElement.appendChild(nextButton);
    }

    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);

    people.results.forEach(function(person) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('person');

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

        cardsElement.appendChild(sectionElement);

    });
}

renderers.people = renderPeople;


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


function showModal(contentElement) {
    modalContentElement.innerHTML = '';
    modalContentElement.appendChild(contentElement);
    modalElement.classList.add('open');
}


function hideModal() {
    modalElement.classList.remove('open');
}


var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);


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


loadPeople(renderPeople);


function renderPlanets(planets) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (planets.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(planets.previous, renderPlanets);
        });
        navElement.appendChild(prevButton);
    }

    if (planets.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(planets.next, renderPlanets);
        });
        navElement.appendChild(nextButton);
    }


    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);


    planets.results.forEach(function(planet) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('planet');


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

        cardsElement.appendChild(sectionElement);

    });
}

renderers.planets = renderPlanets;


function renderFilms(films) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (films.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(films.previous, renderFilms);
        });
        navElement.appendChild(prevButton);
    }

    if (films.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(films.next, renderFilms);
        });
        navElement.appendChild(nextButton);
    }


    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);


    films.results.forEach(function(film) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('film');


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

        cardsElement.appendChild(sectionElement);

    });

}

renderers.films = renderFilms;


function renderSpecies(species) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (species.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(species.previous, renderSpecies);
        });
        navElement.appendChild(prevButton);
    }

    if (species.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(species.next, renderSpecies);
        });
        navElement.appendChild(nextButton);
    }


    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);


    species.results.forEach(function(specie) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('specie');


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

        cardsElement.appendChild(sectionElement);

    });

}

renderers.species = renderSpecies;


function renderVehicles(vehicles) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (vehicles.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(vehicles.previous, renderVehicles);
        });
        navElement.appendChild(prevButton);
    }

    if (vehicles.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(vehicles.next, renderVehicles);
        });
        navElement.appendChild(nextButton);
    }


    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);


    vehicles.results.forEach(function(vehicle) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('vehicle');


        sectionElement.innerHTML = `
        <header>
          <h1>
            ${vehicle.name}
          </h1>
        </header>
       <button>Homeworld</button>
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
        cardsElement.appendChild(sectionElement);

    });

}

renderers.vehicles = renderVehicles;


function renderStarships(starships) {
    mainElement.innerHTML = '';
    var navElement = document.createElement('nav');
    if (starships.previous) {
        var prevButton = document.createElement('button');
        prevButton.classList.add('previous');
        prevButton.textContent = 'Previous';

        prevButton.addEventListener('click', function() {
            loadData(starships.previous, renderStarships);
        });
        navElement.appendChild(prevButton);
    }

    if (starships.next) {
        var nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.textContent = 'Next';

        nextButton.addEventListener('click', function() {
            loadData(starships.next, renderStarships);
        });
        navElement.appendChild(nextButton);
    }


    var cardsElement = document.createElement('div');
    cardsElement.classList.add('cards');

    mainElement.appendChild(cardsElement);
    mainElement.appendChild(navElement);


    starships.results.forEach(function(starship) {
        var sectionElement = document.createElement('section');
        sectionElement.classList.add('starship');


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
        cardsElement.appendChild(sectionElement);

    });

}

renderers.starships = renderStarships;

function renderUnimplemented() {
    mainElement.innerHTML = "Sorry, this is not implemented yet.";
}