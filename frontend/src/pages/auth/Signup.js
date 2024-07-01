import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import authStyle from "./auth.module.css"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function SignUp() {
  const navigateTO = useNavigate();
  const userEmailRef = useRef();
  const fullNameref = useRef();
  const genderRef = useRef();
  const userPasswordref = useRef();
  const [btnLoader, setBtnLoader] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    fullName: "",
    gender: "",
    userPassword: "",
  });

  const togglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const clearFields = () => {
    setErrorState({});
    setUserDetails({
      userEmail: "",
      fullName: "",
      gender: "",
      userPassword: "",
    });
  };


  const handleInputOnChange = (e) => {
    setErrorState({});
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value.trim() });
  };

  const handleSignUPClick = (e) => {
    e.preventDefault();

    if (!userDetails.userEmail.includes("@gmail.com")) {
      setErrorState({
        userEmailError: true,
      });
      toast.error("Invalid email address");
      userEmailRef.current.focus();
    } else if (
      !(userDetails.fullName.length > 3 || userDetails.fullName < 20)
    ) {
      setErrorState({
        fullNameError: true,
      });
      toast.error("Invalid name");
      fullNameref.current.focus();
    } else if (userDetails.gender === "") {
      setErrorState({
        genderError: true,
      });
      toast.error("Select gender");
      genderRef.current.focus();
    } else if (userDetails.userPassword.length < 8) {
      setErrorState({
        userPasswordError: true,
      });
      toast.error("Password at least 8 character long");
      userPasswordref.current.focus();
    } else {
      setBtnLoader(true);
      axios.post(`${BACKEND_URL}auth/register`, userDetails).then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          clearFields();
          setBtnLoader(false);
          navigateTO(`/user/auth/signin`)
        } else {
          toast.error(response.data.msg);
          setBtnLoader(false);
          userEmailRef.current.focus();
        }
      }).catch((err) => {
        toast.error(`Something went wrong! ${err.message}`);
        userEmailRef.current.focus();
        setBtnLoader(false);
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
              name="userEmail"
              className={`${authStyle.Auth__formItem} ${errorState.userEmailError && `${authStyle.Auth__formItemErrorItemBox__errorState}`
                }`}
              placeholder="Email address"
              onChange={handleInputOnChange}
              value={userDetails.userEmail}
              ref={userEmailRef}
              autoFocus
              autoComplete="current-userID"
            />
          </div>

          <div className={`${authStyle.Auth__formItemBox}`}>
            <input
              type="text"
              name="fullName"
              className={`${authStyle.Auth__formItem} ${errorState.fullNameError && `${authStyle.Auth__formItemErrorItemBox__errorState}`
                }`}
              placeholder="Name"
              onChange={handleInputOnChange}
              value={userDetails.fullName}
              ref={fullNameref}
              autoComplete="off"
              maxLength={20}
              minLength={3}
              autoCapitalize="on"
            />
          </div>

          <div className={`${authStyle.Auth__formItemBox}`}>
            <select ref={genderRef} name="gender" value={userDetails.gender} onChange={handleInputOnChange} className={`${authStyle.Auth__formItem} ${authStyle.Auth__formSelect__Item} ${errorState.fullNameError && `${authStyle.Auth__formItemErrorItemBox__errorState}`
              }`}>
              <option disabled value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className={`${authStyle.Auth__formItemBox}`}>
            <input
              type={showPassword ? "text" : "password"}
              name="userPassword"
              className={`${authStyle.Auth__formItem} ${errorState.userPasswordError && `${authStyle.Auth__formItemErrorItemBox__errorState}`
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
            className={`${authStyle.Auth__formButton} ${(userDetails.userEmail &&
              userDetails.userPassword &&
              userDetails.fullName &&
              userDetails.gender) ||
              `${authStyle.unActiveFormButton}`
              }`}
            onClick={handleSignUPClick}
          >
            {btnLoader ? <ButtonLoader /> : "Sign up"}
          </button>
        </form>
      </div>

      <div className={`${authStyle.authGotoSignUP_container}`}>
        Have an account?
        <Link className={`${authStyle.gotoRegisterPageLINK} ${btnLoader && 'Unactive'}`} to={"/user/auth/signin"}>
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
