import styles from "./Home.module.css";
import { useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";

function FilterButtons (props) {
     const { dayOfTheWeek } = props;
     const [showDayDropdown, setShowDayDropdown] = useState(false);
     const [showProductDropdown, setShowProductDropdown] = useState(false);
     const [showLocationDropdown, setShowLocationDropdown] = useState(false);
     const locationDropdownRef = useRef(null);
     const dayDropdownRef = useRef(null);
     const productDropdownRef = useRef(null);
     const [filteredDay, setFilteredDay] = useState({
          selection: "",
          selected: false
     });
     const [filteredProduct, setFilteredProduct] = useState({
          selection: "",
          selected: false
     });
     const [filteredLocation, setFilteredLocation] = useState({
          selection: "",
          selected: false
     });

     const productOptions = [
          "Fresh Produce",
          "Dairy",
          "Meat",
          "Bread",
          "Frozen Food",
          "Baby Needs",
          "Clothing",
          "Medicine"
     ];
     const locationOptions = [
          "Food Pantry",
          "Soup Kitchen"
     ];

     useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
     }, []);

     const handleClickOutside = (event) => {
          const clickedOutsideLocationDropdown =
               locationDropdownRef.current && !locationDropdownRef.current.contains(event.target);
          const clickedOutsideDayDropdown =
               dayDropdownRef.current && !dayDropdownRef.current.contains(event.target);
          const clickedOutsideProductDropdown =
               productDropdownRef.current && !productDropdownRef.current.contains(event.target);
      
          if (clickedOutsideLocationDropdown || clickedOutsideDayDropdown || clickedOutsideProductDropdown) {
               setShowLocationDropdown(false);
               setShowDayDropdown(false);
               setShowProductDropdown(false);
          }
     };

     const handleButtonClick = (dropdownSetter, otherDropdowns) => {
          dropdownSetter((prev) => !prev);
          otherDropdowns.forEach((setter) => setter(false));
     };

     const handleDayButton = () => {
          if(!filteredDay.selected){
               handleButtonClick(setShowDayDropdown, [setShowLocationDropdown, setShowProductDropdown])
          }
          else{
               handleRemoveFilter(setFilteredDay)
          }
     }

     const handleTypeButton = () => {
          if(!filteredProduct.selected){
          handleButtonClick(setShowProductDropdown, [setShowLocationDropdown, setShowDayDropdown])
          }
          else{
          // handleRemoveFilter(setFilteredProduct)
          setFilteredProduct({
          type: "",
          selected: false
          })
          }
     }

     const handleLocationButton = () => {
          if(!filteredLocation.selected){
               handleButtonClick(setShowLocationDropdown, [setShowDayDropdown, setShowProductDropdown])
          }
          else{
               setFilteredLocation({
                    selection: "",
                    selected: false
               })
          }
     }

     const handleOptionClick = (option, setFiltered, setDropdown) => {
          setFiltered({selection: option, selected: true}); // Update the button label with the selected option
          setDropdown(false); // Close the dropdown
     };

     const handleRemoveFilter = (setter) => {
          setter({selection: "", selected: false})
     }

     return (
          <>
               <div className={`me-3 mt-3 ${styles.filterItem}`}>
                    <button
                         className={`${styles.filterButton} ${filteredDay.selected ? styles.filterSelected : ""}`}
                         onClick={handleDayButton}
                    >
                         {filteredDay.selection || "Day of the Week"}
                         <i
                              className={`${!filteredDay.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showDayDropdown ? styles.filterClicked : ""}`}
                         />
                    </button>
                    {showDayDropdown && (
                         <div ref={dayDropdownRef} className={styles.dropdown}>
                              {dayOfTheWeek.map((day, index) => (
                                   <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(day, setFilteredDay, setShowDayDropdown))}>
                                   {day}
                                   </option>
                              ))}
                         </div>
                    )}
               </div>
               <div className={`me-3 mt-3 ${styles.filterItem}`}>
                    <button
                         className={`${styles.filterButton} ${filteredProduct.selected ? styles.filterSelected : ""}`}
                         onClick={handleTypeButton}
                    >
                         {filteredProduct.selection || "Product Type"}
                         <i
                              className={`${!filteredProduct.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showProductDropdown ? styles.filterClicked : ""}`}
                         />
                    </button>
                    {showProductDropdown && (
                         <div ref={productDropdownRef} className={styles.dropdown}>
                              {productOptions.map((product, index) => (
                                   <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(product, setFilteredProduct, setShowProductDropdown))}>
                                        {product}
                                   </option>
                              ))}
                         </div>
                    )}
               </div>
               <div className={`mt-3 ${styles.filterItem}`}>
                    <button
                         className={`${styles.filterButton} ${filteredLocation.selected ? styles.filterSelected : ""}`}
                         onClick={handleLocationButton}
                    >
                         {filteredLocation.selection || "Location Type"}
                         <i
                              className={`${!filteredLocation.selected ? `fa-solid fa-chevron-up` : `fa-regular fa-circle-xmark`} ms-2 align-self-center ${showLocationDropdown ? styles.filterClicked : ""}`}
                         />
                    </button>
                    {showLocationDropdown && (
                         <div ref={locationDropdownRef} className={styles.dropdown}>
                              {locationOptions.map((location, index) => (
                                   <option key={index} className={styles.filterOption} onClick={() =>(handleOptionClick(location, setFilteredLocation, setShowLocationDropdown))}>
                                        {location}
                                   </option>
                              ))}
                         </div>
                    )}
               </div>
          </>
     );
}

FilterButtons.propTypes = {
     dayOfTheWeek: PropTypes.array.isRequired
};

export default FilterButtons;