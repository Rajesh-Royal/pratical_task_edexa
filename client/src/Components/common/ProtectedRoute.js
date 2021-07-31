import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  return !loading ? (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  ) : (
    ""
  );
};
