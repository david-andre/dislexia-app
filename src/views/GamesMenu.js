import React, { Component } from "react";

import AnimatedJumbotron from "../components/AnimatedJumbotron";
import GridMenu from "../components/GridMenu/GridMenu";
import LinkButton from "../components/LinkButton";

const jumbotronProps = { content: ["Actividades"], style: "mt-6" };

export default class GamesMenu extends Component {
  render() {
    return (
      <div className="h-screen overflow-auto bg-gray-200 text-center">
        <div className="flex justify-around mb-8">
          <LinkButton
            to="/"
            label="atras"
            color="bg-blue-500"
            fontSize="text-lg md:text-4xl mt-6"
          />
          <AnimatedJumbotron features={jumbotronProps} />
          <LinkButton
            to="/stadistics"
            icon="fas fa-chart-line"
            color="bg-yellow-500"
            fontSize="text-4xl mt-6"
          />
        </div>
        <GridMenu />
      </div>
    );
  }
}
