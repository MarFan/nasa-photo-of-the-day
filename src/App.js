import React, {useState, useEffect} from "react";
import {Container, Row} from 'reactstrap'
import axios from 'axios';
import BigPic from './Components/BigPic';
import PreviousThumbs from './Components/PreviousThumbs';

// import Example from './Components/potdCarousel'

import "./App.css";

const prevFive = [];  // Bkank array to create URLs for the previous x days (default: 5)
const newFive = []; // blank array of API results of image data
const defaultNumPrevDays = 5;

function App() {
  const [photos, setPhotos] = useState([])
  const [bigPic, setBigPic] = useState('');
  
  const nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=aKjTmUjyDimS1ht6K0Jr1nNtubAxkAofUmeQsabg'

  useEffect(() => {
    const today = new Date();
  
    // create array for the past x days
    for(var i=1; i <= defaultNumPrevDays; i++){ 
      const newDateFormat = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      const newDate = newDateFormat.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('. ').join('-');
      const cleanDate = newDate.slice(0, newDate.length-1);
      const newURL = nasaURL + '&date=' + cleanDate;

      prevFive.push(newURL);
    }

    axios.all(prevFive.map(link => axios.get(link)))
      .then(axios.spread((...res) => res.map(d => newFive.push(d.data))))
      .catch(err => {
        console.log('Something went wrong.')
      });
    setPhotos(newFive)
    
  }, []);  

  useEffect(() => {
    axios.get(nasaURL)
      .then(res => {
        setBigPic(res.data)
        document.querySelector('body').style.backgroundImage = 'url('+res.data.url+')';
      })
      .catch(err => {
        console.log("ERROR: Can't seem to find any photos!")
      })
  }, [photos])

  function updateBigPic(pos) {
    setBigPic(photos[pos]);  
    document.querySelector('body').style.backgroundImage = 'url('+photos[pos].url+')';
  }

  return (
    <div className="App">
      <Container>
        <div className="pageTitle">Astronomy Picture of the Day</div>
        <div className="potdContainer shadow">
          <Row className="bigPic">
            <BigPic imgUrl={bigPic.url} imgTitle={bigPic.title} imgDate={bigPic.date} imgCopy={(bigPic.copyright === undefined) ? '' : 'Copyright ' + bigPic.copyright} />
          </Row>
          <Row className="prevContainer">
            {photos.map((photo, index) => {
              return <PreviousThumbs key={index} imgIndex={index} imgUrl={photo.url} imgDate={photo.date} setBigPic={updateBigPic} />
            })}
          </Row>
          {/* <Row>
            <Example />
          </Row> */}
        </div>
      </Container>
    </div>
  );
}

export default App;
