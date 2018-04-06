import React, { Component } from "react";
import io from 'socket.io-client';
import "./Chat.css"

class RoomChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
	};
	this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentWillMount() {
    this.props.socket.emit("fetchRoomMessages", this.fetchMessages)
    //this.props.socket.on("fetchAllMessages", this.fetchMessages)
  }

	async componentDidMount() {
    await this.props.socket.on("fetchAllMessages", this.fetchMessages)
  }

  async fetchMessages(data) {
    await this.setState({
      messages: data.messages
    })
  }

  async handleChat(e) {
    e.persist();
    await this.setState({ message: e.target.value });
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
      e.target.value = "";
    }
  }

  handleSubmit() {
    this.state.message !== "\n" &&
      this.state.message.length &&
      this.props.socket.emit("createMessage", {
        username: this.props.user,
		content: this.state.message,
		roomId: 'gameRoom',
	  });
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    return (
      <div id="gameChat" >
        <div className="messageBox chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.slice(0, 20).map((message, i) => {
              return (
                <div className="message" key={i}>{`${message.username}: ${message.content}`}</div>
              );
            })}
        </div>
        <form className="chatInput" onSubmit={e => this.resetInput(e)}>
              <textarea onKeyUp={e => this.handleChat(e)} className="chatArea"/>
          <div>
          <button className="roundBtn" type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomChat;