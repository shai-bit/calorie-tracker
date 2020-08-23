import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Welcome from "./Welcome";

// USDA API key Us7ZJaxoFBR7bycuMkPqTKVbNghgOvXfyQu79nRi

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Welcome} />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
