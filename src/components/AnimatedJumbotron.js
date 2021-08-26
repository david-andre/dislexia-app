import React, { Component } from "react";
import "./animatedJumbotron.css";

export default class AnimatedJumbotron extends Component {
  render() {
    return (
      <div className={this.props.features.style}>
        <h1 className="font-luckiest-guy text-6xl md:text-8xl text-white aj-h1">
          <span className="inline-block aj-span-1">{this.props.features.content[0]}</span>
          <span className="ml-7 inline-block content-end aj-span-2">
            {this.props.features.content[1]}
          </span>
        </h1>
      </div>
    );
  }
}
