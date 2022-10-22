import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import NaviBar from "./NavBar";
import { useState } from "react";
import "../index.css";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import DateTimePicker from "react-datetime-picker";
import Footer from "./Footer";
import { auth, db,storage } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { getStorage, uploadBytesResumable, getDownloadURL,ref } from "firebase/storage";
const videoConstraints = {
  width: 540,
  facingMode: "environment",
};



export const RequestWork = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");
  const [location, setlocation] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [value, onChange] = useState(new Date());
  const [done, setdone] = useState(false);
  const [done1, setdone1] = useState(false);
  const [alldone, setAllDone] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const metadata = {
    contentType: 'image/jpeg',
    name : name,
    latitude : latitude,
    longitude : longitude,
    date: value,
    message : message,
  };
  

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const getLocation = () => {
    !isGeolocationAvailable
      ? null
      : !isGeolocationEnabled
      ? null
      : coords
      ? (setlatitude(coords.latitude), setlongitude(coords.longitude))
      : null;
  };

  const Modal = () => {
    if (!openModal) return null;
    return (
      
        <div>
          <div>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
              mirrored={true}
            />
            <div>
              <MDBBtn className="my-2" size="sm" onClick={capturePhoto}>
                capture
              </MDBBtn>{" "}
              <MDBBtn className="my-2" size="sm" onClick={() => setUrl(null)}>
                Remove All Photo
              </MDBBtn>{" "}
              <MDBBtn
                className="my-2"
                size="sm"
                onClick={() => setOpenModal(false)}
              >
                Close
              </MDBBtn>
            </div>
          </div>
        </div>
    );
  };



  const exportData = () => {
    const user = auth.currentUser;
    const uid = user.uid;

    const id1 = Math.floor(Math.random() * 10000000000) + 1;
    const ref2 = doc(
      collection(db, "user" + "/" + uid + "/" + "Qurey"),
      id1.toString()
    );
    setDoc(ref2, {
      WorkId: id1,
      UserName: name,
      QueryMessage: message,
      QueryLatitude: latitude,
      QueryLongitude: longitude,
      QueryDate: value,
    }).then(() => {
      setdone1(true);
    });

    const ref1 = doc(collection(db, "loaction"), id1.toString());
    setDoc(ref1, {
      WorkId: id1,
      QueryLatitude: latitude,
      QueryLongitude: longitude,
    }).then(()=>{
      console.log("start");
      const storageRef = ref(storage,"image/"+value+".jpg");
      const uploadTask = uploadBytesResumable(storageRef, url,metadata);
      
    }).then(() => {
      setdone(true);
    });
    if (done) {
      if (done1) {
        setAllDone(true);
      }
    }
  };

  
  return alldone ? (
    <div>
      <NaviBar/>
    <div>
      All Done</div></div>
  ) : (
    <div>
      <div>
        <NaviBar></NaviBar>
        <MDBContainer fluid className="bg-secondary">
          <MDBRow className="d-flex justify-content-center align-items-center ">
            <MDBCol lg="9" className="my-5">
              <h1 className="text-white mb-4">Work Reqest in Your Area</h1>

              <MDBCard>
                <MDBCardBody className="px-4">
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Your name</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="Name"
                        size="lg"
                        id="form1"
                        type="text"
                        onChange={(e) => setname(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Message</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBTextArea
                        label="Message"
                        id="textAreaExample"
                        rows={3}
                        onChange={(e) => setmessage(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Date of today</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <DateTimePicker onChange={onChange} value={value} />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Upload Loaction</h6>
                    </MDBCol>
                    {!location ? (
                      <MDBCol md="9" className="pe-5">
                        <MDBBtn
                          className="my-4"
                          size="lg"
                          onClick={() => {
                            getLocation(), setlocation(true);
                          }}
                        >
                          {" "}
                          Load Current Loaction{" "}
                        </MDBBtn>
                      </MDBCol>
                    ) : (
                      <MDBCol>
                        <div>
                          {latitude},{longitude}
                        </div>

                        <MDBBtn
                          className="my-2"
                          size="sm"
                          onClick={() => {
                            getLocation(), setlocation(true);
                          }}
                        >
                          {" "}
                          Refresh Location{" "}
                        </MDBBtn>
                      </MDBCol>
                    )}
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Upload Photo</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      {!openModal ? (
                        <MDBBtn
                          className="my-2"
                          size="sm"
                          onClick={() => setOpenModal(true)}
                        >
                          open Camera
                        </MDBBtn>
                      ) : (
                        <Modal
                          open={openModal}
                          onClose={() => setOpenModal(false)}
                        />
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Preview Image</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      {url && (
                        <div>
                          <img src={url} alt="Screenshot" />
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBBtn
                    className="my-4"
                    size="lg"
                    onClick={() => {
                      
                      exportData();
                    }}
                  >
                    send application
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer />
    </div>
  );

};
