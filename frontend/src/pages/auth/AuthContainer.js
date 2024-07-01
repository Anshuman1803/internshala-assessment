import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import authPoster from "../../assets/authPoster.gif"
import authStyle from "./auth.module.css"
function AuthContainer() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();
  useEffect(() => {
    if (pathname === "/user/auth") {
      navigateTO("/user/auth/signin");
    }
  }, [pathname, navigateTO]);
  

  return (
    <section className={`${authStyle.userAuth__container}`}>
      <div className={`${authStyle.authContainer__LeftSideContainer}`}>
        <div className={`${authStyle.LeftSideContainer__PosterBox}`}>
          <img
            src={authPoster}
            alt="homePhone-Screenshots"
            className={`${authStyle.PosterBox__dynamicImages}`}
          />
        </div>
      </div>

      <div className={`${authStyle.authContainer__RightSideContainer}`}>
        <Outlet />
      </div>
    </section>
  );
}

export default AuthContainer;
