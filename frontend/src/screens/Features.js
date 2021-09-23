import React from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
  },
}));

const Features = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">FEATURES OF PROSHOP APP</Typography>
      <Divider />
      <p>
        <ul>
          <li>
            <Typography>Full featured shopping card</Typography>
          </li>
          <li>
            <Typography>Product reviews and rating</Typography>
          </li>
          <li>
            <Typography>Top products carousel</Typography>
          </li>
          <li>
            <Typography>Product pagination</Typography>
          </li>
          <li>
            <Typography>User profile with orders</Typography>
          </li>
          <li>
            <Typography>Admin product management</Typography>
          </li>
          <li>
            <Typography>Admin user management</Typography>
          </li>
          <li>
            <Typography>Admin Order details page</Typography>
          </li>
          <li>
            <Typography>Mark orders as delivered option</Typography>
          </li>
          <li>
            <Typography>
              Checkout process (shipping, payment method, etc)
            </Typography>
          </li>
          <li>
            <Typography>PayPal / credit card integration</Typography>
          </li>
          <li>
            <Typography>PayPal / credit card integration</Typography>
          </li>
        </ul>
      </p>
    </div>
  );
};

export default Features;
