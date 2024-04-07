import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { Alert, Button, Snackbar } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { grey, blue } from "@mui/material/colors";
import { SoundContext } from "../context/SoundContext";

function Hint() {
  const { playHintSound } = useContext(SoundContext);

  const { handleHintClick, maxNumberOfHints, cardDataUpdating } =
    useContext(CardDataContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hints, setHints] = useState(maxNumberOfHints);
  const onHintClick = () => {
    playHintSound();
    setOpenSnackbar(true);
    setHints((prev) => prev - 1);
    handleHintClick();
  };
  return (
    <>
      <Button
        variant="contained"
        startIcon={<TipsAndUpdatesIcon />}
        color="primary"
        onClick={onHintClick}
        disabled={hints === 0 || cardDataUpdating}
        fullWidth
        sx={{
          "&.Mui-disabled": {
            color: grey[600],
            backgroundColor: blue[200],
            border: `1px solid ${blue[200]}`,
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
    </>
  );
}

export { Hint };
