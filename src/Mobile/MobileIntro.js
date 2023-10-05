import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MobileIntro.css";
import MobileIntroImage from "./MobileIntro.png";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    text: "We are a collective of veteran founders, offering tailored solutions to navigate the complex landscape of startup challenges.",
  },
  {
    text: "Our mission is to elevate startups by addressing the twin pillars of organizational pain points—Operations and Technology.",
  },
  {
    text: "Specializing across four crucial arenas:",
    items: [
      { label: "Capital Formation", logo: "FundraiseLogo.png" },
      { label: "Streamlined Operations", logo: "Crowdfunding.png" },
      {
        label: "Cutting-Edge Web 2.0 Software Development",
        logo: "SoftwareDev.png",
      },
      { label: "Groundbreaking Web 3.0 Technologies", logo: "Web3Logo.png" },
    ],
  },
  {
    text: "Your vision drives you; our expertise elevates you. Partner with us for the strategic guidance and technical insights that transform aspiring startups into market leaders.",
  },
];

const MobileIntro = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [hasReachedLastSentence, setHasReachedLastSentence] = useState(false);

  // Function to animate between sentences
  const animateToIndex = (fromIndex, toIndex, direction) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(toIndex);
        setCanScroll(true);
      },
    });

    const yDirection = direction === "up" ? "100%" : "-100%";

    // Hide the previous specialized area
    timeline.set(`#sentence-${fromIndex} .mobile-specialized-area`, {
      opacity: 0,
      transform: "translateY(20px)",
    });

    timeline.to(`#sentence-${fromIndex}`, {
      duration: 0.4,
      y: yDirection,
      opacity: 0,
    });

    // Show the current specialized area
    timeline.fromTo(
      `#mobile-sentence-${fromIndex}`,
      { y: "0%" },
      { y: yDirection, duration: 0.3, ease: "power1.out" },
    );

    timeline.fromTo(
      `#mobile-sentence-${toIndex}`,
      { y: `-${yDirection}` },
      { y: "0%", duration: 0.3, ease: "power1.in" },
      "-=0.6", // This makes the animation of the next sentence start simultaneously with the exit of the current one
    );
  };

  // Function to handle user scrolling or touch events
  const handleEvent = (direction) => {
    if (!canScroll) return;

    let nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < paragraphs.length) {
      setCanScroll(false);
      animateToIndex(currentIndex, nextIndex, direction);

      if (nextIndex === paragraphs.length - 1 && direction === "down") {
        setHasReachedLastSentence(true);
      }
    } else if (hasReachedLastSentence && direction === "down") {
      const event = new Event("lastSentenceReached");
      window.dispatchEvent(event);
    }
  };

  // Function to handle keyboard arrow key events
  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      // Up Arrow
      handleEvent("up");
    }
    if (e.keyCode === 40) {
      // Down Arrow
      handleEvent("down");
    }
  };

  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 0) {
      handleEvent("down");
    }
  };

  useEffect(() => {
    // Function to handle touchstart event
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    // Function to handle touchend event
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const direction = touchEndY > touchStartY ? "up" : "down";
      handleEvent(direction);
    };

    let touchStartY;

    // Add event listeners for touch and keyboard events
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    document.addEventListener("keydown", handleKeyDown, false);
    window.addEventListener("scroll", handleScroll);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchend", handleTouchEnd, false);
      document.removeEventListener("keydown", handleKeyDown, false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex, canScroll]);

  useEffect(() => {
    // Use a ref to select all mobile-sentence elements for ScrollTrigger
    const textElementsRef = [];
    paragraphs.forEach((_, index) => {
      textElementsRef.push(gsap.utils.toArray(`#mobile-sentence-${index}`));
    });

    textElementsRef.forEach((textElements, index) => {
      textElements.forEach((element, elIndex) => {
        gsap.to(element, {
          opacity: index === currentIndex ? 1 : 0,
          visibility: index === currentIndex ? "visible" : "hidden",
          scrollTrigger: {
            trigger: element,
            start: index === currentIndex ? "top 80%" : "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    if (hasReachedLastSentence) {
      // Create ScrollTrigger for the last sentence only when it's the active sentence
      gsap.to(`#mobile-sentence-${paragraphs.length - 1}`, {
        opacity: 1,
        scrollTrigger: {
          trigger: `#mobile-sentence-${paragraphs.length - 1}`,
          start: currentIndex === paragraphs.length - 1 ? "top 80%" : "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [currentIndex, hasReachedLastSentence, paragraphs]);

  return (
    <div className="mobile-intro-container">
      <img src={MobileIntroImage} alt="Mobile Intro" id="mobile-myImage" />
      {paragraphs.map(({ text, items }, index) => (
        <div
          id={`mobile-sentence-${index}`}
          className={`mobile-sentence ${
            index === currentIndex ? "mobile-visible" : ""
          } mobile-paragraph-${index}`}
          key={index}
        >
          {text}
          {items && (
            <div className="mobile-specialized-area-container">
              {text !== "Specializing across four crucial arenas:" ? (
                <div className="mobile-specialized-items">
                  {items.map((item, i) => (
                    <div className="mobile-specialized-area" key={i}>
                      <img
                        src={require(`../Media/${item.logo}`)}
                        alt={`${item.label} logo`}
                        className="mobile-specialized-logo" // Add logo class
                      />
                      <span className="mobile-specialized-label">
                        {" "}
                        {/* Add label class */}
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mobile-specialized-area">
                  {items.map((item, i) => (
                    <div className="mobile-specialized-item" key={i}>
                      <img
                        src={require(`../Media/${item.logo}`)}
                        alt={`${item.label} logo`}
                        className="mobile-specialized-logo" // Add logo class
                      />
                      <span className="mobile-specialized-label">
                        {" "}
                        {/* Add label class */}
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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

export default MobileIntro;
