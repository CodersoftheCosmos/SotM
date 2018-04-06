import React, { Component } from 'react';

class PLayer2View extends Component {

    constructor(props) {
        super(props)
    }

    enlargeCard(e) {
        console.log('hero: ', this.props.currentState.hero)
        if ([...e.target.classList].includes('small')) {
            e.target.classList.add('large');
            e.target.classList.remove('small');
        } else {
            e.target.classList.add('small');
            e.target.classList.remove('large');
        }
       
    }

    handleHover(e) {
        if([...e.target.classList].includes('large')) {
            e.target.classList.add('small');
            e.target.classList.remove('large');
        }
    }

    render() {
        return (
            <div className="p2">
                <div className="gridRows4" >
                    <div>
                        <img src={this.props.currentState.hero.imageUrl} className="charIcon" />
                        <div className="info">
                            <h4 className="playerName">  Player 2: {this.props.currentState.username} </h4> <br />
                            <h4 className="heroInfo">{this.props.currentState.hero.name}</h4> <br />
                            <h4 className="heroInfo" >HP: {this.props.currentState.hero.hp} / {this.props.currentState.hero.maxHp}</h4> <br />
                            <div className="vertAlign row" >
                                <img className="icon vertAlign leftMargin" src="https://www.shareicon.net/data/256x256/2015/10/29/663524_protection_512x512.png" /> {this.props.currentState.hero.decreaseDamage}
                                <img className="icon vertAlign leftMargin" src="https://i.pinimg.com/originals/15/0a/37/150a3789a76da89757c28a15c764a5ae.png" /> {this.props.currentState.hero.increaseDamage}
                            </div> <br />
                            <button className="playCard btn btn-primary" onClick={() => {this.props.handleFinishTurn()} }>Play Selected Card</button>                    
                        </div>
                    </div>

                    </div>
                    <span>
                        {this.props.currentState.hand.map((card, i) => {
                            return (<img className="cards card small" src={card.photo} onClick={(e)=>{this.props.handleCard(card); this.enlargeCard(e)}} onMouseOut={(e)=>{this.handleHover(e)}} key={i}/>)
                        })}
                    </span>
                    <div className="power">Power: {this.props.currentState.hero.power}</div>
                    <span>
                        {this.props.inplay.map((card, i) => {
                            return (<img className="cards card small" src={card.photo} key={i} />)
                        })}
                    </span>   
                    <style>
                        {`
                            .power {
                                background-color: yellow;
                                border: solid black 2px;
                                font-family: "Bangers";
                                letter-spacing: 1.5px;
                                color: black;
                            }

                            p {
                                displaye: inline;
                            }

                            .heroInfo  {
                                display: inline;
                            }

                            .playerName {
                                display: inline;
                            }

                            .p2 {
                                border: solid black;
                                border-width: 0px 10px 10px 5px;
                                background-image: url("https://st2.depositphotos.com/6741230/11807/v/950/depositphotos_118073978-stock-illustration-halftone-color-pop-art-background.jpg");
                                background-size: 100% 100%;
                                height: 100%;
                            }

                            .deck {
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
                                font-family: "Bangers";
                                letter-spacing: 1.5px;
                                color: black;
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
                            
                            .gridRows2 {
                                display: grid;
                                grid-template-rows: auto auto;
                            }

                            .gridRows3 {
                                display: grid;
                                grid-template-rows: auto auto auto;
                            }

                            .gridRows4 {
                                display: grid;
                                grid-template-rows: auto auto auto auto;
                            }

                            .gridColums2 {
                                display: grid;
                                grid-template-columns: auto auto;
                            }

                            .gridColums3 {
                                display: grid;
                                grid-template-columns: auto auto auto;
                            }
                        `}
                    </style>
            </div>      
        );
    }

}
export default PLayer2View;