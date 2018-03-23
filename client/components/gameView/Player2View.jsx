import React, { Component } from 'react';

class PLayer2View extends Component {
    render() {
        console.log(this.props.currentState)
        return (
            <div className="p2">
                <div className="info">
                    <h2 className="playerName">Player 2: {this.props.currentState.username} </h2>
                    <h2 className="heroInfo">{this.props.currentState.hero} HP: {this.props.currentState.hp}</h2>
                </div>
                <img src={this.props.currentState.imageURL} height="200" width="200"/>
                <style>
                    {`
                        .heroInfo  {
                            display: inline;
                            padding-left: 20px;
                        }
                        .playerName {
                            display: inline;
                        }
                        .p2 {
                            border: solid 1px;
                        }
                    `}
                </style>
            </div>      
        );
    }

}
export default PLayer2View;
