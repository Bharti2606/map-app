## Map App using HTML, CSS, and JavaScript

This project implements a simple map application using HTML, CSS, and JavaScript. It allows users to search for locations, find nearby places, and get directions.

**Features:**

**HTML:**

-   Uses a basic HTML structure to create the map, search bar, results area, and place type tabs.
-   Includes necessary links for Mapbox GL JS and CSS, Mapbox GL Directions plugin, and custom CSS.
-   Integrates a `defer` attribute for the `script.js` tag to ensure the DOM is fully loaded before executing the script.

**CSS:**

-   Utilizes custom CSS for styling the header, search bar, map, results area, place type tabs, and transportation mode buttons.
-   Applies responsive design using media queries to adjust layout for smaller screens.
-   Includes styling for nearby place items in the results area.

**JavaScript:**

-   Uses Mapbox GL JS API to create an interactive map and display navigation controls.
-   Implements geolocation to retrieve the user's current location.
-   Provides search functionality using the Mapbox Geocoding API to fetch coordinates from location names.
-   Integrates the Mapbox GL Directions plugin for displaying routes between locations.
-   Utilizes the Foursquare Places API to find nearby places based on user input and place type.
-   Implements weather data retrieval using the OpenWeatherMap API.
-   Creates and adds markers to the map to represent searched locations and nearby places.
-   Creates popups for markers to display place details.
-   Dynamically updates the results area with nearby places and weather information.
-   Allows users to select transportation modes (driving, walking, cycling) for route calculations.

**Functionality:**

1.  **Location Search:** Users can enter a location name in the search bar and click "Search." The map will center on the searched location, and a marker will be added.

2.  **Nearby Places:** The app uses the Foursquare Places API to retrieve nearby places based on the user's selected place type (restaurants, hotels, hospitals, etc.). The nearby places are listed in the results area and marked on the map.

3.  **Directions:** Users can use the Mapbox GL Directions plugin to calculate routes between locations. The directions will be displayed in the results area, including distance and estimated duration.

4.  **Weather Information:** The app fetches weather data using the OpenWeatherMap API for the searched location and displays it in the results area.

5.  **Place Type Tabs:** Users can select different place types (restaurants, hotels, hospitals, etc.) using the tabs to filter the nearby places search.

6.  **Transportation Modes:** Users can choose between driving, walking, or cycling for route calculations using the transportation mode buttons.

**Project Structure:**

-   `index.html`: Main HTML file for the map app.
-   `script.js`: JavaScript file containing the app's logic and API calls.
-   `style.css`: CSS file for styling the app's elements.

**To Run the App:**

1.  Save all files in the same directory.
2.  Open `index.html` in a web browser.
3.  Make sure to replace the placeholder API keys with your actual API keys from the respective services (Mapbox, Foursquare, and OpenWeatherMap).
4.  Start exploring!

This project provides a solid foundation for building a more complex and feature-rich map application. 
