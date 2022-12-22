import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from './Modals/Backdrop';
import DeleteOverlay from './Modals/DeleteOverlay';

/**
 * Component to show a confirmation modal for deleting expenses
 * @Component 
 */
const ConfirmModal = () => {
  return (
    <Fragment>
      {createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      {createPortal(
        <DeleteOverlay />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ConfirmModal;
