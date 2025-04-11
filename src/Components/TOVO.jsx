"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
// import { useState, useEffect } from "react";
import { tovoDetails } from "../utils/TOVODetails";

import { projectsData } from "../utils/projectsData";
import { Navbar } from "./Navbar";

const TOVOProjectTable = ({ project }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // const project =
  //   projectsData.find((p) => p.id === projectId) || location.state?.project;

  // If no project is found, redirect to work section
  if (!project) {
    navigate("/?section=work");
    return null;
  }

  // Check if we're on the client side before accessing window
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseOver = (project) => {
    if (project.images && project.images.length > 0) {
      setHoveredImage({
        src: project.images[0],
        location: project.location,
        year: project.year,
        typology: project.typology,
        buildArea: project.buildArea,
        siteArea: project.siteArea,
        scope: project.scope,
        team: project.team,
      });
    }
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
  };


  useEffect(() => {
    // If project is undefined after a refresh, try to get it from the URL
    if (!project && projectId) {
      const refreshedProject = projectsData.find((p) => p.id === projectId);
      if (refreshedProject) {
        // Force a re-render with the found project
        navigate(`/${project.name}/${projectId}`, {
          state: { project: refreshedProject },
          replace: true,
        });
      } else {
        // If still can't find the project, go to work page
        navigate("/?section=work");
      }
    }
  }, [projectId, navigate, project]); // Added project to dependencies

  // Scroll to top when projectId changes, adjusted for mobile container
  useEffect(() => {
    if (isMobile && mobileContainerRef.current) {
      mobileContainerRef.current.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [projectId, isMobile]);


  // animation to top
  const projectPageRef = useRef(null);

  useEffect(() => {
    if (location.state?.skipAnimation) return;

    const projectPageElement = projectPageRef.current;
    if (projectPageElement) {
      gsap.from(projectPageElement, {
        y: "54%",
        duration: 1,
        ease: "power1.in",
      });
    }
  }, [projectPageRef, location.state]);

  // Helper function to check if a file is a video based on its extension
  const isVideoFile = (url) => {
    if (!url) return false;
    // Check if it's a string (URL) and ends with a video extension
    if (typeof url === "string") {
      return (
        url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")
      );
    }
    // If it's an imported asset, check if it has a type property
    if (url.type) {
      return url.type.includes("video");
    }
    return false;
  };

  return (

    <div ref={containerRef} className="tovo-desk  w-full mt-6  px-3 ">

      {isMobile ? (
        <>
          <div
            ref={projectPageRef}
            className={`relative  flex-col w-full  h-full justify-between overflow-hidden`}
          >
            {/* Detail Panel Section */}
            <div
              className={`ml-[29%] w-[71%] h-[60vh] text-[11px] 
            ${isDarkMode ? "text-white/40" : "text-black/50"} 
          shrink-0  md:mt-0  flex flex-col justify-between overflow-hidden`}
            >
              <div className=" min-h-[70%] max-h-[70%]  shrink-0 w-full rounded-[4px] overflow-hidden">
                {hoveredImage ? (
                  <img
                    className="h-full w-full object-cover object-center shrink-0 overflow-y-clip"
                    src={hoveredImage.src}
                    alt="Project preview"
                    srcSet={hoveredImage.src}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center ">
                    <img
                      className="h-full w-full object-cover object-center shrink-0 overflow-y-clip"
                      src={project.ProjectAssets[0]}
                      alt=""
                      srcSet={project.ProjectAssets[0]}
                    />
                  </div>
                )}
              </div>

              {hoveredImage ? (
                <>

                  <div className="w-full  mb-20  flex flex-col md:flex-row justify-between text-end leading-4">

                    <div className=" w-full mt-3 flex justify-between items-start">
                      <div className="w-[40%] flex-col items-start h-full text-left whitespace-nowrap">

                        {hoveredImage.buildArea ? (
                          <>
                            <p>Built up Area: {hoveredImage.buildArea} Sq.ft</p>
                            <p>{hoveredImage.scope}</p>
                          </>
                        ) : (
                          <>
                            <p>Built up Area: {project.buildArea} Sq.ft</p>
                            <p>{project.scope}</p>
                          </>
                        )}
                      </div>
                      <p>Site Area : {hoveredImage.siteArea}  </p>


                    </div>


                    <div className=" mt-1 flex w-full items-start">
                      {hoveredImage.team ? (
                        <p className="text-[11px] text-left">
                          Team: {hoveredImage.team}
                        </p>
                      ) : (
                        <p className="text-[11px] text-left">
                          Team: {project.team}
                        </p>
                      )}
                    </div>
                  </div>
                </>

              ) : (
                <>
                  <div className="w-full  mb-9 flex flex-col md:flex-row justify-between text-end leading-4">

                    <div className=" w-full flex justify-between items-start">
                      <div className="w-[40%] flex-col items-start h-full text-left whitespace-nowrap">
                        <p>Built up Area: {project.buildArea} </p>
                        <p>{project.scope}</p>
                      </div>

                      <p>Site Area : {project.siteArea} </p>
                    </div>

                    {project.team && (
                      <div className=" mt-1 flex w-full items-start">
                        <p className="text-[11px] text-left">
                          Team: {project.team}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Project Table Section */}
            <div
              className={` w-full  relative  -mt-[7px] h-full flex-col justify-between  `}
            >
              <table className="w-full overflow-hidden">

                {/* <thead> 
            <tr className="flex font-normal justify-between items-center text-[11px] text-black ">
              <th className={`text-left w-3/5 font-normal pb-1 `}>
                {hoveredImage ? hoveredImage.location : project.location}
              </th>
              <th className={`text-left font-normal pb-1 flex-1 `}>
              {hoveredImage ? hoveredImage.status : project.status}
              </th>
              <th className={`text-right font-normal pb-1 flex-1 `}>
              {hoveredImage ? hoveredImage.year : project.year}
              </th>
            </tr>
          </thead> */}

                <tbody>
                  {tovoDetails.map((project) => (
                    <tr
                      key={project.id}
                      className={`flex w-full  cursor-pointer text-[11px]  transition-colors 
                    ${isDarkMode
                          ? "text-white/40 hover:text-white"
                          : "text-black/40 hover:text-black"
                        }
                  ${!project.clickable ? "opacity-60 cursor-default" : ""}`}
                      onMouseOver={() => handleMouseOver(project)}
                      onMouseOut={handleMouseOut}
                    >
                      <td
                        className={` w-3/5  text-left  ${isDarkMode
                            ? "border-t-[0.2px] border-zinc-700"
                            : "border-b-[0.2px] border-zinc-400"
                          }`}
                      >
                        {project.location}
                      </td>
                      <td
                        className={`flex-1 text-left ${isDarkMode
                            ? "border-t-[0.2px] border-zinc-700"
                            : "border-b-[0.2px] border-zinc-400"
                          }`}
                      >
                        {project.status}
                      </td>
                      <td
                        className={`flex-1 text-right ${isDarkMode
                            ? "border-t-[0.2px] border-zinc-700"
                            : "border-b-[0.2px] border-zinc-400"
                          }`}
                      >
                        {project.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      ) : (
        <>
          <div
            ref={projectPageRef}
            className={`relative  flex-row-reverse  w-full  h-screen flex   justify-between overflow-hidden`}>
            {/* Project Table Section */}
            <div className={`w-[27.5%]   relative  h-full flex-col justify-between  `}>

              <table className="w-full overflow-hidden">
                {/* <thead>
            <tr className="flex font-normal justify-between items-center">
              <th className={`text-left font-normal pb-1 flex-1 ${isDarkMode ? "text-white/40" : "text-black/50"}`}>
                [Location]
              </th>
              <th className={`text-left font-normal pb-1 flex-1 ${isDarkMode ? "text-white/40" : "text-black/50"}`}>
                [Status]
              </th>
              <th className={`text-right font-normal pb-1 flex-1 ${isDarkMode ? "text-white/40" : "text-black/50"}`}>
                [Year]
              </th>
            </tr>
          </thead> */}

                <tbody>
                  {tovoDetails.map((project) => (
                    <tr
                      key={project.id}
                      className={`flex w-full  cursor-pointer text-[11px] transition-colors 
                  ${isDarkMode ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"}
                  ${!project.clickable ? "opacity-60 cursor-default" : ""}`}
                      onMouseOver={() => handleMouseOver(project)}
                      onMouseOut={handleMouseOut}
                    >
                      <td
                        className={` w-[65%]  text-left  ${isDarkMode ? "border-t-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"}`}
                      >
                        {project.location}
                      </td>
                      <td
                        className={`flex-1 text-left ${isDarkMode ? "border-t-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"}`}
                      >
                        {project.status}
                      </td>
                      <td
                        className={`flex-1 text-right ${isDarkMode ? "border-t-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"}`}
                      >
                        {project.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <div className="mt-44">
                <h6 className={`text-[11px] 
              ${project.name === "R320"
                    ? " text-white hover:text-black "
                    : project.name === "TOVO" ||
                      project.name === "Panache" ||
                      project.name === "FOLD"
                      ? " text-zinc-400 "
                      : "text-zinc-400 "
                  }   text-left md:text-right leading-tight `}
                >
                  {project.desc}
                </h6>

              </div>


            </div>

            {/* Detail Panel Section */}
            <div
              className={` h-auto w-full md:w-[27%] ml-0 md:ml-[19%] text-[11px] ${isDarkMode ? "text-white/40" : "text-black/50"
                } shrink-0 mt-5 md:mt-0  flex flex-col justify-between overflow-hidden`}
            >
              <div className="min-h-[64%] max-h-[64%]  -mb-10 shrink-0 w-full rounded-[4px] overflow-hidden">
                {hoveredImage ? (
                  <img
                    className="h-full w-full object-cover object-center shrink-0 overflow-y-clip"
                    src={hoveredImage.src}
                    alt="Project preview"
                    srcSet={hoveredImage.src}
                  />
                ) : (
                  <div className="h-full w-full  flex items-center justify-center text-gray-400">
                    <img
                      className="h-full w-full object-cover object-center shrink-0 overflow-y-clip"
                      src={project.ProjectAssets[0]} alt="" srcSet={project.ProjectAssets[0]} />
                  </div>
                )}
              </div>

              {hoveredImage ? (
                <>
                  <div className="w-full mt-12 mb-1.5  flex flex-col md:flex-row justify-between items-end text-end leading-4">
                    <div className="w-full md:w-[40%] flex-col items-start h-full text-left whitespace-nowrap">
                      <p>
                        {hoveredImage.length > 0
                          ? hoveredImage.location.split(/\d/)[0].trim().replace(/[+,#,$]/g, '')
                          : project.location.split(/\d/)[0].trim().replace(/[+,#,$]/g, '')
                        }
                      </p>
                      

                      {hoveredImage.buildArea ? (
                        <p>Built up Area: {hoveredImage.buildArea} Sq.ft</p>
                      ) : (
                        <p>Built up Area: {project.buildArea} Sq.ft</p>
                      )}

                      {hoveredImage.typology !== "Product" && hoveredImage.typology !== "Research" && (
                        <p className="w-full md:w-fit text-left   whitespace-nowrap text-nowrap tracking-tight md:my-0">
                          Site Area: {hoveredImage.siteArea} Sq.ft
                        </p>
                      )}
                    </div>


                    <div className="w-full md:w-[40%] text-right flex-col items-start whitespace-nowrap">
                      <p>{hoveredImage.typology}</p>
                      <p>{hoveredImage.year}</p>
                      {hoveredImage.typology !== "Product" && hoveredImage.typology !== "Research" && (
                        <p>{hoveredImage.scope}</p>
                      )}
                    </div>
                  </div>

                  {hoveredImage.typology !== "Product" &&
                    hoveredImage.typology !== "Research" &&
                    hoveredImage.team && (
                      <div className="mb-20 md:mb-80 mt-[1px] flex w-full items-start">
                        <p className="text-[11px] text-left">Team: {hoveredImage.team}</p>
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="w-full  mt-12 mb-1.5 flex flex-col md:flex-row justify-between items-end text-end leading-4">
                    <div className="w-full md:w-[40%] flex-col items-start h-full text-left whitespace-nowrap">
                      <p>{project.location}</p>
                      <p>Built up Area: {project.buildArea} Sq.ft</p>
                    <p className="w-full md:w-fit text-center whitespace-nowrap text-nowrap tracking-tight md:my-0">
                      Site Area: {project.siteArea} Sq.ft
                    </p>
                    </div>


                    <div className="w-full md:w-[40%] text-right flex-col items-start whitespace-nowrap">
                      <p>{project.typology}</p>
                      <p>{project.year}</p>
                      <p>{project.scope}</p>
                    </div>
                  </div>

                  {project.team && (
                    <div className="mb-20 md:mb-80 mt-[1px] flex w-full items-start">
                      <p className="text-[11px] text-left">Team: {project.team}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        </>

      )
      }


      {/* main page*/}

      {/* page 1*/}
      <div
        className={`smartliving w-full  ${isMobile ? " h-[50vh]" : "h-screen"
          } mt-${isMobile ? "4 " : "6"} overflow-hidden rounded-sm `}
      >
        {isMobile ? (
          <>
            <div
              className={` w-full mb-3 flex-col justify-between  items-center  `}
            >
              <div
                className={`  w-full text h-full  flex flex-col justify-center items-start `}
              >
                <h5 className=" text-[11px]  text-black">DESIGN INTEGRATION</h5>

                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  To create a space that complements this innovative approach by
                  presenting a canvas that is both modern and sophisticated,
                  mirroring the brand’s commitment to quality and creativity
                </p>
              </div>

              <div className=" h-full w-full flex flex-col justify-center items-start mt-4   ">
                <h5 className=" text-[11px]  text-black">COLOUR + MATERIAL</h5>
                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  The use of neutral color tones - black and white - resonates
                  with the brand, communicating an air of openness without
                  concealing anything between the shades enhancing the space by
                  creating an inviting atmosphere. Adding a strongly
                  objectifying color and texture creates a ‘presence’ by
                  defining the space and adding depth to the minimalist design.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={` w-full mb-3 flex justify-between  items-center  `}
            >
              <div
                className={` pl-[19%] w-[46%] text h-full  flex flex-col justify-center items-start `}
              >
                <h5 className=" text-[11px]  text-black">DESIGN INTEGRATION</h5>

                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  To create a space that complements this innovative approach by
                  presenting a canvas that is both modern and sophisticated,
                  mirroring the brand’s commitment to quality and creativity
                </p>
              </div>

              <div className="text pl-3 h-full w-[28%]  flex flex-col justify-center items-end   ">
                <h5 className=" text-[11px]  text-black">COLOUR + MATERIAL</h5>
                <p className=" text-[11px] text-right mt-1 leading-none text-zinc-400  ">
                  The use of neutral color tones - black and white - resonates
                  with the brand, communicating an air of openness without
                  concealing anything between the shades enhancing the space by
                  creating an inviting atmosphere. Adding a strongly
                  objectifying color and texture creates a ‘presence’ by
                  defining the space and adding depth to the minimalist design.
                </p>
              </div>
            </div>
          </>
        )}

        <div
          className={`img-big1 
             ${isMobile ? "  mt-6 " : ""}  
          flex justify-center overflow-hidden rounded-sm `}
        >
          {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
            project.ProjectAssets[1].type === "video/mp4" ? (
              <video
                className="w-full h-full object-cover  rounded-sm object-center"
                src={project.ProjectAssets[1]}
                muted
                autoPlay
                playsInline
                loop
              />
            ) : (
              <img
                className={`w-full 
                  ${isMobile
                    ? ""
                    : " object-cover"
                  } 
                rounded-sm object-center`}
                src={project.ProjectAssets[1] || "/placeholder.svg"}
                alt={project.name}
                srcSet={project.ProjectAssets[1]}
              />
            )
          ) : null}
        </div>
      </div>

      {/* page 2*/}
      <div
        className={`tovo2 relative w-full 
          ${isMobile ? " h-[60vh]" : "h-screen "} mt-${isMobile ? "4 " : "6"
          } overflow-hidden rounded-sm `}
      >
        {isMobile ? (
          <div
            className={` mt-2  w-full flex-col justify-between  items-center  `}
          >
            {/* <div
              className={`   text h-full  flex flex-col justify-center items-start `}
            >
              <h5 className=" text-[11px]    text-black">DESIGN INTEGRATION</h5>

              <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                To create a space that complements this innovative approach by
                presenting a canvas that is both modern and sophisticated,
                mirroring the brand’s commitment to quality and creativity
              </p>
            </div> */}

            <div className=" mt-4 right-0 h-full flex flex-col justify-center items-start  ">
              <div className=" planning-box  flex flex-col justify-center items-start ">
                <h5 className=" text-[11px] text-right  text-black">
                  PLANNING{" "}
                </h5>

                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  Each component in the spatial layout has been structured with
                  a purpose that resonates simplicity and functionality. This
                  open plan promotes a sense of transparency and accessibility,
                  aligning with the brand’s ethos of straightforward, honest
                  food offerings. Communal tables are strategically placed to
                  encourage interaction among diners, while the open kitchen is
                  prominently featured ,turning the act of cooking into a visual
                  experience.
                </p>
              </div>

              <div className=" mt-4 flex-col  ">
                <ul className="list-none text-[10px] text-zinc-400 leading-none">
                  <li>
                    01 <span className=" ml-1"></span> Kitchen Area
                  </li>
                  <li>
                    02 <span className=" ml-1"></span> Walk-in Freezer + Chiller
                  </li>
                  <li>
                    03 <span className=" ml-1"></span> Manager Room
                  </li>
                  <li>
                    04 <span className=" ml-1"></span> Handwash + Toilet
                  </li>
                  <li>
                    05 <span className=" ml-1"></span> Service Counter
                  </li>
                  <li>
                    06 <span className=" ml-1"></span> Indoor Dining Area
                  </li>
                  <li>
                    07 <span className=" ml-1"></span> Entrance
                  </li>
                  <li>
                    08 <span className=" ml-1"></span> Outdoor Seating
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute mt-24  w-full flex justify-between  items-center  `}
          >
            <div
              className={` pl-[19%] w-[46%] text h-full  flex flex-col justify-center items-start `}
            >
              <h5 className=" text-[11px]    text-black">DESIGN INTEGRATION</h5>

              <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                To create a space that complements this innovative approach by
                presenting a canvas that is both modern and sophisticated,
                mirroring the brand’s commitment to quality and creativity
              </p>
            </div>

            <div className=" right-0  pl-3 h-full w-[28.2%]  flex flex-col justify-center items-start  ">
              <div className=" planning-box  flex flex-col justify-center items-end ">
                <h5 className=" text-[11px] text-right  text-black">
                  PLANNING{" "}
                </h5>

                <p className=" text-[11px] text-right mt-1 leading-none text-zinc-400  ">
                  Each component in the spatial layout has been structured with
                  a purpose that resonates simplicity and functionality. This
                  open plan promotes a sense of transparency and accessibility,
                  aligning with the brand’s ethos of straightforward, honest
                  food offerings. Communal tables are strategically placed to
                  encourage interaction among diners, while the open kitchen is
                  prominently featured ,turning the act of cooking into a visual
                  experience.
                </p>
              </div>

              <div className="  absolute  top-32 flex-col  ">
                <ul className="list-none text-[10px] text-zinc-400">
                  <li>
                    01 <span className=" ml-1"></span> Kitchen Area
                  </li>
                  <li>
                    02 <span className=" ml-1"></span> Walk-in Freezer + Chiller
                  </li>
                  <li>
                    03 <span className=" ml-1"></span> Manager Room
                  </li>
                  <li>
                    04 <span className=" ml-1"></span> Handwash + Toilet
                  </li>
                  <li>
                    05 <span className=" ml-1"></span> Service Counter
                  </li>
                  <li>
                    06 <span className=" ml-1"></span> Indoor Dining Area
                  </li>
                  <li>
                    07 <span className=" ml-1"></span> Entrance
                  </li>
                  <li>
                    08 <span className=" ml-1"></span> Outdoor Seating
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div
          className={`img-big1 w-full ${isMobile ? " mt-4 h-fit" : "h-full "
            }   flex justify-center overflow-hidden rounded-sm `}
        >
          {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
            project.ProjectAssets[2].type === "video/mp4" ? (
              <video
                className="w-full h-full object-cover  rounded-sm object-center"
                src={project.ProjectAssets[2]}
                muted
                autoPlay
                playsInline
                loop
              />
            ) : (
              <img
                className={`w-full h-full  ${isMobile ? "object-contain" : "object-contain ml-10 "
                  }   rounded-sm object-center`}
                src={project.ProjectAssets[2] || "/placeholder.svg"}
                alt={project.name}
                srcSet={project.ProjectAssets[2]}
              />
            )
          ) : null}
        </div>
      </div>

      {/* {page 3} */}
      <div
        className={`smartliving relative   w-full 
          ${isMobile ? " h-[60vh]" : "h-screen  -mt-16"} 
        mt-${isMobile ? "4 " : "6"} overflow-hidden rounded-sm `}
      >
        {isMobile ? (
          <>
            <div
              className={` mt-4  w-full flex-col justify-between  items-center  `}
            >
              <div
                className={` w-full text h-full  flex flex-col justify-center items-start `}
              >
                <h5 className=" text-[11px]  text-black">
                  DESIGN + DETAIL [ FACADE ]
                </h5>

                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  Featuring a reflective facade that invites viewers to not only
                  visualize it as a static structure, but as a dynamic
                  participant in its environment. This unconventional canopy
                  projection represents an architectural exploration of
                  material, transparency, and geometric composition.
                </p>
              </div>
            </div>

            <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm  ml-[18px] ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                project.ProjectAssets[3].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <>
                    <img
                      className="w-full h-full object-cover rounded-sm object-right"
                      src={project.ProjectAssets[3] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[3]}
                    />
                  </>
                )
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div
              className={` absolute  bottom-1/4  w-full flex justify-between  items-center  `}
            >
              <div
                className={` pl-[19%] w-[46%] text  flex flex-col justify-center items-start `}
              >
                <h5 className=" text-[11px]  text-black">
                  DESIGN + DETAIL [ FACADE ]
                </h5>

                <p className=" text-[11px] text-left mt-1 leading-none text-zinc-400  ">
                  Featuring a reflective facade that invites viewers to not only
                  visualize it as a static structure, but as a dynamic
                  participant in its environment. This unconventional canopy
                  projection represents an architectural exploration of
                  material, transparency, and geometric composition.
                </p>
              </div>
            </div>

            <div className="img-big1 w-full flex justify-center overflow-hidden rounded-sm  ml-11 ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                project.ProjectAssets[3].type === "video/mp4" ? (
                  <video
                    className="w-full  object-cover rounded-sm object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <>
                    <img
                      className="w-full  rounded-sm object-cover"
                      src={project.ProjectAssets[3] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[3]}
                    />
                  </>
                )
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* {page 4} */}
      <div className="">
        <div
          className={`Smartliving 
          items-center justify-center flex  w-full mt-${isMobile ? "4" : "6"
            } overflow-hidden rounded-sm ${isMobile ? "h-[60vh]" : "h-screen -mt-16"}`}
        >
          <div
            className={`w-full ${isMobile
                ? "flex flex-col   h-full"
                : "flex justify-between items-center"
              }`}
          >
            <div
              className={`img-big1 
          ${isMobile ? "w-full h-1/2" : "w-1/2 h-full "
                } flex justify-start overflow-hidden rounded-sm`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
                project.ProjectAssets[4].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[4]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-1/2 h-full object-fill rounded-sm object-center"
                    src={project.ProjectAssets[4] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[4]}
                  />
                )
              ) : null}
            </div>

            <div
              className={` 
          ${isMobile ? "w-full h-1/2 mt-2 gap-1" : "w-2/5 h-full gap-2"} 
          flex  justify-between items-center`}
            >
              <div className="img-big2 w-1/2 h-full flex justify-center  overflow-hidden rounded-sm">
                {project.ProjectAssets.length > 0 &&
                  project.ProjectAssets[5] ? (
                  project.ProjectAssets[5].type === "video/mp4" ? (
                    <video
                      className="w-full h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[5]}
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      className="w-full h-full object-fill rounded-sm object-center"
                      src={project.ProjectAssets[5] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[5]}
                    />
                  )
                ) : null}
              </div>

              <div className="img-big2 w-1/2 h-full flex justify-center overflow-hidden rounded-sm">
                {project.ProjectAssets.length > 0 &&
                  project.ProjectAssets[6] ? (
                  project.ProjectAssets[6].type === "video/mp4" ? (
                    <video
                      className="w-full h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[6]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : (
                    <img
                      className="h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[6] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[6]}
                    />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* page 5*/}
      <div
        className={`smartliving flex justify-center items-center  w-full mt-${isMobile ? "4" : "6"
          } overflow-hidden rounded-sm ${isMobile ? "h-[60vh]" : "h-screen -mt-16"}`}
      >
        <div
          className={`w-full ${isMobile
              ? "flex flex-col h-full"
              : "flex justify-between items-center"
            }`}
        >
          <div
            className={` 
         ${isMobile ? "w-full   h-1/2  gap-1" : "w-2/5 h-full gap-2 "}
           w-2/5 h-[80%] flex  justify-between items-center`}
          >
            <div className="img-big2 w-1/2 h-full  flex justify-center overflow-hidden rounded-sm">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[7] ? (
                project.ProjectAssets[7].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[7]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-full h-full object-contain rounded-sm object-center"
                    src={project.ProjectAssets[7] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[7]}
                  />
                )
              ) : null}
            </div>

            <div className="img-big2 w-1/2 h-full flex justify-center overflow-hidden rounded-sm">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[8] ? (
                project.ProjectAssets[8].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[8]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[8] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[8]}
                  />
                )
              ) : null}
            </div>
          </div>

          <div
            className={`img-big2 mt-4 w-1/2 h-full  flex justify-end overflow-hidden rounded-sm          
          ${isMobile ? "w-full h-1/2 mt-2" : "w-1/2 h-full "}
           `}
          >
            {project.ProjectAssets.length > 0 && project.ProjectAssets[9] ? (
              project.ProjectAssets[9].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-sm object-center"
                  src={project.ProjectAssets[9]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-1/2 h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[9] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[9]}
                />
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* {page 6} */}
      <div className="">
        <div
          className={`smartliving 
          items-center justify-center flex  w-full mt-${isMobile ? "4" : "6"
            } overflow-hidden rounded-sm ${isMobile ? "h-[60vh]" : "h-screen -mt-16"}`}
        >
          <div
            className={`w-full ${isMobile
                ? "flex flex-col h-full"
                : "flex justify-between items-center"
              }`}
          >
            <div
              className={`img-big1 
          ${isMobile ? "w-full h-1/2" : "w-1/2 h-full"
                } flex justify-start overflow-hidden rounded-sm`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[10] ? (
                project.ProjectAssets[10].type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded-sm object-center"
                    src={project.ProjectAssets[10]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-1/2 h-full object-fill rounded-sm object-center"
                    src={project.ProjectAssets[10] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[10]}
                  />
                )
              ) : null}
            </div>

            <div
              className={`2img 
          ${isMobile ? "w-full  h-1/2  mt-4 gap-1 " : "w-2/5 h-full gap-2 "} 
          flex  justify-between items-center`}
            >
              <div className="img-big2 w-1/2 h-full flex justify-center overflow-hidden rounded-sm">
                {project.ProjectAssets.length > 0 &&
                  project.ProjectAssets[11] ? (
                  project.ProjectAssets[11].type === "video/mp4" ? (
                    <video
                      className="w-full h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[11]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : (
                    <img
                      className="h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[11] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[11]}
                    />
                  )
                ) : null}
              </div>

              <div className="img-big2 w-1/2  h-full flex justify-center overflow-hidden rounded-sm">
                {project.ProjectAssets.length > 0 &&
                  project.ProjectAssets[12] ? (
                  project.ProjectAssets[12].type === "video/mp4" ? (
                    <video
                      className="w-full h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[12]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : (
                    <img
                      className="h-full object-cover rounded-sm object-center"
                      src={project.ProjectAssets[12] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[12]}
                    />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* page 7*/}
      <div
        className={`smartliving w-full  ${isMobile ? " h-[65vh]" : " h-screen -mt-16 "
          } mt-${isMobile ? "4 " : "6"} overflow-hidden rounded-sm  `}
      >
        <div className=" h-full flex justify-end  w-full">
          <div
            className={`h-full ${isMobile ? "w-3/5" : "w-2/5"
              } flex justify-end items-center`}
          >
            {project.ProjectAssets.length > 0 && project.ProjectAssets[13] ? (
              isVideoFile(project.ProjectAssets[13]) ? (
                <video
                  className="w-fit h-4/5 object-cover rounded-sm object-center"
                  src={project.ProjectAssets[13]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-fit h-3/4 object-fill rounded-sm object-center"
                  src={project.ProjectAssets[13] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[13]}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOVOProjectTable;
