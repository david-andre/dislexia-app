import React, { Component } from "react";
import Card from "./Card";

import "./cardsList.css";

export default class CardsList extends Component {
  render() {
    return (
      <div className="cards-list">
        <Card
          content={this.props.options[0][0].text}
          handleClick={this.props.handleClick}
        />
        <Card
          content={this.props.options[0][1].text}
          handleClick={this.props.handleClick}
        />
        <Card
          content={this.props.options[0][2].text}
          handleClick={this.props.handleClick}
        />
      </div>
    );
  }
}
