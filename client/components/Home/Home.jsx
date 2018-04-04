import React, { Component } from 'react';
import Stats from './Stats.jsx';
import { connect } from 'react-redux';
import { selectRules } from '../../actions/rules'
import { bindActionCreators } from 'redux';
import Rules from '../Rule/Rules'
import { Redirect } from 'react-router-dom';
import Chat from '../chat/Chat';
import "./Home.css"
import Lobby from '../gameJoin/Lobby';
import io from 'socket.io-client';


class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			gameReady: 0
		}
		this.startGame = this.startGame.bind(this)
	}

	componentWillMount() {
		this.socket = io('http://localhost:9002', {
			query: {
			roomId: "home",
			username: this.props.user[0].username,
			}
		});

		this.socket.on('startTheGame', this.startGame)
	}

<<<<<<< HEAD
	startGame() {
		this.setState({ gameReady: 1 })
	}
	
	render() {
		if(this.props.user[0] === null) {
			return (
				<div>
						<Redirect to="/"/>
				</div>
				)
		}
		else if (this.props.activeRules === true) {
			return (
				<div>
						<Rules />
				</div>
				)
		} else if ( this.state.gameReady === 1) {
			return (
				<div>
						<Redirect to="/game" />
				</div>
				)
		} else {
			return (
					<div>
						<div align="right">
							<button name="logout" onClick={this.props.click}>Logout</button>
						</div>
						<div align="center">
							{this.props.user.username}
							<Stats />
							<input type="button" value="Rules" onClick={()=> this.props.selectRules(true)}/>
							<Chat user={this.props.user[0].username} socket={this.socket} />
						</div>
						<Lobby user={this.props.user[0].username} socket={this.socket}/>
						{/* create a global chat using the room name home so that every player can talk to each other */}
					</div>
				)
			}
	}
=======
    startGame() {
        this.setState({ gameReady: 1 })
    }
    
    render() {
        if(this.props.user[0] === null) {
            return (
                <div>
                        <Redirect to="/"/>
                </div>
                )
        }
        else if (this.props.activeRules === true) {
            return (
                <div>
                        <Rules />
                </div>
                )
        } else if ( this.state.gameReady === 1) {
            return (
                <div>
                        <Redirect to="/game" />
                </div>
                )
        } else {
            return (
                    <div>
                        <div id="log">
                            <button className="btn" id="logout" name="logout" onClick={this.props.click}>Logout</button>
                        </div>
                        <div id="main" align="center">
														<h1 id="welcome" > {this.props.user.username} </h1>
                            <Stats />
                            <input className="btn btn-primary" type="button" value="Rules" onClick={()=> this.props.selectRules(true)}/>
                            <Chat user={this.props.user[0].username} socket={this.socket} />
                        </div>
                        <Lobby user={this.props.user[0].username} socket={this.socket}/>
                        {/* create a global chat using the room name home so that every player can talk to each other */}
                    </div>
                )
            }
    }
>>>>>>> basic styling
}

function mapStateToProps(state) {
    return {
            user: state.activeUser,
            activeRules: state.rules,
    };
}

function matchDispatchToProps(dispatch){
    //when selected card is called, passed to all reducers
    return bindActionCreators( { selectRules: selectRules }, dispatch)
}

// conversion from "dumb" component to "container"

export default connect(mapStateToProps, matchDispatchToProps)(Home);