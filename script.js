mapboxgl.accessToken = "pk.eyJ1IjoiYmhhcnRpbmlzaGFkIiwiYSI6ImNtMXZvMXM4bzAzMW4yanM5YWE4ejBha2QifQ.gCsQT1rPNOBMP25JQdLcfg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

let currentCoordinates;
let selectedPlaceType = 'restaurant'; 
let currentMode = 'driving'; 
let map; 

function successLocation(position) {
    currentCoordinates = [position.coords.longitude, position.coords.latitude];
    setupMap(currentCoordinates);
}

function errorLocation() {
    currentCoordinates = [77.2090, 28.6139]; 
    setupMap(currentCoordinates);
}

function setupMap(center) {
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: center,
        zoom: 8
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
    });

    map.addControl(directions, "top-left");

    directions.on('route', (event) => {
        const route = event.route[0];
        const distance = (route.distance / 1000).toFixed(2);
        const duration = (route.duration / 60).toFixed(2);
        document.getElementById('distance-output').innerHTML = `Distance: ${distance} km, Duration: ${duration} minutes (${currentMode})`;
    });

    document.getElementById('search-button').addEventListener('click', () => {
        const locationName = document.getElementById('location-input').value.trim();
        if (locationName) {
            fetchLocationCoordinates(locationName)
                .then(coordinates => {
                    currentCoordinates = coordinates; 
                    map.setCenter(coordinates); 

                    // Add a marker for the searched location
                    new mapboxgl.Marker()
                        .setLngLat(coordinates)
                        .addTo(map);

                    findNearbyPlaces(coordinates, selectedPlaceType); 
                    fetchWeatherData(coordinates); 
                })
                .catch(error => console.error('Error fetching location:', error));
        } else {
            alert('Please enter a location name.');
        }
    });

    // Set up event listeners for place type tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            selectedPlaceType = e.target.getAttribute('data-place-type');
            if (currentCoordinates) {
                findNearbyPlaces(currentCoordinates, selectedPlaceType); 
            }
        });
    });

    // Set up event listeners for transportation modes
    document.getElementById('driving-mode').addEventListener('click', () => {
        currentMode = 'driving';
        directions.setProfile('mapbox/driving');
    });

    document.getElementById('walking-mode').addEventListener('click', () => {
        currentMode = 'walking';
        directions.setProfile('mapbox/walking');
    });

    document.getElementById('cycling-mode').addEventListener('click', () => {
        currentMode = 'cycling';
        directions.setProfile('mapbox/cycling');
    });
}

// Function to fetch coordinates of a given location using Mapbox Geocoding API
function fetchLocationCoordinates(locationName) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${mapboxgl.accessToken}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                return data.features[0].geometry.coordinates;
            } else {
                throw new Error('Location not found.');
            }
        });
}

// Function to find nearby places based on user input using Foursquare Places API
function findNearbyPlaces(coordinates, placeType) {
    const foursquareApiKey = 'fsq3zYeufRE+hcfScZ6wlD46Ail7znx3UO2/Sc/7z+0vFdo='; 
    const url = `https://api.foursquare.com/v3/places/search?ll=${coordinates[1]},${coordinates[0]}&query=${placeType}&radius=1500`;

    fetch(url, {
        headers: {
            'Authorization': foursquareApiKey,
        }
    })
    .then(response => response.json())
    .then(data => {
        // Clear existing markers before adding new ones
        const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
        existingMarkers.forEach(marker => marker.remove());

        const nearbyList = document.getElementById('nearby-list');
        nearbyList.innerHTML = ''; 

        const markers = [];

        data.results.forEach((place) => {
            const marker = new mapboxgl.Marker()
                .setLngLat([place.geocodes.main.longitude, place.geocodes.main.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3><p>${place.location.address}</p>`))
                .addTo(map);

               // Store the marker in the array
                markers.push(marker);
    
                // Add to nearby list and create a clickable div for each place
                const placeDiv = document.createElement('div');
                placeDiv.innerHTML = `${place.name} - ${place.location.address}`;
                placeDiv.className = 'place-item';
                nearbyList.appendChild(placeDiv);
    
            
                placeDiv.addEventListener('click', () => {
                    // Center the map on the selected place
                    map.flyTo({
                        center: [place.geocodes.main.longitude, place.geocodes.main.latitude],
                        zoom: 15
                    });
                    // Open the popup for the selected marker
                    markers[index].togglePopup();
                });
            });
        if (data.results.length === 0) {
            alert('No places found for your search criteria.');
        }
    })
    .catch(error => console.error('Error fetching nearby places:', error));
}

// Function to fetch weather data based on coordinates
function fetchWeatherData(coordinates) {
    const weatherApiKey = 'e9010ab1b9933ef7dc3ab057d699b478'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${weatherApiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDetails = `
                <h4 class="Head">Weather in ${data.name}</h4>
                <p  class="head">Temperature: ${data.main.temp} °C</p>
                <p  class="head">Condition: ${data.weather[0].description}<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg></p>
            `;
            document.getElementById('weather-output').innerHTML = weatherDetails;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

