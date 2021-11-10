import React, { Component } from "react";


import "./loader.scss";

export class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <img
                    src={process.env.PUBLIC_URL + "/resources/images/logo-remotion.svg"}
                    alt="Cargando"
                />
            </div>
        );
    }
}
