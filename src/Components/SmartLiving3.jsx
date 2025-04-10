"use client"

import { useState, useEffect } from "react"

const SmartLiving3 = ({ project }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={`relative ${isMobile ? "h-[28vh] " : "h-screen"} w-full pt-${
        isMobile ? "4" : "6"
      } px-${isMobile ? "3" : "3"} flex ${
        isMobile ? "flex gap-1" : "justify-between gap-2"
      } overflow-hidden items-start `}
    >
      {/* // making width full or not   */}

      {project ? (
        project.name === "MADE IN" || project.name === "R320" ? (
          
          <div className="h-full mt-3 w-full ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
              project.ProjectAssets[2].type === "video/mp4" ? (
                <video
                  className="w-full h-fit object-contain rounded-md object-center"
                  src={project.ProjectAssets[2]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-full h-full object-fit  rounded-sm object-center "
                  src={project.ProjectAssets[2] || "/placeholder.svg"}
                  alt={project.name}
                />
              )
            ) : null}
          </div>
        ) : 
        project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
          project.ProjectAssets[2].type === "video/mp4" ? (
            <video
              className="w-full h-full object-cover rounded-md object-center"
              src={project.ProjectAssets[2]}
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <>
              <div
                className={`img1 ${isMobile ? " h-full w-[67%] mb-2" : "w-[72%] h-full"} rounded-sm overflow-hidden`}
              >
                <img
                  src={project.ProjectAssets[2] || "/placeholder.svg"}
                  alt="table"
                  className={`w-full h-full object-cover ${
                    isMobile ? "object-left scale-[1.9] ml-12 object-contain" : "object-center"
                  }`}
                />
              </div>

              <div
                className={`img2 relative ${
                  isMobile ? " h-full right-0 w-[33%]" : "right-0 w-[27.5%] h-full"
                } rounded-sm overflow-hidden`}
              >
                <img
                  src={project.ProjectAssets[3] || "/placeholder.svg"}
                  alt="chair"
                  className={`${isMobile ? "" : "absolute"} w-full h-full object-cover`}
                />
              </div>
            </>
          )
        ) : null
      ) : null}
    </div>
  )
}

export default SmartLiving3

