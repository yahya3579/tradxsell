import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCheckout } from '../../CheckoutContext'; // Import the custom hook
import { CurrencyContext } from '../../CurrencyContext';

export default function Review({cartItem,totalBill,tax,totalWithTax,cartItemCount}) {
  const { addressData, paymentData } = useCheckout(); // Fetch context data
  const { currency, rates } = React.useContext(CurrencyContext);
  const convertedTotalBill = totalBill * (rates[currency] || 1); // Convert total bill to selected currency
  const formattedTotalBill = convertedTotalBill.toFixed(2); // Format the converted total
  

  // Format address as a string
  const formattedAddress = [
    addressData.address1,
    addressData.address2,
    addressData.city,
    addressData.state,
    addressData.zip,
    addressData.country,
  ]
    .filter(Boolean) // Remove empty fields
    .join(', ');

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={`${cartItemCount} selected`} />
          <Typography variant="body2">{`${currency} ${formattedTotalBill}`}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">--</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="taxes" />
          <Typography variant="body2">{currency}{" "}{tax}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {currency}{" "}{totalWithTax}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {addressData.firstName} {addressData.lastName}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formattedAddress}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Card type:
              </Typography>
              <Typography variant="body2">{paymentData.paymentType}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Card holder:
              </Typography>
              <Typography variant="body2">{paymentData.name}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Card number:
              </Typography>
              <Typography variant="body2">
                {/* {`xxxx-xxxx-xxxx-${paymentData.cardNumber.slice(-4)}`} */}
                {paymentData.cardNumber}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Card CVV:
              </Typography>
              <Typography variant="body2">{paymentData.cvv}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Expiry date:
              </Typography>
              <Typography variant="body2">{paymentData.expirationDate}</Typography>
            </Stack>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
