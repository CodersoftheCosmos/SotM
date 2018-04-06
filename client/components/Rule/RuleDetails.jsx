import React, { Component } from 'react';
import './RuleDetails.css'

class RuleDetails extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
	return (
			<div id="ruledetails" >
				<p>
				<span id="codestart">Coders of the Cosmos Rules</span><br/><br/>

The object of the game is for the heroes to work together to reduce the villain down to 0 HP.<br/><br/>

The game ends when either the villain is reduced to 0 HP, or all of the heroes are reduced to 0 HP.<br/><br/>

The game begins with the villain’s turn. The villain will draw a card from their deck, and this card will immediately enter play and take effect.
<br/><br/>
Each character will start with their own unique stats that can be increased or decreased by cards throughout the game.
<br/><br/>
<span id="codestat">HP </span>- (Hit Points) This is the character’s health. When this number reaches 0, the character has been defeated and is removed from the game.
<br/><br/>
<span id="codestat">Defense Bonus</span> - (Represented by the shield icon) Any damage done to the character is reduced by this amount for each attack
<br/><br/>
<span id="codestat">Attack Bonus</span> - (Represented by the fist icon) Any damage done by the character is increased by this amount for each attack
<br/><br/>
<span id="codestat">Power</span> - This is a special power that the character can use in the game. This power may be a starting bonus to one of their stats, or an ability that takes effect under certain conditions in the game. The power is listed on the yellow bar below each character’s hand
<br/><br/>
Players will take each of their turns next, beginning with two cards, and drawing an additional card at the end of their turn in addition to any cards drawn due to card effects. During a player’s turn, they will select a card to play by clicking on it, and put it into play with the ‘Play Selected Card’ button. The card takes effect, and the play draws a card to end their turn. If neither team has been reduced to 0 HP, play continues around the table.
<br/><br/>
Cards may have one or more of the following effects:<br/>
    -Do Damage to a character or characters (reduce HP)<br/>
    -Heal a character or characters (increase HP)<br/>
    -Cause a character or characters to draw an additional card (does not effect normal card draw on turn)<br/>
    -Increase or decrease the Attack Bonus or Defense Bonus for a character or characters<br/>
		<br/>
		<br/>
There are two categories of cards that you can play, ongoing and one-shot. Ongoing cards have continuous effects and will remain in the ‘In-Play’ area below the power bar. One-shot cards have an instant effect that takes place and then the card is immediately discarded.
<br/>
<br/>
If any character runs out of cards in their deck, their discard pile will be shuffled and returned into their deck.
<br/>
<br/>
If the last character on a team is reduced to 0 HP after an attack, the game will immediately end (no counter attacks, damage reflection, or other effects take place).
<br/>
<br/>
If you have any other questions or comments about the game or rules, please write them on the back of a $100 bill and mail it to:
<br/>
<br/>
Coders of the Cosmos <br/>
c/o Hack Reactor<br/>
6060 Center Dr #950, <br/>
Los Angeles, CA 90045<br/>
				</p>
      </div>
		)
	}
}

export default RuleDetails;