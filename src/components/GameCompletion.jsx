import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CardDataContext } from "../context/CardDataContext";

function GameCompletion() {
  const {
    handleStartGame,
    diffSeconds,
    diffMinutes,
    diffHours,
    moves,
    penaltyTime,
  } = useContext(CardDataContext);

  const totalSecondsWithPenalty = diffSeconds + penaltyTime;
  const seconds =
    totalSecondsWithPenalty >= 60
      ? totalSecondsWithPenalty % 60
      : totalSecondsWithPenalty;

  const totalMinutesWithPenalty =
    totalSecondsWithPenalty >= 60 ? diffMinutes + 1 : diffMinutes;
  const minutes =
    totalMinutesWithPenalty >= 60
      ? totalMinutesWithPenalty % 60
      : totalMinutesWithPenalty;

  const hour = totalMinutesWithPenalty >= 60 ? diffHours + 1 : diffHours;

  const time = `${hour}h ${minutes}m ${seconds}s`;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h3">🎉</Typography>
      <Typography color="white">You did it</Typography>
      <Box>
        <Typography color="white">Time Spent: {time}</Typography>
        <Typography color="white">Moves: {moves}</Typography>
      </Box>
      <Button
        variant="contained"
        endIcon={<RestartAltIcon />}
        onClick={handleStartGame}
      >
        Play Again
      </Button>
    </Box>
  );
}

export { GameCompletion };
