import React, {Component} from 'react'
import Game from './Game'

export default ({games, handleJoinGame}) => {
     if (games.length) {
        return (      
            <div> 
            { games.map((game, index) => <Game game={game} key={index} handleJoinGame={handleJoinGame}/> )}
             </div>
        ) 
    } else {
        return <div> No games available </div>
    }
}



