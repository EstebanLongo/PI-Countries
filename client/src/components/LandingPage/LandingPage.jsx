import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingpage.module.css'
export default function LandingPage() {
    return(
        <div className={styles.fondo}>
            <h1 className={styles.title}>Countries App</h1>
            <Link to ='/home'>
                <button className={styles.btn}>Start!</button>
            </Link>
        </div>
    )
}