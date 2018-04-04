import React from 'react';

export default ({game, handleJoinGame}) => (
  <div>
      <h3><a href="#">{game.username}</a> Number of players: <a href="#">{game.numberPlayers}</a>/{game.maxPlayers} Comments: {game.comments} <button onClick={ () => handleJoinGame(game.username)}>Join Game</button> </h3> 
    </div>
)