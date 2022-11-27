/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  store: {
    name: string,
    address: string
  };
}

const Marker = ({store, ...options}: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h3 id="firstHeading" class="firstHeading">${store.name}</h3>` +
    '<div id="bodyContent">' +
    `<p>${store.address}</p>` +
    "</div>" +
    "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    } else {
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: options.map,
        });
      });
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default Marker