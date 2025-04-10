"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { projectsData } from "../utils/projectsData";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../utils/themeContext";
import { useContext } from "react";

const getLocationRank = (location) => {
  if (location.toLowerCase().includes("chennai")) return 1;
  if (location.toLowerCase().includes("dubai")) return 2;
  return 3;
};

const ProjectTable = ({ theme }) => {
  const [sortColumn, setSortColumn] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showAllImages, setShowAllImages] = useState(false); // Update 1: Use isMobile as initial value
  const [hoveredImage, setHoveredImage] = useState(null);
  const tableGalleryRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const navigate = useNavigate();

  const { isDarkMode } = useContext(ThemeContext);

  const defaultProject = projectsData.find((p) => p.name === "R320");

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

  // Update 2: Add useEffect to update showAllImages on screen size change

  // useEffect(() => {
  //   setShowAllImages(isMobile);
  // }, [isMobile]);

  // Preload images
  useEffect(() => {
    projectsData.forEach((project) => {
      project.images.forEach((src) => {
        const img = new Image();
        img.src = src || `${isDarkMode ? "/placeholder.jpg" : "/placeholder-white.jpg"}`;
      });
    });
  }, []);

  // New sortedProjects logic using three groups
  const sortedProjects = useMemo(() => {
    const projects = [...projectsData];
    const compare = (a, b) => {
      let comp = 0;
      if (sortColumn === "typology") {
        comp = a.typology.localeCompare(b.typology);
      } else if (sortColumn === "location") {
        comp = getLocationRank(a.location) - getLocationRank(b.location);
      } else if (sortColumn === "year") {
        const yearA = Number.parseInt(a.year);
        const yearB = Number.parseInt(b.year);
        comp = yearA - yearB;
      }
      return sortOrder === "desc" ? -comp : comp;
    };
    projects.sort(compare);
    return projects;
  }, [sortColumn, sortOrder]);

  const allImages = useMemo(() => {
    return sortedProjects.flatMap((project) =>
      project.images.map((src) => ({
        src,
        name: project.name,
        location: project.location,
        year: project.year,
        typology: project.typology,
        buildArea: project.buildArea,
        siteArea: project.siteArea,
        scope: project.scope,
        team: project.team,
        clickable: project.clickable,
      }))
    );
  }, [sortedProjects]);

  const handleSort = (column) => {
    if (column === "name") {
      setShowAllImages((prev) => !prev);
    } else {
      if (sortColumn === column) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    }
  };

  const handleMouseOver = (
    src,
    name,
    location,
    year,
    typology,
    buildArea,
    siteArea,
    scope,
    team
  ) => {
    setHoveredImage({
      src,
      name,
      location,
      year,
      typology,
      buildArea,
      siteArea,
      scope,
      team,
    });
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
  };

  const handleWheel = (e) => {
    const container = tableGalleryRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const deltaY = e.deltaY;
    if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 1) {
      e.stopPropagation();
    }
    if (deltaY < 0 && scrollTop > 1) {
      e.stopPropagation();
    }
  };

  const handleProjectClick = (project) => {
    if (!project.clickable) return;
    if (
      project.name === "R320" ||
      project.name === "MADE IN" ||
      project.name === "Smart Living" ||
      project.name === "Panache" ||
      project.name === "TOVO" ||
      project.name === "FOLD" ||
      project.name === "Smart Living" 
    ) {
      navigate(`/project/${project.id}`, { state: { project } })
      // navigate(`/${project.name}`, { state: { project } }) ||
      // navigate(`/smartliving/${project.id}`, { state: { project } });             //temporary
    }
  };

  useEffect(() => {
    const gallery = tableGalleryRef.current;
    if (!gallery) return;
    gallery.style.overflowX = showAllImages
      ? isAtBottom
        ? "auto"
        : "hidden"
      : "hidden";
  }, [isAtBottom, showAllImages]);


  // for iphone devices

// Device detection (you might want to refine this check based on your needs)
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

// Set the bottom value based on the device
const bottomValue = isIOS ? '224px' : '200px';

  return (
    // Outer container with responsive flex-direction: vertical on mobile, horizontal on desktop
    <div
      className={` relative w-full h-screen text-[11px]
        ${
          isMobile ? "h-screen" : "pl-1"
        } flex  flex-col md:flex-row-reverse justify-between overflow-hidden ${
        showAllImages ? "disable-horizontal-scroll" : ""
      }`}
    >
      
      {/* Project Table Section */}
      <div className="w-full  md:w-2/3 ">
        <table className="w-full overflow-hidden  ">
          <thead>
            <tr
              style={isMobile ? { bottom: bottomValue } : {}}
              className={`flex ${
                isMobile
                  ? isDarkMode
                    ? "bg-black absolute leading-6 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-1  h-fit pt-1 z-50 w-full text-[14px] custom-bottom"
                    : "bg-white absolute leading-6 left-1/2 -translate-x-1/2 -translate-y-1/2  pb-1 h-fit pt-1  z-50 w-full text-[14px] custom-bottom"
                  : ""
              } font-normal justify-between items-center`}
            >
              <th
                className={`text-left font-normal ${
                  isMobile ? "" : "mr-16"
                } pb-1 flex-1 
                  
                ${theme ? "text-white/40" : "text-black/50"}`}
              >
                <button
                  className={` ${isMobile ? "hidden" : "visible"}`}
                  onClick={() => handleSort("name")}
                >
                  [Project]

                  {showAllImages ? " [Index]" : " [Gallery]"}

                </button>
                <button
                  className={` ${isMobile ? "visible" : "hidden"}`}
                  onClick={() => handleSort("year")}
                >
                  [Projects]
                </button>
              </th>

              <th
                className={`text-left  ${
                  isMobile ? "flex-1 font-medium " : "hidden"
                } font-normal pb-1  ${
                  theme ? "text-white/40" : "text-black/50"
                }`}
              >
                <button onClick={() => handleSort("name")}>
                  {showAllImages ? "[Index]" : "[Gallery]"}
                </button>
              </th>
              <th
                className={`text-left  ${
                  isMobile ? "flex-2" : "flex-1 "
                } font-normal pb-1 ${
                  theme ? "text-white/40" : "text-black/50"
                }`}
              >
                <button onClick={() => handleSort("typology")}>
                  [Typology]
                </button>
              </th>
              <th
                className={`text-left ${
                  isMobile ? "hidden flex-0" : "visible flex-1 "
                } font-normal pb-1  
                ${theme ? "text-white/40" : "text-black/50"}`}
              >
                <button onClick={() => handleSort("location")}>
                  [Location]
                </button>
              </th>
              <th
                className={`text-right ${
                  isMobile ? "hidden flex-0" : "visible flex-1"
                } font-normal ml-16 pb-1  ${
                  theme ? "text-white/40" : "text-black/50"
                }`}
              >
                <button onClick={() => handleSort("year")}>[Year]</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">
                <div
                  ref={tableGalleryRef}
                  className="overflow-y-auto overscroll-contain scroll-smooth"
                  style={{
                    maxHeight: `calc(100vh -  ${isMobile?"250px":"150px" })`,
                    scrollBehavior: "smooth",
                  }}
                  onScroll={handleScroll}
                  onWheel={handleWheel}
                >
                  <div
                    className={`block pb-10 ${
                      showAllImages
                        ? "overflow-x-auto overflow-y-auto"
                        : "overflow-x-hidden"
                    }`}
                  >
                    {!showAllImages ? (
                      sortedProjects.map((project) => (
                        <div
                          key={project.id}
                          className={`flex w-full  justify-between  cursor-pointer transition-colors 
                            ${
                              isDarkMode
                                ? "text-white/40 hover:text-white"
                                : "text-black/50 hover:text-black"
                            }

                          ${
                            !project.clickable
                              ? "opacity-100 cursor-default"
                              : ""
                          }`}
                          onMouseOver={() =>
                            handleMouseOver(
                              project.images[0],
                              project.name,
                              project.location,
                              project.year,
                              project.typology,
                              project.buildArea,
                              project.siteArea,
                              project.scope,
                              project.team
                            )
                          }
                          onClick={() => handleProjectClick(project)}
                          onMouseOut={handleMouseOut}
                        >
                          <div
                            className={`
                              ${isMobile ?"w-1/2 text-left" :"w-[29%]"}  flex-shrink-0 text-left  py-1 ${
                              theme
                                ? "border-t-[0.2px] border-zinc-700"
                                : "border-t-[0.2px] border-zinc-400"
                            }`}
                          >
                            {project.name}
                          </div>

                          <div
                            className={`${
                              isMobile ? " w-1/2 text-right " : "  w-[21%] "
                            } flex-shrink-0 text-left  py-1 ${
                              theme
                                ? "border-t-[0.2px] border-zinc-700"
                                : "border-t-[0.2px] border-zinc-400"
                            }`}
                          >
                            {project.typology}
                          </div>

                          <div
                            className={`${
                              isMobile ? " hidden" : "w-[38%] "
                            } flex-shrink-0  text-left truncate py-1  ${
                              theme
                                ? "border-t-[0.2px] border-zinc-700"
                                : "border-t-[0.2px] border-zinc-400"
                            }`}
                          >
                            {project.location}
                          </div>

                          <div
                            className={`${
                              isMobile ? "hidden" : " w-[12%]  whitespace-nowrap "
                            }  flex-shrink-0 text-right py-1 ${
                              theme
                                ? "border-t-[0.2px] border-zinc-700"
                                : "border-t-[0.2px] border-zinc-400"
                            }`}
                          >
                            {project.year}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 mt-[2px] gap-2">
                        {allImages.map((image, index) => (
                          <div key={index} className="flex flex-col">
                            <img
                              src={image.src ||  `${isDarkMode ? "/placeholder.jpg" : "/placeholder-white.jpg"}`}
                              alt={`${image.name} image`}
                              className={`aspect-[4/5] object-cover rounded-sm filter  ${
                                isMobile ? "none" : "grayscale"
                              } hover:opacity-85 transition-opacity cursor-pointer`}
                              onMouseOver={() =>
                                handleMouseOver(
                                  image.src,
                                  image.name,
                                  image.location,
                                  image.year,
                                  image.typology,
                                  image.buildArea,
                                  image.siteArea,
                                  image.scope,
                                  image.team
                                )
                              }
                              onClick={() => {
                                const project = projectsData.find(
                                  (p) => p.name === image.name
                                );
                                if (project?.clickable) {
                                  handleProjectClick(project);
                                }
                              }}
                              onMouseOut={handleMouseOut}
                              onError={(e) => {
                                e.currentTarget.src = isDarkMode ? "/placeholder.jpg" : "/placeholderw.png";
                                e.currentTarget.alt = "Image not found";
                              }}
                            />

                            <div
                              className={`w-full mt-3 flex justify-between text-[9px]  pb-[0.2px] ${
                                theme ? "text-white/40" : "text-black/40"
                              }`}
                            >
                              {isMobile ? (
                                <>
                                  <div className="border-b-[0.2px]  border-zinc-700 w-full flex justify-between items-center">
                                    <p className="text-left mb-[2px] w-fit whitespace-nowrap">
                                      {image.name}
                                    </p>
                                    <p className="text-right mb-[2px] w-fit text-wrap">
                                      {image.year}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p className="text-left w-fit whitespace-nowrap">
                                    {image.name}
                                    <br />
                                    {image.typology}
                                  </p>
                                  <p className="text-right w-fit text-wrap">
                                    {image.location.split(/\d/).length > 1
                                      ? image.location.split(/\d/)[0].trim()
                                      : image.location}
                                    <br />
                                    {image.year}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detail Panel Section */}
      <div
        className={`part2 ${
          isMobile ? "hidden" : ""
        } h-auto md:h-screen w-full md:w-[32%] ml-0 md:ml-1 text-[11px]
        } ${
          theme ? "text-white/40" : "text-black/50"
        } shrink-0 mt-5 md:mt-0 pt-6 flex flex-col justify-between overflow-hidden`}
      >
        <div className="img-prev-container  min-h-[64%] max-h-[64%] -mb-10  shrink-0 w-full rounded-[4px] overflow-hidden">
          <img
            className="h-full w-full object-cover object-center shrink-0 overflow-y-clip"
            src={hoveredImage ? hoveredImage.src :  `${isDarkMode ? "/placeholder.jpg" : "/placeholder-white.jpg"}`}
            alt={hoveredImage ? hoveredImage.name :  `${isDarkMode ? "/placeholder.jpg" : "/placeholder-white.jpg"}`}
            srcSet={hoveredImage ? hoveredImage.srcSet :  `${isDarkMode ? "/placeholder.jpg" : "/placeholder-white.jpg"}`}
          />
        </div>

        <div className="img-text w-full mt-12 mb-1.5  flex flex-col md:flex-row justify-between items-end text-end leading-4">
          <div className="w-full md:w-[40%]  flex-col items-start h-full text-left whitespace-nowrap">
            <p>{hoveredImage ? hoveredImage.name : ""}</p>

            <p>
              {hoveredImage
                ? hoveredImage.location.split(/\d/).length > 1
                  ? hoveredImage.location.split(/\d/)[0].trim().replace(/[+,#,$]/g, '') 
                  : hoveredImage.location 
               : ""}
            </p>

            {hoveredImage ? (
              hoveredImage.typology === "Product" ||
              hoveredImage.typology === "Research" ? (
                <p></p>
              ) : (
                hoveredImage.name === "T- Office" ||
                hoveredImage.name === "TOVO" ||
                hoveredImage.name === "Smart Living" ||
                hoveredImage.name === "Cabin House" ? (
                  <p>
                    Site Area :{" "}
                    {hoveredImage && hoveredImage.siteArea !== null
                      ? hoveredImage.siteArea
                      : " "}{" "}
                    
                  </p>
                ) : (
                  <p>
                    Built up Area :{" "}
                    {hoveredImage && hoveredImage.buildArea !== null
                      ? hoveredImage.buildArea
                      : " "}{" "}
                  </p>
                )
              )
            ) : null}
          </div>

          {hoveredImage && hoveredImage.typology !== "Product" && hoveredImage.typology !== "Research" && 
          hoveredImage.name !== "T- Office" &&
          hoveredImage.name !== "TOVO" &&
          hoveredImage.name !== "Smart Living" &&
          hoveredImage.name !== "Cabin House" 
          
          ? (
            <p className="w-full md:w-fit text-center whitespace-nowrap text-nowrap tracking-tight md:my-0">
              Site Area :
              {hoveredImage.siteArea !== null
                ? hoveredImage.siteArea
                : " "}
            </p>
          ) : null}

          <div className="w-full md:w-[40%] text-right flex-col items-start whitespace-nowrap">
            <p>{hoveredImage ? hoveredImage.typology : ""}</p>
            <p>{hoveredImage ? hoveredImage.year : ""}</p>

            {hoveredImage ? (
              hoveredImage.typology === "Product" ||
              hoveredImage.typology === "Research" ? (
                <p></p>
              ) : (
                <p>{hoveredImage ? hoveredImage.scope : ""}</p>
              )
            ) : null}
          </div>
        </div>

        <div className="team mb-20 md:mb-80 mt-[1px] flex w-full items-start">
          {hoveredImage ? (
            hoveredImage.typology === "Product" ||
            hoveredImage.typology === "Research " ||
            hoveredImage.team === "" ? (
              <p></p>
            ) : (
              <p
                className={` text-[11px]
            } text-left `}
              >
                Team : {hoveredImage ? hoveredImage.team : ""}
              </p>
            )
          ) : null}
        </div>
      </div>






    </div>
  );
};

export default ProjectTable;
