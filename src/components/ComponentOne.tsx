import React from "react";
import Cards from "./Cards";
import { Link } from "@reach/router"
import { RouteComponentProps } from "@reach/router";

const ComponentOne = (_props: RouteComponentProps) => (
    <div>
        <h1>Hello World2!</h1>
        <Link to="/two">Component Two</Link>
        <Cards />
    </div>
);

export default ComponentOne;
