import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../Components/common/Header";
import { ProtectedRoute } from "../Components/common/ProtectedRoute";
import ThemedSuspense from "../Components/global/ThemedSuspense";
import ToastMessageContainer from "../Components/global/ToastContainer.js";
import { privateRoutes, publicRoutes } from "../Routes/Routes";

const Page404 = lazy(() => import("../Pages/Page404"));

function Layout() {
  return (
    <React.Fragment>
      <ToastMessageContainer />
      <Header />
      <Suspense fallback={<ThemedSuspense className="mt-5" />}>
        <Switch>
          {/* public route accessed by non logged in user */}
          {publicRoutes.map((route, i) => {
            return route.component ? (
              <Route
                key={i}
                exact
                path={route.path}
                render={(props) => <route.component {...props} />}
              />
            ) : null;
          })}
          {/* private route only for authorised user */}
          {privateRoutes.map((route, i) => {
            return route.component ? (
              <ProtectedRoute
                key={i}
                exact
                path={route.path}
                component={(props) => <route.component {...props} />}
              />
            ) : null;
          })}
          <Redirect exact from="/" to="/dashboard" />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
}

export default Layout;
