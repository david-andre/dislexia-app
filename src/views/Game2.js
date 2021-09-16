import React, { Component } from "react";
import LinkButton from "../components/LinkButton";
import ActionButton from "../components/ActionButton";
import { Redirect } from "react-router-dom";
import Card from "../components/CardsList/Card";
import "./game2.css";
import Swal from "sweetalert2";
import axios from "axios";

import camiseta from "../assets/audio/camiseta.mp3";
import pecera from "../assets/audio/pecera.mp3";
import florero from "../assets/audio/florero.mp3";
import camioneta from "../assets/audio/camioneta.mp3";
import telefono from "../assets/audio/telefono.mp3";
import mi from "../assets/audio/mi.mp3";
import ni from "../assets/audio/ni.mp3";
import ti from "../assets/audio/ti.mp3";
import se from "../assets/audio/se.mp3";
import ce from "../assets/audio/ce.mp3";
import te from "../assets/audio/te.mp3";
import re from "../assets/audio/re.mp3";
import me from "../assets/audio/me.mp3";
import ne from "../assets/audio/ne.mp3";
import pe from "../assets/audio/pe.mp3";
import mo from "../assets/audio/mo.mp3";
import po from "../assets/audio/po.mp3";
import fo from "../assets/audio/fo.mp3";

export default class Game2 extends Component {
  state = {
    tasks: [
      {
        taskName: "MI",
        type: "inProgress",
      },
      {
        taskName: "SE",
        type: "inProgress",
      },
      {
        taskName: "TA",
        type: "inProgress",
      },
      {
        taskName: "CA",
        type: "inProgress",
      },
    ],
    options: [
      [
        {
          taskName: "PE",
          type: "inProgress",
        },
        {
          taskName: "CE",
          type: "inProgress",
        },
        {
          taskName: "RA",
          type: "inProgress",
        },
      ],
      [
        {
          taskName: "RO",
          type: "inProgress",
        },
        {
          taskName: "RE",
          type: "inProgress",
        },
        {
          taskName: "FLO",
          type: "inProgress",
        },
      ],
      [
        {
          taskName: "CA",
          type: "inProgress",
        },
        {
          taskName: "TA",
          type: "inProgress",
        },
        {
          taskName: "NE",
          type: "inProgress",
        },
        {
          taskName: "MIO",
          type: "inProgress",
        },
      ],
      [
        {
          taskName: "FO",
          type: "inProgress",
        },
        {
          taskName: "LÉ",
          type: "inProgress",
        },
        {
          taskName: "TE",
          type: "inProgress",
        },
        {
          taskName: "NO",
          type: "inProgress",
        },
      ],
      [
        {
          taskName: "",
          type: "inProgress",
        },
      ],
    ],
    correctWord: [
      "CA,MI,SE,TA",
      "PE,CE,RA",
      "FLO,RE,RO",
      "CA,MIO,NE,TA",
      "TE,LÉ,FO,NO",
    ],
    completedWord: [],
    score: { correct: 0, incorrect: 0 },
    redirect: null,
  };
  onDragStart = (event, taskName) => {
    event.dataTransfer.setData("taskName", taskName);
  };
  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, cat) => {
    let taskName = event.dataTransfer.getData("taskName");
    this.setState({
      completedWord: this.state.completedWord.push(taskName),
    });

    let tasks = this.state.tasks.filter((task) => {
      if (task.taskName === taskName) {
        task.type = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
    this.verifyWord();
  };

  verifyWord = async () => {
    let completed = this.state.tasks.find((task) => task.type === "inProgress");
    if (completed === undefined) {
      console.log(this.state.completedWord);
      console.log(this.state.correctWord[0]);
      if (this.state.completedWord.toString() === this.state.correctWord[0]) {
        await Swal.fire({
          icon: "success",
          title: "Bien hecho",
          showConfirmButton: false,
          timer: 1500,
        });
        this.setState({
          tasks: this.state.options[0],
          options: this.state.options.slice(1, this.state.options.length),
          correctWord: this.state.correctWord.slice(
            1,
            this.state.correctWord.length
          ),
          completedWord: [],
          score: {
            correct: this.state.score.correct + 1,
            incorrect: this.state.score.incorrect,
          },
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Intentalo de nuevo",
          showConfirmButton: false,
          timer: 1500,
        });
        let reload = this.state.tasks.map((item) => {
          item.type = "inProgress";
          return item;
        });
        this.setState({
          tasks: reload,
          completedWord: [],
          score: {
            correct: this.state.score.correct,
            incorrect: this.state.score.incorrect + 1,
          },
        });
      }
      if (this.state.score.correct === 5) {
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
          html: `Correctos: <b>${this.state.score.correct} puntos</b> <br> Incorrectos: <b>${this.state.score.incorrect} puntos</b> ${estrellas}`,
        });
        axios
        .post(`http://localhost:4000/api/activities`, {
          nombre: "Conciencia Fonologica 1",
          correctas: this.state.score.correct,
          incorrectas: this.state.score.incorrect,
          usuario: "612e67614c524b34e4811f92",
        })
        .catch((err) => {
          console.error(err);
        });
        this.setState({ redirect: "/games" });
      }
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

  playAudio2 = () => {
    const audioEl = document.getElementsByClassName()[0];
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
        confirmButtonText:
          '<i class="fas fa-2x fa-arrow-circle-right"></i>',
      }).then(() => {
        Swal.fire({
          title: "Instrucción 3",
          text: "Descripción",
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 500,
          imageHeight: 250,
          confirmButtonColor: "#3085d6",
          confirmButtonText:
            '<i class="fas fa-2x fa-arrow-circle-right"></i>',
        });
      });
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    var tasks = {
      inProgress: [],
      Done: [],
    };

    this.state.tasks.forEach((task, index) => {
      tasks[task.type].push(
        <div
          key={index}
          onDragStart={(event) => this.onDragStart(event, task.taskName)}
          draggable
          className="draggable card2"
        >
          <Card content={task.taskName} />
        </div>
      );
    });
    return (
      <div className="g1 h-screen mb-12">
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
        <p className="font-luckiest-guy text-5xl text-gray-200 mb-6 text-center">
          Puntaje: {this.state.score.correct}
        </p>
        <div className="drag-container">
          <div
            className="inProgress"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => {
              this.onDrop(event, "inProgress");
            }}
          >
            {tasks.inProgress}
          </div>

          <div
            className="droppable text-center "
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "Done")}
          >
            <span className="group-header font-luckiest-guy text-gray-200 text-4xl">
              Aquí
            </span>
            {tasks.Done}
          </div>
          <i
            className="fas fa-volume-up text-9xl text-gray-900 inline-block align-top mt-16 cursor-pointer"
            onClick={this.playAudio}
          ></i>
          <p className="font-luckiest-guy px-20 mx-3 text-9xl text-gray-200">
            {this.state.completedWord}
          </p>
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
        <audio className="MI">
          <source src={mi}></source>
        </audio>
        <audio className="NI">
          <source src={ni}></source>
        </audio>
        <audio className="TI">
          <source src={ti}></source>
        </audio>
        <audio className="SE">
          <source src={se}></source>
        </audio>
        <audio className="CE">
          <source src={ce}></source>
        </audio>
        <audio className="TE">
          <source src={te}></source>
        </audio>
        <audio className="RE">
          <source src={re}></source>
        </audio>
        <audio className="ME">
          <source src={me}></source>
        </audio>
        <audio className="NE">
          <source src={ne}></source>
        </audio>
        <audio className="PE">
          <source src={pe}></source>
        </audio>
        <audio className="MO">
          <source src={mo}></source>
        </audio>
        <audio className="PO">
          <source src={po}></source>
        </audio>
        <audio className="FO">
          <source src={fo}></source>
        </audio>
      </div>
    );
  }
}
