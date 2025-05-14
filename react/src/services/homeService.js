import { getFoodResources } from "./foodResourcesService.js";

import sampleResults from "../assets/data/foodResources.js";
import config from "../../config.js";

// This function is used to fetch the food resources from the API
// and laverages the flag in the config file to determine if the API should be used or not
export async function fetchFoodResources(setResultsArray, setResults) {
  const dataFetch = async () => {
    try {
      const data = await getFoodResources();
      setResultsArray([data]);
      setResults([data]);
    } catch (error) {
      console.error("Error loading food resources.", error);
      setResultsArray([...sampleResults]);
      setResults([...sampleResults]);
    }
  };

  const resultSetter = async () => {
    setResultsArray([...sampleResults]);
    setResults([...sampleResults]);
  };

  config.enableApiFlag ? dataFetch() : resultSetter();
}

// This function handles the filtering of the results based on the day, product or location
// and sets the filtered array and the isFilterApplied state
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

// This function is used to set current location of the user
// or the deafault coordinates of the map if the user does not allow location access
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
  });
}

// This function is bein used in the filterLocation function above
// and is used to filter the results based on the day, product and location
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
