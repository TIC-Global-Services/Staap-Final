import { useContext, useEffect, useRef, useState } from "react";
import { Navbar, BottomNav } from "./Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import { ThemeContext } from "../utils/themeContext";
import { projectsData } from "../utils/projectsData";

//panche images

import pan1 from "../assets/Projects and Replacements/Panache/pan1.png";
import pan2 from "../assets/Projects and Replacements/Panache/pan2.mp4";
import pan3 from "../assets/Projects and Replacements/Panache/pan3.png";
import pan4 from "../assets/Projects and Replacements/Panache/pan4.png";
import pan5 from "../assets/Projects and Replacements/Panache/pan5.png";
import pan6 from "../assets/Projects and Replacements/Panache/pan6.png";
import pan7 from "../assets/Projects and Replacements/Panache/pan7.png";
import pan8 from "../assets/Projects and Replacements/Panache/pan8.png";
import pan9 from "../assets/Projects and Replacements/Panache/pan9.png";
import pan10 from "../assets/Projects and Replacements/Panache/pan10.png";

import SmartLiving2 from "./SmartLiving2";
import SmartLiving3 from "./SmartLiving3";
import SmartLiving4 from "./SmartLiving4";
import SmartLiving5 from "./SmartLiving5";

const FOLD = () => {
  const containerRef = useRef(null);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const mobileContainerRef = useRef(null);
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      // setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Find project data from the projectsData array
  const project =
    projectsData.find((p) => p.id === projectId) || location.state?.project;

  // If no project is found, redirect to work section
  if (!project) {
    navigate("/?section=work");
    return null;
  }

  // Get related projects based on typology mapping
  const getRelatedProjects = () => {
    const typologyMap = {
      Workspace: "Commercial",
      Commercial: "Workspace",
      "Pre-fab": "Product",
      Product: "Pre-fab",
      Industrial: "Experience",
      Experience: "Industrial",
      Retail: "Industrial",
    };

    // Get matching typology for current project
    const matchingTypology = typologyMap[project.typology];

    // Filter projects with matching typology
    let related = projectsData
      .filter((p) => p.id !== project.id)
      .filter(
        (p) =>
          p.typology === matchingTypology || p.typology === project.typology
      );

    // If not enough matches, add other projects
    if (related.length < 3) {
      const otherProjects = projectsData
        .filter((p) => p.id !== project.id)
        .filter((p) => !related.some((r) => r.id === p.id));

      related = [...related, ...otherProjects];
    }

    return related.slice(0, 3);
  };

  const relatedProjects = getRelatedProjects();

  const handleBack = () => {
    // Navigate to home with work section and set state to prevent loader animation
    navigate("/?section=work", {
      state: {
        fromProject: true,
        skipAnimation: true,
      },
    });
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

  // console.log(project.bgColor);

  // animation to top
  const projectPageRef = useRef(null);
  const projectPageRef2 = useRef(null);

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
  }, [projectPageRef, relatedProjects, location.state]);

  useEffect(() => {
    if (location.state?.skipAnimation) return;

    const projectmobPageElement = projectPageRef2.current;
    if (projectmobPageElement) {
      gsap.from(projectmobPageElement, {
        y: "62%",
        duration: 1.3,
        ease: "power1.in",
      });
    }
  }, [projectPageRef2, relatedProjects, location.state]);

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
    <>
      {/* Fixed Navbar remains unchanged */}

      {/* <div className="fixed top-0  left-0 w-full z-[999]">
        <Navbar bgColor={project.navColor} />
      </div> */}

      {/* Desktop version */}
      <div
        className={`smartliving-desk ${
          isMobile ? "hidden" : "visible"
        } w-full  pb-4  px-3  `}
        ref={containerRef}
      >
        {/* landing page  fold */}

        <div
          ref={projectPageRef}
          className="w-full flex-col justify-between  overflow-hidden"
        >

          <div className="flex flex-col ml-[50%] w-1/2 justify-start items-end">
            <div className="smartcontainer w-[55%]  aspect-[4/5] mt-4 rounded-sm overflow-hidden">
              {project.length > 0 &&
              project.ProjectAssets[0].endsWith(".mp4") ? (
                <video
                  className="w-full h-full object-fit rounded-md object-center"
                  src={project.ProjectAssets[0]}
                  muted
                  autoPlay
                  loop
                  playsInline 
                ></video>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-sm object-bottom"
                  src={project.ProjectAssets[0] || "/placeholder.svg"}
                  alt=""
                  srcset={project.ProjectAssets[0]}
                />
              )}
            </div>

            <div className="w-[55%]  mt-4  font-medium h-full text-left">
              <div
                className={`img-text w-full   ${
                  project.name === "R320" || project.name === "TOVO"
                    ? " text-white"
                    : "text-zinc-400"
                }  items-end flex flex-col justify-start text-[11px] leading-none`}
              >
                <div className="h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} 
                  </h5>
                  <h5 className="whitespace-nowrap  text-right ">
                    Site area: {project.siteArea} 
                  </h5>
                </div>

                <div className=" h-1/2 w-full flex justify-between items-center">
                  <h6 className="text-left mt-4 ">
                    Team : <br />
                    {project.team}
                  </h6>

                  <h5 className="text-right ">{project.scope}</h5>
                </div>
              </div>
            </div>

            <h6
              className={`text-[11px]  ${
                project.name === "R320" || project.name === "TOVO"
                  ? " text-white"
                  : "text-zinc-400"
              }  whitespace-pre-wrap  w-[55%]  text-center md:text-right leading-tight mt-6 pb-3 `}
            >
              {project.desc}
            </h6>
          </div>
        </div>

        {/* page 1*/}
        <div
          className={`smartliving w-full h-screen   mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md  px-3`}
        >

          <div className=" h-full flex justify-end w-full">

            <div className="  h-full w-2/5 mr-6 flex justify-center items-center ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
                project.ProjectAssets[1].type === "video/mp4" ? (
                  <video
                    className="w-fit h-3/4  object-cover rounded-md object-center"
                    src={project.ProjectAssets[1]}
                    muted
                    autoPlay
                    loop
                    playsInline 
                  />
                ) : project.ProjectAssets[1].endsWith(".gif") ? (
                  <img
                    className="w-fit h-3/4 object-contain rounded-md object-center"
                    src={project.ProjectAssets[1]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-contain  rounded-sm object-center"
                    src={project.ProjectAssets[1] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[1]}
                  />
                )
              ) : null}
            </div>

            <div className="text h-full w-2/5  flex justify-end items-center  ">
              <p className=" text-[11px]  w-4/5 text-zinc-400 text-right  leading-none  ">
                A Linear proportion site, three volume has been introduced to
                achieve the floor area. Cantiliver Projection of the volumehas
                been introduced to emphasize the linearity. The play of lines
                and angles create an illustration towards the facade. The lines
                and angles in the facade creates a dynamic perspective to the
                form.
              </p>
            </div>
          </div>
        </div>

        {/* {page 2} */}

        <div
          className={`smartliving w-full mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
              project.ProjectAssets[2].type === "video/mp4" ? (
                <video
                  className="w-full  object-cover rounded-md object-center"
                  src={project.ProjectAssets[2]}
                  muted
                  autoPlay
                  loop
                />
              ) : project.ProjectAssets[2].endsWith(".gif") ? (
                <img
                  className="w-full  object-cover rounded-md object-center"
                  src={project.ProjectAssets[2]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full object-cover rounded-sm object-center"
                  src={project.ProjectAssets[2] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[2]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 3*/}
        <div
          className={`smartliving w-full h-screen  mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md  `}
        >
          <div className=" h-full flex justify-center  items-center w-full ">
            <div className=" h-3/5 w-full flex ml-[19%] justify-start items-center ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                project.ProjectAssets[1].type === "video/mp4" ? (
                  <video
                    className="w-fit h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    loop
                    playsInline 
                  />
                ) : project.ProjectAssets[3].endsWith(".gif") ? (
                  <img
                    className="w-fit h-full object-contain rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-full object-fill rounded-sm object-center"
                    src={project.ProjectAssets[3] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[3]}
                  />
                )
              ) : null}
            </div>

            {/* <div className="text h-full w-2/5 pt-96 flex flex-col justify-center items-end   ">
              <h5 className=" text-[13px]">FOYER I LIVING </h5>

              <p className=" text-[11px] text-right  ">
                Designed with Comforting materials in a natural tone of wood and{" "}
                <br />
                stone, Highlighted with brass inlay and antiquities.
              </p>
            </div> */}

          </div>
        </div>

        {/* {page 4} */}
        {/* <div
          className={`smartliving w-full mt-${
            isMobile ? "4" : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
              project.ProjectAssets[4].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  muted
                  autoPlay
                  loop
                />
              ) : project.ProjectAssets[4].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[4] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[4]}
                />
              )
            ) : null}
          </div>
        </div> */}

        {/* <BottomNav /> */}
      </div>

      {/* Mobile version version */}

      <div
        // style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className={`px-3  ${isMobile ?"visible":"hidden"}`}

      >
        <div className=" relative  w-full  flex-col justify-between ">
          {/* landing page mob product*/}

          <div
            ref={projectPageRef2}
            className=" flex top-32 flex-col w-full  justify-start items-end"
          >
            <div className="smartcontainer  w-[68%]  aspect-[4/5]  mt-2 rounded-sm  overflow-hidden  ">
              {project.ProjectAssets.length > 0 &&
              project.ProjectAssets[0].endsWith(".mp4") ? (
                <video
                  className="w-full h-full object-fit rounded-md object-center"
                  src={project.ProjectAssets[0]}
                  muted
                  autoPlay
                  loop
                  playsInline 
                ></video>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-sm object-bottom"
                  src={project.ProjectAssets[0] || "/placeholder.svg"}
                  alt=""
                  srcset={project.ProjectAssets[0]}
                />
              )}
            </div>

            <div className="w-[68%] mt-2  font-medium h-full text-left">
              <div
                className={`img-text w-full  ${
                  project.name === "R320"
                    ? " text-white hover:text-black "
                    : project.name === "TOVO" ||
                      project.name === "Panache" ||
                      project.name === "FOLD"
                    ? " text-zinc-400 hover:text-black "
                    : "text-zinc-400 hover:text-white"
                }  items-end flex flex-col justify-start text-[11px] leading-none`}
              >
                <div className="  h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} 
                  </h5>

                  <h5 className="whitespace-nowrap  text-right ">
                    Site area: {project.siteArea} 
                  </h5>
                </div>

                <div className=" h-1/2 w-full flex-col justify-between items-center">
                  <h5 className="text-left mt-1 ">{project.scope}</h5>

                  <h5 className="text-left mt-4 ">
                    Team : <br />
                    {project.team}
                  </h5>
                </div>

                <h6
                  className={`text-[11px]  ${
                    project.name === "R320"
                      ? " text-white hover:text-black "
                      : project.name === "TOVO" ||
                        project.name === "Panache" ||
                        project.name === "FOLD"
                      ? " text-zinc-400 hover:text-black "
                      : "text-zinc-400 hover:text-white"
                  }  whitespace-pre-wrap  w-full  text-left md:text-right leading-tight mt-5 `}
                >
                  {project.desc}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* page 1*/}
        <div
          className={`smartliving w-full  ${isMobile ? "mt-12 " : "mt-6"} 
          overflow-hidden rounded-md  px-3`}
        >
          <div
            className={`h-full  ${isMobile ? " flex-col": "flex" } justify-center w-full`}
          >
            <div className={`h-full  ${isMobile ? " w-full px-5": "w-2/5" }  flex justify-center items-center`}   >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
                project.ProjectAssets[1].type === "video/mp4" ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[1]}
                    muted
                    autoPlay
                    loop
                    playsInline 
                  />
                ) : project.ProjectAssets[1].endsWith(".gif") ? (
                  <img
                    className="w-fit h-3/4 object-contain rounded-md object-center"
                    src={project.ProjectAssets[1]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-contain  rounded-sm object-center"
                    src={project.ProjectAssets[1] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[1]}
                  />
                )
              ) : null}
            </div>

            <div className={`h-full  ${isMobile ? " w-full  mt-4 ": "w-2/5 " } flex justify-center  items-end`}>
              <p className={`text-[11px]   ${isMobile?" w-full ":"w-4/5"} text-zinc-400 text-right leading-none  `}>
                A Linear proportion site, three volume has been introduced to
                achieve the floor area. Cantiliver Projection of the volumehas
                been introduced to emphasize the linearity. The play of lines
                and angles create an illustration towards the facade. The lines
                and angles in the facade creates a dynamic perspective to the
                form.
              </p>
            </div>
          </div>
        </div>

        {/* {page 2} */}

        <div
          className={`smartliving w-full  
            ${isMobile ? "mt-4 h-[30vh] " : "mt-8 h-screen "} overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
              project.ProjectAssets[2].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[2]}
                  muted
                  autoPlay
                  loop
                />
              ) : project.ProjectAssets[2].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[2]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[2] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[2]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 3*/}
        <div
          className={`smartliving w-full
            ${
            isMobile ? "mt-4 h-[70vh] " : "mt-6 h-screen px-3"
          } overflow-hidden rounded-md `}
        >
          <div className=" h-full flex justify-start items-center w-full ">
            <div className={` ${isMobile? "h-4/5 w-7/12":"h-3/5 w-2/5"}  flex justify-center items-center `}>
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                project.ProjectAssets[1].type === "video/mp4" ? (
                  <video
                    className="w-fit h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    loop
                    playsInline 
                  />
                ) : project.ProjectAssets[3].endsWith(".gif") ? (
                  <img
                    className="w-fit h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-full object-fill rounded-sm object-center"
                    src={project.ProjectAssets[3] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[3]}
                  />
                )
              ) : null}
            </div>

            {/* <div className="text h-full w-2/5 pt-96 flex flex-col justify-center items-end   ">
              <h5 className=" text-[13px]">FOYER I LIVING </h5>

              <p className=" text-[11px] text-right  ">
                Designed with Comforting materials in a natural tone of wood and{" "}
                <br />
                stone, Highlighted with brass inlay and antiquities.
              </p>
            </div>
             */}
          </div>
        </div>

        {/* {page 4} */}
        {/* <div
          className={`smartliving w-full mt-${
            isMobile ? "4" : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
              project.ProjectAssets[4].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  muted
                  autoPlay
                  loop
                />
              ) : project.ProjectAssets[4].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[4] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[4]}
                />
              )
            ) : null}
          </div>
        </div> */}

        {/* related works table */}
      </div>
    </>
  );
};

export default FOLD;
