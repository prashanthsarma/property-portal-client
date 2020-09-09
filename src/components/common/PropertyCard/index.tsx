import React, { ReactNode } from 'react';
import styles from './PropertyCard.module.css';
import { IPropertyAttrs } from '@prashanthsarma/property-portal-common'
import { Card } from '../Card';
import { CurrentConfig } from '../../../config';

export interface IPropertyCardProps {
  property: IPropertyAttrs
  appendNodes?: ReactNode
}

export function PropertyCard(props: IPropertyCardProps) {
  const { property, appendNodes } = props;

  const imgUrl = property.images.length > 0
    ? `${CurrentConfig.CDN_URL}/${property.images[0]}`
    : `${CurrentConfig.CDN_URL}/defaultHouseImage.jpg`;

  return (
    <Card className="w-100 d-flex flex-column container-fluid mt-4">
      <div className="border-bottom mb-3">
        <h2>{property.header}</h2>
      </div>
      <div className="d-flex row">
        <div className={`${styles.descriptionWidth} col-12 col-sm-6 d-flex align-items-baseline flex-column`}>
          <p>{`${property.propertyType}, ${property.areaType}, ${property.area}sqft`}</p>
          <p>
            <span>{`${property.priceType}: `}</span>
            <span className="small">{`${property.price}/-`}</span>
          </p>
          <p>
            <span>{`Address: `}</span>
            <span className="small">{`${property.address}`}</span>
          </p>
          <p>
            <span>{`City: `}</span>
            <span className="small">{`${property.city}`}</span>
          </p>
          <p>
            <span>{`Facilities: `}</span>
            <span className="small">{`${property.facilities.join(', ')}`}</span>
          </p>
        </div>
        <div className={`${styles.imageWidth} col-12 col-sm-6`} style={{ backgroundImage: `url(${imgUrl})` }}>
          {/* <img className="w-100"src={house} /> */}
        </div>
      </div>
      {appendNodes}
    </Card>
  );
}
