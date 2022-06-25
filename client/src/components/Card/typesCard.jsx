import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringToColor } from '../../helper/CommonUtils';

const TypesCard = ({ type }) => {
  const typeRef = React.useRef();
  const navigate = useNavigate();
  const handleCardClick = () => {
    const typeClicked = typeRef.current?.innerText;
    if (typeClicked) navigate(typeClicked);
  };

  return (
    <Card
      sx={{
        bgcolor: stringToColor(type),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '2px',
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography
          sx={{ typography: { sm: 'h3', xs: 'h6' } }}
          component="span"
          ref={typeRef}
        >
          {type}
        </Typography>
      </CardContent>
    </Card>
  );
};

TypesCard.propTypes = {
  type: PropTypes.string.isRequired,
};
export default TypesCard;
