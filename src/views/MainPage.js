import React, { Component } from "react";
import ActionButton from "../components/ActionButton.js";
import AnimatedBackground from "../components/AnimatedBackground.js";
import AnimatedJumbotron from "../components/AnimatedJumbotron.js";
import LinkButton from "../components/LinkButton.js";

import Swal from "sweetalert2";

const jumbotronProps = {
  content: ["Dislexia", "App"],
  style: "mt-24 h-1/2 text-7xl",
};

export default class MainPage extends Component {
  state = {
    usuario: { nombre: "", apellido: "" },
  };

  register = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registro",
      html:
        "<label>Nombre</lablel>" +
        '<input id="swal-input1" class="swal2-input">' +
        "<label>Apellido</lablel>" +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      this.setState({
        usuario: { nombre: formValues[0], apellido: formValues[1] },
      });
      console.log(this.state.usuario);
      Swal.fire(JSON.stringify(formValues));
    }
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
        <ActionButton
          label="Registro"
          color="bg-red-500"
          fontSize="text-7xl"
          handleAnswer={this.register}
        />
        <AnimatedBackground />
      </div>
    );
  }
}
