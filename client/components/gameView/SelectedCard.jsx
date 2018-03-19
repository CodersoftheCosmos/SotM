import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { selectedCard } from '../../actions/cardselected'


class SelectedCard extends Component {


    render() {
        if(this.props.card !== null) {
            return (
            <div>
                <img src={this.props.card.image} height="400" width="400" /> <br/>
                {this.props.card.name} <br/>
                Description
                {this.props.card.desc} <br/>
                <input type="button" value="back" onClick={()=> this.props.selectedCard(null)}/>
                <input type="button" value="Play Card"/>
            </div>
            );
        } else {
            return <div> Nothing selected </div>
        }
    }

}

// Goes into Store and retrieves what we want and pass it as props to UserList

function mapStateToProps(state) {
    return {
        card: state.activeCard
    };
}

function matchDispatchToProps(dispatch){
    //when selected card is called, passed to all reducers
    return bindActionCreators( { selectedCard: selectedCard }, dispatch)
}

// conversion from "dumb" component to "container"
export default connect(mapStateToProps, matchDispatchToProps)(SelectedCard);
