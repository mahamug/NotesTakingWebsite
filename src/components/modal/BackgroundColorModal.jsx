import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import Theme1 from "../../asset/blue.png";
import Theme2 from "../../asset/blueviolet.png";
import Theme3 from "../../asset/goldenrod.png";
import Theme4 from "../../asset/green.png";
import Theme5 from "../../asset/magenta.png";
import Theme6 from "../../asset/orange.png";
import Theme7 from "../../asset/purple.png";
import Theme8 from "../../asset/red.png";
import Theme9 from "../../asset/yellow.png";
import Theme10 from "../../asset/yellowgreen.png";

const imageUrls = [
  {
    img: Theme1,
    color: "#9da7db",
  },
  {
    img: Theme2,
    color: "#576ac2",
  },
  {
    img: Theme3,
    color: "#ffc107",
  },
  {
    img: Theme4,
    color: "#357a38",
  },
  {
    img: Theme5,
    color: "#f73378",
  },
  {
    img: Theme6,
    color: "#ff9100",
  },
  {
    img: Theme7,
    color: "#af52bf",
  },
  {
    img: Theme8,
    color: "#f44336",
  },
  {
    img: Theme9,
    color: "#ffeb3b",
  },
  {
    img: Theme10,
    color: "#8ab200",
  },
];

const BackgroundColorModal = ({ openModal, setOpenModal, onColorSelect }) => {
  const handleCloseModal = () => {
    setOpenModal(null);
  };
  const handleColorClick = (color) => {
    onColorSelect(color);
    handleCloseModal();
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Choose Background Colors
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl.img}
                alt="not available"
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
                onClick={() => handleColorClick(imageUrl.color)}
              />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackgroundColorModal;
