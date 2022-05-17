import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./navbar.module.css";

export default function NavBar({ setCurrentPage }) {
  return (
    <header>
      <nav className={styles.navbar}>
        {/* <img src="data:image/png;base64,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"></img>          */}

        {/* <Link to='/home' className={styles.iconHome}>
            <img src="https://img.icons8.com/external-nawicon-glyph-nawicon/64/000000/external-home-location-nawicon-glyph-nawicon.png" className={styles.img}/> 
            </Link> */}
        {/* <Link to="/home" className={styles.iconHome}>
          <img src="data:image/png;base64,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"></img>
        </Link> */}
        <Link to="/home" className={styles.iconHome}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRYhe2TSw7DIAxEocoVipojJsdtFjnO6wYklJhvoGyYFcLYMx5jpSYeADCAGUX+Br7ACayjyB3+J8Laflji43LuO45L5yfwEe76OCGRR2KrvQegK3lMRBMBwsyDcxbePhOQ03kip15ASeeJXIq3o6bzjBp529GCvFrEY+vCNR3Co2z2eeTaPmQngN1T2UuAq72HHm6+ZRnd3JDIMcDmx3QoQSmltNa3eMqZWI4UW2LFSohqR/aqFdAKU8AUMFxAdA1rVqs0Z7gDExM/bjc+TKNeTBQAAAAASUVORK5CYII="/>        </Link>
        <Link to="/activity" className={styles.iconForm}>
            <img src="data:image/png;base64,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"></img>
        </Link>
        
        <SearchBar setCurrentPage={setCurrentPage} className={styles.search}/>
      </nav>
    </header>
  );
}
