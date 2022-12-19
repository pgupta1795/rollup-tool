import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const TypesCard = ({ type, path }) => {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(path);
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: `linear-gradient(to right bottom,${theme.palette.primary.light},${theme.palette.primary.main},${theme.palette.primary.dark} )`,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        mb: 1,
        width: 'inherit',
        height: 'inherit',
        minHeight: '130px',
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
            typography: 'h5',
            padding: '2px',
            wordWrap: 'break-word',
          }}
          component="span"
          display={{ xs: 'none', sm: 'block', md: 'block' }}
        >
          {type?.toUpperCase()}
        </Typography>
      </CardContent>
    </Card>
  );
};

TypesCard.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
export default TypesCard;
