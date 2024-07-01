import React from 'react'
import loaderImg from "../../assets/postCommentLoader.gif"
import loaderStyle from "./loader.module.css"
function Loader() {
  return (
    <section className={`${loaderStyle.__loaderContainer}`}>
      <img src={loaderImg} alt='loader' className={`${loaderStyle.__loaderContainer_img}`}/>
    </section>
  )
}

export default Loader