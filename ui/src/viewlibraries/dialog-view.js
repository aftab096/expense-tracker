import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import _ from "lodash";
import ReactLoading from "react-loading";

import "../styles/library-views.css";

const DialogView = (props) => {
  const handleRequestOnClose = () => {
    props.onClose?.();
  };

  const handleButtonClick = (buttonId) => {
    props.buttonClickHandler?.(buttonId);
  };

  const className = `customDialog ${props.className}`;
  const dialogTitleStyle = {
    fontSize: "18px",
    height: "50px",
    paddingTop: "14px",
  };

  let style = props.contentStyle
    ? props.contentStyle
    : {
        width: "75%",
        maxWidth: "768px",
      };

  const dialogTitle = _.isEmpty(props.title) ? null : (
    <DialogTitle
      className="customDialogTitle"
      style={dialogTitleStyle}
      disableTypography={true}
    >
      {props.title}
    </DialogTitle>
  );

  let dialogButtons = [];
  let buttonStyle = {
    height: "30px",
    minWidth: "75px",
    lineHeight: "28px",
    margin: "0 5px",
    padding: "0",
    minHeight: "30px",
    boxShadow: "none",
  };
  _.forEach(props.buttonsData, (button) => {
    const buttonClassName = button.isRaised
      ? "btn btn-primary"
      : "btn btn-secondary";

    dialogButtons.push(
      <button
        key={button.id}
        isRaisedButton={!button.isFlat}
        style={buttonStyle}
        className={buttonClassName}
        onClick={handleButtonClick.bind(this, button.id)}
      >
        {button.label}
      </button>
    );
  });

  const actionContainerStyle = {
    padding: "7px 8px",
    height: "46px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#eee",
    margin: "0",
  };

  dialogButtons = !_.isEmpty(dialogButtons) ? (
    <DialogActions style={actionContainerStyle}>{dialogButtons}</DialogActions>
  ) : null;

  const bodyStyle = {
    padding: "24px",
    scrollbarWidth: "thin",
  };
  const bodyStyleFromProps = _.assign(bodyStyle, props.bodyStyle);
  const { classes } = props;

  const getLoaderView = () => {
    return (
      <div className="loaderContainer">
        <ReactLoading type="bubbles" color="#111" />
      </div>
    );
  };

  return (
    <Dialog
      disableBackdropClick={props.modal}
      open={props.open || false}
      onClose={handleRequestOnClose}
      actions={dialogButtons}
      disableEscapeKeyDown={false}
      className={className}
      contentclassname={props.contentClassName}
      bodyclassname={props.bodyClassName}
      PaperProps={{ style: style }}
    >
      {props.isLoading && getLoaderView()}
      {dialogTitle}
      {props.isLoading && getLoaderView()}
      <DialogContent
        className={props.contentClassName}
        style={bodyStyleFromProps}
      >
        {props.children}
      </DialogContent>
      {dialogButtons}
    </Dialog>
  );
};

export default DialogView;
