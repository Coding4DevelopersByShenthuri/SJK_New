import { useEffect } from "react";
import "../common/Preloader.css"; 

const Preloader = () => {
  useEffect(() => {
    const preloader = document.querySelector("[data-preload]");

    const handleLoad = () => {
      preloader?.classList.add("loaded");
      document.body.classList.add("loaded");
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div data-preload className="preload">
      {/* Rotating Circle */}
      <div className="circle"></div>

      {/* Loading Text */}
      <div className="text">Shakthy Jaffna Kitchen</div>
    </div>
  );
};

export default Preloader;

