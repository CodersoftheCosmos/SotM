
function createPlayer (username, hero) {
    this.username = username;
    this.hero = hero;
};

function createVillain (villain){
    this.villain = villain;
};

 const shuffleCardDeck = function(deck){
    let i = 0
    , j = 0
    , temp = null

    for (i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
} 

const card1 = function(){

}

const card2 = function(){

}

const player1Turn = function(e1, e2) {
    e1;
    e2;
}

// const assignHeroToPlayer = function(player, hero, game) {
//     initialPlayer.username = player;
//     initialPlayer.hero = hero.name;
//     initialPLayer.hp = hero.hp;
//     initialPlayer.cardDeck = hero.cardDeck;
// }
// function Player (hero, player) {
//     this.hero = hero;
//     this.player = player;
// }

// const assignVillain = function (currVillain, game) {
//     game.villain = initialVillain;
//     game.initialVillain.villain = currVillain.name;
//     game.initialVillain.hp = currVillain.hp;
//     game.initialVillain.cardDeck = currVillain.cardDeck;
// }

module.exports = {
    createPlayer,
    createVillain,
    shuffleCardDeck,
}

