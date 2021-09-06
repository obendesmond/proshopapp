import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  space: {
    margin: "10px 0 10px 0",
  },
  img: {
    maxWidth: "50%",
    cursor: "pointer",
  },
}));

const Order = ({ handleBack, placeOrder }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calculate price of all cartitems
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // shippingprice
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  // 15% tax price
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));

  // total price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    placeOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      style={{ marginTop: "20px" }}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item sm={12} md={8}>
          <Grid container alignItems="center">
            <Grid item sm={12} className={classes.space}>
              <strong>
                <Typography variant="h6">SHIPPING</Typography>
              </strong>
              <Typography>
                Address: {shippingAddress.city}, {shippingAddress.postalCode},
                {shippingAddress.country}
              </Typography>
              <Divider />
            </Grid>
            <Grid item sm={12} className={classes.space}>
              <strong>
                <Typography variant="h6">PAYMENT METHOD</Typography>
              </strong>
              <Typography>Method: {paymentMethod}</Typography>
              <Divider />
            </Grid>
            <Grid item sm={12} className={classes.space}>
              <strong>
                <Typography variant="h6">ORDER ITEMS</Typography>
              </strong>
              {cartItems.length === 0 ? (
                <Typography>You have no items in cart</Typography>
              ) : (
                cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    container
                    direction="row"
                    className={classes.space}
                  >
                    <Grid item sm={2}>
                      <img
                        className={classes.img}
                        src={item.image}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item sm={4}>
                      <Typography>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              )}
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={4}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} className={classes.space}>
                  <strong>
                    <Typography variant="h6">ORDER SUMMARY</Typography>
                  </strong>
                </Grid>
                <Grid item xs={12} className={classes.space}>
                  <Typography>Items: ${cart.itemsPrice}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.space}>
                  <Typography>Shipping: ${cart.shippingPrice}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.space}>
                  <Typography>Tax: ${cart.taxPrice}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.space}>
                  <strong>
                    <Typography variant="h6">
                      Total: ${cart.totalPrice}
                    </Typography>
                  </strong>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "20px" }}
      >
        <Button onClick={handleBack} variant="outlined" color="primary">
          Back To Payment
        </Button>
        <Button onClick={placeOrderHandler} variant="outlined" color="primary">
          Place Order Now!!
        </Button>
      </Grid>
    </Grid>
  );
};

export default Order;
