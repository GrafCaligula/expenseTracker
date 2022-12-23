//@ts-check
import React from 'react';

import classes from './Card.module.css';
const Card = (props) => {
  // Übergabe der Klassen durch props an den Custom-Card-Wrapperprops children is always there
  return (
    <div className={classes.card + ' ' + props.className}>{props.children}</div>
  );
};

export default Card;
