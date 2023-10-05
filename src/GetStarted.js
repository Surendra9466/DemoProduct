import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Power3 } from "gsap";
import "./GetStarted.css";

import axios from "axios"; // Change the path accordingly

import { TextPlugin } from "gsap/TextPlugin";
import "./GetStarted.css";
import videoBackground from "./Media/BGVid-03.mp4"; // Import the video file

gsap.registerPlugin(TextPlugin);

const consultingDescriptions = {
  Fundraising: "Unlock your startup's true potential with our expert Fundraising services. From venture capital to crowdfunding and token sales, our EL Raise package offers end-to-end support. Don't miss the opportunity; contact us now to kickstart your fundraising journey.",
  Operations: "Achieve operational excellence with our EL Continuity service. From HR logistics to supply chain optimization, we offer data-driven and tailored strategies. Contact us to accelerate your startup's growth trajectory.",
  "Product Strategy": "Dominate your market with our Product Strategy service. Utilizing cutting-edge analytics tools, we offer a meticulously crafted growth roadmap complete with KPIs and milestones. Transform your vision into a game-changing product; contact us today."
};

const techDescriptions = {
  "Build me a Feature": "Add the 'wow' factor to your product with our 'Build me a Feature' service. From back-end databases to interactive front-end UIs, we create features that elevate user engagement. Ready to make your software unforgettable? Contact us now.",
  "Outsource my tech": "Focus on your core business while we handle the tech. Our 'Outsource my tech' service covers everything from software development to server management. High-quality, cost-effective, and scalable; contact us to become your tech powerhouse.",
  Web3: "Disrupt the market with our Web3 services. From blockchain to smart contracts and DeFi, our EL Web3-build offers comprehensive consulting and development expertise. Intrigued by the decentralized revolution? Contact us now to innovate."
};


const GetStarted = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    option: "",
    message: "",
  });

  const [selectedConsultingOptions, setSelectedConsultingOptions] = useState([]);
  const [selectedTechOptions, setSelectedTechOptions] = useState([]);

  const [selectedConsultingDescription, setSelectedConsultingDescription] = useState("");
  const [selectedTechDescription, setSelectedTechDescription] = useState("");
  const [descriptionAnimationCompleted, setDescriptionAnimationCompleted] = useState(false);

  const [formError, setFormError] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [showTechInfo, setShowTechInfo] = useState(false);
  const [showConsultingInfo, setShowConsultingInfo] = useState(false);

  const sentenceRef = useRef(null);

  const [optionsSelected, setOptionsSelected] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    gsap.to(sentenceRef.current, {
      duration: 4,
      text: "Embrace the Future with Us!",
      ease: "power3.out",
    });

    // Load and initialize the NeverBounce widget
    const neverBounceScript = document.createElement("script");
    neverBounceScript.type = "text/javascript";
    neverBounceScript.src =
      "https://cdn.neverbounce.com/widget/dist/NeverBounce.js";
    neverBounceScript.onload = () => {
      window._NBSettings = {
        apiKey: "public_aa6fde5c4531e34b801414a157339baf",
      };

      if (window.NeverBounce) {
        // Initialize the NeverBounce widget
        window.NeverBounce.initEmailWidget({
          apiKey: window._NBSettings.apiKey,
          inputElement: document.getElementById("email"),
          onError: (error) => {
            console.error("NeverBounce error:", error);
          },
          onStatus: (status) => {
            // Handle email status changes here (e.g., valid, invalid)
            console.log("Email status:", status);
          },
        });
      }
    };

    document.body.appendChild(neverBounceScript);


    // Trigger animation once descriptionAnimationCompleted state changes
    if (descriptionAnimationCompleted) {
      animateDescriptions();
    }
  }, [descriptionAnimationCompleted]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(false);
  
    if (window.neverBounce) {
      // Update the NeverBounce widget with the new email value
      window.neverBounce.updateEmailValue(value);
    }
  
    if (value === "tech" && !showTechInfo) {
      setShowTechInfo(true);
      setShowConsultingInfo(false);
    } else if (value === "consulting" && !showConsultingInfo) {
      setShowTechInfo(false);
      setShowConsultingInfo(true);
  
      // Update consulting description
      const consultingDescription =
        selectedConsultingOptions.length > 0
          ? consultingDescriptions[selectedConsultingOptions[0]]
          : "";
      setSelectedConsultingDescription(consultingDescription);
    } else if (value === "consulting" && showConsultingInfo) {
      setShowTechInfo(false);
    } else if (value === "tech" && showTechInfo) {
      setShowConsultingInfo(false);
    } else {
      setShowTechInfo(false);
      setShowConsultingInfo(false);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    const dataToSend = {
      ...formData,
      selectedConsultingOptions,
      selectedTechOptions,
    };

    const proxyUrl = "https://soel-website.nassifchedrawi1.repl.co";
    const apiUrl = `${proxyUrl}/submitForm`;

    axios
      .post(apiUrl, dataToSend)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        setIsSending(false);
        setIsSent(true);
        setSubmissionStatus("success");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setIsSending(false);
        setSubmissionStatus("error");
      });
  };

  const consultingRefs = useRef({});
  const techRefs = useRef({});

  const handleConsultingOptionClick = (option) => {
    setSelectedConsultingOptions((prevOptions) => {
      const newOptions = prevOptions.includes(option)
        ? prevOptions.filter((prevOption) => prevOption !== option)
        : [...prevOptions, option];

      // Update consulting descriptions based on selected options
      const descriptions = newOptions.map((opt) => consultingDescriptions[opt]);
      setSelectedConsultingDescription(descriptions.join("\n"));

      return newOptions;
    });
    setOptionsSelected(true);
  };

  const handleTechOptionClick = (option) => {
    setSelectedTechOptions((prevOptions) => {
      const newOptions = prevOptions.includes(option)
        ? prevOptions.filter((prevOption) => prevOption !== option)
        : [...prevOptions, option];

      // Update tech descriptions based on selected options
      const descriptions = newOptions.map((opt) => techDescriptions[opt]);
      setSelectedTechDescription(descriptions.join("\n"));

      return newOptions;
    });
    setOptionsSelected(true);
  };

  const containerClassName = optionsSelected
    ? "contact-container-gs options-selected"
    : popupActive
    ? "contact-container-gs popup-active"
    : "contact-container-gs split-layout"; // Updated class name for split layout

  return (
  <div className={containerClassName}>
    <div className="left-side">
      <div className="information-container-gs">
        {(!optionsSelected || showConsultingInfo || showTechInfo) && (
          <div className="info-box-gs">
            <h3>About Our Services</h3>
            <div className="description-container-gs">
            <div className="description-container-gs">
  {showConsultingInfo &&
    selectedConsultingOptions.map((option) => (
      <div key={option} className="description-gs animate-gs">
        {consultingDescriptions[option]}
      </div>
    ))}
  {showTechInfo &&
    selectedTechOptions.map((option) => (
      <div key={option} className="description-gs animate-gs">
        {techDescriptions[option]}
      </div>
    ))}
</div>

              {!showConsultingInfo && !showTechInfo && (
                <div className="description1-gs animate-gs">
                  Don't know where to start? Send us an inquiry, and we will get in touch ASAP!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="right-side" style={{ backgroundImage: `url(${videoBackground})` }}>
      <video autoPlay loop muted className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-container-gs">
        <h2>Get in Touch</h2>
        {submissionStatus === "success" ? (
          <div className="submission-confirmation-gs">
            Message sent successfully!
          </div>
        ) : (
          formError && <div className="error-message-gs">{formError}</div>
        )}
        {submissionStatus === "success" ? (
          <div className="submitted-info-gs">
            <h3>Submitted Information:</h3>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Option: {formData.option}</p>
            {formData.option === "consulting" && (
              <p>Consulting Options: {selectedConsultingOptions.join(", ")}</p>
            )}
            {formData.option === "tech" && (
              <p>Technology Options: {selectedTechOptions.join(", ")}</p>
            )}
            <p>Message: {formData.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-field-gs">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                required
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-field-gs">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-field-gs">
              <label htmlFor="option">What are you looking for</label>
              <select
                id="option"
                name="option"
                required
                onChange={handleInputChange}
              >
                <option value="">Select a service line</option>
                <option value="consulting">Consulting</option>
                <option value="tech">Tech</option>
              </select>
            </div>
            {formData.option === "consulting" && (
              <div className="options-container-gs">
                <p className="options-label-gs">
                  Consulting Options:
                  <span
                    className="info-button-gs"
                    title="Select an option to see what to expect"
                  >
                    i
                  </span>
                </p>
                <div className="options-boxes-gs">
                  <div
                    className={`option-box-gs ${
                      selectedConsultingOptions.includes("Fundraising") &&
                      "selected-gs"
                    }`}
                    onClick={() => handleConsultingOptionClick("Fundraising")}
                  >
                    Fundraising
                  </div>
                  <div
                    className={`option-box-gs ${
                      selectedConsultingOptions.includes("Operations") &&
                      "selected-gs"
                    }`}
                    onClick={() => handleConsultingOptionClick("Operations")}
                  >
                    Operations
                  </div>
                  <div
                    className={`option-box-gs ${
                      selectedConsultingOptions.includes(
                        "Product Strategy"
                      ) && "selected-gs"
                    }`}
                    onClick={() =>
                      handleConsultingOptionClick("Product Strategy")
                    }
                  >
                    Product Strategy
                  </div>
                </div>
              </div>
            )}

            {formData.option === "tech" && (
              <div className="options-container-gs">
                <p className="options-label-gs">
                  Technology Options:
                  <span
                    className="info-button-gs"
                    title="Select an option to see what to expect"
                  >
                    i
                  </span>
                </p>
                <div className="options-boxes-gs">
                  <div
                    className={`option-box-gs ${
                      selectedTechOptions.includes("Build me a Feature") &&
                      "selected-gs"
                    }`}
                    onClick={() => handleTechOptionClick("Build me a Feature")}
                  >
                    Build me a Feature
                  </div>
                  <div
                    className={`option-box-gs ${
                      selectedTechOptions.includes("Outsource my tech") &&
                      "selected-gs"
                    }`}
                    onClick={() => handleTechOptionClick("Outsource my tech")}
                  >
                    Outsource my tech
                  </div>
                  <div
                    className={`option-box-gs ${
                      selectedTechOptions.includes("Web3") && "selected-gs"
                    }`}
                    onClick={() => handleTechOptionClick("Web3")}
                  >
                    Web3
                  </div>
                </div>
              </div>
            )}
            <div className="input-field-gs">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                onChange={handleInputChange}
                placeholder="Your message (optional)"
              />
            </div>

            <button
              type="submit"
              className={`send-button ${isSending ? "sending" : ""}`}
              disabled={isSending || isSent}
            >
              {isSending ? "Sending..." : isSent ? "Sent ✔" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
);

};

export default GetStarted;
