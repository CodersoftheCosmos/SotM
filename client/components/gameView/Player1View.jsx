import React, { Component } from 'react';

class PLayer1View extends Component {

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

    handleHover(e) {
        console.log('this is handle hover in player1')
        if([...e.target.classList].includes('large')) {
            e.target.classList.add('small');
            e.target.classList.remove('large');
        }
    }
    
    
    render() {
      
        return (
            <div className="p1">
                <div className="info">
                    <h2 className="playerName">Player 1: {this.props.currentState.username} </h2>
                    <h2 className="heroInfo">{this.props.currentState.hero.name} HP: <span className="health">{this.props.currentState.hero.hp}</span></h2>
                </div>
                    <div>
                        <img src={this.props.currentState.hero.imageUrl} className="charIcon" />
                        <span>
                            {this.props.currentState.hand.map((card, i) => {
                                return (<img className="cards card small" src={card.photo} key={i} onClick={(e)=>{ this.props.handleCard(card); this.enlargeCard(e)}} onMouseOut={(e)=>{this.handleHover(e)}} />)
                            })}
                        </span>
                        <button onClick={() => {console.log(this.props.selectedCard)}} >props</button>
                        <button className="playCard" onClick={() => {this.props.handleFinishTurn()} }>Play Your Hand</button>
                        <div className="col deck" >
                            <img src="https://i.imgur.com/Mpcg57S.jpg" height="150" width="100" />
                            <div align='center' >Deck</div>
                    </div>
                    <div className="power">Power: Deal {this.props.currentState.hero.power} damage</div>
                </div>

                <style>
                    {`
                        .power {
                            background-color: yellow;
                            border: solid black 2px;
                        }

                        .health {
                            radius: 5px;
                            background-color: red;
                        }

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

                        .small {
                            transition: all 1s ease-in-out;
                            height: 100px;
                            width: 70px;
                        }

                        .large {
                            transition: all 1s ease-in-out;
                            height: 300px;
                            width: 210px;
                        }

                        .card {
                            transition: all 1s ease-in-out;
                            background: #fff;
                            display: inline-block;
                            margin: 2px;
                            box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
                            z-index: 5;
                        }

                        .card:hover {
                            transition: all 1s ease-in-out;
                            transform: scale(2);
                            box-shadow: 30px 30px 15px rgba(0, 0, 0, 0.2);
                            z-index: 10;
                        }
                    `}
                </style>
            </div>    
        );
    }
    
}
export default PLayer1View;

