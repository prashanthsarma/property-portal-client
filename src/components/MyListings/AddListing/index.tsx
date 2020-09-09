import React, { ChangeEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { PropertyType, AreaType, PriceType, Facility, IPropertyAttrs } from '@prashanthsarma/property-portal-common'
import { API } from '../../../api';
import { useHistory } from 'react-router-dom';
import { FileToDataUrl } from '../../../utils/FileToDataUrl';


const defaultProperty: IPropertyAttrs = {
  header: "",
  propertyType: PropertyType.Apartment,
  area: 500,
  areaType: AreaType.HKB1,
  price: 14000,
  priceType: PriceType.Rent,
  facilities: [Facility.PowerBackUp, Facility.ServiceLift],
  address: "Mahadevpura",
  city: "Bengaluru",
  lat: 0,
  lon: 0,
  userId: "",
  images: []
}

export function AddListing() {
  const [values, setValues, setValue] = useForm(defaultProperty);
  const [error, setError] = useState('');
  const history = useHistory();

  const generateOption = (value: string) => (<option key={value} value={value}>{value}</option>)

  const propertyTypeOptions = Object.values(PropertyType).map(generateOption);
  const areaTypeOptions = Object.values(AreaType).map(generateOption);
  const facilitiesOptions = Object.values(Facility).map(generateOption);
  const priceTypeOptions = Object.values(PriceType).map(generateOption);

  const onAddClicked = async (e: any) => {
    e.preventDefault();
    const resp = await API.property.addUserPropertyListings(values);
    if (resp.error !== '') {
      setError(resp.error);
    } else {
      history.push('/listings');
    }
  }

  const onFacilitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { facilities } = values;
    const index = facilities.findIndex(f => f === e.target.value);
    let newFacilities = [...facilities];
    if (index > -1) {
      newFacilities.splice(index, 1);
    }
    else {
      newFacilities.push(e.target.value as Facility);
    }
    setValue(e.target.name, newFacilities);
  }

  const handleDrop = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files!;

    const images = await FileToDataUrl.GetImageDataUrl(fileList)
    setValue('images', images);
    // console.log(images);
  }

  return (
    <form className="d-flex justify-content-center" onSubmit={onAddClicked}>
      <div className="container">
        <div className="form-row mr-2">
          <label>Property Listing Header</label>
          <input
            className="form-control"
            name="header"
            type="text"
            required
            minLength={5}
            maxLength={50}
            value={values.header}
            onChange={setValues}>
          </input>
        </div>
        <div className="d-flex flex-row flex-wrap">
          <div className="form-row mr-2 flex-grow-1">
            <label>Address</label>
            <input
              className="form-control"
              name="address"
              type="text"
              required
              minLength={5}
              maxLength={250}
              value={values.address}
              onChange={setValues}>
            </input>
          </div>
          <div className="form-row mr-2">
            <label>City</label>
            <input
              className="form-control"
              name="city"
              type="text"
              required
              minLength={5}
              maxLength={50}
              value={values.city}
              onChange={setValues}>
            </input>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap">
          <div className="form-row mr-2">
            <label>Property Type</label>
            <select
              className="form-control"
              name="propertyType"
              required
              value={values.propertyType}
              onChange={setValues}>
              {propertyTypeOptions}
            </select>
          </div>
          <div className="form-row mr-2">
            <label>Layout</label>
            <select
              className="form-control"
              name="areaType"
              required
              value={values.areaType}
              onChange={setValues}>
              {areaTypeOptions}
            </select>
          </div>
          <div className="form-row mr-2 flex-grow-1">
            <label>Total Area(Sq. ft)</label>
            <input
              className="form-control"
              name="area"
              type="number"
              required
              min={50}
              max={1000000}
              value={values.area}
              onChange={setValues}>
            </input>
          </div>
          <div className="form-row mr-2">
            <label>Listing Type</label>
            <select
              className="form-control"
              name="priceType"
              required
              value={values.priceType}
              onChange={setValues}>
              {priceTypeOptions}
            </select>
          </div>
          <div className="form-row mr-2 flex-grow-1">
            <label>Price</label>
            <input
              className="form-control"
              name="price"
              type="number"
              required
              min={100}
              max={1000000}
              value={values.price}
              onChange={setValues}>
            </input>
          </div>
        </div>
        {/* <div className="d-flex flex-row flex-wrap">
          
          
        </div> */}
        <div className="d-flex flex-row flex-wrap">
          <div className="form-row mr-2 flex-grow-1">
            <label>Facilities</label>
            <select multiple
              className="form-control"
              name="facilities"
              size={5}
              value={values.facilities}
              onChange={onFacilitySelect}>
              {facilitiesOptions}
            </select>
          </div>
          <div className="align-self-center form-row mr-2">
            <label>Latitude</label>
            <input
              className="form-control"
              name="lat"
              type="number"
              min={-90}
              max={90}
              value={values.lat}
              onChange={setValues}>
            </input>
          </div>
          <div className="align-self-center form-row mr-2">
            <label>Longitude</label>
            <input
              className="form-control"
              name="lon"
              type="number"
              required
              min={-180}
              max={180}
              value={values.lon}
              onChange={setValues}>
            </input>
          </div>
          <div className="align-self-center form-row mr-2">
          <label>Upload Property image</label>
            <input className="form-control-file"
              accept="image/x-png,image/gif,image/jpeg"
              multiple={false}
              onChange={handleDrop}
              type="file"
            ></input>
          </div>
          
        </div>
        <div className="align-self-center mt-4">
          <button className="m-2 btn btn-primary" type="submit">Add New Property Listing</button>
        </div>
        <p>{error}</p>
      </div>
    </form >
  );
}
