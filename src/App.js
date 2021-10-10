import axios from "axios";
import { useEffect, useState } from "react";
import { Overlay } from "./components/overlay/Overlay";
import { PhotoItem } from "./components/photoItem/PhotoItem";

function App() {
  const [photos, setPhotos] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [fullPhoto, setFullPhoto] = useState();

  useEffect(() => {
    axios
      .get("https://boiling-refuge-66454.herokuapp.com/images")
      .then((result) => {
        setPhotos(result.data);
      });
  }, []);

  function openFullPhoto(id) {
    axios
      .get(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      .then((result) => {
        setFullPhoto(result.data);
        setOverlayVisible(true);
      });
  }

  function closeOverlay() {
    setOverlayVisible(false);
    setFullPhoto(null);
  }

  function sendComment(text) {
    console.log(text);
    setFullPhoto({
      ...fullPhoto,
      comments: [...fullPhoto.comments, { date: new Date(), text: text }],
    });
  }

  return (
    <>
      {overlayVisible ? (
        <Overlay
          display={overlayVisible}
          close={closeOverlay}
          fullPhoto={fullPhoto}
          sendComment={sendComment}
        />
      ) : null}
      <div className="App">
        <div className="header">
          <p className="header-text">Test APP</p>
        </div>
        <div className="main">
          {photos.map((item) => (
            <PhotoItem
              id={item.id}
              url={item.url}
              openFullPhoto={openFullPhoto}
            />
          ))}
        </div>
        <div className="footer">
          <div className="footer-container">
            <p className="footer-text">© 2018-2019</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
