import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = ({ variant, severity, message, close, open }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          variant={variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={close}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}!
        </Alert>
      </Collapse>
    </div>
  );
};

Message.defaultProps = {
  variant: "filled",
  severity: "success",
};

export default Message;
