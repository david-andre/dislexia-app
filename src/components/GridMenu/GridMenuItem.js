import React, { Component } from "react";
import star from "../../assets/img/star.png";
import letters from "../../assets/img/letters.png";

export default class GridMenuItem extends Component {
  render() {
    return (
      <li className="origin-top-left transform rotate-12 pt-80 cursor-pointer">
        <div className="details absolute h-5/6 w-full md:w-9/12 top-0 bg-gray-300 rounded-3xl duration-300">
          <h2 className="gmi-h2 absolute top-2/4 transform -rotate-45 bg-white duration-300">
            Actividad
          </h2>
          <img
            className="gmi-game-img absolute w-10/12 left-1/2 top-36 duration-500"
            src={letters}
            alt="zapato"
          />
          <img
            className="gmi-stars3-img absolute w-1/4 duration-1000 opacity-25"
            src={star}
            alt="estrella"
          />
          <img
            className="gmi-stars2-img absolute w-1/4 duration-1000 opacity-25"
            src={star}
            alt="estrella"
          />

          <img
            className="gmi-stars1-img absolute w-1/4 duration-1000"
            src={star}
            alt="estrella"
          />
        </div>
      </li>
    );
  }
}
