import React, { Component } from "react";
import ActionButton from "../components/ActionButton";
import LinkButton from "../components/LinkButton";
import Card from "../components/CardsList/Card";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default class Game4 extends Component {
  state = {
    backgroundcolor1: "",
    backgroundcolor2: "",
    backgroundcolor3: "",
    backgroundcolor4: "",
    backgroundcolor5: "",
    backgroundcolor6: "",
    backgroundcolor7: "",
    backgroundcolor8: "",
    backgroundcolor9: "",
    list: ["p", "p", "q", "p", "q", "p"],
    score: { correct: 0, incorrect: 0 },
    redirect: null,
  };

  componentDidMount = () => {
    //let aux;
    //aux = this.state.list;
    //this.shuffle(aux);
    //this.setState({ list: aux });
  };

  shuffle = (array) => {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  handleClick1 = () => {
    if (this.state.backgroundcolor1 === "") {
      this.setState({
        backgroundcolor1: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor1: "",
      });
    }
  };
  handleClick2 = () => {
    if (this.state.backgroundcolor2 === "") {
      this.setState({
        backgroundcolor2: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor2: "",
      });
    }
  };
  handleClick3 = () => {
    if (this.state.backgroundcolor3 === "") {
      this.setState({
        backgroundcolor3: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor3: "",
      });
    }
  };
  handleClick4 = () => {
    if (this.state.backgroundcolor4 === "") {
      this.setState({
        backgroundcolor4: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor4: "",
      });
    }
  };
  handleClick5 = () => {
    if (this.state.backgroundcolor5 === "") {
      this.setState({
        backgroundcolor5: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor5: "",
      });
    }
  };
  handleClick6 = () => {
    if (this.state.backgroundcolor6 === "") {
      this.setState({
        backgroundcolor6: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor6: "",
      });
    }
  };
  handleClick7 = () => {
    if (this.state.backgroundcolor7 === "") {
      this.setState({
        backgroundcolor7: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor7: "",
      });
    }
  };
  handleClick8 = () => {
    if (this.state.backgroundcolor8 === "") {
      this.setState({
        backgroundcolor8: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor8: "",
      });
    }
  };
  handleClick9 = () => {
    if (this.state.backgroundcolor9 === "") {
      this.setState({
        backgroundcolor9: "#FCD34D",
      });
    } else {
      this.setState({
        backgroundcolor9: "",
      });
    }
  };
  verifyResult = async () => {
    var valid = [
      this.state.backgroundcolor1,
      this.state.backgroundcolor2,
      this.state.backgroundcolor4,
      this.state.backgroundcolor6,
    ];
    var invalid = [this.state.backgroundcolor3, this.state.backgroundcolor5];
    const val = valid.find((item) => item === "");
    const inv = invalid.find((item) => item === "#FCD34D");
    if (val === undefined && inv === undefined) {
      var unaEstrella = [
        '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;" >★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
      ];
      var dosEstrella = [
        '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
      ];
      var tresEstrella = [
        '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label></div>',
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
        html: `Correctos: <b> 1 punto</b> <br> Incorrectos: <b>${this.state.score.incorrect} puntos</b> ${estrellas}`,
      });
      axios
        .post(`http://localhost:4000/api/activities`, {
          nombre: "Identificacion Visual 1",
          correctas: this.state.score.correct,
          incorrectas: this.state.score.incorrect,
          usuario: "612e67614c524b34e4811f92",
        })
        .catch((err) => {
          console.error(err);
        });
      this.setState({ redirect: "/games" });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Intentalo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
      this.setState({
        score: {
          correct: this.state.score.correct,
          incorrect: this.state.score.incorrect + 1,
        },
      });
    }
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
    return (
      <div className="g1 h-screen pb-7">
        <div className="inline-flex mt-6">
          <LinkButton
            to="/games"
            icon="fas fa-home"
            color="bg-yellow-500"
            fontSize="flex-1 text-4xl p-4 mx-2"
          />
          <ActionButton
            icon="fas fa-address-book"
            color="bg-blue-500"
            fontSize="flex-1 text-4xl p-4"
            handleAnswer={this.showInstructions}
          />
        </div>
        <div className="flex ml-96 text-center mb-5">
          <div className="flex-initial">
            <Card content={this.state.list[0][0]} Bg="true" />
          </div>
          <div className="flex-initial mt-11">
            <ActionButton
              icon="fas fa-check"
              color="bg-green-500"
              fontSize="text-4xl mt-12 ml-5 p-4"
              handleAnswer={this.verifyResult}
            />
          </div>
        </div>

        <div className="flex mx-60 text-center">
          <div className="flex-1" onClick={this.handleClick1}>
            <Card content={this.state.list[0]} changeBg="true" />
          </div>
          <div className="flex-1" onClick={this.handleClick2}>
            <Card content={this.state.list[1]} changeBg="true" />
          </div>
          <div className="flex-1" onClick={this.handleClick3}>
            <Card content={this.state.list[2]} changeBg="true" />
          </div>
        </div>
        <div className="flex mx-60 my-3 text-center">
          <div className="flex-1" onClick={this.handleClick4}>
            <Card content={this.state.list[3]} changeBg="true" />
          </div>
          <div className="flex-1" onClick={this.handleClick5}>
            <Card content={this.state.list[4]} changeBg="true" />
          </div>
          <div className="flex-1" onClick={this.handleClick6}>
            <Card content={this.state.list[5]} changeBg="true" />
          </div>
        </div>
      </div>
    );
  }
}
