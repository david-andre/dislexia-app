import React, { Component } from "react";
import ActionButton from "../components/ActionButton";
import LinkButton from "../components/LinkButton";
import Card from "../components/CardsList/Card";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

export default class Game5 extends Component {
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
    list: [["d", "d", "b", "d", "b", "d", "b", "d", "b"]],
    score: { correct: 0, incorrect: 0 },
    redirect: null,
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
      this.state.backgroundcolor8,
    ];
    var invalid = [
      this.state.backgroundcolor3,
      this.state.backgroundcolor5,
      this.state.backgroundcolor7,
      this.state.backgroundcolor9,
    ];
    const val = valid.find((item) => item === "");
    const inv = invalid.find((item) => item === "#FCD34D");
    if (val === undefined && inv === undefined) {
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
        html: `Correctos: <b> 1 punto</b> <br> Incorrectos: <b>${this.state.score.incorrect} puntos</b> ${estrellas}`,
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="g1 bg-gray-200 pb-7">
        <div className="py-10">
          <LinkButton
            to="/games"
            icon="fas fa-home"
            color="bg-yellow-500"
            fontSize="text-4xl mt-12"
          />
        </div>
        <div className="flex ml-96 text-center mb-5">
          <div class="flex-initial">
            <Card content={this.state.list[0][0]} Bg="true" />
          </div>
          <div className="flex-initial mt-11">
            <ActionButton
              icon="fas fa-check"
              color="bg-green-500"
              fontSize="text-4xl mt-12"
              handleAnswer={this.verifyResult}
            />
          </div>
        </div>

        <div class="flex mx-60 text-center">
          <div class="flex-1" onClick={this.handleClick1}>
            <Card content={this.state.list[0][0]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick2}>
            <Card content={this.state.list[0][1]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick3}>
            <Card content={this.state.list[0][2]} changeBg="true" />
          </div>
        </div>
        <div class="flex mx-60 my-3 text-center">
          <div class="flex-1" onClick={this.handleClick4}>
            <Card content={this.state.list[0][3]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick5}>
            <Card content={this.state.list[0][4]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick6}>
            <Card content={this.state.list[0][5]} changeBg="true" />
          </div>
        </div>
        <div class="flex mx-60 text-center">
          <div class="flex-1" onClick={this.handleClick7}>
            <Card content={this.state.list[0][6]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick8}>
            <Card content={this.state.list[0][7]} changeBg="true" />
          </div>
          <div class="flex-1" onClick={this.handleClick9}>
            <Card content={this.state.list[0][8]} changeBg="true" />
          </div>
        </div>
      </div>
    );
  }
}
