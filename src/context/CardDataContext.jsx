import { createContext, useContext, useEffect, useState } from "react";
import { generateCardData, generateRandomNumber } from "../utils";
import { Levels, Speeds } from "../constants";
import { SoundContext } from "./SoundContext";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const {
    playSuccessSound,
    playFailedSound,
    playBackgroundMusic,
    stopBackgroundMusic,
  } = useContext(SoundContext);

  const [userName, setUserName] = useState("");

  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(
    generateCardData(level.numberOfCards)
  );
  const [flippedCard, setFlippedCard] = useState(null);
  const [cardDataUpdating, setCardDataUpdating] = useState(false);

  const [startedTimeStamp, setStartedTimeStamp] = useState(null);
  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);
  const [penaltyTime, setPenaltyTime] = useState(0);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const numberOfUnmatchedCards = cardData.filter(
      (cardItem) => !cardItem.isMatched
    ).length;
    if (numberOfUnmatchedCards === 0) {
      stopBackgroundMusic();
      setGameCompleted(true);
      setGameStarted(false);
    }
  }, [cardData, stopBackgroundMusic]);

  const handleStartGame = () => {
    playBackgroundMusic();
    setStartedTimeStamp(new Date());
    setGameStarted(true);
    setGameCompleted(false);
    const newCardData = generateCardData(level.numberOfCards);
    setCardData(newCardData);
    setFlippedCard(null);
    setDiffHours(0);
    setDiffMinutes(0);
    setDiffSeconds(0);
    setCounter(0);
    setPenaltyTime(0);
  };

  const handleNewGame = () => {
    stopBackgroundMusic();
    setGameStarted(false);
    setGameCompleted(false);

    const newCards = generateCardData(level.numberOfCards);
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

    setCardDataUpdating(true);

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
        playSuccessSound();
        setCardData(updatedCardData);
        setCardDataUpdating(false);
      }, speed);
    } else {
      const updatedCardData = cardData.map((cardItem) => {
        return {
          ...cardItem,
          isFlipped: false,
        };
      });

      setTimeout(() => {
        playFailedSound();
        setCardData(updatedCardData);
        setCardDataUpdating(false);
      }, speed);
    }
    setFlippedCard(null);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    const newCards = generateCardData(newLevel.numberOfCards);
    setCardData(newCards);
  };

  const handleHintClick = () => {
    setPenaltyTime((prev) => prev + 3);
    const hintableCards = cardData.filter((cardItem) => !cardItem.isMatched);
    const randomIndex = generateRandomNumber(hintableCards.length) - 1;
    const targetCard = hintableCards[randomIndex];

    const updatedCardData = cardData.map((cardItem) => {
      if (cardItem.imageUrl === targetCard.imageUrl) {
        return {
          ...cardItem,
          hint: true,
        };
      }
      return cardItem;
    });
    setCardData(updatedCardData);
    setTimeout(() => {
      setCardData(cardData);
    }, 300);
  };

  return (
    <CardDataContext.Provider
      value={{
        gameStarted,
        gameCompleted,
        numberOfCards: level.numberOfCards,
        cardData,
        level,
        speed,
        moves: Math.floor(counter / 2),
        maxNumberOfHints: level.hints,
        cardDataUpdating,
        userName,

        startedTimeStamp,
        diffSeconds,
        setDiffSeconds,
        diffMinutes,
        setDiffMinutes,
        diffHours,
        setDiffHours,
        penaltyTime,

        updateUserName: setUserName,
        handleLevelChange,
        setSpeed,
        handleStartGame,
        handleNewGame,
        handleCardClick,
        handleHintClick,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
