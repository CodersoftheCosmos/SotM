import React, { Component } from "react";
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
	};
	this.fetchMessages = this.fetchMessages.bind(this);
  }

//   componentWillMount() {
//     //this.props.socket.emit("client.fetchMessages");
//   }

	async componentDidMount() {
    // await this.props.socket.on('homeChat', message => {
    //   this.setState({ messages: [message, ...this.state.messages] });
    // });
    this.props.socket.on("fetchAllMessages", this.fetchMessages)
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
        username: this.props.user[0].username,
		content: this.state.message,
		room: this.props.user[0].username,
	  });
  }

  resetInput(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="chatbox">
          {this.state.messages.length > 0 &&
            this.state.messages.slice(0, 20).map((message, i) => {
              return (
                <div key={i}>{`${message.username}: ${message.content}`}</div>
              );
            })}
        </div>
		<form onSubmit={e => this.resetInput(e)}>
          <textarea onKeyUp={e => this.handleChat(e)} className="chatArea"/>
		  <div>
			<button type="submit" onClick={() => this.handleSubmit()}>
				Submit
			</button>
		  </div>
        </form>
		<style>
			{`
				.chatContainer {
					float: right;
					height: 500px;
					width: 500px;
				}
			`}
		</style>
      </div>
    );
  }
}

export default Chat;