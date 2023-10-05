import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./MobileServices.css";
import ConsultingDetails from "../ConsultingDetails";
import TechnologyDetails from "../TechnologyDetails";

gsap.registerPlugin(TextPlugin);

const MobileServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [hoveredSection, setHoveredSection] = useState("");
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const sentence = "So-EL POWERS FOUNDERS THROUGH TWO MAIN SERVICES";
  const sentenceRef = useRef(null);

  const [showConsultingButton, setShowConsultingButton] = useState(false);
  const [showTechnologyButton, setShowTechnologyButton] = useState(false);
  const [showConsultingDetails, setShowConsultingDetails] = useState(false);
  const [showTechnologyDetails, setShowTechnologyDetails] = useState(false);

  const typingEffect = () => {
    gsap.set(sentenceRef.current, { opacity: 0, text: "" });

    gsap.to(sentenceRef.current, {
      duration: sentence.length / 10,
      text: sentence,
      opacity: 1,
      ease: "power1.out",
      delay: 0.5,
    });
  };

  useEffect(() => {
    typingEffect();
  }, []);

  const handleScroll = (e) => {
    if (canScroll) {
      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      if (currentIndex === 0 && scrollDirection === 1) {
        fadeOutSentence();
      } else if (currentIndex === 1 && scrollDirection === -1) {
        fadeInSentence();
      }
    }
  };

  // Initialize this outside your function
  const startY = useRef(null);

  const handleTouchScroll = (e) => {
    if (!canScroll) return; // Early exit if scrolling is not allowed

    if (e.type === "touchstart") {
      startY.current = e.touches[0].clientY;
    } else if (e.type === "touchend" && startY.current !== null) {
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY.current;

      if (deltaY > 0 && currentIndex === 1) {
        fadeInSentence();
      } else if (deltaY < 0 && currentIndex === 0) {
        fadeOutSentence();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (canScroll) {
      if (e.key === "ArrowDown" && currentIndex === 0) {
        fadeOutSentence();
      } else if (e.key === "ArrowUp" && currentIndex === 1) {
        fadeInSentence();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchScroll);
    window.addEventListener("touchend", handleTouchScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchScroll);
      window.removeEventListener("touchend", handleTouchScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, canScroll]);

  useEffect(() => {
    gsap.set("#consulting, #technology", { opacity: 0, y: "100%" });
  }, []);

  const fadeOutSentence = () => {
    setCanScroll(false);
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(1);
        setCanScroll(true);
      },
    });

    timeline.to(sentenceRef.current, {
      duration: 1,
      y: "-100%",
      ease: "power4.inOut",
    });

    timeline.fromTo(
      "#consulting, #technology",
      { y: "100%", opacity: 0 },
      { duration: 0.025, y: "0%", opacity: 1, ease: "power4.inOut" },
    );
  };

  const fadeInSentence = () => {
    setCanScroll(false);
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(0);
        setCanScroll(true);
      },
    });

    timeline.to("#consulting, #technology", {
      duration: 1,
      y: "100%",
      opacity: 0,
      ease: "power4.inOut",
    });

    timeline.fromTo(
      sentenceRef.current,
      { y: "-100%" },
      { duration: 1, y: "0%", ease: "power4.inOut" },
    );
  };

  return (
    <div className="services-container">
      <div ref={sentenceRef} className="service main-section"></div>

      <div
        id="consulting"
        className={`sub-section left`}
        onMouseEnter={() => {
          setHoveredSection("consulting");
          setDescriptionVisible(true);
          setShowConsultingButton(true);
        }}
        onMouseLeave={() => {
          setDescriptionVisible(false);
          setShowConsultingButton(false);
        }}
      >
        <div className="sub-section-content">
          <div className="title-box">
            <h1>Consulting</h1>
            <p
              className={`description ${
                descriptionVisible && hoveredSection === "consulting"
                  ? "show"
                  : ""
              }`}
            >
              We provide high-quality consulting services
            </p>
            {showConsultingButton && (
              <button
                className="learn-more-button"
                onClick={() => setShowConsultingDetails(true)}
              >
                Learn more
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        id="technology"
        className={`sub-section right`}
        onMouseEnter={() => {
          setHoveredSection("technology");
          setDescriptionVisible(true);
          setShowTechnologyButton(true);
        }}
        onMouseLeave={() => {
          setDescriptionVisible(false);
          setShowTechnologyButton(false);
        }}
      >
        <div className="sub-section-content">
          <div className="title-box">
            <h1>Technology</h1>
            <p
              className={`description ${
                descriptionVisible && hoveredSection === "technology"
                  ? "show"
                  : ""
              }`}
            >
              Our technology solutions are top of the line
            </p>
            {showTechnologyButton && (
              <button
                className="learn-more-button"
                onClick={() => setShowTechnologyDetails(true)}
              >
                Learn more
              </button>
            )}
          </div>
        </div>
      </div>

      {showConsultingDetails && (
        <ConsultingDetails onClose={() => setShowConsultingDetails(false)} />
      )}

      {showTechnologyDetails && (
        <TechnologyDetails onClose={() => setShowTechnologyDetails(false)} />
      )}

      <div className="mouse-field-container">
        <div className="mouse-field">
          <div className="mouse"></div>
        </div>
        <div className="scroll-down-text">SCROLL DOWN</div>
      </div>
    </div>
  );
};

export default MobileServices;
