import React, { useEffect, useState } from "react";
import gsap from "gsap";
import "./IntroContent.css";
import video from "./Media/BGVid-02.mp4"; // Make sure to provide the correct path to your video file

const paragraphs = [
  {
    text: "We are a collective of veteran founders, offering tailored solutions to navigate the complex landscape of startup challenges."
  },
  {
    text: "Our mission is to elevate startups by addressing the twin pillars of organizational pain points—Operations and Technology."
  },
  {
    text: "Specializing across four crucial arenas:",
    items: [
      { label: "Capital Formation", logo: "FundraiseLogo.png" },
      { label: "Streamlined Operations", logo: "Crowdfunding.png" },
      { label: "Cutting-Edge Web 2.0 Software Development", logo: "SoftwareDev.png" },
      { label: "Groundbreaking Web 3.0 Technologies", logo: "Web3Logo.png" }
    ]
  },
  {
    text: "Your vision drives you; our expertise elevates you. Partner with us for the strategic guidance and technical insights that transform aspiring startups into market leaders."
  }
];

const IntroContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);

  const animateToIndex = (fromIndex, toIndex, direction) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(toIndex);
        setCanScroll(true);
      },
    });

    const yDirection = direction === "up" ? "100%" : "-100%";

    timeline.to(`#sentence-${fromIndex}`, {
      duration: 0.4,
      y: yDirection,
      opacity: 0,
    });

    timeline.fromTo(
      `#sentence-${toIndex}`,
      {
        y: direction === "up" ? "-100%" : "100%",
        opacity: 0,
      },
      {
        duration: 0.4,
        y: "0%",
        opacity: 1,
      }
    );
  };

  const handleEvent = (direction) => {
    if (!canScroll) return;

    let nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < paragraphs.length) {
      setCanScroll(false);
      animateToIndex(currentIndex, nextIndex, direction);
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "ArrowDown") {
        handleEvent("down");
      } else if (e.key === "ArrowUp") {
        handleEvent("up");
      }
    };

    const handleScroll = (e) => {
      const direction = e.deltaY > 0 ? "down" : "up";
      handleEvent(direction);
    };

    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleScroll);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex, canScroll]);

  return (
    <div className="intro-content-container">
      <video autoPlay loop muted id="myVideo">
        <source src={video} type="video/mp4" />
      </video>
  
      {paragraphs.map(({ text, items }, index) => (
        <div
          id={`sentence-${index}`}
          className={`sentence ${index === currentIndex ? "visible" : ""}`}
          key={index}
        >
          {text}
          {items && (
            <div className="specialized-area-container">
              {items.map((item, i) => (
                <div className="specialized-area" key={i}>
                  <img src={require(`./Media/${item.logo}`)} alt={`${item.label} logo`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
<div className="mouse-field-container">
  <div className="mouse-field">
    <div className="mouse"></div>
  </div>
  <div className="scroll-down-text">SCROLL DOWN</div>
</div>

    </div>
  );
  
};

export default IntroContent;

