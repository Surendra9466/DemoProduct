import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import MobileIntro from "./MobileIntro";
import MobileHamburger from "./MobileHamburger";
import logo from "../SOEL-LOGO2.png";
import MobileServices from "./MobileServices";
import MobileGetStarted from "./MobileGetStarted";
import "./MobileHome.css";
import MobileTransition from "./MobileTransition";

const MobileHome = () => {
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const getStartedRef = useRef(null);

  const [activeSection, setActiveSection] = useState(introRef);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedLastSentence, setReachedLastSentence] = useState(false);

  const [selected, setSelected] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isInSectionView, setIsInSectionView] = useState(Array(3).fill(false));
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const navItems = [
    { id: "intro", name: "Introduction" },
    { id: "services", name: "Our Services" },
    { id: "start", name: "Get Started" },
  ];

  const sectionRefs = [introRef, servicesRef, getStartedRef];

  const handleClick = (index) => {
    setIsUserScrolling(true);
    setSelected(index);
    setActiveSection(sectionRefs[index]);
    scrollToSection(index);
  };

  const scrollToSection = (index) => {
    const selectedSection = sectionRefs[index]?.current;
    if (selectedSection) {
      selectedSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isUserScrolling) {
        setIsUserScrolling(false);
      } else {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;

        const progress =
          window.scrollY + windowHeight >= totalHeight
            ? 100
            : (scrollY / (totalHeight - windowHeight)) * 100;

        const selectedSectionIndex = Math.floor(
          progress / (100 / navItems.length),
        );
        setSelected(selectedSectionIndex);
        setActiveSectionIndex(selectedSectionIndex);

        if (selectedSectionIndex === 0) {
          // Check if it's the last sentence in "Introduction"
          handleLastSentenceReached(true);
        } else if (selectedSectionIndex === 1 && reachedLastSentence) {
          // Scroll down from the last sentence, set activeSection to "Our Services"
          setActiveSection(servicesRef);
        }
      }

      const updatedIsInSectionView = isInSectionView.map(
        (_, index) =>
          sectionRefs[index]?.current?.offsetTop <= scrollY &&
          scrollY <
            (sectionRefs[index]?.current?.offsetHeight ?? 0) +
              (sectionRefs[index]?.current?.offsetTop ?? 0),
      );
      setIsInSectionView(updatedIsInSectionView);
    };

    const handleLastSentenceReached = () => {
      setActiveSection(servicesRef); // Set the active section to "Our Services"
      setSelected(1); // Update the selected state to highlight "Our Services" in the nav bar
    };

    // Listen for the "lastSentenceReached" custom event
    window.addEventListener("lastSentenceReached", handleLastSentenceReached);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "lastSentenceReached",
        handleLastSentenceReached,
      );
    };
  }, [isUserScrolling, sectionRefs, isInSectionView]);

  useEffect(() => {
    setTransitioning(true);
  }, [selected]);

  const handleLastSentenceReached = (reached) => {
    setReachedLastSentence(reached);
    if (reached) {
      const event = new Event("scrollToServices"); // Trigger custom event
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handleScrollProgress = (progress) => {
      setScrollProgress(progress);
    };

    // Attach scroll progress event listener here

    return () => {
      // Remove scroll progress event listener here
    };
  }, []);

  return (
    <div className="container">
      <MobileHamburger />
      <img src={logo} alt="SOEL Logo" className="logo" />
      <div className="nav-container-m">
        <MobileHamburger />
        <img src={logo} alt="SOEL Logo" className="logo" />
        <div className="nav-container-m">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`nav-item-m ${selected === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <MobileTransition
        isTransitioning={isTransitioning}
        setTransitioning={setTransitioning}
      />
      {activeSection === introRef && (
        <div
          className={`section intro ${
            activeSection === introRef ? "active" : ""
          }`}
          ref={introRef}
        >
          <MobileIntro
            scrollProgress={scrollProgress}
            onLastSentenceReached={handleLastSentenceReached}
          />
        </div>
      )}
      {activeSection === servicesRef && (
        <div
          className={`section our-services ${
            activeSection === servicesRef ? "active" : ""
          }`}
          ref={servicesRef}
        >
          <MobileServices />
        </div>
      )}
      {activeSection === getStartedRef && (
        <div
          className={`section get-started ${
            activeSection === getStartedRef ? "active" : ""
          }`}
          ref={getStartedRef}
        >
          <MobileGetStarted />
        </div>
      )}
    </div>
  );
};

export default MobileHome;
