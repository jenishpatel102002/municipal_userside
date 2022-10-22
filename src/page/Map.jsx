import React, { useEffect, useState } from "react";
import { Map, Marker ,GeoJson } from "pigeon-maps";
import { useGeolocated } from "react-geolocated";
import NaviBar from "./NavBar";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Await } from "react-router-dom";

export default function SimpleMap() {
  const [loc, setloc] = useState([]);
  const [done, setDone] = useState("false");
  const val = [];

  const unsubscribe = () => {
    setDone(false);
    getDocs(query(collection(db, "loaction/")))
      .then((snapshot) => {
        snapshot.forEach((item) => {
          val.push(item.data());
        });
      })
      .then(() => setDone(true));
    setloc(val);
  };

  useEffect(() => {
    unsubscribe();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return !isGeolocationAvailable ? (
    <div>
      <NaviBar />
      Your browser does not support Geolocation
    </div>
  ) : !isGeolocationEnabled ? (
    <div>
      <NaviBar />
      Geolocation is not enabled
    </div>
  ) : coords ? (
    
      done ? (
        <div>
          <NaviBar />

          <Map
            height={800}
            defaultCenter={[coords.latitude, coords.longitude]}
            defaultZoom={11}
          >
            <Marker width={50} anchor={[coords.latitude, coords.longitude]} />
           {loc.map((val,index)=>{  
            return <Marker width={50} anchor={[val.QueryLatitude,val.QueryLongitude]} />
           })}
          </Map>
        </div>
  ):(<div><NaviBar/>data not load</div>)
  ) : (
    <div>
      <NaviBar />
      Getting the location data&hellip;{" "}
    </div>
  );
}
