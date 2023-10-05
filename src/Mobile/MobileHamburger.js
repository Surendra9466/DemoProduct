import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./MobileHamburger.css";
import HamburgerPage from "./MobileHamburgerPage";

const MobileHamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerPageRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        hamburgerPageRef.current,
        { opacity: 0, scaleX: 0, transformOrigin: "left top" },
        { opacity: 1, scaleX: 1, duration: 0.3, ease: "power1.out" },
      );
    }
  }, [isOpen]);

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseHamburgerPage = () => {
    gsap.to(hamburgerPageRef.current, {
      opacity: 0,
      scaleX: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => setIsOpen(false),
    });
  };

  return (
    <div className="hamburger-container">
      <div
        className={`hamburger-icon ${isOpen ? "open" : ""}`}
        onClick={handleHamburgerClick}
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
      {isOpen && (
        <HamburgerPage
          ref={hamburgerPageRef}
          onClose={handleCloseHamburgerPage}
        />
      )}
    </div>
  );
};

export default MobileHamburger;
