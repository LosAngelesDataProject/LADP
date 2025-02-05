import styles from "./SearchBar.module.css";
import { useState } from "react";

function SearchBar() {
  const [toggleInput, setToggleInput] = useState("");
  return (
    <>
      <i
        className={`fa-solid fa-arrow-left ${styles.searchIconLeft} ${
          toggleInput === "" ? "d-none" : ""
        }`}
        onClick={() => {
          setToggleInput("");
        }}
      />
      <input
        id="searchFilter"
        type="text"
        placeholder="&#xF002; Search"
        className={`${styles.searchInputLeft} ${
          toggleInput === "search" ? styles.expand : "w-50"
        } ${toggleInput === "location" ? "d-none" : ""}
                 `}
        onClick={() => {
          setToggleInput("search");
        }}
      />
      <input
        id="searchLocation"
        type="text"
        placeholder="&#xF3C5; Location"
        className={`${styles.searchInputRight} ${
          toggleInput === "location" ? styles.expand : "w-50"
        }  ${toggleInput === "search" ? "d-none" : ""}`}
        onSelect={() => {
          setToggleInput("location");
        }}
      />
      {toggleInput === "search" ? (
        <i
          className={`fa-solid fa-magnifying-glass ${styles.searchIconRight}`}
          onClick={() => {}}
        />
      ) : (
        <i
          className={`fa-solid fa-location-dot ${styles.searchIconRight} ${
            toggleInput === "" ? "d-none" : ""
          }`}
          onClick={() => {}}
        />
      )}
    </>
  );
}

export default SearchBar;
