import React, { Component } from 'react';

class PLayer1View extends Component {
    render() {
        return (
            <div className="p1">
                <div className="info">
                    <h2 className="playerName">Player 1: {this.props.currentState.username} </h2>
                    <h2 className="heroInfo">{this.props.currentState.hero} HP: {this.props.currentState.hp}</h2>
                </div>
                <img src={this.props.currentState.imageURL} height="200" width="200"/>
                <span>
                    {this.props.currentState.hand.map((card, i) => {
                        return (<img src={card.photo}  height={100} width={100} key={i}/>)
                    })}
                </span>
                <style>
                    {`
                        .heroInfo  {
                            display: inline;
                            padding-left: 20px;
                        }
                        .playerName {
                            display: inline;
                        }
                        .p1 {
                            border: solid 1px;
                        }
                    `}
                </style>
            </div>    
        );
    }

}
export default PLayer1View;
