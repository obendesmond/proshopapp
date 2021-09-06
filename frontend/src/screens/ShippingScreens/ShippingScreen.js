import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StepConnector from "@material-ui/core/StepConnector";
import Shipping from "./Shipping";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../actions/cartActions";
import Payment from "./Payment";
import Order from "./Order";
import { Card, CardContent, Container } from "@material-ui/core";
import { createOrder } from "../../actions/orderActions";
import Message from "../../components/Message/Message";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    marginTop: "80px",
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    marginTop: "80px",
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalShippingIcon />,
    2: <PaymentIcon />,
    3: <ShoppingCartIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    minWidth: 275,
    maxWidth: "70%",
    margin: "10px auto 50px auto",
    alignSelf: "center",
  },
}));

function getSteps() {
  return ["Shipping", "Payment", "Place Order"];
}

export default function ShippingScreen(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [messageOpen, setMessageOpen] = useState(true);
  const steps = getSteps();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [paymentMethod2, setPaymentMethod2] = useState(paymentMethod);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, userInfo, success]);

  const saveShippingAddressHandler = () => {
    // check empty fields
    if (!address || !city || !postalCode || !country) {
      alert("Fields should not be empty");
    } else {
      // save shipping address
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      // move to payment step
      setActiveStep(1);
    }
  };

  const savePaymentMethodHandler = () => {
    dispatch(savePaymentMethod(paymentMethod2));
    setActiveStep(2);
  };

  const placeOrder = (
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  ) => {
    dispatch(
      createOrder(
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      )
    );
  };

  const handleBack = (to) => {
    setActiveStep(to);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Shipping
            handleFormSubmit={saveShippingAddressHandler}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            country={country}
            setCountry={setCountry}
          />
        );
      case 1:
        return (
          <Payment
            paymentMethod={paymentMethod2}
            setPaymentMethod={setPaymentMethod2}
            savePaymentMethod={savePaymentMethodHandler}
            handleBack={() => handleBack(0)}
          />
        );
      case 2:
        return (
          <Order placeOrder={placeOrder} handleBack={() => handleBack(1)} />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Container maxwidth="sm">
          <Card className={classes.card} raised>
            {error && (
              <Message
                close={() => setMessageOpen(false)}
                message={error}
                severity="error"
                open={messageOpen}
              />
            )}
            <CardContent>{getStepContent(activeStep)}</CardContent>
            {/* <CardActions>actions here</CardActions> */}
          </Card>
        </Container>
      </div>
    </div>
  );
}
