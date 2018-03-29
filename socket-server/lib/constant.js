
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

const dealDamage = function (damage, target1, target2) {
    if (target2) {
        let dmg1 = damage + eval(target1.increaseDamage) - eval(target1.decreaseDamage)
        let dmg2 = damage + eval(target1.increaseDamage) - eval(target2.decreaseDamage)
        
        target1.hp = eval(target1.hp) - dmg1 
        target2.hp = eval(target2.hp) - dmg2
    } else {
        target1.hp = eval(target1.hp) - damage + eval(target1.increaseDamage) - eval(target1.decreaseDamage) 
    }
}

const restoreHp = function (heal, target1, target2) {
    if ( target2 ) {
        if ( (eval(target1.hp) + heal) > eval(target1.maxHp) ) {
            target1.hp = target1.maxHp
        } else {
            target1.hp = eval(target1.hp) + heal
        }
        if ( (eval(target2.hp) + heal) > eval(target2.maxHp) ) {
            target2.hp = target1.maxHp
        } else {
            target2.hp = eval(target2.hp) + heal
        }
        
    } else  { 

        if ( (eval(target1.hp) + heal) > eval(target1.maxHp) ) {
            target1.hp = target1.maxHp
        } else {
            target1.hp = eval(target1.hp) + heal
        }
    }    
};

const increaseDamage = function (damage, target1, target2) {
    if ( target2 ) {
        target1.increaseDamage = eval(target1.increaseDamage) + damage;
        target2.increaseDamage = eval(target2.increaseDamage) + damage;
    } else {
        target1.increaseDamage = eval(target1.increaseDamage) + damage;
    }
}

const preventDamage = function (damage, target) {
    console.log(damage, typeof damage)
    console.log(eval(target.decreaseDamage))
    target.decreaseDamage = eval(target.decreaseDamage) + damage
    
}

const drawCard = function (target1, target2) {
    if ( target2 ) {
        target1.hand = target1.hero.cardDeck.pop();
        target2.hand = target2.hero.cardDeck.pop();
    } else {
        target1.hand = target1.hero.cardDeck.pop();
    }
}

const checkEndOfTheGame = function ( target ) {
    if ( target.hp <= 0 ) {
        return false;
    }
}

module.exports = {
    createPlayer,
    createVillain,
    shuffleCardDeck,
    dealDamage,
    increaseDamage, 
    preventDamage,
    restoreHp, 
    drawCard,
    checkEndOfTheGame
}