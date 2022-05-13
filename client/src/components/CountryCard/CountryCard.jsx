import React from 'react'

export default function CountryCard({id, flag, name, continent}) {
    return (
        <div>
            <img src={flag} alt='img not found' width="230px" height="150px" />
            <h3>{name}</h3>
            <h4>{continent}</h4>
        </div>
    )
}