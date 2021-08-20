import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import Product from "../components/Product/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";

const useStyles = makeStyles((theme) => ({
  con: {
    margin: "50px 0 50px 0",
  },
  smcon: {
    marginBottom: "10px",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader size={100} />
      ) : error ? (
        <Message
          message={error}
          close={() => setOpen(false)}
          open={open}
          severity="error"
        />
      ) : (
        <Grid
          className={classes.con}
          container
          direction="row"
          justifyContent="center"
          spacing={3}
        >
          {products.map((product) => (
            <Grid
              className={classes.smcon}
              key={product._id}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
