import React, { useContext, useEffect, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { differenceInHours, differenceInMinutes } from "date-fns";
import { Box, Typography } from "@mui/material";
import { Timer as TimerIcon } from "@mui/icons-material";

function Timer() {
  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);
  const { startedTimeStamp } = useContext(CardDataContext);

  useEffect(() => {
    if (startedTimeStamp) {
      const interval = setInterval(() => {
        const currentTimeStamp = new Date();

        const currentDiffMinutes =
          differenceInMinutes(currentTimeStamp, startedTimeStamp) % 60;
        const currentDiffHours = differenceInHours(
          currentTimeStamp,
          startedTimeStamp
        );

        if (currentDiffHours !== diffHours) {
          setDiffHours(currentDiffHours);
        }
        if (currentDiffMinutes !== diffMinutes) {
          setDiffMinutes(currentDiffMinutes);
        }

        setDiffSeconds((prev) => {
          if (prev === 59) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [startedTimeStamp]);

  const getTimerDisplayValue = () => {
    let displayValue = `${diffSeconds}s`;

    if (diffMinutes > 0) {
      displayValue = `${diffMinutes}m ${diffSeconds}s`;
    }

    if (diffHours > 0) {
      displayValue = `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
    }

    return displayValue;
  };
  return (
    startedTimeStamp && (
      <Box display="flex" alignItems="center" gap={1}>
        <TimerIcon />
        <Typography>{getTimerDisplayValue()}</Typography>
      </Box>
    )
  );
}

export { Timer };
