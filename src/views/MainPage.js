import React, { Component } from "react";
import ActionButton from "../components/ActionButton.js";
import AnimatedBackground from "../components/AnimatedBackground.js";
import AnimatedJumbotron from "../components/AnimatedJumbotron.js";
import LinkButton from "../components/LinkButton.js";
import axios from "axios";

import Swal from "sweetalert2";

const jumbotronProps = {
  content: ["Dislexia", "App"],
  style: "mt-24 h-1/3",
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
        '<input id="swal-input1" class="swal2-input" required>' +
        "<label>Apellido</lablel>" +
        '<input id="swal-input2" class="swal2-input" required>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues[0] !== "" && formValues[1] !== "") {
      this.setState({
        usuario: { nombre: formValues[0], apellido: formValues[1] },
      });
      console.log(this.state.usuario);
      await axios
        .post(`http://localhost:4000/api/users/children`, this.state.usuario)
        .then((res) => {
          Swal.fire("Registro Completado!", `${res.data.message}`, "success");
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Ocurrio un problema!", `Inténtalo mas tarde`, "error");
        });
    } else {
      Swal.fire(
        "Campos incompletos",
        `Debes completar todos los campos para completar el registro`,
        "warning"
      );
    }
  };

  render() {
    return (
      <div className="h-screen overflow-hidden bg-gray-200 text-center">
        <AnimatedJumbotron features={jumbotronProps} />
        <div className="grid lg:px-48 gap-10 grid-cols-1 md:grid-cols-2">
          <LinkButton
            to="/games"
            label="Iniciar"
            color="bg-blue-500"
            fontSize="text-5xl md:text-7xl"
          />
          <ActionButton
            label="Registro"
            color="bg-red-500"
            fontSize="text-5xl md:text-7xl"
            handleAnswer={this.register}
          />
        </div>
        <AnimatedBackground />
      </div>
    );
  }
}
