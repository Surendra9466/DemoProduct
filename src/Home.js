import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import IntroContent from "./IntroContent";
import Hamburger from "./Hamburger";
import logo from "./SOEL-LOGO2.png";
import OurServices from "./OurServices";
import GetStarted from "./GetStarted";
import "./Home.css";
import Transition from "./Transition"; // Replace "./Transition" with the correct path to the Transition component if it's located in a different file.

const Home = () => {
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const getStartedRef = useRef(null);

  const [activeSection, setActiveSection] = useState(introRef);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedLastSentence, setReachedLastSentence] = useState(false);

  const [selected, setSelected] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); // Added activeSectionIndex state
  const [isInSectionView, setIsInSectionView] = useState(Array(3).fill(false));
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const navItems = [
    { id: "intro", name: "Introduction" },
    { id: "services", name: "Our Services" },
    { id: "start", name: "Get Started" },
  ];

  const sectionRefs = [introRef, servicesRef, getStartedRef]; // Define sectionRefs array

  const handleClick = (index) => {
    setIsUserScrolling(true);
    setSelected(index);
    setActiveSection(sectionRefs[index]); // Set active section based on index
    scrollToSection(index);
  };

  const nearBottomOfSection = (index) => {
    const selectedSection = sectionRefs[index]?.current;
    if (selectedSection) {
      const { offsetTop, offsetHeight } = selectedSection;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      return scrollY > offsetTop + offsetHeight - windowHeight * 0.2;
    }
    return false;
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
          progress / (100 / navItems.length)
        );
        setSelected(selectedSectionIndex);
        setActiveSectionIndex(selectedSectionIndex);

        if (nearBottomOfSection(selectedSectionIndex)) {
          setTransitioning(true);
        }
      }

      const updatedIsInSectionView = isInSectionView.map(
        (_, index) =>
          sectionRefs[index]?.current?.offsetTop <= scrollY &&
          scrollY <
            (sectionRefs[index]?.current?.offsetHeight ?? 0) +
              (sectionRefs[index]?.current?.offsetTop ?? 0)
      );
      setIsInSectionView(updatedIsInSectionView);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isUserScrolling, sectionRefs, isInSectionView]);

  useEffect(() => {
    setTransitioning(true);
  }, [selected]);

  // Listen for the "introScroll" event and update introScrollProgress
  useEffect(() => {
    const handleIntroScroll = (event) => {
      // You can use introScrollProgress here if needed
    };

    window.addEventListener("introScroll", handleIntroScroll);

    return () => {
      window.removeEventListener("introScroll", handleIntroScroll);
    };
  }, []);

  const handleLastSentenceReached = (reached) => {
    setReachedLastSentence(reached);
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

  useEffect(() => {
    if (reachedLastSentence) {
      setActiveSection(servicesRef);
    }
  }, [reachedLastSentence]);

  return (
    <div className="container">
      <Hamburger />
      <img src={logo} alt="SOEL Logo" className="logo" />
      <div className="nav-container">
        <Hamburger /> {/* Add a mobile hamburger menu */}
        <img src={logo} alt="SOEL Logo" className="logo" />
        <div className="nav-container">
          {/* Navigation items */}
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`nav-item ${selected === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <Transition
        isTransitioning={isTransitioning}
        setTransitioning={setTransitioning}
      />
      {activeSection === introRef && (
        <div className={`section intro ${activeSection === introRef ? "active" : ""}`} ref={introRef}>
          <IntroContent
            scrollProgress={scrollProgress}
            onLastSentenceReached={handleLastSentenceReached}
          />
        </div>
      )}
      {activeSection === servicesRef && (
        <div className={`section our-services ${activeSection === servicesRef ? "active" : ""}`} ref={servicesRef}>
          <OurServices />
        </div>
      )}
      {activeSection === getStartedRef && (
        <div className={`section get-started ${activeSection === getStartedRef ? "active" : ""}`} ref={getStartedRef}>
          <GetStarted />
        </div>
      )}

    </div>
  );
  
};

export default Home;
