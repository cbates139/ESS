import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./Pages/login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import CatalogueItem from "./Pages/CatalogueItem";
import Nav from "./components/Nav";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuoteRequestList from "./Pages/QuoteRequestList";
import QuotesList from "./Pages/QuotesList";
import Dashboard from "./Pages/Dashboard"
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import ProtectedEmployeeRoute from "./routes/ProtectedEmployeeRoute";

export default function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Route render={(props) => <Nav user={user} {...props} />}></Route>
      <Switch>
        {/* anonymous Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/login"
          render={(props) => <Login setLoggedUser={setUser} {...props} />}
        />
        <ProtectedUserRoute exact path="/dashboard" component={Dashboard}/>
        {/* User Routes */}
        <ProtectedUserRoute exact path="/catalogue" component={Catalog} />
        <ProtectedUserRoute exact path="/quotes" component={QuotesList} />
        <ProtectedUserRoute
          exact
          path="/catalogueItem"
          component={CatalogueItem}
        />
        {/* Employee Routes */}
        <ProtectedEmployeeRoute
          exact
          path="/quoteRequests"
          component={QuoteRequestList}
        />
      </Switch>
    </div>
  );
}
