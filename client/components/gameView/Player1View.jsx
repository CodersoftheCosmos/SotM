import React, { Component } from 'react';

class PLayer1View extends Component {
    render() {
        return (
            <div className="p1">
                <div className="info">
                    <h2 className="playerName">Player 1: {this.props.currentState.username} </h2>
                    <h2 className="heroInfo">{this.props.currentState.hero} HP: {this.props.currentState.hp}</h2>
                </div>
                    <div>
                        <img src={this.props.currentState.imageURL} className="charIcon" />
                        <span>
                            {this.props.currentState.hand.map((card, i) => {
                                return (<img className="cards" src={card.photo}  height={150} width={100} key={i}/>)
                            })}
                        </span>
                        <div className="col deck" >
                            <img src="https://i.imgur.com/Mpcg57S.jpg" height="150" width="100" />
                            <div align='center' >Deck</div>
                    </div>
                </div>
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
                        .deck {
                            float: right;
                            margin: 10px;
                        }
                        .cards {
                            border: solid 1px;
                            border-radius: 5px;
                            margin: 2px;
                        }
                        .charIcon {
                            height: 200px;
                            width: 200px;
                            border: solid 3px;
                            border-radius: 50%;
                        }
                    `}
                </style>
            </div>    
        );
    }

}
export default PLayer1View;
