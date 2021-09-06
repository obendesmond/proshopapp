import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
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
    margin: "10px 0 20px 0",
  },
  img: {
    maxWidth: "50%",
    cursor: "pointer",
  },
}));

const OrderScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const id = props.match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // if loading is finished
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // calculate price of all orderItems
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // shippingprice
    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);

    // 15% tax price
    order.taxPrice = addDecimals(Number(0.15 * order.itemsPrice).toFixed(2));

    // total price
    order.totalPrice = (
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
    ).toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      const addPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");
        // create script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onLoad = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if (!order || successPay || order._id !== id) {
        dispatch(getOrderDetails(id));
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, dispatch, history, userInfo, order, successPay]);

  const { shippingAddress, paymentMethod } = order;

  return loading ? (
    <Loader size={100} />
  ) : error ? (
    <Message
      severity="error"
      message={error}
      open={open}
      close={() => setOpen(false)}
    />
  ) : (
    order && (
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
                  <Typography variant="h5">ORDER: {order._id} </Typography>
                  <Typography variant="h6">SHIPPING </Typography>
                </strong>
                <Typography>Name: {order.user.name}</Typography>
                <Typography>
                  Email:
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </Typography>
                <Typography className={classes.space}>
                  Address: {shippingAddress.city}, {shippingAddress.postalCode},
                  {shippingAddress.country}
                </Typography>
                {order.isDelivered ? (
                  <Typography style={{ color: "green" }}>
                    Delivered On: {order.deliveredAt}
                  </Typography>
                ) : (
                  <Typography style={{ color: "red" }}>
                    NOT Delivered
                  </Typography>
                )}
                <Divider />
              </Grid>
              <Grid item sm={12} className={classes.space}>
                <strong>
                  <Typography variant="h6">PAYMENT METHOD</Typography>
                </strong>
                <Typography className={classes.space}>
                  Method: {paymentMethod}
                </Typography>
                {order.isPaid ? (
                  <Typography style={{ color: "green" }}>
                    Paid On: {order.paidAt}
                  </Typography>
                ) : (
                  <Typography style={{ color: "red" }}>NOT PAID</Typography>
                )}
                <Divider />
              </Grid>
              <Grid item sm={12} className={classes.space}>
                <strong>
                  <Typography variant="h6">ORDER ITEMS</Typography>
                </strong>
                {order.orderItems && order.orderItems.length === 0 ? (
                  <Typography>You have no items in cart</Typography>
                ) : (
                  order.orderItems &&
                  order.orderItems.map((item) => (
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
                    <Typography>Items: ${order.itemsPrice}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.space}>
                    <Typography>Shipping: ${order.shippingPrice}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.space}>
                    <Typography>Tax: ${order.taxPrice}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.space}>
                    <strong>
                      <Typography variant="h6">
                        Total: ${order.totalPrice}
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
          style={{ margin: "20px 0 50px 0" }}
        >
          <Button onClick={() => {}} variant="outlined" color="primary">
            Back To Payment
          </Button>
          <Button onClick={() => {}} variant="outlined" color="primary">
            Place Order Now!!
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default OrderScreen;
