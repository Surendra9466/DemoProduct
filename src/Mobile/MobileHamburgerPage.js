import React, { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./MobileHamburgerPage.css";

const MobileHamburgerPage = forwardRef(({ onClose }, ref) => {
  const optionsRef = useRef([]);
  optionsRef.current = [0, 1, 2].map(
    (_, i) => optionsRef.current[i] ?? useRef(),
  );

  useEffect(() => {
    optionsRef.current.forEach((ref) => {
      gsap.set(ref.current, { autoAlpha: 0 });
      gsap.fromTo(
        ref.current,
        { y: "-=15" },
        { autoAlpha: 1, y: "+=15", stagger: 0.1 },
      );
    });
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(optionsRef.current[index].current, {
      duration: 0.2,
      "::after": { width: "100%" },
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(optionsRef.current[index].current, {
      duration: 0.2,
      "::after": { width: "0%" },
    });
  };

  const handleClose = () => {
    gsap.to(".hamburger-page", {
      opacity: 0,
      scaleX: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: onClose, // Call the onClose function after the animation completes
    });
  };

  return (
    <div className="hamburger-page" onClick={handleClose} ref={ref}>
      <div className="options-container">
        {["Why So-EL", "Schedule a meeting", "Free Resources"].map(
          (option, i) => (
            <h2
              key={option}
              ref={optionsRef.current[i]}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="option"
            >
              {option}
            </h2>
          ),
        )}
      </div>
    </div>
  );
});

export default MobileHamburgerPage;
