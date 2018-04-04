import React, { Component } from 'react';

class PLayer2View extends Component {

    constructor(props) {
        super(props)
    }

    enlargeCard(e) {
        
        if ([...e.target.classList].includes('small')) {
            e.target.classList.add('large');
            e.target.classList.remove('small');
        } else {
            e.target.classList.add('small');
            e.target.classList.remove('large');
        }
       
    }

    render() {
        return (
            <div className="p2">
                <div className="info">
                    <h2 className="playerName">Player 2: {this.props.currentState.username} </h2>
                    <h2 className="heroInfo">{this.props.currentState.hero.name} HP: {this.props.currentState.hero.hp}</h2>
                </div>
                <img src={this.props.currentState.hero.imageUrl} className="charIcon" />

                <span>
                    {this.props.currentState.hand.map((card, i) => {
                        return (<img className="cards small" src={card.photo} onClick={(e)=>{this.props.handleCard(card); this.enlargeCard(e)}} key={i}/>)
                    })}
                </span>
                 <button className="playCard" onClick={() => {this.props.handleFinishTurn()} }>Play Your Hand</button>
                    <div className="col deck" >
                        <img src="https://i.imgur.com/Mpcg57S.jpg" height="150" width="100" />
                        <div align='center' >Deck</div>
                    </div>
                <div className="power">Power: Deal {this.props.currentState.hero.power} damage</div>
                <style>
                    {`
                        p {
                            displaye: inline;
                        }
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
                        .small {
                            height: 100px;
                            width: 70px;
                        }
                        .large {
                            height: 300px;
                            width: 210px;
                        }
                    `}
                </style>
            </div>      
        );
    }

}
export default PLayer2View;