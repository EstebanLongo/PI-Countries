import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../../redux/actions";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0) alert ('Type name of country')
    if (isNaN(name) !== true) alert ('Country name cannot be a number')
      dispatch(getNameCountry(name)); //name es el estado local
      setName("");
    // setCurrentPage(1)
  }

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        value={name}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
