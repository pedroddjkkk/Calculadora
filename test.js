//array contendo todos os tipos de naipe do baralho
const suits = ['♠', '♥', '♦', '♣'];
//array contendo todos os valores do baralho
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

//função que cria um baralho com 52 cartas
function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({
        value,
        suit
      });
    }
  }
  return deck;
}

//função que embaralha o baralho
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//função que distribui as cartas para os jogadores
function dealCards(deck, players, cardsPerPlayer) {
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let player of players) {
      player.hand.push(deck.pop());
    }
  }
}

//função que retorna o valor da carta
function getCardNumericValue(card) {
  switch (card.value) {
    case 'A':
      return 1;
    case 'J':
    case 'Q':
    case 'K':
      return 10;
    default:
      return parseInt(card.value);
  }
}

//função que retorna o valor da mão do jogador
function getHandValue(hand) {
  let value = 0;
  let hasAce = false;
  for (let card of hand) {
    value += getCardNumericValue(card);
    if (card.value === 'A') {
      hasAce = true;
    }
  }
  if (hasAce && value + 10 <= 21) {
    return value + 10;
  }
  return value;
}

//função que retorna o vencedor
function getWinner(players) {
  let winner = null;
  for (let player of players) {
    if (!winner || getHandValue(player.hand) > getHandValue(winner.hand)) {
      winner = player;
    }
  }
  return winner;
}

//função que retorna o nome do jogador
function getPlayerName(player) {
  return player.name;
}

