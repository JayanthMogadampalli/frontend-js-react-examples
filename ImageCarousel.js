import { useState } from "react";
import styled from 'styled-components';

function clsx(...classes) {
  return classes.filter(Boolean).join(" ");
}


const StyledImageCarousel = styled.div`
    .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    }

    .carousel {
    position: relative;
    width: 600px;
    height: 400px;
    }

    .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    }

    .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 2rem;
    border-radius: 100%;
    cursor: pointer;
    }

    .prev {
    left: 16px;
    }

    .next {
    right: 16px;
    }

    .carousel-pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    }

    .dot {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #000;
    cursor: pointer;
    }

    .dot.active {
    background: #fff;
    }

`;
 

function ImageCarousel({ images }) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const currImg = images[currentImgIndex];

    const handleNext = () => {
        setCurrentImgIndex((currentImgIndex + 1) % images.length);
    }

    const handlePrev = () => {
        setCurrentImgIndex((currentImgIndex - 1 + images.length) % images.length);
    }

    return (
        <div className="carousel">
            <img src={currImg.src} alt={currImg.alt} key={currImg.src} className="carousel-img" />
            <button onClick={handlePrev} className="carousel-btn prev">
                {"<"}
            </button>
            <div className="carousel-pagination">
                {images.map((img, index) => {
                    return (
                        <span key={img.src} className={clsx("dot", currentImgIndex === index && "active")} 
                          aria-label="carousel-dot" onClick={() => setCurrentImgIndex(index)}>                            
                        </span>
                    )
                })}
            </div>
            <button onClick={handleNext} className="carousel-btn next">
                {">"}
            </button>
        </div>
    )
};