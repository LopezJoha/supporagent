import React, { useState, useEffect } from 'react';
import './Imgs.css';
import images from './images/images';
import './Imgs.css'

const Thumbnail = ({ arr, image, index }) => {
  return (<div className="tumbnail">
    {
      arr.map((imgsrc, i) => (
        <img
          key={i}
          height="50"
          src={imgsrc}
          onClick={() => image(i)}
          className={index === i ? 'active' : ''}
          alt= 'Img'
        />
      ))
    }
  </div>)
}

const Slideshow = ({ imgs }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [])

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }
  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1)
    } else {
      setIndex(index - 1)
    }
  }

  return (
    <div className="slideshow">
      <img className="mainImg" src={imgs[index]} alt='Img' />
      <div className="actions button-wrapper">
        <button  onClick={prev}><img src={images.before} alt='Img'></img></button>
        <button  onClick={next}><img src={images.next} alt='Img'></img></button> 
      </div>
      <Thumbnail arr={imgs} image={setIndex} index={index} />
    </div>
  )
}

function Imgs() {
  return (
    <div className="App-Imgs">
      <h2 className='Subtitle'>TUTORIAL</h2>
      <Slideshow
        imgs={[images.uno, 
               images.dos, 
               images.tres, 
               images.cuatro, 
               images.cinco,
               images.seis, 
               images.siete, 
               images.ocho, 
               images.nueve]}
      />
    </div>
  );
}
export default Imgs;