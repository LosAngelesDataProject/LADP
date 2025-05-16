import { getFoodResources } from "./foodResourcesService.js";

import mockFoodResources from "../assets/data/foodResources.js";
import config from "../../config.js";

/**
 * Fetches the food resources list from the API or sample data,
 * depending on the enableApiFlag in the config file.
 *
 * @param {Function} setResultsArray - Function to set the original, unfiltered results array in the Home component.
 * @param {Function} setResults - SetResults The function to set the visible results list to be rendered in the Home component.
 * @returns {Promise<void>} - A promise that resolves when the data is fetched or sample data is set, based on the enableApiFlag.
 * @throws {Error} - If data cannot be fetched from the API.
 */
export async function fetchFoodResources(setResultsArray, setResults) {
  const dataFetch = async () => {
    try {
      const data = await getFoodResources();
      setResultsArray([data]);
      setResults([data]);
    } catch (error) {
      console.error("Error loading food resources.", error);
      setResultsArray([...mockFoodResources]);
      setResults([...mockFoodResources]);
    }
  };

  const resultSetter = async () => {
    setResultsArray([...mockFoodResources]);
    setResults([...mockFoodResources]);
  };

  config.enableApiFlag ? dataFetch() : resultSetter();
}

/**
 * Filters the results based on the selected day, product, or location,
 * and updates the filtered array and the isFilterApplied state accordingly.
 *
 * @param {Array} resultsArray - The original, unmodified array of food resources.
 * @param {string|null} dayParam - The day filter selected by the user.
 * @param {string|null} productParam - The product filter selected by the user.
 * @param {string|null} locationParam - The location filter selected by the user.
 * @param {Function} setFilteredArray - Function to update the filtered array in the Home component.
 * @param {Function} setIsFilterApplied - Function to update the isFilterApplied state in the Home component.
 */
export function filterLocation(
  resultsArray,
  dayParam,
  productParam,
  locationParam,
  setFilteredArray,
  setIsFilterApplied
) {
  if (dayParam || productParam || locationParam) {
    const filteredResults = filterResults(
      resultsArray,
      dayParam,
      productParam,
      locationParam
    );

    setFilteredArray([...filteredResults]);
    setIsFilterApplied(true);
  } else {
    setIsFilterApplied(false);
    setFilteredArray([...resultsArray]);
  }
}

/**
 * This function is used to set user's current location
 * if the user grant access to the location in the browser
 *
 * @param {Function} setCurrent - Function to update the current location coordinates.
 * @param {Function} setCenter - Function to update the map's center coordinates.
 * @param {Function} setZoom - Function to update the map's zoom level.
 */
export function updateMaplocation(setCurrent, setCenter, setZoom) {
  navigator.geolocation.getCurrentPosition((position) => {
    if (position.coords.latitude) {
      setZoom(16);
      setCurrent((prevState) => ({
        ...prevState,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        active: "on",
      }));
      setCenter((prevState) => ({
        ...prevState,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }));
    }
    // No else block needed – Home has default state
  });
}

/**
 * Filters the currently visible results based on the selected day, product, and/or location.
 * This function is used internally by the filterLocation function to update the rendered results.
 *
 * @param {Array} results - The array of food resources currently rendered in the Home component.
 * @param {string|null} day - The day filter selected by the user.
 * @param {string|null} product - The product filter selected by the user.
 * @param {string|null} location - The location filter selected by the user.
 * @returns {Array} - A filtered array of food resources, or an empty array if no matches are found.
 */
export function filterResults(results, day, product, location) {
  let newResults = [];

  function filterer(param, arrayToFilter) {
    const filteredArray = arrayToFilter.filter((foodResource) => {
      for (let index = 0; index < foodResource.tags.length; index++) {
        const element = foodResource.tags[index].name;

        if (element === param) {
          return true;
        }
      }
    });

    newResults = [...filteredArray];
  }

  if (day) {
    const filteredArray = results.filter((foodResource) => {
      for (let index = 0; index < foodResource.businessHours.length; index++) {
        const element = foodResource.businessHours[index].day.name;

        if (element === day) {
          return true;
        }
      }
    });

    newResults = [...filteredArray];
  } else {
    newResults = [...results];
  }

  if (product) {
    filterer(product, newResults);
  }

  if (location) {
    filterer(location, newResults);
  }

  return newResults;
}
