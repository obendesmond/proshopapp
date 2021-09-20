import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

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

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

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

      if (!order || successPay || successDeliver || order._id !== id) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });

        dispatch(getOrderDetails(id));
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, dispatch, history, userInfo, order, successPay, successDeliver]);

  const { shippingAddress, paymentMethod } = order;

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(order._id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading || loadingDeliver ? (
    <Loader size={100} />
  ) : error || errorDeliver ? (
    <Message
      severity="error"
      message={error ? error : errorDeliver}
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
        <Grid container style={{ paddingLeft: "50px" }}>
          <Grid item>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.goBack()}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          </Grid>
        </Grid>
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
                  {order.isPay ? null : (
                    <Grid item xs={12} className={classes.space}>
                      {!sdkReady ? (
                        // <span> sdk not ready</span>
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </Grid>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <Grid item xs={12} className={classes.space}>
                        <Button
                          style={{ width: "100%" }}
                          onClick={deliverHandler}
                          variant="outlined"
                          color="primary"
                        >
                          Mark as Delivered
                        </Button>
                      </Grid>
                    )}
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
          {/* <Button onClick={() => {}} variant="outlined" color="primary">
            Back To Payment
          </Button>
          <Button onClick={() => {}} variant="outlined" color="primary">
            Place Order Now!!
          </Button> */}
        </Grid>
      </Grid>
    )
  );
};

export default OrderScreen;
