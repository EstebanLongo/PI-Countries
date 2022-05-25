import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./navbar.module.css";

export default function NavBar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/home" className={styles.iconHome}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRYhe2TSw7DIAxEocoVipojJsdtFjnO6wYklJhvoGyYFcLYMx5jpSYeADCAGUX+Br7ACayjyB3+J8Laflji43LuO45L5yfwEe76OCGRR2KrvQegK3lMRBMBwsyDcxbePhOQ03kip15ASeeJXIq3o6bzjBp529GCvFrEY+vCNR3Co2z2eeTaPmQngN1T2UuAq72HHm6+ZRnd3JDIMcDmx3QoQSmltNa3eMqZWI4UW2LFSohqR/aqFdAKU8AUMFxAdA1rVqs0Z7gDExM/bjc+TKNeTBQAAAAASUVORK5CYII="
            alt="img not found"
          />
        </Link>

        <Link to="/activity" className={styles.iconForm}>
          <img
            src="data:image/png;base64,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"
            alt="img not found"
          />
        </Link>

        <SearchBar className={styles.search} />
      </nav>
    </header>
  );
}
