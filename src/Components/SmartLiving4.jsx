"use client";

import { useState, useEffect } from "react";
import sml8 from "../assets/smartLiving/sml8.jpg";
import sml10 from "../assets/smartLiving/sml10.jpg";

const SmartLiving4 = ({ project }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative ${isMobile ? "h-[40vh]" : "h-screen"} w-full pt-${
        isMobile ? "4" : "6"
      } flex ${
        isMobile ? "flex gap-1" : "gap-2"
      } overflow-hidden items-start  px-${isMobile ? "3" : "3"}`}
    >
      
        {project ? (
          project.name === "MADE IN" || project.name === "R320" ? (
            <div className="h-[85%] w-full">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                project.ProjectAssets[3].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-contain rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className={`w-full ${isMobile?"":""} h-fit object-fit  rounded-sm object-center`}
                    src={project.ProjectAssets[3] || "/placeholder.svg"}
                    alt={project.name}
                  />
                )
              ) : null}
            </div>
          ) : project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
            project.ProjectAssets[3].type === "video/mp4" ? (
              <video
                className="w-full h-full object-cover rounded-md object-center"
                src={project.ProjectAssets[3]}
                muted
                autoPlay
                playsInline
                loop
              />
            ) : (
              <>
                <div
                  className={`img1 ${
                    isMobile ? "w-full h-full mb-2" : "w-[65%] h-full"
                  } rounded-sm overflow-hidden`}
                >
                  <img
                    src={project.ProjectAssets[4] || "/placeholder.svg"}
                    alt="table"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div
                  className={`img2 relative ${
                    isMobile ? "w-[70%] h-full" : "right-0 w-[34.5%] h-full"
                  } rounded-sm overflow-hidden`}
                >
                  <img
                    src={project.ProjectAssets[5] || "/placeholder.svg"}
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

export default SmartLiving4;
