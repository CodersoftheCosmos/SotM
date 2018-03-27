import React, { Component } from 'react';

class PLayer2View extends Component {
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
                        return (<img className="cards" src={card.photo} onClick={()=>{this.props.handleCard(card)}} height={100} width={70} key={i}/>)
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
                    `}
                </style>
            </div>      
        );
    }

}
export default PLayer2View;
