import { Box } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";

function Card({ data }) {
  const { id, imageUrl, isFlipped, isMatched } = data;
  const { handleCardClick } = useContext(CardDataContext);

  return (
    <>
      {isMatched ? (
        <Box height={100} width={100}></Box>
      ) : (
        <Box
          width={100}
          height={100}
          sx={{
            bgcolor: isFlipped ? "none" : "white",
            "&:hover": { bgcolor: isFlipped ? "none" : orange[200] },
          }}
          onClick={() => handleCardClick(data)}
        >
          {isFlipped && (
            <img
              src={imageUrl}
              alt={`card-${id}`}
              loading="lazy"
              height={"100%"}
            />
          )}
        </Box>
      )}
    </>
  );
}

export { Card };

const hint = {
  animationName: "wiggle",
  animationDuration: "0.3",
};
