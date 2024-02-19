import { Box, Button, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useContext } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CardDataContext } from "../context/CardDataContext";

function GameCompletion() {
  const { handleStartGame, diffSeconds, diffMinutes, diffHours, moves } =
    useContext(CardDataContext);
  const time = `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography color="white">You did it</Typography>
      <Box>
        <Typography color="white">Time Spent: {time}</Typography>
        <Typography color="white">Moves: {moves}</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: orange[300],
          color: "white",
          "&:hover": {
            bgcolor: orange[200],
          },
        }}
        endIcon={<RestartAltIcon />}
        onClick={handleStartGame}
      >
        Play Again
      </Button>
    </Box>
  );
}

export { GameCompletion };
