import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import {
  productDetails as listProductDetails,
  updateProduct,
} from "../actions/productActions";
import {
  Typography,
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  Button,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Form from "../components/Form/Form";
import { useHistory } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "50px auto 50px auto",
    alignSelf: "center",
  },
  formControl: {
    width: "100%",
    marginBottom: "40px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductEditScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const id = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        history.push("/admin/products");
      } else {
        if (!product.name || product._id !== id) {
          dispatch(listProductDetails(id));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [dispatch, userInfo, history, id, product, successUpdate]);

  const handleProductUpdate = () => {
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
      })
    );
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      const prevImage = product.image;
      // delete previous image
      await axios.post("/api/upload/deletePrevImage", prevImage, config);

      // the data that comes back is the path
      setImage(data);
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <Container maxwidth="sm">
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
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={8}>
          <Card className={classes.card} raised>
            <CardContent>
              {(error || errorUpdate) && (
                <Message
                  close={() => setOpen(false)}
                  message={error ? error : errorUpdate}
                  severity="error"
                  open={open}
                />
              )}
              <Typography variant="h5" style={{ margin: "10px 0 20px 0" }}>
                EDIT PRODUCT
              </Typography>
              {loading || loadingUpdate ? <Loader size={40} /> : null}
              <Form
                handleFormSubmit={handleProductUpdate}
                name={name}
                setName={setName}
                submitBtnText="Update Product"
                isProductEditForm={true}
              >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="price-input">Price</InputLabel>
                  <Input
                    type="number"
                    erro={error && true}
                    id="price-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="brand-input">Brand</InputLabel>
                  <Input
                    erro={error && true}
                    id="brand-input"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="category-input">Category</InputLabel>
                  <Input
                    erro={error && true}
                    id="category-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="description-input">
                    Description
                  </InputLabel>
                  <Input
                    erro={error && true}
                    id="description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="instock-input">
                    Count-In-Stock
                  </InputLabel>
                  <Input
                    type="number"
                    erro={error && true}
                    id="instock-input"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="image-input">Image</InputLabel>
                  <Input
                    erro={error && true}
                    id="image-input"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="upload-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={uploadHandler}
                  />
                  <label htmlFor="upload-file">
                    {uploading ? (
                      <Loader size={40} />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload
                      </Button>
                    )}
                  </label>
                </FormControl>
              </Form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductEditScreen;
