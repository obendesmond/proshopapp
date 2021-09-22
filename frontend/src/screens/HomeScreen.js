import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import Product from "../components/Product/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import Paginate from "../components/Paginate/Paginate";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

const useStyles = makeStyles((theme) => ({
  con: {
    margin: "50px 0 50px 0",
  },
  smcon: {
    marginBottom: "10px",
  },
}));

const HomeScreen = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const keyword = props.match.params.keyword;
  const pageNumber = props.match.params.pageNumber || 1;
  const [page, setPage] = React.useState(pageNumber);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (keyword) {
      history.push(`/search/${keyword}/page/${value}`);
    } else {
      history.push(`/page/${value}`);
    }
  };

  return (
    <>
      {!keyword && <ProductCarousel />}
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
          <Grid container justifyContent="center">
            <Paginate
              page={page}
              handlePageChange={handlePageChange}
              pages={pages}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
