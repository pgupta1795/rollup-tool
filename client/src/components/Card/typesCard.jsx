import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringToColor } from '../../utils/CommonUtils';

const TypesCard = ({ type }) => {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(type);

  return (
    <Card
      sx={{
        bgcolor: stringToColor(type),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        mb: 1,
        width: 'inherit',
        height: '10vh',
      }}
      onClick={handleCardClick}
    >
      <CardContent
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Typography
          align="inherit"
          sx={{
            typography: 'button',
            padding: '2px',
            wordWrap: 'break-word',
          }}
          component="span"
          display={{ xs: 'none', sm: 'block', md: 'block' }}
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
