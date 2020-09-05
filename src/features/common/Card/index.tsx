import React, {  } from 'react';
import styles from './Card.module.css';


export const Card: React.FC = (props) => {

  return (
    <div className={styles.outerBorder}>
        {props.children}
    </div>
  );
}
