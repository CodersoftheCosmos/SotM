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
              <div className="p2">
                <div className="row" >
                        <img src={this.props.currentState.hero.imageUrl} className="charIcon" />
                        <div className="info">
                            <h4 className="playerName">  Player 2: {this.props.currentState.username} </h4> <br />
                            <h4 className="heroInfo">{this.props.currentState.hero.name}</h4> <br />
                            <h4 className="heroInfo" >HP: {this.props.currentState.hero.hp} / {this.props.currentState.hero.maxHp}</h4> <br />
                            <div className="vertAlign row" >
                                <img className="icon vertAlign leftMargin" src="https://www.shareicon.net/data/256x256/2015/10/29/663524_protection_512x512.png" /> {this.props.currentState.hero.decreaseDamage}
                                <img className="icon vertAlign leftMargin" src="https://i.pinimg.com/originals/15/0a/37/150a3789a76da89757c28a15c764a5ae.png" /> {this.props.currentState.hero.increaseDamage}
                            </div>
                        </div>
                </div>
                    <span>
                        {this.props.currentState.hand.map((card, i) => {
                            return (<img className="cards card small" src={card.photo} onClick={(e)=>{this.props.handleCard(card); this.enlargeCard(e)}} onMouseOut={(e)=>{this.handleHover(e)}} key={i}/>)
                        })}
                    </span>
                    <button className="playCard" onClick={() => {this.props.handleFinishTurn()} }>Play Your Hand</button>                    
                    <div className="power">Power: {this.props.currentState.hero.power}</div>

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
                                height: 100px;
                                width: 100px;
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
                                position:absolute;
                                top:50%;
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

                            .row {
                                display: inline-block;
                                white-space: nowrap;
                            }

                            .info {
                                float: right;
                            }

                            .icon {
                                height: 25px;
                                width: 25px;
                                margin: 0;
                                padding: 0;
                            }

                            .vertAlign {
                                vertical-align: middle;
                            }

                            .leftMargin {
                                margin-left: 15px;
                            }
                    `}
                </style>
            </div>    
        );
    }
    
}
export default PLayer1View;

