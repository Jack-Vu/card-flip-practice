import { createContext, useState } from "react";
import { generateCardData } from "../utils";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const numberOfCards = 36;
  const [cardData, setCardData] = useState(generateCardData(numberOfCards));
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (card) => {
    if (flippedCard && card.id === flippedCard.id) {
      return;
    }

    const numberOfFlippedCards = cardData.filter(
      (cardItem) => cardItem.isFlipped
    ).length;

    if (numberOfFlippedCards >= 2) {
      return;
    }

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

    if (!flippedCard) {
      setFlippedCard(card);
      return;
    }

    if (flippedCard.imageUrl === card.imageUrl) {
      const updatedCardData = cardData.map((cardItem) => {
        if (cardItem.id === card.id || cardItem.id === flippedCard.id) {
          return {
            ...cardItem,
            isFlipped: false,
            isMatched: true,
          };
        }
        return cardItem;
      });

      setTimeout(() => {
        setCardData(updatedCardData);
      }, 1000);
    } else {
      const updatedCardData = cardData.map((cardItem) => {
        return {
          ...cardItem,
          isFlipped: false,
        };
      });

      setTimeout(() => {
        setCardData(updatedCardData);
      }, 1000);
    }
    setFlippedCard(null);
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
