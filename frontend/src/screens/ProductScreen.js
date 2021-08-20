import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Rating from "../components/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    marginBottom: "100px",
  },
  img: {
    maxWidth: "100%",
  },
  btn: {
    width: "100%",
  },
  formControl: {
    marginTop: "-10px",
    minWidth: 120,
  },
  bottomSpacing: {
    marginBottom: "20px",
  },
}));

const ProductScreen = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch]);

  const addToCardHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ paddingLeft: "50px" }}>
        <Grid item>
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => history.push("/")}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Grid>
      </Grid>
      {loading ? (
        <Loader size={100} />
      ) : error ? (
        <Message
          message={error}
          open={open}
          close={() => setOpen(false)}
          severity="error"
        />
      ) : (
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-around"
        >
          <Grid item xs={12} md={6}>
            <img
              className={classes.img}
              src={product.image}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid style={{ margin: "15px 0 15px 0" }} item xs={12}>
              <Typography variant="h4">{product.name}</Typography>
            </Grid>
            <Grid style={{ margin: "15px 0 15px 0" }} item xs={12}>
              <Divider className={classes.bottomSpacing} />
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Grid>
            <Grid style={{ margin: "15px 0 15px 0" }} item xs={12}>
              <Divider className={classes.bottomSpacing} />
              <Typography>Price: ${product.price}</Typography>

              {product.countInStock > 0 ? (
                <Typography style={{ color: "green" }}>In Stock</Typography>
              ) : (
                <Typography style={{ color: "red" }}>Out of Stock</Typography>
              )}
            </Grid>
            <Grid item xs={12} direction="row">
              <Grid container direction="row">
                <Typography>Qty: &nbsp;</Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    disabled={product.countInStock <= 0 ? true : false}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid style={{ margin: "15px 0 15px 0" }} item xs={12}>
              <Divider className={classes.bottomSpacing} />
              <Typography style={{ textAlign: "justify" }}>
                {product.description}
              </Typography>
            </Grid>
            <Grid style={{ margin: "15px 0 15px 0" }} item xs={12}>
              <Button
                color="primary"
                variant="outlined"
                className={classes.btn}
                disabled={product.countInStock <= 0 ? true : false}
                onClick={addToCardHandler}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ProductScreen;
