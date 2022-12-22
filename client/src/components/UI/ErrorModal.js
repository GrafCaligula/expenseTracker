import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from './Modals/Backdrop';
import ErrorOverlay from './Modals/ErrorOverlay';

/**
 * Component to show an Error modal
 * @Component 
 */
const ErrorModal = () => {
  return (
    <Fragment>
      {createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {createPortal(<ErrorOverlay />, document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default ErrorModal;
