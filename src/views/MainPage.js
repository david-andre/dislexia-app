import React, { useState } from "react";
import ActionButton from "../components/ActionButton.js";
//import AnimatedBackground from "../components/AnimatedBackground.js";
import AnimatedJumbotron from "../components/AnimatedJumbotron.js";
import LinkButton from "../components/LinkButton.js";
import axios from "axios";

import Swal from "sweetalert2";
import ModalForm from "../components/ModalForm.js";
import ModalList from "../components/ModalList.js";

const jumbotronProps = {
  content: ["Dislexia", "App"],
  style: "mt-24 h-1/3",
  text: "text-7xl lg:text-8xl",
};

export default function MainPage() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const showModal2 = () => {
    setShow2(true);
  };

  const hideModal2 = () => {
    setShow2(false);
  };

  const register = async (user) => {
    let aux = { ...user, supervisor: "61414eab3d8a571aacf6b598" };
    await axios
      .post("http://localhost:4000/api/user/children", aux)
      .then((res) => {
        Swal.fire("Registo exitoso", res.message, "success");
      })
      .catch((err) => {
        Swal.fire("Ocurrio un problema", "Inténtalo mas tarde", "error");
        console.error(err);
      });
    setShow(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-200 text-center">
      <AnimatedJumbotron features={jumbotronProps} />
      <div className="grid lg:px-48 sm:mx-24 md:mx-0 gap-10 grid-cols-1 md:grid-cols-2">
        <ActionButton
          label="Iniciar"
          color="bg-blue-500"
          fontSize="text-5xl md:text-7xl p-8"
          handleAnswer={showModal2}
        />
        <ActionButton
          label="Registro"
          color="bg-red-500"
          fontSize="text-5xl md:text-7xl p-8"
          handleAnswer={showModal}
        />
      </div>
      <ModalForm
        isShown={show}
        hideModal={hideModal}
        handleAction={register}
        title={"Registrar Niño"}
        icon={"fas fa-user-plus"}
        button={"Registrar"}
        inputs={["Nombre", "Apellido", "Edad"]}
      />
      <ModalList
        isShown={show2}
        hideModal={hideModal2}
        title={"Selecciona al niño"}
        icon={"fas fa-users"}
        button={"Confirmar"}
      />
      {/*<AnimatedBackground />*/}
    </div>
  );
}
