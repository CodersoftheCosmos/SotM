import React, { Component } from 'react';

class Chat extends Component {
	constructor(){
		super()
	}
	
	handleMessageSend (e) {

	}

	render() {
	return (
			<div>
				<ul id="messages"></ul>
                <form action="">
                    <input id="m" autoComplete="off" /><button>Send</button>
                </form>
			</div>
		)
	}
}

export default Chat;