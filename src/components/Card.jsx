import { Box } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useState } from "react";

function Card({ data }) {
  const { id, imageUrl, isFlipped, isMatched } = data;
  const [flippedCard, setFlippedCard] = useState(null);
  return (
    <Box
      width={100}
      height={100}
      bgcolor={"white"}
      sx={{ "&:hover": { bgcolor: orange[300] } }}
      onClick={() => setFlippedCard(true)}
    >
      {flippedCard ? (
        <img src={imageUrl} alt={`card-${id}`} loading="lazy" height={"100%"} />
      ) : null}
    </Box>
  );
}

export { Card };
