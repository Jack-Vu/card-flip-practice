import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";

function Card({ data }) {
  const { id, imageUrl, isFlipped, isMatched, hint } = data;
  const { handleCardClick } = useContext(CardDataContext);

  return (
    <>
      {isMatched ? (
        <Box height={100} width={100}></Box>
      ) : (
        <Box
          className={`card ${isFlipped ? "is-flipped" : ""}`}
          sx={{
            "&:hover": { bgcolor: isFlipped ? "none" : blue[100] },
            ...(hint ? hintAnimation : {}),
            borderRadius: "10px",
          }}
        >
          <Box width={100} height={100} onClick={() => handleCardClick(data)}>
            {isFlipped && (
              <img
                src={imageUrl}
                alt={`card-${id}`}
                loading="lazy"
                height={"100%"}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export { Card };

const hintAnimation = {
  animationName: "wiggle",
  animationDuration: "0.3s",
};
