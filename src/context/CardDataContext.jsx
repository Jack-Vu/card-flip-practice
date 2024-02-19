import { createContext, useState } from "react";
import { generateCardData } from "../utils";
import { Levels, Speeds } from "../constants";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(generateCardData(Levels["4x4"]));
  const [flippedCard, setFlippedCard] = useState(null);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    const newCards = generateCardData(level);
    setCardData(newCards);
    setFlippedCard(null);
  };

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
      }, speed);
    } else {
      const updatedCardData = cardData.map((cardItem) => {
        return {
          ...cardItem,
          isFlipped: false,
        };
      });

      setTimeout(() => {
        setCardData(updatedCardData);
      }, speed);
    }
    setFlippedCard(null);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    const newCards = generateCardData(newLevel);
    setCardData(newCards);
  };

  console.log(cardData);

  return (
    <CardDataContext.Provider
      value={{
        gameStarted,
        numberOfCards: level,
        cardData,
        level,
        speed,
        handleLevelChange,
        setSpeed,
        handleStartGame,
        handleNewGame,
        handleCardClick,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
