import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Loader from "../components/Loader/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import {
  Typography,
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Form from "../components/Form/Form";
import { useHistory } from "react-router-dom";

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

const UserEditScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const id = props.match.params.id;
  const [isAdmin, setIsAdmin] = React.useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        history.push("/admin/users");
      } else {
        if (id !== user._id || !user.name) {
          dispatch(getUserDetails(id));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    }
  }, [dispatch, userInfo, history, id, user, successUpdate]);

  const handleUserUpdate = () => {
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  const handleChange = (event) => {
    setIsAdmin(event.target.value);
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
              {successUpdate && (
                <Message
                  close={() => setSuccessOpen(false)}
                  message="Successfully updated profile"
                  open={successOpen}
                />
              )}
              <Typography variant="h5" style={{ margin: "10px 0 20px 0" }}>
                EDIT USER
              </Typography>
              {loading || loadingUpdate ? <Loader size={40} /> : null}
              <Form
                handleFormSubmit={handleUserUpdate}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                submitBtnText="Update User"
                isUserEditForm={true}
              >
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">IsAdmin</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isAdmin}
                    onChange={handleChange}
                  >
                    <MenuItem value={false}>False</MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                  </Select>
                </FormControl>
              </Form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserEditScreen;
