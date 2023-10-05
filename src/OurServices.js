import React, { useEffect, useState, useRef } from "react"; // <-- Added useRef import
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./OurServices.css";
import ConsultingDetails from "./ConsultingDetails"; // Replace with the actual path
import TechnologyDetails from "./TechnologyDetails"; // Import the TechnologyDetails component

gsap.registerPlugin(TextPlugin);

const OurServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [hoveredSection, setHoveredSection] = useState("");
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const sentence = "So-EL POWERS FOUNDERS THROUGH TWO MAIN SERVICES";
  const sentenceRef = useRef(null); // <-- Added the ref for the sentence

  const [showConsultingButton, setShowConsultingButton] = useState(false);
  const [showTechnologyButton, setShowTechnologyButton] = useState(false);
  const [showConsultingDetails, setShowConsultingDetails] = useState(false);
  const [showTechnologyDetails, setShowTechnologyDetails] = useState(false); // Add state for technology details

  const typingEffect = () => {
    gsap.set(sentenceRef.current, { opacity: 0, text: "" }); // Start with an invisible empty string

    gsap.to(sentenceRef.current, {
      duration: sentence.length / 10, // This will type at roughly 10 chars/sec
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
      // <-- Updated this line
      duration: 1,
      y: "-100%",
      ease: "power4.inOut",
    });

    timeline.fromTo(
      "#consulting, #technology",
      { y: "100%", opacity: 0 }, // start from below and hidden
      { duration: 0.025, y: "0%", opacity: 1, ease: "power4.inOut" } // moves them into view and make them visible
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
      opacity: 0, // fade them out
      ease: "power4.inOut",
    });

    timeline.fromTo(
      sentenceRef.current, // <-- Updated this line
      { y: "-100%" },
      { duration: 1, y: "0%", ease: "power4.inOut" }
    );
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentIndex, canScroll]);

  return (
    <div className="services-container">
      <div ref={sentenceRef} className="service main-section"></div>

      <div
        id="consulting"
        className={`sub-section left`}
        onMouseEnter={() => {
          setHoveredSection("consulting");
          setDescriptionVisible(true);
          setShowConsultingButton(true); // Show the "Learn more" button
        }}
        onMouseLeave={() => {
          setDescriptionVisible(false);
          setShowConsultingButton(false); // Hide the "Learn more" button
        }}
      >
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

      <div
        id="technology"
        className={`sub-section right`}
        onMouseEnter={() => {
          setHoveredSection("technology");
          setDescriptionVisible(true);
          setShowTechnologyButton(true); // Show the "Learn more" button
        }}
        onMouseLeave={() => {
          setDescriptionVisible(false);
          setShowTechnologyButton(false); // Hide the "Learn more" button
        }}
      >
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
              onClick={() => setShowTechnologyDetails(true)} // Ensure this is correctly setting showTechnologyDetails to true
            >
              Learn more
            </button>
          )}
        </div>
      </div>

      {/* Render the ConsultingDetails component when showConsultingDetails is true */}
      {showConsultingDetails && (
        <ConsultingDetails onClose={() => setShowConsultingDetails(false)} />
      )}

      {/* Render the TechnologyDetails component when showTechnologyDetails is true */}
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

export default OurServices;
