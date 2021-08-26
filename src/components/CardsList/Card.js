import React, { Component } from "react";
import mi from "../../assets/audio/mi.mp3";
import ni from "../../assets/audio/ni.mp3";
import ti from "../../assets/audio/ti.mp3";
import se from "../../assets/audio/se.mp3";
import ce from "../../assets/audio/ce.mp3";
import te from "../../assets/audio/te.mp3";
import ta from "../../assets/audio/ta.mp3";
import re from "../../assets/audio/re.mp3";
import me from "../../assets/audio/me.mp3";
import ne from "../../assets/audio/ne.mp3";
import pe from "../../assets/audio/pe.mp3";
import mo from "../../assets/audio/mo.mp3";
import po from "../../assets/audio/po.mp3";
import fo from "../../assets/audio/fo.mp3";
import ca from "../../assets/audio/ca.mp3";
import ra from "../../assets/audio/ra.mp3";
import ro from "../../assets/audio/ro.mp3";
import flo from "../../assets/audio/flo.mp3";
import mio from "../../assets/audio/mio.mp3";
import le from "../../assets/audio/le.mp3";
import no from "../../assets/audio/no.mp3";
import qu from "../../assets/audio/qu.mp3";
import eme from "../../assets/audio/eme.mp3";
import ene from "../../assets/audio/ene.mp3";
import be from "../../assets/audio/be.mp3";
import de from "../../assets/audio/de.mp3";

export default class Card extends Component {
  state = {
    bg: "card bg-red-600",
  };
  handleClick = () => {
    this.props.handleClick(this.props.content);
  };
  playAudio = () => {
    const audioEl = document.getElementsByClassName(this.props.content)[0];
    audioEl.play();
  };
  changeBg = () => {
    if (this.state.bg === "card bg-red-600") {
      this.setState({
        bg: "card bg-yellow-600",
      });
    }
    if (this.state.bg === "card bg-yellow-600") {
      this.setState({
        bg: "card bg-red-600",
      });
    }
  };

  render() {
    let content;
    let audio = (
      <div>
        <audio className="MI">
          <source src={mi}></source>
        </audio>
        <audio className="m">
          <source src={eme}></source>
        </audio>
        <audio className="n">
          <source src={ene}></source>
        </audio>
        <audio className="b">
          <source src={be}></source>
        </audio>
        <audio className="d">
          <source src={de}></source>
        </audio>
        <audio className="NO">
          <source src={no}></source>
        </audio>
        <audio className="LÉ">
          <source src={le}></source>
        </audio>
        <audio className="MIO">
          <source src={mio}></source>
        </audio>
        <audio className="CA">
          <source src={ca}></source>
        </audio>
        <audio className="FLO">
          <source src={flo}></source>
        </audio>
        <audio className="RA">
          <source src={ra}></source>
        </audio>
        <audio className="RO">
          <source src={ro}></source>
        </audio>
        <audio className="TA">
          <source src={ta}></source>
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
        <audio className="q">
          <source src={qu}></source>
        </audio>
        <audio className="p">
          <source src={pe}></source>
        </audio>
      </div>
    );

    if (this.props.handleClick !== undefined) {
      content = (
        <div className="card bg-red-600" onClick={this.handleClick}>
          <div className="card_title title-white">
            <p className="font-luckiest-guy">
              {this.props.content}{" "}
              <i
                id="icon"
                class="fas fa-volume-up text-2xl inline-block align-text-top"
                onClick={this.playAudio}
              />
            </p>
          </div>
          {audio}
        </div>
      );
    }
    if (this.props.handleClick === undefined) {
      if (this.props.changeBg !== undefined) {
        if (this.props.changeBg === true) {
          <div className="card bg-red-600" onClick={this.changeBg}>
            <div className="card_title title-white">
              <p>
                {this.props.content}{" "}
                <i
                  id="icon"
                  class="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                  onClick={this.playAudio}
                />
              </p>
            </div>
            {audio}
          </div>;
        } else {
          content = (
            <div className={this.state.bg} onClick={this.changeBg}>
              <div className="card_title title-white">
                <p className="text-7xl">
                  {this.props.content}{" "}
                  <i
                    id="icon"
                    class="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                    onClick={this.playAudio}
                  />
                </p>
              </div>
              {audio}
            </div>
          );
        }
      } else {
        if (this.props.Bg !== undefined) {
          content = (
            <div className="card bg-yellow-600">
              <div className="card_title title-white">
                <p className="text-7xl">
                  {this.props.content}{" "}
                  <i
                    id="icon"
                    class="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                    onClick={this.playAudio}
                  />
                </p>
              </div>
              {audio}
            </div>
          );
        } else {
          content = (
            <div className="card bg-red-600">
              <div className="card_title title-white">
                <p className="font-luckiest-guy text-7xl">
                  {this.props.content}{" "}
                  <i
                    id="icon"
                    class="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                    onClick={this.playAudio}
                  />
                </p>
              </div>
              {audio}
            </div>
          );
        }
      }
    }
    return (
      <div>
        {content}
        {audio}
      </div>
    );
  }
}
