import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class UserList extends Component {

    renderList() {
        return this.props.users.map((user, index) => {
            return (
                <li key={index}> 
                    {user.first} {user.last}
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.renderList()}
            </ul>
        );
    }

}

// Goes into Store and retrieves what we want and pass it as props to UserList

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

// Get actions and pass them as props to to UserList

// function matchDispatchToProps(dispatch){

// }

// conversion from "dumb" component to "container"
export default connect(mapStateToProps)(UserList);
