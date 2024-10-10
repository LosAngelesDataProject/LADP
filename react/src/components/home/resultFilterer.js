function resultFilterer(results, day, product, location) {
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

export default resultFilterer;
