import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { useForm } from '../../../hooks/useForm';
import { PropertyType, AreaType, PriceType, Facility, IPropertyAttrs } from '@prashanthsarma/property-portal-common'
import { API } from '../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { FileToDataUrl } from '../../../utils/FileToDataUrl';
import { CurrentConfig } from '../../../config';
import { Carousel } from 'react-responsive-carousel'
import './styles.css'


const defaultProperty: IPropertyAttrs = {
  header: "",
  propertyType: PropertyType.Apartment,
  area: 500,
  areaType: AreaType.HKB1,
  price: 14000,
  priceType: PriceType.Rent,
  facilities: [Facility.PowerBackUp, Facility.ServiceLift],
  address: "Bengaluru Central",
  city: "Bengaluru",
  lat: 12.976581,
  lon: 77.568653,
  userId: "",
  images: []
}

export function AddOrEditListing() {
  const [formValues, setFormValue, setNameValue, setAllValues] = useForm(defaultProperty);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const isAdd = id === 'add';
  const stableSetAllValues = useCallback(setAllValues, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      if (!isAdd) {
        const resp = await API.property.fetchProperty(id);
        if (resp.error === '') {
          stableSetAllValues(resp.data);
        }
      } else {
        stableSetAllValues(defaultProperty);
      }
      setLoading(false);
    }
    fetchInitialState();

  }, [id, stableSetAllValues, isAdd])

  
  const onAddClicked = async (e: any) => {
    e.preventDefault();
    setIsUpdating(true);
    let resp = null
    if (isAdd) {
      resp = await API.property.addProperty(formValues);
    }
    else {
      resp = await API.property.editProperty(id, formValues);
    }
    setIsUpdating(false);
    if (resp.error !== '') {
      setError(resp.error);
    } else {
      history.push('/listings');
    }
  }

  const onFacilitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { facilities } = formValues;
    const index = facilities.findIndex(f => f === e.target.value);
    let newFacilities = [...facilities];
    if (index > -1) {
      newFacilities.splice(index, 1);
    }
    else {
      newFacilities.push(e.target.value as Facility);
    }
    setNameValue(e.target.name, newFacilities);
  }

  const handleDrop = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files!;
    if (fileList.length > 8) {
      window.alert("Maximum only 8 images can be selected");
      return;
    }

    const images = await FileToDataUrl.GetImageDataUrl(fileList)
    setNameValue('images', images);
  }

  if (formValues.images.length < 1) {
    formValues.images.push('defaultHouseImage.jpg')
  }

  const carouselImages = formValues.images.map((img, i) => (
    <div key={`silde${i}`} className="h-100 slide-contain" style={{ objectFit: 'contain' }}>
      <img src={img.startsWith("data:") ? img : `${CurrentConfig.CDN_URL}/${img}`}
        alt="property-img"
        className="h-100" />
    </div>
  ))

  const generateOption = (value: string) => (<option key={value} value={value}>{value}</option>)

  const propertyTypeOptions = Object.values(PropertyType).map(generateOption);
  const areaTypeOptions = Object.values(AreaType).map(generateOption);
  const facilitiesOptions = Object.values(Facility).map(generateOption);
  const priceTypeOptions = Object.values(PriceType).map(generateOption);


  return (
    <div>
      {loading
        ?
        <div className="d-flex center-page align-items-center justify-content-center">
          <div className="spinner-border spinner-large"></div>
        </div>
        : <form className="d-flex justify-content-center add-property-form" onSubmit={onAddClicked}>
          <div className="container">
            <div className="form-row mr-2">
              <label>Property Listing Header</label>
              <input
                className="form-control"
                name="header"
                type="text"
                required
                minLength={5}
                maxLength={100}
                value={formValues.header}
                onChange={setFormValue}>
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
                  value={formValues.address}
                  onChange={setFormValue}>
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
                  value={formValues.city}
                  onChange={setFormValue}>
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
                  value={formValues.propertyType}
                  onChange={setFormValue}>
                  {propertyTypeOptions}
                </select>
              </div>
              <div className="form-row mr-2">
                <label>Layout</label>
                <select
                  className="form-control"
                  name="areaType"
                  required
                  value={formValues.areaType}
                  onChange={setFormValue}>
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
                  max={100000000}
                  value={formValues.area}
                  onChange={setFormValue}>
                </input>
              </div>
              <div className="form-row mr-2">
                <label>Listing Type</label>
                <select
                  className="form-control"
                  name="priceType"
                  required
                  value={formValues.priceType}
                  onChange={setFormValue}>
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
                  value={formValues.price}
                  onChange={setFormValue}>
                </input>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap">
              <div className="align-self-baseline form-row mr-2">
                <label>Latitude</label>
                <input
                  className="form-control"
                  name="lat"
                  type="number"
                  step={0.0000001}
                  min={-90}
                  max={90}
                  value={formValues.lat}
                  onChange={setFormValue}>
                </input>
              </div>
              <div className="align-self-baseline form-row mr-2">
                <label>Longitude</label>
                <input
                  className="form-control"
                  name="lon"
                  type="number"
                  step={0.0000001}
                  min={-180}
                  max={180}
                  value={formValues.lon}
                  onChange={setFormValue}>
                </input>
              </div>
              <div className="form-row mr-2 flex-grow-1">
                <label>Facilities</label>
                <select multiple
                  className="form-control"
                  name="facilities"
                  size={5}
                  value={formValues.facilities}
                  onChange={onFacilitySelect}>
                  {facilitiesOptions}
                </select>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-4">
              <Carousel showArrows={true} showThumbs={true} className="add-property-form-carousel">
                {carouselImages}
              </Carousel>
              <div className="align-self-center form-row mr-2">
                <label>Upload Property image</label>
                <input className="form-control-file"
                  accept="image/x-png,image/gif,image/jpeg"
                  multiple={true}
                  onChange={handleDrop}
                  type="file"
                ></input>
              </div>
            </div>
            <div className="align-self-center mt-4">
              <button className="m-2 btn btn-primary" type="submit" disabled={isUpdating}>
                {isAdd ? 'Add New Property' : 'Update Property'}
                {isUpdating ? <div className="ml-2 spinner-border spinner-small" /> : null}
              </button>
              <button className="m-2 btn btn-secondary" onClick={()=> history.push('/listings')}>
                {`Back`}
              </button>
            </div>
            <p>{error}</p>
          </div>
        </form >
      }
    </div>
  );
}
