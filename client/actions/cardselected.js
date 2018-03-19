export function selectedCard(card) {
  if(card !== null)
  console.log("this card was selected", card.name)

  return {
    type: 'cardSelected',
    payload: card
  }
}