import React, { Component } from "react";

import AnimatedJumbotron from "../components/AnimatedJumbotron";
import GridMenu from "../components/GridMenu/GridMenu";
import LinkButton from "../components/LinkButton";

import "./gameMenu.css";

const jumbotronProps = { content: ["Actividades"], style: "mt-8 h-1/4" };

export default class GamesMenu extends Component {
  render() {
    return (
      <div className="gm h-screen overflow-hidden bg-gray-200 text-center">
        <div className="inline-flex space-x-16 mb-12">
          <LinkButton
            to="/"
            label="atras"
            color="bg-blue-500"
            fontSize="text-4xl mt-12"
          />
          <AnimatedJumbotron features={jumbotronProps} />
          <LinkButton
            to="/stadistics"
            icon="fas fa-chart-line"
            color="bg-yellow-500"
            fontSize="text-4xl mt-12"
          />
        </div>
        <GridMenu />
      </div>
    );
  }
}
