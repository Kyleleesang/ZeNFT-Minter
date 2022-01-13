import React, { Component } from "react";

export default class PopUp extends Component {
   

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
        <span className="close">
            &times;
          </span>
          <form>
            <h3></h3>
            <label class="offer">
              Enter offer amount
              <input type="text" name="name" class="inoffer"/>
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}