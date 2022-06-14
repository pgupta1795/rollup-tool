import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { stringToColor } from "../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";

const TypesCard = ({ type }) => {
  const typeRef = React.useRef();
  const navigate = useNavigate();
  const handleCardClick = () => {
    const type = typeRef.current?.innerText;
    type ? navigate(type) : console.log("Not a Valid Type");
  };

  return (
    <Card
      sx={{
        bgcolor: stringToColor(type),
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        margin: "10px",
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography
          sx={{ typography: { sm: "h3", xs: "h6" } }}
          component="span"
          ref={typeRef}
        >
          {type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TypesCard;
