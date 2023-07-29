import React from 'react';
import GoogleMapReact from 'google-map-react';
import Image from 'next/image';

const AnyReactComponent = ({ text }: any) => {
  return (
    <Image
      src="/images/pin_map.svg"
      alt="marker"
      width={30}
      height={30}
      layout="fixed"
    />
  );
};

export default function SimpleMap({ markers }: { markers: any[] }) {
  const defaultProps = {
    center: {
      lat: -12.046374,
      lng: -76.042793,
    },
    zoom: 9,
  };

  return (
    <>
      <div
        style={{ height: '500px', width: '800px' }}
        className="sm:block hidden"
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markers?.map((marker, index) => (
            <AnyReactComponent
              lat={marker.lat}
              lng={marker.lng}
              text={marker.name}
              key={index}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div
        style={{ height: '500px', width: '100%' }}
        className="block sm:hidden"
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markers?.map((marker, index) => (
            <AnyReactComponent
              lat={marker.lat}
              lng={marker.lng}
              text={marker.name}
              key={index}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
}
