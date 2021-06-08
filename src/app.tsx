import '../assets/scss/app.scss';
import React from "react";
import { Router } from "@reach/router"
import ComponentOne from "./components/ComponentOne";
import ComponentTwo from "./components/ComponentTwo";

const App = () => (
    <Router>
        <ComponentOne path="/" />
        <ComponentTwo path="/two" />
    </Router>
);

export default App;
