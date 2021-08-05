import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./button.css";

export default class LinkButton extends Component {
  constructor(props) {
    super(props);
    this.className = `start-btn font-luckiest-guy p-4 m-4 h-full hover:bg-yellow-400 text-white rounded-3xl ${this.props.color} ${this.props.fontSize}`;
  }

  render() {
    let content;
    if (this.props.label !== undefined) {
      content = <label>{this.props.label}</label>;
    }
    if (this.props.icon !== undefined) {
      content = <i class={this.props.icon}></i>;
    }

    return (
      <Link to={this.props.to} className={this.className}>
        {content}
      </Link>
    );
  }
}
