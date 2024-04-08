import { useContext } from "react";
import { CardGrid } from "./components/CardGrid";
import { Navbar } from "./components/Navbar";
import { CardDataContext } from "./context/CardDataContext";
import { StartGameSetup } from "./components/StartGameSetup.jsx";
import { Box } from "@mui/material";
import { GameCompletion } from "./components/GameCompletion.jsx";
import { WelcomeModal } from "./components/WelcomeModal.jsx";
import { LeaderBoard } from "./components/LeaderBoard.jsx";

function App() {
  const { gameStarted, gameCompleted } = useContext(CardDataContext);

  return (
    <>
      <Navbar />
      <Box id="main-container" display="flex" justifyContent="center" my={5}>
        {/* {gameStarted && <CardGrid />}
        {gameCompleted && <GameCompletion />}
        {!gameStarted && !gameCompleted && <StartGameSetup />} */}
        <LeaderBoard />
      </Box>
      {/* <WelcomeModal /> */}
    </>
  );
}

export default App;
