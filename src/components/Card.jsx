import { Box } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";

function Card({ data }) {
  const { id, imageUrl, isFlipped, isMatched } = data;
  return (
    <Box
      width={100}
      height={100}
      bgcolor={"white"}
      sx={{ "&:hover": { bgcolor: orange[300] } }}
    >
      <img src={imageUrl} alt={`card-${id}`} loading="lazy" height={"100%"} />
    </Box>
  );
}

export { Card };
