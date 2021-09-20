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
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOff from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getUsers, deleteUser } from "../actions/userActions";
import DataTable from "../components/DataTable/DataTable";

const useStyles = makeStyles((theme) => ({
  orderCard: {
    padding: "50px",
  },
}));

const UserListScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const userGet = useSelector((state) => state.userGet);
  const { loading, error, users } = userGet;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`${name} will be deleted. Are you sure?`) === true) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (id) => {
    history.push(`/admin/users/${id}/edit`);
  };

  return (
    <Container maxwidth="sm">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={12}>
          <div className={classes.orderCard}>
            <Typography variant="h3">USERS</Typography>
            {error && (
              <Message
                close={() => setOpen(false)}
                message={error}
                severity="error"
                open={open}
              />
            )}
            {loading && <Loader size={100} />}
            <Grid container>
              <DataTable
                tableHeadings={["ID", "NAME", "EMAIL", "isADMIN"]}
                tableContents={
                  users &&
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">
                        {user.isAdmin ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <HighlightOff style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(user._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteHandler(user._id, user.name)}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserListScreen;
