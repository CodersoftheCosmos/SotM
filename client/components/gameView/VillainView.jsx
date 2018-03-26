import React, { Component } from 'react';

class VillainView extends Component {
    render() {
        return (
            <div className="villain">
                <div className="info">
                    <h2 className="heroInfo">{this.props.currentState.villain.name} HP: {this.props.currentState.villain.hp}</h2>
                </div>
                <img src={this.props.currentState.villain.imageUrl} height="200" width="200"/>
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
