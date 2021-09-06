import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const Payment = ({
  handleBack,
  savePaymentMethod,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel component="legend">Select Payment Type</FormLabel>
        <RadioGroup
          style={{ marginTop: "20px" }}
          aria-label="payment"
          name="payment1"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="PAYPAL" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="Credit Card"
            control={<Radio />}
            label="Credit Card"
            disabled
          />
          <FormControlLabel
            value="STRIPE"
            disabled
            control={<Radio />}
            label="(Stripe)"
          />
          {/* you can add other payment methods */}
        </RadioGroup>
      </FormControl>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "20px" }}
      >
        <Button onClick={handleBack} variant="outlined" color="primary">
          Back To Shipping
        </Button>
        <Button onClick={savePaymentMethod} variant="outlined" color="primary">
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Payment;
