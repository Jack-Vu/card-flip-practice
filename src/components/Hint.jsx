import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { Alert, Button, Snackbar } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { grey, orange } from "@mui/material/colors";

function Hint() {
  const { handleHintClick, maxNumberOfHints } = useContext(CardDataContext);

  const [hintSoundEffect] = useState(new Audio("/assets/music/hint.mp3"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hints, setHints] = useState(maxNumberOfHints);
  const onHintClick = () => {
    hintSoundEffect.load();
    hintSoundEffect.play();
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
    </>
  );
}

export { Hint };
