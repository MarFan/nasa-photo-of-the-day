import React, {useState, useEffect} from "react";
import { photoData } from './data'
import axios from 'axios';
import BigPic from './Components/BigPic';
import PreviousThumbs from './Components/PreviousThumbs';
import "./App.css";

function App() {
  const [photos, setPhotos] = useState(photoData)
  const [bigPic, setBigPic] = useState('');
  const [prevFive, setPrevFive] = useState([])

  const nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=aKjTmUjyDimS1ht6K0Jr1nNtubAxkAofUmeQsabg'

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=aKjTmUjyDimS1ht6K0Jr1nNtubAxkAofUmeQsabg')
      .then(res => {
        setBigPic(res.data)
      })
      .catch(err => {
        console.log("ERROR: Can't seem to find any photos!")
      })
    // updateBigPic(0);
  }, [])

  useEffect(() => {
    const today = new Date();
    
    for(var i=1; i <= 5; i++){ 
      // console.log(i)
      const newDateFormat = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      const newDate = newDateFormat.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('. ').join('-');
      const cleanDate = newDate.slice(0, newDate.length-1);
      const newURL = nasaURL + '&date=' + cleanDate;

      // prevFive.push({newDate})

      axios.get(newURL)
        .then(res => {
          prevFive.push(res.data);
        })
        .catch(err => {
          console.log('Oh crud!');
        })
    }

    // console.log(prevFive.length)

    setPhotos(prevFive);

  }, []);

  useEffect(() => {
    console.log(photos)

  }, [photos])

  

  function updateBigPic(pos) {
    setBigPic(photos[pos]);  
    document.querySelector('body').style.backgroundImage = 'url('+photos[pos].url+')';
  }

  return (
    <div className="App">
      <div className="pageTitle">Astronomy Picture of the Day</div>
      <div className="potdContainer shadow">
        <BigPic imgUrl={bigPic.url} imgTitle={bigPic.title} imgDate={bigPic.date} imgCopy={(bigPic.copyright === undefined) ? '' : 'Copyright ' + bigPic.copyright} />

        <div className="prevContainer">
          {photos.map((photo, index) => {
            return <PreviousThumbs key={index} imgIndex={index} imgUrl={photo.url} imgDate={photo.date} setBigPic={updateBigPic} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
