import React from "react";
import styles from "./countrycard.module.css";
import {Link} from 'react-router-dom'

export default function CountryCard({ id, flag, name, continent }) {
  return (
    <div className={styles.card}>
      <img
        src={flag}
        alt="img not found"
        width="230px"
        height="150px"
        className={styles.img}
      />
      <h3>
        <Link className={styles.name} to={"/home/" + id}>{name}</Link>
      </h3>
      <h4>{continent}</h4>
    </div>
  );
}
