import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader/Loader.js";

const OpportunitiesPage = lazy(() => import("../pages/career/Opportunities.js"));
const DetailsOpportunitiesPage = lazy(() => import("../pages/career/DetailsOpportunitiesPage.js"));
const AuthContainer = lazy(() => import("../pages/auth/AuthContainer.js"));
const RegisterPage = lazy(() => import("../pages/auth/Signup.js"));
const SignInPage = lazy(()=> import("../pages/auth/Login.js"));

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function AppRouter() {
  return <Routes>
    <Route path="/" element={<Suspense fallback={<Loader />}> <OpportunitiesPage /> </Suspense>} />
    <Route path="/career/:id" element={<Suspense fallback={<Loader />}> <DetailsOpportunitiesPage /> </Suspense>} />
    <Route path="/user/auth" element={<Suspense fallback={<Loader />}> <AuthContainer /> </Suspense>} >
      <Route path="/user/auth/signin" element={<Suspense fallback={<Loader />}> <SignInPage /> </Suspense>} />
      <Route path="/user/auth/register" element={<Suspense fallback={<Loader />}> <RegisterPage /> </Suspense>} />
      <Route path="/user/auth/*" element={<Suspense fallback={<Loader />}> <SignInPage /> </Suspense>} />
    </Route>
  </Routes>;
}

export default AppRouter;
