import React, { Component } from "react";

import AnimatedJumbotron from "../components/AnimatedJumbotron";
import GridMenu from "../components/GridMenu/GridMenu";
import LinkButton from "../components/LinkButton";

const jumbotronProps = {
  content: ["Actividades"],
  style: "invisible md:visible mt-6",
  text: "text-sm md:text-7xl lg:text-8xl",
};

export default class GamesMenu extends Component {
  render() {
    return (
      <div className="h-auto text-center">
        <div className="flex justify-around mb-8">
          <LinkButton
            to="/main-page"
            label="atras"
            color="bg-blue-500"
            fontSize="text-3xl sm:text-4xl mt-6 p-4"
          />
          <AnimatedJumbotron features={jumbotronProps} />
          <LinkButton
            to="/stadistics"
            icon="fas fa-chart-line"
            color="bg-yellow-500"
            fontSize="text-3xl sm:text-4xl mt-6 p-4"
          />
        </div>
        <GridMenu />
      </div>
    );
  }
}
