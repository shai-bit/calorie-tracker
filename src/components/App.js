import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Welcome} />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
