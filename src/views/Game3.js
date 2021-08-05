import React, { Component } from "react";
import { SketchField, Tools } from "react-sketch";
import LinkButton from "../components/LinkButton";

export default class Game3 extends Component {
  render() {
    return (
      <div className="h-screen bg-gray-200 text-center mb-12">
        <div className="inline-flex space-x-16 mb-12">
          <LinkButton
            to="/games"
            label="ATRAS"
            color="bg-blue-500"
            fontSize="text-4xl mt-12"
          />
          <p className="font-luckiest-guy text-5xl mt-16">Puntaje:</p>
          <LinkButton
            to="/"
            label="SONIDO"
            color="bg-red-500"
            fontSize="text-4xl mt-12"
          />
        </div>
        <div class="flex">
          <SketchField
            width="500px"
            height="350px"
            tool={Tools.Pencil}
            lineColor="black"
            lineWidth={3}
            className="border-dashed border-4 border-light-blue-500 mx-10"
          />
          <SketchField
            width="500px"
            height="350px"
            tool={Tools.Pencil}
            lineColor="black"
            lineWidth={3}
            className="border-dashed border-4 border-light-blue-500 mx-10"
          />
        </div>
      </div>
    );
  }
}
