import React from 'react';

export default (props) => {
    // console.log(typeof props.card.photo)
  return (
      <div className="cards" onClick={ () => {props.card.gameOver(props.card.name)} }>
          <h3>{props.card.name}</h3>
          {/* <img src={props.card.photo} width={200} /> */}
          <img src={require('../static/scissors.png')}/>
          
        <style>
            {`
              .cards {
                  padding: 5px;
                  border: solid 2px;
                  display: inline-flex;
              }
            `}
        </style> 

      </div>
  )
}