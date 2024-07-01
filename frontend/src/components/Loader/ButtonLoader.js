import React from 'react'
import loaderStyle from "./loader.module.css"
function ButtonLoader() {
  return (
    <p className={`${loaderStyle.loaderContainer}`}>
        <span className={`${loaderStyle.loader}`}></span>
    </p>
  )
}

export default ButtonLoader
