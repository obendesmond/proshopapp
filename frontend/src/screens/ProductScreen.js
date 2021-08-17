import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Rating from "../components/Rating/Rating";
import axios from "axios";

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
}));

const ProductScreen = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const id = props.match.params.id;

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        onClick={() => history.push("/")}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Grid container spacing={3} direction="row" justifyContent="space-around">
        <Grid xs={12} md={6}>
          <img className={classes.img} src={product.image} alt={product.name} />
        </Grid>
        <Grid container justifyContent="space-between" xs={12} md={4}>
          <Grid item xs={12}>
            <Typography variant="h4">{product.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography>Price: ${product.price}</Typography>

            {product.countInStock > 0 ? (
              <Typography style={{ color: "green" }}>In Stock</Typography>
            ) : (
              <Typography style={{ color: "red" }}>Out of Stock</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography style={{ textAlign: "justify" }}>
              {product.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="outlined"
              className={classes.btn}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductScreen;
