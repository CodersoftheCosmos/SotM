export function selectedCard(card) {
  console.log("this card was selected", card.name)

  return {
    type: 'cardSelected',
    payload: card
  }
}