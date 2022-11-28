/* eslint-disable react-hooks/exhaustive-deps */
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import styles from '@styles/components/Map.module.css'
import useProductDetail from "src/hooks/useProductDetail";

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  storesCoords(): any[];
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  storesCoords,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {userCoords} = useProductDetail()
  const [map, setMap] = useState<google.maps.Map>();
  const center: google.maps.LatLngLiteral = userCoords;

  useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      map.setOptions(options);
      bounds.extend(center)
      storesCoords().map(coord => {
        bounds.extend(coord)
      })
      map.fitBounds(bounds, 10)
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
  
      if (onClick) {
        map.addListener("click", onClick);
      }
  
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom: 12,
      }));
    }
  }, [ref, map]);

  return (
    <>
      <div className={styles.map} ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement<any>(child, { map });
        }
      })}
    </>
  );
};

export default Map