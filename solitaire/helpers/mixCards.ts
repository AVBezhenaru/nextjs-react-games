import CardModel from "../models/CardModel";

export const mixCards = (cardsToMix: CardModel[]) => {
  for (let i = 0; i < cardsToMix.length; i++) {
    const rnd = Math.floor(Math.random() * 52);
    if (rnd === i) continue;
    else {
      const prev = cardsToMix[rnd];
      const next = cardsToMix[i];
      cardsToMix[rnd] = next;
      cardsToMix[i] = prev;
    }
  }

  return cardsToMix;
}