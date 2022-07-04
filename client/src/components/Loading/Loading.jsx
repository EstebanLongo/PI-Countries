import React from "react";
import style from './Loading.module.css'

export default function Loading({ setLoading }) {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
      <h3 className={style.loading}>🔍​ Un momento...</h3>
    </div>
  )
}
