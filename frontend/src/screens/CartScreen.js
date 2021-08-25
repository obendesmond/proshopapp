import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  makeStyles,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import XIcon from "@material-ui/icons/HighlightOff";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "50px 0 100px 10px",
  },
  img: {
    maxWidth: "100%",
    border: "5px solid lightgrey",
    cursor: "pointer",
  },
  bottomSpacing: {
    marginBottom: "20px",
  },
  title: {
    marginBottom: "50px",
  },
  name: {
    cursor: "pointer",
  },
  formControl: {
    marginTop: "-10px",
    minWidth: 50,
  },
  deleteBtn: {
    marginTop: "-20px",
  },
  cardRoot: {
    margin: "100px 0 0 20px",
  },
}));

const CartScreen = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const productId = props.match.params.id;
  // get the qty from url and convert it to a number
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const qtyHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
    history.push("/cart");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={12} md={8}>
          <Grid container direction="row">
            <Typography variant="h3" className={classes.title}>
              <Button onClick={() => history.push("/")}>
                <ArrowBackIcon /> Back To Shop
              </Button>
              &nbsp; SHOPPING CART
            </Typography>
          </Grid>
          {cartItems.length === 0 && (
            <Typography>No items found in cart</Typography>
          )}
          {cartItems.map((item) => (
            <Grid
              key={item.product}
              container
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={2}>
                <img
                  onClick={() => history.push(`/product/${item.product}`)}
                  className={classes.img}
                  src={item.image}
                  alt={item.name}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  className={classes.name}
                  onClick={() => history.push(`/product/${item.product}`)}
                >
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>${item.price}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="row" justifyContent="space-between">
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.qty}
                      onChange={(e) => qtyHandler(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    className={classes.deleteBtn}
                    color="primary"
                    aria-label="delete-cart-item"
                    onClick={() => dispatch(removeFromCart(item.product))}
                  >
                    <XIcon style={{ color: "red" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.bottomSpacing} />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Grid item md={12} className={classes.bottomSpacing}>
                  <Typography variant="h5">
                    Subtotal{" "}
                    {cartItems.reduce((total, item) => total + item.qty, 0)}{" "}
                    Item(s)
                  </Typography>
                </Grid>
                <Grid item md={12} className={classes.bottomSpacing}>
                  <Typography>
                    Total Price: $
                    {cartItems
                      .reduce(
                        (totalPrice, item) =>
                          totalPrice + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Button
                    style={{ width: "100%" }}
                    disabled={cartItems.length <= 0}
                    variant="outlined"
                    color="primary"
                    onClick={checkoutHandler}
                  >
                    Buy
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartScreen;
