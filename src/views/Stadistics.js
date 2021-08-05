import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import LinkButton from "../components/LinkButton";
import AnimatedJumbotron from "../components/AnimatedJumbotron";

const jumbotronProps = { content: ["Estadísticas"], style: "mt-8 h-1/4" };

export default class Stadistics extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  render() {
    let data = {
      labels: ["Intento 1", "Intento 2", "Intento 3"],
      datasets: [
        {
          label: "Tiempo",
          backgroundColor: "#3B82F6",
          data: [4.5, 6.4, 5],
        },
        {
          label: "Incorrectas",
          backgroundColor: "#EF4444",
          data: [3, 7, 4],
        },
      ],
    };
    return (
      <div>
        <div className="inline-flex space-x-16 mb-12">
          <LinkButton
            to="/games"
            label="atras"
            color="bg-blue-500"
            fontSize="text-4xl mt-12"
          />
          <AnimatedJumbotron features={jumbotronProps} />
        </div>
        <h1 className="font-luckiest-guy text-center pr-80 text-4xl">Actividad 1</h1>
        <div className="w-2/3 pl-24 text-center">
          <Bar ref={this.chartReference} data={data} />
        </div>
      </div>
    );
  }
}
