import React from 'react';

export default ({game, handleJoinGame}) => (
    <div>
      <h3><a href="#">{game.username}</a> players: <a href="#">{game.players}</a>/{game.maxPlayers} {game.comments} <button onClick={ () => handleJoinGame(game.username)}>Join Game</button> </h3> 
    </div>
)