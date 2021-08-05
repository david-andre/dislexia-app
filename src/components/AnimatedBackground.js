import React, { Component } from "react";
import "./animatedBackground.css";

export default class AnimatedBackground extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
