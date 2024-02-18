import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";

const StartGame = () => {
  const { handleStartGame } = useContext(CardDataContext);
  return (
    <Box id="start-game-container">
      <Button
        variant="contained"
        sx={{
          bgcolor: "white",
          color: "black",
          "&:hover": {
            bgcolor: "lightgrey",
          },
        }}
        onClick={handleStartGame}
      >
        Start Game
      </Button>
    </Box>
  );
};

export { StartGame };
