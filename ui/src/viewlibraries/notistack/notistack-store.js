import CustomNotistackView from './custom-notistack-view';
import React from 'react';
import ReactDOM from 'react-dom';

const notiStack = (function () {

  let enqueueSnackbar = null;
  let closeSnackbar = null;

  const showMessage = function (fFunction) {
    enqueueSnackbar = fFunction;
  };

  const hideMessage = function (fFunction) {
    closeSnackbar = fFunction;
  };

  const alertifyDOM = document.getElementById('alertifyContainer');
  ReactDOM.render(
    <CustomNotistackView showMessage={showMessage} hideMessage={hideMessage}/>,
    alertifyDOM
  );

  return {

    error: function (message) {
      const variant = "error";
      enqueueSnackbar(<div className="alertifyError">{message}</div>, {
        variant: variant,
        autoHideDuration: 10000,
        action: (key) => <div className="messageCloseButton" onClick={() => closeSnackbar(key)}/>
      });
    },

    success: function (sMessage) {
      const variant = "success";
      enqueueSnackbar(<div className="alertifySuccess">{sMessage}</div>, {
        variant: variant,
        autoHideDuration: 3000,
        action: (key) => <div className="messageCloseButton" onClick={() => closeSnackbar(key)}/>
      });
    },

    message: function (sMessage) {
      const variant = "info";
      enqueueSnackbar(<div className="alertifyMessage">{sMessage}</div>, {
        variant: variant,
        autoHideDuration: 10000,
        action: (key) => <div className="messageCloseButton" onClick={() => closeSnackbar(key)}/>
      });
    },

    warning: function (sMessage) {
      const variant = "warning";
      enqueueSnackbar(<div className="alertifyWarning">{sMessage}</div>, {
        variant: variant,
        autoHideDuration: 10000,
        action: (key) => <div className="messageCloseButton" onClick={() => closeSnackbar(key)}/>
      });
    }

  }

})();


export default notiStack;