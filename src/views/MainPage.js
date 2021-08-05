import React, { Component } from "react";
import AnimatedBackground from "../components/AnimatedBackground.js";
import AnimatedJumbotron from "../components/AnimatedJumbotron.js";
import LinkButton from "../components/LinkButton.js";

const jumbotronProps = {
  content: ["Dislexia", "App"],
  style: "mt-24 h-1/2 text-7xl",
};

export default class MainPage extends Component {
  state = {
    game1: [{ intento: 0, correctos: 0, incorrectos: 0 }],
    game2: [{ intento: 0, correctos: 0, incorrectos: 0 }],
  };

  render() {
    return (
      <div className="h-screen overflow-hidden bg-gray-200 text-center">
        <AnimatedJumbotron features={jumbotronProps} />
        <LinkButton
          to="/games"
          label="Iniciar"
          color="bg-blue-500"
          fontSize="text-7xl"
          xd="dasdasd"
        />
        <LinkButton
          to="/games"
          label="Salir"
          color="bg-red-500"
          fontSize="text-7xl"
        />
        <AnimatedBackground />
      </div>
    );
  }
}
