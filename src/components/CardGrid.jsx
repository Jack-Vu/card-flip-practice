import React from "react";
import { Card } from "./Card";
import { Box } from "@mui/material";

function CardGrid() {
  const numberOfCards = 16;
  const generateCards = (numberOfCards) => {
    const arr = new Array(numberOfCards);
    arr.fill(0);

    return arr.map((v, index) => <Card key={index}></Card>);
  };
  const columns = Math.sqrt(numberOfCards);
  const cards = generateCards(numberOfCards);
  const gridContainerWidth = columns * 100 + (columns - 1) * 8;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
      <Box
        id="card-container"
        gap={1}
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 1,
          justifyContent: "center",
          width: gridContainerWidth,
        }}
      >
        {cards}
      </Box>
    </Box>
  );
}

export { CardGrid };
