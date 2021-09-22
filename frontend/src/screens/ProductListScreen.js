import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import {
  Typography,
  Container,
  makeStyles,
  Grid,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import DataTable from "../components/DataTable/DataTable";
import AddIcon from "@material-ui/icons/Add";
import Paginate from "../components/Paginate/Paginate";

const useStyles = makeStyles((theme) => ({
  orderCard: {
    padding: "50px",
  },
}));

const ProductListScreen = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const pageNumber = props.match.params.pageNumber || 1;
  const [page, setPage] = React.useState(pageNumber);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
    loading: loadingCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    } else {
      // '' for empty keyword
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    createdProduct,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`${name} will be deleted. Are you sure?`) === true) {
      // DISPATCH DELETE PRODUCT
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id) => {
    history.push(`/admin/products/${id}/edit`);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    history.push(`/admin/products/${value}`);
  };

  return (
    <Container maxwidth="sm">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={12}>
          <div className={classes.orderCard}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item sm={6}>
                <Typography variant="h3">PRODUCTS</Typography>
              </Grid>
              <Grid item sm={6}>
                <Button
                  onClick={createProductHandler}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  <AddIcon /> Create Product
                </Button>
              </Grid>
            </Grid>
            {(error || errorDelete || errorCreate) && (
              <Message
                close={() => setOpen(false)}
                message={
                  error ? error : errorDelete ? errorDelete : errorCreate
                }
                severity="error"
                open={open}
              />
            )}
            {(loading || loadingDelete || loadingCreate) && (
              <Loader size={100} />
            )}
            <Grid container>
              <DataTable
                tableHeadings={[
                  "ID",
                  "NAME",
                  "", // This extra is to give some spacing and table shape
                  "PRICE",
                  "CATEGORY ($)",
                  "BRAND",
                ]}
                tableContents={
                  products &&
                  products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell component="th" scope="row">
                        {p._id}
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          style={{ cursor: "pointer" }}
                          to={`/product/${p._id}`}
                        >
                          {p.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{p.email}</TableCell>
                      <TableCell align="left">${p.price}</TableCell>
                      <TableCell align="left">{p.category}</TableCell>
                      <TableCell align="left">{p.brand}</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => handleEdit(p._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteHandler(p._id, p.name)}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              />
            </Grid>
            <Grid container justifyContent="center">
              <Paginate
                page={page}
                handlePageChange={handlePageChange}
                pages={pages}
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductListScreen;
