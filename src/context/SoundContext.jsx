import { createContext, useEffect, useState } from "react";

const SoundContext = createContext();

const SoundContextProvider = ({ children }) => {
  const [backgroundMusic] = useState(
    new Audio("/assets/music/background_music.mp3")
  );
  const [success] = useState(new Audio("/assets/music/success.mp3"));
  const [failed] = useState(new Audio("/assets/music/failed.mp3"));
  const [hint] = useState(new Audio("/assets/music/hint.mp3"));

  useEffect(() => {
    backgroundMusic.loop = true;
  }, [backgroundMusic]);

  const playBackgroundMusic = () => {
    backgroundMusic.volume = 0.2;
    backgroundMusic.load();
    backgroundMusic.play();
  };

  const stopBackgroundMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  };

  const playSuccessSound = () => {
    success.load();
    success.play();
  };
  const playFailedSound = () => {
    failed.load();
    failed.play();
  };
  const playHintSound = () => {
    hint.load();
    hint.play();
  };

  return (
    <SoundContext.Provider
      value={{
        playBackgroundMusic,
        stopBackgroundMusic,
        playSuccessSound,
        playFailedSound,
        playHintSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContext, SoundContextProvider };
