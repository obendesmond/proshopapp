import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Paper,
  InputLabel,
  Input,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Rating from "../components/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Form from "../components/Form/Form";

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
  paper: {
    marginTop: "10px",
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  formControl2: {
    width: "100%",
    marginBottom: "40px",
  },
}));

const ProductScreen = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openMessageReview, setOpenMessageReview] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCardHandler = () => {
    dispatch(addToCart(id, qty));
    history.push("/cart");
  };

  const handleReviewSubmit = (e) => {
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <div className={classes.root}>
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
      {loading || loadingProductReview ? (
        <Loader size={100} />
      ) : error ? (
        <Message
          message={error}
          open={open}
          close={() => setOpen(false)}
          severity="error"
        />
      ) : (
        <>
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="space-between"
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
              <Grid item xs={12}>
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
          <Divider className={classes.bottomSpacing} />
          <Grid container spacing={3} direction="row">
            <Grid item xs={12}>
              <Typography variant="h4">REVIEWS</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container>
                {product.reviews.length === 0 && (
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography>No Reviews</Typography>
                    </Paper>
                  </Grid>
                )}
                {product.reviews.map((review) => (
                  <Grid item xs={12} key={review._id}>
                    <Paper className={classes.paper}>
                      <strong>
                        <Typography variant="h6">{review.name}</Typography>
                      </strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <Typography>{review.comment}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Write A Customer Review</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              {errorProductReview && (
                <Message
                  message={errorProductReview}
                  open={openMessageReview}
                  close={() => setOpenMessageReview(false)}
                  severity="error"
                />
              )}
              {userInfo ? (
                <Form
                  handleFormSubmit={handleReviewSubmit}
                  isReviewForm={true}
                  submitBtnText="Submit Review"
                >
                  <FormControl className={classes.formControl2}>
                    <InputLabel id="select-review-input">Rating</InputLabel>
                    <Select
                      labelId="select-review-input"
                      id="demo-simple-select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <MenuItem value={5}>5 - Excellent</MenuItem>
                      <MenuItem value={4}>4 - Very Good</MenuItem>
                      <MenuItem value={3}>3 - Good</MenuItem>
                      <MenuItem value={2}>2 - Fair</MenuItem>
                      <MenuItem value={1}>1 - Poor</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl2}>
                    <InputLabel htmlFor="comment-input">
                      Comment about {product.name}
                    </InputLabel>
                    <Input
                      multiline={true}
                      maxRows={6}
                      id="comment-input"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                </Form>
              ) : (
                <Typography>
                  Please{" "}
                  <Link to={`/login?redirect=/product/${id}`}>Sign in</Link> to
                  write a review
                </Typography>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
