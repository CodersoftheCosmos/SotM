//Dummy data for jeremy to play with

export default function () {
    return [
        {
            id: 1,
            first: "Baron",
            last: "Blade",
            cards:[{
              "name": "Backlash Field",
              "type": "Ongoing",
              "desc": "Whenever Baron Blade is dealt damage, Baron Blade deals that target 3 damage.",
              "func": "dealDamage(target,3);", 
              "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/2000px-Playing_card_spade_A.svg.png"
            },
            {
              "name": "Hasten Doom",
              "type": "One-Shot",
              "desc": "Baron Blade deals each hero target 2 damage. Play the top card of the villain deck.",
              "func": "() => { dealDamage('hero', 2); playTop(); };",
              "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/2000px-Playing_card_spade_A.svg.png"
            }],
            description: "Inventor",
            thumbnail: "http://sentinelsofthemultiverse.com/sites/sentinelsofthemultiverse.com/files/cards/images/Baron%20Blade_0.png"
        },
        {
            id: 2,
            first: "Legacy",
            last: "Parsons",
            cards:[{
              "name": "Inspiring Presence",
              "type": "Ongoing",
              "desc": "When this card enters play, each hero target regains 1 HP\nIncrease damage dealt by hero targets by 1",
              "func": "restoreHp(target, 1) increaseDamage(target, 1)",
              "limited": "true",
              "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/2000px-Playing_card_spade_A.svg.png"
            },
            {
              "name": "Back-Fist Strike",
              "type": "One-Shot",
              "desc": "Legacy deals 4 damage to 1 target",
              "func": "dealDamage(target, 4)",
              "limited": "false",
              "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/2000px-Playing_card_spade_A.svg.png"
            }],
            description: "mostly like superman",
            thumbnail: "https://tse2.mm.bing.net/th?id=OIP.W6XWVcDpu_M3hmCq-iH32AHaJz&pid=Api"
        }
    ]
  }
  
  