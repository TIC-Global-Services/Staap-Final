import React, { useContext, useEffect, useState } from "react";
import ProjectTable from "./ProjectTable";
import { ThemeContext } from "../utils/themeContext";

const Work = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      // setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-full mt-24 overflow-hidden overflow-y-auto  `}
    >
      <div
        className={`works-container text-[11px] ${
          isDarkMode ? "bg-black" : "bg-white"
        }  relative w-full h-full flex flex-col md:flex-row justify-between items-start p-3  `}
      >
        {/* Sidebar / Intro Section */}
        <div
          className={`part1 ${
            isMobile ? "hidden" : ""
          } w-full md:w-[21%] mb-4 md:mb-0`}
        >
          <div className="flex justify-between items-center">
            <h5>Selected Works</h5>
            <h5>[2021-2025]</h5>
          </div>

          <div className="relative text-justify mt-2 leading-3  text-wrap">
            <p
              className={`text-[11px]}
                ${
                  isDarkMode ? "text-white/40" : "text-black/50"
                } w-full text-justify`}
            >
              Throughout our four-year journey, we have successfully designed and executed 18 projects, each reflecting the diversity of our expertise. The works showcased here are a selection from our portfolio. To discover more, including detailed insights into each typology and access to our exclusive portfolio, get in touch with us.
            </p>
          </div>
        </div>

        {/* Project Table Section */}
        <div className="part2 w-full md:ml-4">
          <ProjectTable theme={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default Work;
