import React from "react";
import {
  FormControl,
  InputLabel,
  Grid,
  Input,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginBottom: "40px",
  },
}));

const Form = ({
  handleFormSubmit,
  address,
  setAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
  country,
  setCountry,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="space-between"
      style={{ marginTop: "20px" }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="address-input">Address</InputLabel>
        <Input
          required
          id="address-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="city-input">City</InputLabel>
        <Input
          required
          id="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="postal-code-input">Postal Code</InputLabel>
        <Input
          required
          id="postal-code-input"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="country-input">Country</InputLabel>
        <Input
          required
          id="country-input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button onClick={handleFormSubmit} variant="outlined" color="primary">
          Next
        </Button>
      </FormControl>
    </Grid>
  );
};

export default Form;
