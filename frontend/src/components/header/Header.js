import React from 'react'
import headerStyle from "./header.module.css"
import Logo from "../../assets/Logo.png"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { UserLogOut } from '../../redux/ReduxSlice'
function Header() {
  const { userEmail } = useSelector((state) => state.App);
  const dispatchTO = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatchTO(UserLogOut())
  }
  return (
    <header className={`${headerStyle.__App_header}`}>
      <img src={Logo} alt="App_LOGO" className={`${headerStyle.__appLOGO}`} />
      <nav className={`${headerStyle.__appNav}`}>
        <NavLink to={`/`} className={`${headerStyle.__appNavItems}`}> Career </NavLink>
        {
          userEmail ? <NavLink to={`/user/auth/signin`} className={`${headerStyle.__appNavItems} ${headerStyle.__appNavButtons}`} onClick={handleLogOut}> Log Out </NavLink> : <NavLink to={`/user/auth/signin`} className={`${headerStyle.__appNavItems} ${headerStyle.__appNavButtons}`}> Login / Register </NavLink>
        }


      </nav>

    </header>
  )
}

export default Header