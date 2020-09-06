import React, { ReactNode } from 'react';
import styles from './PropertyCard.module.css';
import { IPropertyAttrs } from '@prashanthsarma/property-portal-common'
import house from '../../../images/house.jpg'
import { Card } from '../Card';

export interface IPropertyCardProps {
  property: IPropertyAttrs
  appendNodes?: ReactNode
}

export function PropertyCard(props: IPropertyCardProps) {
  const { property, appendNodes } = props;
  return (
    <Card className="w-100 d-flex flex-column container-fluid mt-4">
      <div className="border-bottom mb-3">
        <h2>{property.header}</h2>
        <p>{property.propertyType}</p>
      </div>
      <div className="d-flex row">
        <div className={`${styles.descriptionWidth} col-12 col-sm-6 d-flex align-items-baseline flex-column`}>
          <p>{`${property.areaType}, ${property.area}sqft`}</p>
          <p>{`${property.priceType}: ${property.price}/-`}</p>
          <p>{`Address: ${property.address}`}</p>
          <p>{`City: ${property.city}`}</p>
          <p>{`Facilities: ${property.facilities.join(', ')} `}</p>
        </div>
        <div className={`${styles.imageWidth} col-12 col-sm-6`} style={{ backgroundImage: `url(${house})` }}>
          {/* <img className="w-100"src={house} /> */}
        </div>
      </div>
      {appendNodes}
    </Card>
  );
}
