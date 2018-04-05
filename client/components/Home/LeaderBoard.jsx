import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import './LeaderBoard.css'
import { bindActionCreators } from 'redux';
import { selectLeaderboard } from '../../actions/leaderboard'


class LeaderBoard extends Component {
	constructor(props){
    super(props)
    this.state = {
      leaderB: []	
    }
    this.getLeaderBoard = this.getLeaderBoard.bind(this)
  }
  
  componentDidMount () {
    this.getLeaderBoard()
  }

  getLeaderBoard() {
    const context = this

    axios.get('/api/leaderboard')
    .then(function (response) {
      let storage = []
      for(let i = 0; i<response.data.length; i+=2) {
        storage.push(response.data[i] + " : " + response.data[i+1])
      }
      context.setState({leaderB: storage})
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderLeaderBoard () {
    
    return this.state.leaderB.slice(0, 5).map( (element, index)=> 
      <div key={index} id="board">
        <div> {index + 1} - {element} Wins </div> <br/>
      </div>
    )
  }



	render() {

    if (this.props.activeLeader === null){
        console.log("am i going in here?")
        return (
          <Redirect to="/Home" />
        ) 
    } else if (this.state.leaderB.length === 0) {
      <div>
        Loading
      </div>
    }
		return (
			<div id="leader" align="center" >
        <div id="inner">
          <h1 id="leadertitle"> LeaderBoard! </h1> <br />
          <h3> {this.renderLeaderBoard()}</h3>
          <input type="button" className="btn btn-primary" value="Back to Home" onClick={()=> this.props.selectLeaderboard(null)} />
        </div>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
        user: state.activeUser,
        activeLeader: state.leaderboard
    };
}

function matchDispatchToProps(dispatch){
	//when selected card is called, passed to all reducers
	return bindActionCreators( { selectLeaderboard: selectLeaderboard }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LeaderBoard);




