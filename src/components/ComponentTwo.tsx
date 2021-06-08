import React from "react";
import { Link } from "@reach/router"
import { RouteComponentProps } from "@reach/router";

const ComponentTwo = (_props: RouteComponentProps) => (
    <div>
        <h1>Component Two</h1>
        <Link to="/">Component One</Link>
    </div>
);

export default ComponentTwo;
