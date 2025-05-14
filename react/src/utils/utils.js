import { getFoodResources } from "../services/foodResourcesService.js";

import sampleResults from "../assets/data/foodResources.js";
import filterResults from "./filterResultsUtils.js";
import config from "../../config.js";

// Data fetching utility
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

// Filtering utility
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

// Map location utility
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
