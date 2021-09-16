import React, { Component } from "react";

import "./button.css";

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.className = `start-btn font-luckiest-guy hover:bg-yellow-400 text-white rounded-3xl text-center m-auto ${this.props.color} ${this.props.fontSize}`;
  }

  handleAnswer = () => {
    this.props.handleAnswer();
  };

  render() {
    let content;
    if (this.props.label !== undefined) {
      content = <label>{this.props.label}</label>;
    }
    if (this.props.icon !== undefined) {
      content = <i className={this.props.icon}></i>;
    }

    return (
      <label
        className={this.className}
        onClick={this.handleAnswer}
      >
        {content}
      </label>
    );
  }
}
