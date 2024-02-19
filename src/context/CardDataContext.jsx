import { createContext, useEffect, useState } from "react";
import { generateCardData } from "../utils";
import { Levels, Speeds } from "../constants";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(generateCardData(Levels["4x4"]));
  const [flippedCard, setFlippedCard] = useState(null);
  const [startedTimeStamp, setStartedTimeStamp] = useState(null);

  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const numberOfUnmatchedCards = cardData.filter(
      (cardItem) => !cardItem.isMatched
    ).length;
    if (numberOfUnmatchedCards === 0) {
      setGameCompleted(true);
      setGameStarted(false);
    }
  }, [cardData]);

  const handleStartGame = () => {
    setStartedTimeStamp(new Date());
    setGameStarted(true);
    setGameCompleted(false);
    const newCardData = generateCardData(level);
    setCardData(newCardData);
    setFlippedCard(null);
    setDiffHours(0);
    setDiffMinutes(0);
    setDiffSeconds(0);
    setCounter(0);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setGameCompleted(false);

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

    setCounter((prev) => prev + 1);

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

  return (
    <CardDataContext.Provider
      value={{
        gameStarted,
        gameCompleted,
        numberOfCards: level,
        cardData,
        level,
        speed,
        moves: Math.floor(counter / 2),
        startedTimeStamp,
        diffSeconds,
        setDiffSeconds,
        diffMinutes,
        setDiffMinutes,
        diffHours,
        setDiffHours,
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
