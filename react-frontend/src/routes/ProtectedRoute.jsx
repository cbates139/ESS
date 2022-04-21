import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({ component: Component, accountType, ...rest }) {
  const [state, setState] = useState({
    accountType: "",
    redirect: false,
  });

  useEffect(() => {
    const setStateAsync = async () => {
      // Get token
      const token = localStorage.getItem("token");
      // If token is null set redirect true
      if (!token) {
        setState((state) => ({ ...state, redirect: true }));
        return;
      }
      // Get user info
      var response = await axios.get("user/info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // If request fails set redirect ture
      if (response.status !== 200) {
        setState((state) => ({ ...state, redirect: true }));
        return;
      }
      // Set account type and redirect true
      setState((state) => ({
        ...state,
        accountType: response.data.accountType,
        redirect: true,
      }));
    };
    setStateAsync();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        // Only render Component if user is authorized
        if (state.accountType === accountType) {
          return <Component {...rest} {...props} />;
        } else if (state.redirect) {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
