import React, { Component } from 'react';

class VillainView extends Component {
    render() {
        console.log(this.props.currentState)
        return (
            <div className="villain">
                <div className="info">
                    <h2 className="heroInfo">{this.props.currentState.villain} HP: {this.props.currentState.hp}</h2>
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
                        .villain {
                            border: solid 1px;
                        }
                    `}
                </style>
            </div>      
        );
    }

}
export default VillainView;
