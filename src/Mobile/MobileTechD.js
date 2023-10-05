// TechnologyDetails.js
import React, { useState, useRef, useEffect } from "react";
import "./TechnologyDetails.css";
import gsap from "gsap";
import {
  FaPencilAlt, // Placeholder for EL UX/UI
  FaLaptop, // Placeholder for EL Tech Infrastructure
  FaChartLine, // Placeholder for EL Tech Strategy
  FaCogs, // Placeholder for EL Tech Continuity
  FaBox, // Placeholder for EL Tech Package
  FaCube, // Placeholder for EL Web3-build
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
//import { useSwipeable } from 'react-swipeable';

const TechnologyDetails = ({ onClose }) => {
  const progressRef = useRef(null);

  const technologyServices = [
    {
      title: "EL UX/UI",
      description:
        "We will strategize, plan, and build your software's full UX/UI journey. Deliverables are figma files.",
      icon: <FaPencilAlt />,
    },
    {
      title: "EL Tech Infrastructure",
      description:
        "We help startups build a robust tech foundation, encompassing everything from backend databases to user-friendly front-end interfaces. This can be a specific feature or a full software solution. This option is priced per feature. (Additional details on pricing below)",
      icon: <FaLaptop />,
    },
    {
      title: "EL Tech Strategy",
      description:
        "Our team outlines a comprehensive tech roadmap that aligns with your business goals.",
      icon: <FaChartLine />,
    },
    {
      title: "EL Tech Continuity",
      description:
        "We provide ongoing tech support, including audits, upgrades, and maintenance, ensuring your tech aspects continue to evolve with market trends.",
      icon: <FaCogs />,
    },
    {
      title: "EL Tech Package",
      description:
        "This all-in-one solution combines our tech services, providing holistic tech support to startups throughout their journey.",
      icon: <FaBox />, // Use FaBox instead of FaPackage
    },
    {
      title: "EL Web3-build",
      description:
        "Embrace the power of Web3 technology with EL Web3-build. We offer expert consulting and development services for projects leveraging blockchain, smart contracts, decentralized applications (dApps), and other Web3 technologies. Our team helps you explore the possibilities and build innovative solutions in this decentralized ecosystem.",
      icon: <FaCube />,
    },
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const animateServiceChange = () => {
    const timeline = gsap.timeline();
    timeline.to(".service-title svg", { y: -10, duration: 0.2 });
    timeline.from(
      ".service-title h2",
      { x: -20, opacity: 0, duration: 0.4 },
      "-=0.2"
    );
  };

  const changeService = (newIndex) => {
    gsap.to(".service-content", { opacity: 0, duration: 0.3 });
    animateServiceChange();
    animateBackgroundColorChange();
    setTimeout(() => {
      setCurrentServiceIndex(newIndex);
      gsap.to(".service-content", { opacity: 1, duration: 0.3 });
    }, 300);
  };

  const nextService = () => {
    changeService((prevIndex) => (prevIndex + 1) % technologyServices.length);
  };

  const prevService = () => {
    changeService(
      (prevIndex) =>
        (prevIndex - 1 + technologyServices.length) % technologyServices.length
    );
  };

  const animateBackgroundColorChange = () => {
    const colors = [
      "#3f49e8", // Blue
      "#f053bb", // Pink
      "#2ecc71", // Green
      "#e67e22", // Orange
      "#9b59b6", // Purple
      "#3498db", // Light Blue
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gsap.to(".technology-details-popup", {
      backgroundColor: randomColor,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  const updateProgress = () => {
    const progress =
      ((currentServiceIndex + 1) / technologyServices.length) * 100;
    gsap.to(".progress-bar-fill", {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  useEffect(updateProgress, [currentServiceIndex]);

  return (
    <div className="technology-details-popup">
      <svg id="filters">
        <filter
          id="neon-glow"
          filterUnits="objectBoundingBox"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="0.8" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </svg>

      <svg width="0" height="0">
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <div className="service-content">
        <div className="service-title-container">
          <h2 className="service-title">
            {technologyServices[currentServiceIndex].icon}
            {technologyServices[currentServiceIndex].title}
          </h2>
        </div>
        <p className="service-description">
          {technologyServices[currentServiceIndex].description}
        </p>
      </div>
      <div className="carousel-nav">
        <button className="carousel-button" onClick={prevService}>
          <FaChevronLeft /> {/* Changed from FaChevronRight */}
        </button>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
        <button className="carousel-button" onClick={nextService}>
          <FaChevronRight />
        </button>
      </div>
      <div className="carousel-dots">
        {" "}
        {/* Moved inside the main div */}
        {technologyServices.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              index === currentServiceIndex ? "active" : ""
            }`}
            onClick={() => changeService(index)}
          />
        ))}
      </div>
      <button className="get-started-button">Get Started</button>
    </div>
  );
};

export default TechnologyDetails;