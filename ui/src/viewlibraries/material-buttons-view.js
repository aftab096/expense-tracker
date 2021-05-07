import React from "react";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import "../styles/library-views.css";


const MaterialButtonsView = (props) => {
  let applyButtonStyles = !_.isEmpty(props.style)
    ? _.clone(props.style)
    : {
        height: "28px",
        lineHeight: "28px",
        margin: "0 5px",
        padding: "0 10px",
        minWidth: "64px",
        minHeight: "28px",
        boxShadow: "none",
        outline: "none",
      };

  let className = (props.className || "") + " customMaterialButton ";
  let onClickHandler = props.onButtonClick;
  let label = props.label || props.children;
  let variant = props.variant || "flat";
  if (props.isRaisedButton) {
    applyButtonStyles.color = applyButtonStyles.color
      ? applyButtonStyles.color
      : "#FFF";
    variant = "contained";
    className += "raisedButton";
  }

  if (props.isContainedButton) {
    applyButtonStyles.color = "#FFF";
    variant = "contained";
    className += "raisedButton";
  }
  return (
    <Button
      className={className}
      onClick={onClickHandler}
      style={applyButtonStyles}
      variant={variant}
      children={props.children}
      disabled={props.isDisabled}
      classes={props.classes}
      color={props.color}
    >
      {label}
    </Button>
  );
};

export default MaterialButtonsView;
