import React, { useContext } from "react";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import { Box, Typography } from "@mui/material";
import { CardDataContext } from "../context/CardDataContext";

function MoveCounter() {
  const { moves } = useContext(CardDataContext);
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AirlineStopsIcon />
      <Typography>{moves}</Typography>
    </Box>
  );
}

export { MoveCounter };
