import React from 'react';
import Card from './Card'

 export default ({cards, gameOver, handlePlay}) => { 
     console.log(gameOver)
       return (
           <div>
               { cards.map( (card, i) =>  <Card key={i} card={card} gameOver={gameOver} handlePlay={handlePlay}/> )}
           </div>
       )
 }