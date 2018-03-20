import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserList from './UserList'
import SelectedCard from './SelectedCard'


class mainView extends Component {


    render() {
        if(this.props.card !== null){
            return (
                <div>
                    <SelectedCard />
                </div>
            )

        } else {
            return (
                <div>
                    <UserList />
                </div>
            );
        }
    }

}

// Goes into Store and retrieves what we want and pass it as props to UserList

function mapStateToProps(state) {
    console.log(state)
    return {
        users: state.users,
        card: state.activeCard
    };
}

// Get actions and pass them as props to to UserList

// function matchDispatchToProps(dispatch){

// }

// conversion from "dumb" component to "container"
export default connect(mapStateToProps)(mainView);
