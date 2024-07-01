import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import authStyle from "./auth.module.css"
import { UserLoggedIn } from "../../redux/ReduxSlice";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const dispatch = useDispatch();
  const navigateTO = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);
  const userIDref = useRef();
  const userPasswordref = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const [userDetails, setUserDetails] = useState({
    userID: "",
    userPassword: "",
  });

  const [errorState, setErrorState] = useState({
    userIDError: false,
    userPasswordError: false,
    errMsg: "",
  });

  const togglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleInputOnChange = (e) => {
    setErrorState({});
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSignINClick = (e) => {
    e.preventDefault();
    setBtnLoader(true);

    if (userDetails.userID.length < 6) {
      setBtnLoader(false);
      setErrorState({
        userIDError: true,
      });
      toast.error("Invalid user ID");
      userIDref.current.focus();
    } else if (userDetails.userPassword.length < 8) {
      setBtnLoader(false);
      setErrorState({
        userPasswordError: true,
      });
      toast.error("Invalid password");
      userPasswordref.current.focus();
    } else {
      axios
        .post(`${BACKEND_URL}auth/login`, userDetails)
        .then((response) => {

          if (response.data.success) {
            setBtnLoader(false);
            navigateTO("/")
            toast.success("User logged in successfully");
            dispatch(
              UserLoggedIn({
                userEmail: response.data.UserDetails.userEmail,
                token: response.data.UserDetails.token,
                appliedJob: response.data.UserDetails.appliedJob,
              })
            );
          } else {
            setBtnLoader(false);
            toast.error(response.data.msg);
            userIDref.current.focus();
          }
        })
        .catch((err) => {
          setBtnLoader(false);
          toast.error(`${err.message}`);
          userIDref.current.focus();
        });
    }
  };

  return (
    <div className={`${authStyle.Auth__UserLoginFormContainer}`}>
      <div className={`${authStyle.authFormn_Box}`}>

        <form className={`${authStyle.Auth__LoginForm}`}>
          <div className={`${authStyle.Auth__formItemBox}`}>
            <input
              type="text"
              name="userID"
              className={`${authStyle.Auth__formItem} ${errorState.userIDError && `${authStyle.ItemBox__errorState}`
                }`}
              placeholder="Email Address"
              onChange={handleInputOnChange}
              value={userDetails.userID}
              autoFocus
              ref={userIDref}
              autoComplete="current-userID"
            />
          </div>

          <div className={`${authStyle.Auth__formItemBox}`}>
            <input
              type={showPassword ? "text" : "password"}
              name="userPassword"
              className={`${authStyle.Auth__formItem} ${errorState.userPasswordError && `${authStyle.ItemBox__errorState}`
                }`}
              placeholder="Password"
              onChange={handleInputOnChange}
              value={userDetails.userPassword}
              ref={userPasswordref}
              autoComplete="current-password"
              maxLength={15}
            />
            {userDetails.userPassword && (
              <span
                className={`${authStyle.formPassword__showHide}`}
                onClick={togglePasswordShow}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`${authStyle.Auth__formButton} ${(userDetails.userID && userDetails.userPassword) ||
              `${authStyle.unActiveFormButton}`
              }`}
            onClick={handleSignINClick}
          >
            {btnLoader ? <ButtonLoader /> : "Log in"}
          </button>
        </form>
      </div>

      <div className={`${authStyle.authGotoSignUP_container}`}>
        Don't have an account?{" "}
        <Link className={`${authStyle.gotoRegisterPageLINK} ${btnLoader && 'Unactive'}`} to={"/user/auth/register"}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
