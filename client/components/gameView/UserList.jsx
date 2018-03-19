import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectedCard } from '../../actions/cardselected'



class UserList extends Component {

    

    renderList() {
        return this.props.users.map((user, index) => {
            return (
                <div key={index} className="playerView"> 
                    <img src={user.thumbnail} height="200" width="200" />
                    {user.cards.map( (card, index) => {
                        return (
                            <div key={index}> 
                                <img src={card.image} height="200" width="200" onClick={()=> this.props.selectedCard(card)}/>  
                                {card.name}
                            </div>
                        )
                    })}
                    {user.first} {user.last}

                    <style> 
                        {`
                            .cardName {
                                float: bottom;
                                display: block;
                            }
                            h3 {
                                float: bottom;
                            }
                            .card {
                                text-align: center;
                                display: inline-flex;
                                padding: 20px;
                            }

                            .playerView {
                                margin: 15px;
                            }
                        `}
                    </style>

                </div>
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
        users: state.Players
    };
}

// Get actions and pass them as props to to UserList

function matchDispatchToProps(dispatch){
    //when selected card is called, passed to all reducers
    return bindActionCreators( { selectedCard: selectedCard }, dispatch)
}

// conversion from "dumb" component to "container"
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
