import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return(
        <div>
            <h1>Welcome to my Countries-PI</h1>
            <Link to ='/home'>
                <button>Start</button>
            </Link>
        </div>
    )
}