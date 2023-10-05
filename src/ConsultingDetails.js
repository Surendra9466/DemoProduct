// ConsultingDetails.js
import React, { useState, useRef, useEffect } from "react";
import "./ConsultingDetails.css";
import gsap from "gsap";
import {
  FaFilePowerpoint,
  FaDatabase,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ConsultingDetails = ({ onClose }) => {
  const consultingServices = [
    {
      title: "EL Deck",
      description:
        "We create and design your pitch deck using your existing material, within a 7 business day timeframe. This includes up to 20 slides with 2 rounds of revisions on the design.",
    },
    {
      title: "EL Infrastructure",
      description:
        "We create comprehensive data rooms tailored to your startup's fundraising needs. This incorporates a structured approach that includes various critical documents. Please note that managing and updating these documents falls under a separate service.",
    },
    {
      title: "EL Strategy",
      description:
        "Our team provides a detailed growth and exit strategy, including key fundraising rounds, capital requirements, and essential legal insights.",
    },
    // Add other consulting services here
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const changeService = (newIndex) => {
    gsap.to(".service-content", { opacity: 0, duration: 0.3 });
    setTimeout(() => {
      setCurrentServiceIndex(newIndex);
      gsap.to(".service-content", { opacity: 1, duration: 0.3 });
    }, 300);
  };

  const nextService = () => {
    changeService((prevIndex) => (prevIndex + 1) % consultingServices.length);
  };

  const prevService = () => {
    changeService(
      (prevIndex) =>
        (prevIndex - 1 + consultingServices.length) % consultingServices.length
    );
  };

  const updateProgress = () => {
    const progress =
      ((currentServiceIndex + 1) / consultingServices.length) * 100;
    gsap.to(".progress-bar-fill", {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  useEffect(updateProgress, [currentServiceIndex]);

  return (
    <div className="consulting-details">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <div className="service-content">
        <div className="service-title-container">
          <h2 className="service-title">
            <FaChevronLeft
              className="carousel-button-left"
              onClick={prevService}
            />
            {currentServiceIndex === 0 && <FaFilePowerpoint />}
            {currentServiceIndex === 1 && <FaDatabase />}
            {currentServiceIndex === 2 && <FaChartLine />}
            {consultingServices[currentServiceIndex].title}
            <FaChevronRight
              className="carousel-button-right"
              onClick={nextService}
            />
          </h2>
        </div>
        <p className="service-description">
          {consultingServices[currentServiceIndex].description}
        </p>
      </div>
      <div className="carousel-nav">
        <button className="carousel-button" onClick={prevService}>
          <FaChevronLeft />
        </button>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
        <button className="carousel-button" onClick={nextService}>
          <FaChevronRight />
        </button>
      </div>
      <button className="get-started-button">Get Started</button>
    </div>
  );
};

export default ConsultingDetails;
