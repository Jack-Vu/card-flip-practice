import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { orange } from "@mui/material/colors";
import { Levels, Speeds } from "../constants";

const StartGameSetup = () => {
  const { level, speed, handleLevelChange, setSpeed, handleStartGame } =
    useContext(CardDataContext);

  return (
    <Box
      id="start-game-container"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box id="level-container">
        <FormLabel
          id="levels-row-radio-buttons-group-label"
          sx={{ color: "white" }}
        >
          Game Grid Level
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="levels-row-radio-buttons-group-label"
          name="levels-buttons-group"
          sx={{ color: "white" }}
          value={level}
        >
          <FormControlLabel
            value={Levels["4x4"]}
            control={
              <Radio
                sx={radioStyle}
                onClick={() => handleLevelChange(Levels["4x4"])}
              />
            }
            label="4x4"
          />
          <FormControlLabel
            value={Levels["6x6"]}
            control={
              <Radio
                sx={radioStyle}
                onClick={() => handleLevelChange(Levels["6x6"])}
              />
            }
            label="6x6"
          />
          <FormControlLabel
            value={Levels["8x8"]}
            control={
              <Radio
                sx={radioStyle}
                onClick={() => handleLevelChange(Levels["8x8"])}
              />
            }
            label="8x8"
          />
        </RadioGroup>
      </Box>
      <Box id="speed-container">
        <FormLabel
          id="speed-row-radio-buttons-group-label"
          sx={{ color: "white" }}
        >
          Game Grid Level
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="speed-row-radio-buttons-group-label"
          name="speed-buttons-group"
          sx={{ color: "white" }}
          value={speed}
        >
          <FormControlLabel
            value={Speeds.slow}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.slow)} />
            }
            label="Slow"
          />
          <FormControlLabel
            value={Speeds.medium}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.medium)} />
            }
            label="Medium"
          />
          <FormControlLabel
            value={Speeds.fast}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.fast)} />
            }
            label="Fast"
          />
        </RadioGroup>
      </Box>
      <Button
        variant="contained"
        onClick={handleStartGame}
      >
        Start Game
      </Button>
    </Box>
  );
};

export { StartGameSetup };

const radioStyle = {
  color: orange[300],
  "&.Mui-checked": {
    color: orange[300],
  },
};
