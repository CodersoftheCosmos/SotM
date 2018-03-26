import React, { Component } from 'react';

class VillainView extends Component {
    render() {
        return (
            <div className="villain">
                <div className="info">
                    <h2 className="heroInfo">{this.props.currentState.villain} HP: {this.props.currentState.hp}</h2>
                </div>
                <img src={this.props.currentState.imageURL} className="charIcon" />
                <div className="col deck" >
                    <img src="https://i.imgur.com/Mpcg57S.jpg" height="150" width="100" />
                    <div align="center" >Deck</div>
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
                        .villain {
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
export default VillainView;
