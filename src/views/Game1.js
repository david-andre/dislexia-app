import React, { Component } from "react";

import LinkButton from "../components/LinkButton";
import ActionButton from "../components/ActionButton";
import CardsList from "../components/CardsList/CardsList";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

import camiseta from "../assets/audio/camiseta.mp3";
import pecera from "../assets/audio/pecera.mp3";
import florero from "../assets/audio/florero.mp3";
import camioneta from "../assets/audio/camioneta.mp3";
import telefono from "../assets/audio/telefono.mp3";

import "./game1.css";

export default class Game1 extends Component {
  state = {
    gameWords: [
      ["CA", "", "SE", "TA"],
      ["PE", "", "RA"],
      ["FLO", "", "RO"],
      ["CAMIO", "", "TA"],
      ["TELÉ", "", "NO"],
      ["", "", ""],
    ],
    wordOptions: [
      [{ text: "MI", val: true }, { text: "TI" }, { text: "NI" }],
      [{ text: "SE" }, { text: "CE", val: true }, { text: "TE" }],
      [{ text: "RE", val: true }, { text: "ME" }, { text: "NE" }],
      [{ text: "ME" }, { text: "PE" }, { text: "NE", val: true }],
      [{ text: "MO" }, { text: "PO" }, { text: "FO", val: true }],
      [{ text: "" }, { text: "" }, { text: "" }],
    ],
    score: { correct: 0, incorrect: 0 },
    redirect: null,
    images: [
      "https://unsplash.it/400/200",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/id/237/200/300",
    ],
  };

  handleClick = (content) => {
    let updatedState = this.state.gameWords;
    updatedState[0][1] = content;
    this.setState({
      gameWords: updatedState,
    });
  };

  validateAnswer = async () => {
    let alert;
    const correct = this.state.wordOptions[0].find(
      (element) => element.val === true
    );
    if (this.state.gameWords[0][1] === correct.text) {
      alert = { icon: "success", title: "Correcto" };
      this.setState({
        gameWords: this.state.gameWords.slice(1, this.state.gameWords.length),
        wordOptions: this.state.wordOptions.slice(
          1,
          this.state.wordOptions.length
        ),
        score: {
          correct: this.state.score.correct + 1,
          incorrect: this.state.score.incorrect,
        },
      });
    } else {
      alert = { icon: "error", title: "Inténtalo de nuevo" };
      this.setState({
        score: {
          correct: this.state.score.correct,
          incorrect: this.state.score.incorrect + 1,
        },
      });
    }
    if (this.state.score.correct === 4) {
      var unaEstrella = [
        '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;" >★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
      ];
      var dosEstrella = [
        '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
      ];
      var tresEstrella = [
        '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label></div>',
      ];
      var estrellas;
      if (this.state.score.incorrect > 2) {
        estrellas = unaEstrella;
      } else {
        if (this.state.score.incorrect === 0) {
          estrellas = tresEstrella;
        } else {
          estrellas = dosEstrella;
        }
      }

      await Swal.fire({
        title: "GANASTE!",
        timer: 4000,
        imageUrl:
          "https://i.pinimg.com/originals/7a/55/bd/7a55bd283db2443f1761ebabff200bc6.gif",
        showConfirmButton: false,
        html: `Correctos: <b>${
          this.state.score.correct + 1
        } puntos</b> <br> Incorrectos: <b>${
          this.state.score.incorrect
        } puntos</b> ${estrellas}`,
      });
    } else {
      await Swal.fire({
        icon: alert.icon,
        title: alert.title,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (this.state.score.correct === 5) {
      this.setState({ redirect: "/games" });
    }
  };

  playAudio = () => {
    var audio;

    switch (this.state.score.correct) {
      case 0:
        audio = "camiseta";
        break;
      case 1:
        audio = "pecera";
        break;
      case 2:
        audio = "florero";
        break;
      case 3:
        audio = "camioneta";
        break;
      case 4:
        audio = "telefono";
        break;
      default:
        break;
    }

    const audioEl = document.getElementsByClassName(audio)[0];
    audioEl.play();
  };
  showInstructions = () => {
    Swal.fire({
      title: "Instrucción 1",
      text: "Descripción",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 500,
      imageHeight: 250,
      confirmButtonColor: "#3085d6",
      confirmButtonText: '<i class="fas fa-2x fa-arrow-circle-right"></i>',
    }).then(() => {
      Swal.fire({
        title: "Instrucción 2",
        text: "Descripción",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 500,
        imageHeight: 250,
        confirmButtonColor: "#3085d6",
        confirmButtonText: '<i class="fas fa-2x fa-arrow-circle-right"></i>',
      }).then(() => {
        Swal.fire({
          title: "Instrucción 3",
          text: "Descripción",
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 500,
          imageHeight: 250,
          confirmButtonColor: "#3085d6",
          confirmButtonText: '<i class="fas fa-2x fa-arrow-circle-right"></i>',
        });
      });
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const items = this.state.gameWords[0].map((item, index) => {
      if (item === "") {
        return (
          <p
            className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl px-20 mx-3"
            key={index}
          ></p>
        );
      } else {
        const found = this.state.wordOptions[0].find(
          (element) => element.text === item
        );
        if (found !== undefined) {
          return (
            <p
              className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl text-red-600 px-5 mx-3 text-9xl"
              key={index}
            >
              {item}
            </p>
          );
        } else {
          return (
            <p className="font-luckiest-guy text-white text-9xl" key={index}>
              {item}
            </p>
          );
        }
      }
    });

    return (
      <div className="g1 h-screen overflow-hidden">
        <div className="py-10">
          <LinkButton
            to="/games"
            icon="fas fa-home"
            color="bg-yellow-500"
            fontSize="text-4xl mt-12"
          />
          <ActionButton
            icon="fas fa-address-book"
            color="bg-blue-500"
            fontSize="text-4xl mt-12"
            handleAnswer={this.showInstructions}
          />
        </div>
        <p className="font-luckiest-guy text-5xl text-white mb-6 text-center">
          Puntaje: {this.state.score.correct}
        </p>

        <CardsList
          options={this.state.wordOptions}
          handleClick={this.handleClick}
        />

        <div className="text-center">
          <ActionButton
            icon="fas fa-check"
            color="bg-yellow-400"
            fontSize="text-4xl mt-12"
            handleAnswer={this.validateAnswer}
          />
          <br></br>
          <div className="inline-flex mt-12">{items}</div>
          <i
            class="fas fa-volume-up text-2xl text-gray-900 inline-block align-top mt-16 cursor-pointer"
            onClick={this.playAudio}
          ></i>
        </div>
        <audio className="camiseta">
          <source src={camiseta}></source>
        </audio>
        <audio className="pecera">
          <source src={pecera}></source>
        </audio>
        <audio className="florero">
          <source src={florero}></source>
        </audio>
        <audio className="camioneta">
          <source src={camioneta}></source>
        </audio>
        <audio className="telefono">
          <source src={telefono}></source>
        </audio>
      </div>
    );
  }
}
