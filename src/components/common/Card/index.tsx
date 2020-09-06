import React, { } from 'react';
import styles from './Card.module.css';


export interface ICardProps {
  children: React.ReactNode,
  className : string
}

export function Card(props: ICardProps) {
  return (
    <div className={`${styles.outerBorder} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}
