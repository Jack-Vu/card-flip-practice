import { createContext, useState } from "react";
import { generateCardData } from "../utils";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const numberOfCards = 36;
  const [cardData, setCardData] = useState(generateCardData(numberOfCards));
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (card) => {
    if (flippedCard) {
      if (flippedCard.imageUrl === card.imageUrl) {
        const updatedCardData = cardData.map((cardItem) => {
          if (cardItem.id === card.id || cardItem.id === flippedCard.id) {
            return {
              ...cardItem,
              isMatched: true,
            };
          }
          return cardItem;
        });
        setCardData(updatedCardData);
      } else {
        const updatedCardData = cardData.map((cardItem) => {
          return {
            ...cardItem,
            isFlipped: false,
          };
        });
        setCardData(updatedCardData);
      }
      setFlippedCard(null);
    } else {
      const updatedCardData = cardData.map((cardItem) => {
        if (cardItem.id === card.id) {
          return {
            ...cardItem,
            isFlipped: true,
          };
        }
        return cardItem;
      });
      setCardData(updatedCardData);
      setFlippedCard(card);
    }
  };

  console.log(cardData);

  return (
    <CardDataContext.Provider
      value={{ numberOfCards, cardData, handleCardClick }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
