import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from './Modals/Backdrop';
import DeleteOverlay from './Modals/DeleteOverlay';

const DeleteModal = () => {
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

export default DeleteModal;
