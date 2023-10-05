// Transition.js
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./MobileTransition.css";

const MobileTransition = ({ isTransitioning, setTransitioning }) => {
  const transitionRef = useRef(null);

  useEffect(() => {
    if (isTransitioning) {
      const tl = gsap.timeline();

      tl.to(transitionRef.current, {
        y: "0%",
        duration: 0.7,
        ease: "power2.inOut",
      })
        .to(transitionRef.current, {
          y: "-100%",
          delay: 0.7,
          duration: 0.7,
          ease: "power2.inOut",
        })
        .eventCallback("onComplete", () => setTransitioning(false));
    }
  }, [isTransitioning]);

  return (
    <div className="transition-container" ref={transitionRef}>
      <div className="transition-gradient transition-gradient-purple" />
      <div className="transition-gradient transition-gradient-blue" />
    </div>
  );
};

export default MobileTransition;
