import React, {Component} from 'react'

export default ({handleCreateGame, handleOnChange}) => (
    <form>
        <input type="text" className="commentArea" onChange={handleOnChange}/>
        <button onClick={()=> handleCreateGame()}>Create Game</button>
    </form>
)