"use client";

import { useState, useEffect } from "react";
import sml5 from "../assets/smartLiving/sml5.jpg";
import sml11 from "../assets/smartLiving/sml11.jpg";

const SmartLiving5 = ({ project }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to check if a file is a video based on its extension
  const isVideoFile = (url) => {
    if (!url) return false
    // Check if it's a string (URL) and ends with a video extension
    if (typeof url === "string") {
      return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")
    }
    // If it's an imported asset, check if it has a type property
    if (url.type) {
      return url.type.includes("video")
    }
    return false
  }

  return (
    <div
      className={`relative   ${isMobile ? "h-[35vh]" : "h-[140vh] "} w-full pt-${
        isMobile ? "4" : "6"
      } flex ${
        isMobile ? "flex gap-1" : "gap-2"
      } overflow-hidden items-center  px-${isMobile ? "3" : "3"}`}
    >
      {project ? (
        project.name === "MADE IN"  || project.name === "R320" ? (
 
          <div className="h-full w-full ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
              isVideoFile(project.ProjectAssets[4]) ? (
                <video
                  className="w-full h-full object-contain rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-full h-full  object-fit  rounded-sm object-center"
                  src={project.ProjectAssets[4] || "/placeholder.svg"}
                  alt={project.name}
                />
              )
            ) : null}
          </div>
          
        ) : project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
          isVideoFile(project.ProjectAssets[4]) ? (
            <video
              className="w-full h-full object-cover rounded-md object-center"
              src={project.ProjectAssets[4]}
              muted
              autoPlay
              playsInline
              loop
            />
          ) : (
            <>
              <div
                className={`img1 ${
                  isMobile ? "w-1/2  h-full " : "w-[49.5%] h-full"
                } rounded-sm overflow-hidden`}
              >
                <img
                  src={project.ProjectAssets[6] || sml11}
                  alt="table"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div
                className={`img2 relative ${
                  isMobile ? "w-1/2 h-full" : "right-0 w-[50%] h-full"
                } rounded-sm overflow-hidden`}
              >
                <img
                  src={project.ProjectAssets[7] || sml5}
                  alt="chair"
                  className={`${
                    isMobile ? "" : "absolute"
                  } w-full h-full object-cover object-center`}
                />
              </div>
            </>
          )
        ) : null
      ) : null}

     
    </div>
  );
};
export default SmartLiving5;
