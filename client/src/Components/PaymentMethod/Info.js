import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CurrencyContext } from '../../CurrencyContext';

// Updated Info component
function Info({ cartItemDetails, totalBill }) {
  const { currency, rates } = useContext(CurrencyContext);
  const convertedTotalBill = totalBill * (rates[currency] || 1); // Convert total bill to selected currency
  const formattedTotalBill = convertedTotalBill?.toFixed(2); // Format the converted total

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
      {`${currency} ${formattedTotalBill}`}
      </Typography>
      <List disablePadding>
        {cartItemDetails.map((product) => {
          const convertedPrice = (product.price * (rates[currency] || 1)).toFixed(2);

          return(
          <ListItem key={product.name} sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 80, height: 80, mr: 2 }}>
              <img
                src={`${process.env.REACT_APP_LOCALHOST_URL}${product.imageUrl}`}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
            <ListItemText
              sx={{ flex: 1 }}
              primary={product.name}
              secondary={product.desc || ''}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {`${currency} ${convertedPrice}`}
            </Typography>
          </ListItem>
        )})}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  cartItemDetails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string, // Added to handle image URLs
    })
  ).isRequired,
  totalBill: PropTypes.number.isRequired,
};

Info.defaultProps = {
  cartItemDetails: [],
  totalBill: 0,
};

export default Info;
