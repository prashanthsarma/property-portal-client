import React, { ReactNode } from 'react';
import { IPropertyAttrs } from '@prashanthsarma/property-portal-common'
import { Card } from '../Card';
import { CurrentConfig } from '../../../config';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from './PropertyCard.module.css';
import "./styles.css"

export interface IPropertyCardProps {
  property: IPropertyAttrs
  appendNodes?: ReactNode
}

export function PropertyCard(props: IPropertyCardProps) {
  const { property, appendNodes } = props;

  let { images } = property
  if (!images || images.length < 1) {
    images = [`defaultHouseImage.jpg`]
  }

  const carouselImages = images.map((img, i) => (
    <div key={`silde${i}`} className="h-100 slide-contain" style={{ objectFit: 'contain' }}>
      <img src={`${CurrentConfig.CDN_URL}/${img}`} alt="property-img" className="h-100" />
    </div>
  ))

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
        <Carousel showArrows={true} className={`col-12 col-sm-6 ${styles.carousel}`} showThumbs={false}>
          {carouselImages}
        </Carousel>
      </div>
      {appendNodes}
    </Card>
  );
}
