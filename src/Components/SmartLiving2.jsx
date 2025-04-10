"use client";

import { useState, useEffect } from "react";
import smartimg from "../assets/smartliving.jpg";

const SmartLiving2 = ({ project }) => {
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
      className={`smartliving w-full mt-${
        isMobile ? "4 " : "6"
      } overflow-hidden rounded-md px-${isMobile ? "3" : "3"}`}
    >
      <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
          project.ProjectAssets[1].type === "video/mp4" ? (
            <video
              className="w-full h-fit object-cover rounded-md object-center"
              src={project.ProjectAssets[1]}
              muted
              autoPlay
              playsInline
              loop
            />
          ) : (
            <img
              className="w-full h-full object-fill rounded-sm object-center"
              src={project.ProjectAssets[1] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[1]}
            />
          )
        ) :null}
      </div>
    </div>
  );
};

export default SmartLiving2;
