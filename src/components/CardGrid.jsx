import { Alert, Box, Button, Snackbar } from "@mui/material";
import { Card } from "./Card";
import { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { grey, orange } from "@mui/material/colors";

function CardGrid() {
  const { numberOfCards, cardData, handleHintClick, maxNumberOfHints } =
    useContext(CardDataContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hints, setHints] = useState(maxNumberOfHints);
  const onHintClick = () => {
    setOpenSnackbar(true);
    setHints((prev) => prev - 1);
    handleHintClick();
  };

  const columns = Math.sqrt(numberOfCards);
  const gridContainerWidth = columns * 100 + (columns - 1) * 8;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button
        variant="contained"
        startIcon={<TipsAndUpdatesIcon />}
        color="primary"
        onClick={onHintClick}
        disabled={hints === 0}
        sx={{
          "&.Mui-disabled": {
            color: grey[600],
            backgroundColor: orange[200],
            border: `1px solid ${orange[200]}`,
          },
        }}
      >
        Hint({`${hints} left`})
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          3 seconds added to penalty time
        </Alert>
      </Snackbar>
      <Box
        id="card-container"
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 1,
          justifyItems: "center",
          width: gridContainerWidth,
        }}
      >
        {cardData.map((cardDataItem) => {
          return <Card key={cardDataItem.id} data={cardDataItem} />;
        })}
      </Box>
    </Box>
  );
}

export { CardGrid };
