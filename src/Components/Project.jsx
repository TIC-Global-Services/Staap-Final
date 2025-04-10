import { useContext, useEffect, useRef, useState } from "react"
import { Navbar, BottomNav } from "./Navbar"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import gsap from "gsap"

import { ThemeContext } from "../utils/themeContext"
import { projectsData } from "../utils/projectsData"

// import smlvideo from "../assets/smartLiving/black and white 1st video.mp4"

import SmartLiving2 from "./SmartLiving2"
import SmartLiving3 from "./SmartLiving3"
import SmartLiving4 from "./SmartLiving4"
import SmartLiving5 from "./SmartLiving5"
import Panache from "./Panache"
import SmartLiving from "./SmartLiving"
import FOLD from "./FOLD"
import TOVO from "./TOVO"
import R320 from "./R320"
import MADEIN from "./MADEIN"

const Project = () => {

  const containerRef = useRef(null)

  const { projectId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode } = useContext(ThemeContext)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const mobileContainerRef = useRef(null)
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      // setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find project data from the projectsData array
  const project = projectsData.find((p) => p.id === projectId) || location.state?.project

  // If no project is found, redirect to work section
  if (!project) {
    navigate("/?section=work")
    return null
  }

  // Get related projects based on typology mapping
  const getRelatedProjects = () => {
    const typologyMap = {
      'Workspace': 'Commercial',
      'Commercial': 'Workspace',
      'Pre-fab': 'Product',
      'Product': 'Pre-fab',
      'Industrial': 'Experience',
      'Experience': 'Industrial',
      'Retail': 'Industrial'
    }

    // Get matching typology for current project
    const matchingTypology = typologyMap[project.typology]

    // Filter projects with matching typology
    let related = projectsData
      .filter(p => p.id !== project.id)
      .filter(p => p.typology === matchingTypology || p.typology === project.typology)

    // If not enough matches, add other projects
    if (related.length < 3) {
      const otherProjects = projectsData
        .filter(p => p.id !== project.id)
        .filter(p => !related.some(r => r.id === p.id))

      related = [...related, ...otherProjects]
    }

    return related.slice(0, 3)
  }

  const relatedProjects = getRelatedProjects()

  const handleBack = () => {
    // Navigate to home with work section and set state to prevent loader animation
    navigate("/?section=work", {
      state: {
        fromProject: true,
        skipAnimation: true,
      },
    })
  }

  useEffect(() => {
    // If project is undefined after a refresh, try to get it from the URL
    if (!project && projectId) {
      const refreshedProject = projectsData.find((p) => p.id === projectId)
      if (refreshedProject) {
        // Force a re-render with the found project
        navigate(`/project/${projectId}`, {
          state: { project: refreshedProject },
          replace: true,
        })
      } else {
        // If still can't find the project, go to work page
        navigate("/?section=work")
      }
    }
  }, [projectId, navigate, project]) // Added project to dependencies

  // Scroll to top when projectId changes, adjusted for mobile container
  useEffect(() => {
    if (isMobile && mobileContainerRef.current) {
      mobileContainerRef.current.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [projectId, isMobile])

  // console.log(project.bgColor);

  // animation to top
  const projectPageRef = useRef(null);
  const projectPageRef2 = useRef(null);

  useEffect(() => {
    if (location.state?.skipAnimation) return

    const projectPageElement = projectPageRef.current
    if (projectPageElement) {
      gsap.from(projectPageElement, {
        y: "54%",
        duration: 1,
        ease: "power1.in",
      })
    }
  }, [projectPageRef, relatedProjects, location.state])

  useEffect(() => {
    if (location.state?.skipAnimation) return

    const projectmobPageElement = projectPageRef2.current
    if (projectmobPageElement) {
      gsap.from(projectmobPageElement, {
        y: "62%",
        duration: 1.3,
        ease: "power1.in",
      })
    }
  }, [projectPageRef2, relatedProjects, location.state])


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

  const getBorderClass = (name) => {
    if (name === "R320") return "border-t-[0.2px] border-zinc-100";
    if (["TOVO", "Panache", "FOLD"].includes(name)) return "border-t-[0.2px] border-zinc-700";
    return "";
  };

  const getTextColorClass = (name) => {
    if (name === "R320") return "text-white/60 hover:text-white";
    if (["TOVO", "Panache", "FOLD"].includes(name)) return "text-zinc-400 hover:text-black";
    return "text-zinc-400 hover:text-white";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    let startY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      container.scrollTop += deltaY;
      startY = currentY;
      // Do NOT call e.preventDefault() here to allow mouse wheel scrolling
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    // Add passive: true to avoid blocking native behavior unnecessarily
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Ensure mouse wheel scrolling works by not overriding native behavior
    const handleWheel = (e) => {
      // Let the browser handle wheel events naturally
      container.scrollTop += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile]);


  return (
    <>
      {/* Fixed Navbar remains unchanged */}
      <div className="fixed top-0  left-0 w-full z-[999]">
        <Navbar bgColor={project.bgColor} />
      </div>

      {/* Desktop version */}
      <div
        style={{ backgroundColor: project.bgColor }}
        className={`${isMobile ? "hidden" : "block"} w-full pt-24 pb-4 mt-3 overflow-y-auto h-dvh`}
        ref={containerRef}
      >
        <div className="w-full flex justify-end items-center   px-3  ">

          <div
            style={{ backgroundColor: project.bgColor }}
            className={` fixed left-3  w-[55.3%] z-[777] `}
          >
            {/* empty space */}
            <h5 onClick={() => handleBack()} className={` text-[11px] ${project.name === "R320" ? " text-white" : "text-zinc-400"} cursor-pointer py-2  `}>
              [Back]
            </h5>
          </div>

          <div
            style={{ backgroundColor: project.bgColor }}
            className={`part2  ${project.name === "R320" ? " text-white" : "text-zinc-400"}  fixed w-[53.7%] py-2 z-[777]  `}>
            <div className="flex  justify-between ">
              {/* Spacer: visible only on desktop */}
              <div className={` text-[11px] w-full flex justify-between items-center z-40  `}>
                <div className="flex items-center ml-[7px]  ">
                  <h6 className="w-52">{project.name}</h6>
                  <h6 className={` `}>{project.scope}</h6>
                </div>

                <div className="flex w-[50.3%] justify-between ">
                  <h6 className={``}>{project.location}</h6>
                  <h6 className=" ">{project.year}</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Info Column */}

        </div>

        {/* {project.name !== "TOVO" ? (                   
        <div ref={projectPageRef} className="w-full flex-col justify-between p-3 overflow-hidden">

          <div className="flex flex-col ml-[50%] w-1/2 justify-start items-end">
            <div className="smartcontainer w-[55%]  aspect-[4/5] mt-4 rounded-sm overflow-hidden">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[0].endsWith('.mp4') ? (
                <video
                  className="w-full h-full object-fit rounded-md object-center"
                  src={project.ProjectAssets[0]}
                  muted
                  autoPlay
                  loop
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
              <div className={`img-text w-full   ${project.name === "R320" ||project.name ==="TOVO" ? " text-white" :"text-zinc-400"}  items-end flex flex-col justify-start text-[11px] leading-none`}>
                <div className="h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} Sq.ft
                  </h5>
                  <h5 className="whitespace-nowrap  text-right ">Site area: {project.siteArea} Sq.ft</h5>
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
              className={`text-[11px]  ${project.name === "R320" || project.name ==="TOVO" ? " text-white" :"text-zinc-400"}  whitespace-pre-wrap  w-[55%]  text-center md:text-right leading-tight mt-6 pb-3 `}
            >
              {project.desc}
            </h6>
          </div>
        </div>
      ) : ""
      } */}


        {/* //pages others page starts from 2  */}

        {project ? (
          project.name === "Panache" ? (
            <> <Panache project={project} /> </>
          ) : project.name === "TOVO" ? (
            <> <TOVO project={project} /> </>
          ) : project.name === "MADE IN" ? (
            <> <MADEIN project={project} /> </>
          ) : project.name === "FOLD" ? (
            <> <FOLD /> </>
          ) : project.name === "Smart Living" ? (
            <> <SmartLiving /> </>
          ) : project.name === "R320" ? (
            <><R320 /></>
          ) : null
        ) : null}




        {/* related works table */}

        <div className=" w-screen mt-12 h-fit pl-3  ">
          <div className={`realted_work_section  h-fit w-full pt-2 pb-4 border-b-[0.2px]  border-t-[0.2px] ${getBorderClass(project.name)}`}>
            <div className={`text-[11px]  h-full  w-full font-medium flex justify-between  `}>
              {/* Left Column: Title and Image container */}
              <div className="w-[18%]  text-left relative">
                <div className="text-[11px] capitalize w-full">
                  <h5 className={`
                    ${project.name === "R320" ? " text-white " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? "text-black " : "text-white"}`}>Related Works</h5>
                </div>
              </div>

              {/* Right Column: Year and list of publication links */}
              <div
                className={` w-[53.8%] ml-1   ${isMobile ? "mr-0" : "mr-3"
                  } h-full flex-col justify-center items-start  text-[11px] ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}  
                ${isMobile ? "text-right" : "text-left"
                  }  `}
              >
                <table className="w-full  overflow-hidden">
                  <tbody>
                    <tr>
                      <td colSpan="4">
                        <div>
                          <div>
                            {relatedProjects.length > 0 ? (
                              relatedProjects.map((relatedProject, index) => (
                                <div
                                  key={relatedProject.id}
                                  className={`flex w-full justify-between
    ${index !== 0 ? getBorderClass(project.name) : ""}
    ${getTextColorClass(project.name)}
  `}
                                  onClick={() => {
                                    const allowedNames = ["R320", "MADE IN", "TOVO", "FOLD", "Panache", "Smart Living"];
                                    if (allowedNames.includes(relatedProject.name)) {
                                      navigate(`/project/${relatedProject.id}`, {
                                        state: { project: relatedProject },
                                      });
                                    }
                                  }}
                                  style={{
                                    cursor: relatedProject.clickable ? "pointer" : "default",
                                  }}
                                >
                                  <div className="flex-1 flex-shrink-0 text-left pr-10 py-1">
                                    {relatedProject.name}
                                  </div>
                                  <div className="flex-1 flex-shrink-0 text-left -ml-1 py-1">
                                    {relatedProject.scope}
                                  </div>
                                  <div className="flex-1 flex-shrink-0 text-left truncate ml-1 py-1">
                                    {relatedProject.location}
                                  </div>
                                  <div className="flex-1 flex-shrink-0 text-right pl-12 py-1">
                                    {relatedProject.year}
                                  </div>
                                </div>

                              ))
                            ) : (
                              <div className="flex w-full justify-between">
                                <div className="flex-1 flex-shrink-0 text-left  pr-12 py-1">
                                  No related projects found
                                </div>
                                <div className="flex-1 flex-shrink-0 text-left py-1"></div>
                                <div className="flex-1 flex-shrink-0 text-left break-all py-1"></div>
                                <div className="flex-1 flex-shrink-0 text-right pl-14 py-1"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/*project Details footer  */}
        <div className="footer h-full w-full  pt-6 pb-16 pl-3 ">
          <div className=" text-[11px] h-full w-full  font-medium flex items-start  justify-between  text-left  ">
            <div className="flex flex-col gap-1 ">
              <h5 className={` ${project.name === "R320" ? " text-white " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? "text-black " : "text-white"} text-[18px]  leading-6 `}>
                We're excited to hear what you've been imagining.
                <br />
                Let's bring your vision to life. Reach out to us at
                <br />
                <button>
                  <a className={``} href="" target="_blank" rel="noreferrer">
                    write@staap
                  </a>
                </button>
                .
              </h5>

              <a href="tel:+91-9994192333" className={`mt-1 text-[15px] ${project.name === "R320" ? "text-white" : "text-zinc-400"} `}>+91-9994192333</a>
            </div>

            <div className={`w-[55%] h-fit  flex  items-start text-[11px]  ${project.name === "R320" ? " text-white" : "text-zinc-400"} font-medium  text-left  pr-2 `}>
              <div className="row1 flex-col  justify-start items-start  w-1/2 ">
                <div className="w-3/4 h-full ml-2 text-left   ">
                  <div className="flex flex-col  items-start  ">
                    <p className="capitalize">Follow us on</p>
                    <button>
                      <a
                        className={` capitalize  pt-1 ${project.name === "R320" ? " text-white " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? "text-zinc-400 " : "text-zinc-400"} `}
                        href="https://www.instagram.com/staap.in"
                        target="_blank"
                        rel="noreferrer"
                      >
                        [Instagram]
                      </a>
                    </button>
                  </div>

                  <div className={` flex flex-col  ${project.name === "R320" ? " text-white" : "text-zinc-400"} items-start mt-2  `}>
                    <p className=" capitalize">Add us on</p>
                    <button>
                      <a
                        className={` capitalize  pt-1${project.name === "R320" ? " text-white " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? "text-zinc-400" : "text-zinc-400"}  `}
                        href="https://in.linkedin.com/company/staapin"
                        target="_blank"
                        rel="noreferrer"
                      >
                        [LinkedIn]
                      </a>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row2 flex justify-between w-1/2  ">
                <div className={`w-[60%] h-full  text-[11px]  ${project.name === "R320" ? " text-white" : "text-zinc-400 "}  text-left `}>
                  <p className="text-[12px]">Thank you</p>

                  <p className="mt-1 leading-3 ">
                    Architecture is a vast, ever-evolving land scape of ideas, spaces, and experiences. Thanks for
                    exploring our little corner of design and creativity.
                  </p>
                </div>

                <div className={`w-fit flex flex-col pr-1  items-end text-[12px] ${project.name === "R320" ? " text-white" : "text-zinc-400"}  text-right`}>
                  <p className="">
                    Copyright <br />® 2021-2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>



      {/* Mobile version version */}

      <div
        // style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className={` ${isMobile ? "visible" : "hidden"} w-full pt-20 overflow-y-auto  pb-20  max-h-screen touch-pan-y`}
        style={{
          WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS 
          overscrollBehavior: 'contain', // Prevent scroll chain to parent
          backgroundColor: project.bgColor
        }}
      >
        <div className=" relative  w-full  flex-col justify-between p-3 ">
          <div className="flex justify-end items-center -mt-1 ">


            <div
              style={{ backgroundColor: project.bgColor }}
              className={`pro-dets fixed  w-full z-[777]  `}>

              {/* Spacer: visible only on desktop */}
              <div className={`text-[11px] ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}   py-1 w-full flex justify-between items-center z-[777]  `}>
                <h6 className="ml-6">{project.name}</h6>
                {/* <h6 className=" ml-1">{project.scope}</h6> */}
                {/* <h6 className="">{project.location}</h6> */}
                <h6 className=" ">{project.year}</h6>
              </div>
            </div>

            {/* Info Column */}
          </div>


          {/* {project.name!== "TOVO" ? (
            <div ref={projectPageRef2}  className=" flex top-32 flex-col w-full  justify-start items-end">
            <div className="smartcontainer  w-[68%]  aspect-[4/5]  mt-4 rounded-sm  overflow-hidden  ">
            
            {project.ProjectAssets.length > 0 && project.ProjectAssets[0].endsWith('.mp4') ? (
                <video
                  className="w-full h-full object-fit rounded-md object-center"
                  src={project.ProjectAssets[0]}
                  muted
                  autoPlay
                  loop
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
              <div className={`img-text w-full  ${project.name === "R320"  ? " text-white hover:text-black ": project.name === "TOVO" || project.name === "Panache" ||project.name === "FOLD" ? " text-zinc-400 hover:text-black ":"text-zinc-400 hover:text-white"}  items-end flex flex-col justify-start text-[11px] leading-none`}>
                <div className="  h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} Sq.ft
                  </h5>
                   
                   

                  <h5 className="whitespace-nowrap  text-right ">Site area: {project.siteArea} Sq.ft</h5>
                </div>
       
                <div className=" h-1/2 w-full flex-col justify-between items-center">
                  
                <h5 className="text-left mt-1 ">{project.scope}</h5>
                 
                  <h5 className="text-left mt-4 ">
                    Team : <br />
                    {project.team}
                  </h5>            
                </div>

                <h6
              className={`text-[11px]  ${project.name === "R320"  ? " text-white hover:text-black ": project.name === "TOVO" || project.name === "Panache" ||project.name === "FOLD" ? " text-zinc-400 hover:text-black ":"text-zinc-400 hover:text-white"}  whitespace-pre-wrap  w-full  text-left md:text-right leading-tight mt-5 `}
            >
              {project.desc}
            </h6>
              </div>
            </div>

            
          </div>
          
          ):" " } */}

        </div>

        {project ? (
          project.name === "Panache" ? (
            <> <Panache project={project} /> </>
          ) : project.name === "TOVO" ? (
            <> <TOVO project={project} /> </>
          ) : project.name === "MADE IN" ? (
            <><MADEIN /></>
          ) : project.name === "FOLD" ? (
            <> <FOLD /> </>
          ) : project.name === "R320" ? (
            <><R320 /></>
          ) : project.name === "Smart Living" ? (
            <><SmartLiving /></>

          ) : null
        ) : null}

        {/* related works table */}

        <div className=" w-screen mt-24 h-fit  pl-3 pr-3  ">
          <div className="realted_work_section  h-fit w-full pt-1 pb-4 border-b-[0.2px]  border-t-[0.2px] ">
            <div className="text-[11px] h-full  w-full font-medium flex-col justify-between ">
              {/* Left Column: Title and Image container */}
              <div className="w-full  text-left relative">
                <h5 className={`text-[12px] ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}  capitalize w-full`}>Related Works</h5>
              </div>

              {/* Right Column: Year and list of publication links */}
              <div
                className={` w-full h-full flex-col justify-center items-start  text-[11px] ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}
                  ${isMobile ? "text-right" : "text-left"
                  }  `}
              >
                <table className="w-full  overflow-hidden">
                  <tbody>
                    <tr>
                      <td colSpan="4">
                        <div>
                          <div>
                            {relatedProjects.length > 0 ? (
                              relatedProjects.map((relatedProject, index) => (
                                <div
                                  key={relatedProject.id}
                                  className={`flex w-full  justify-between ${index !== 0 ? "border-t-[0.2px] border-zinc-700" : ""
                                    } 
                                  ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}

                                  `}
                                  onClick={() => {
                                    if (relatedProject.name === "R320" ||
                                      relatedProject.name === "MADE IN" ||
                                      relatedProject.name === "TOVO" ||
                                      relatedProject.name === "FOLD" ||
                                      relatedProject.name === "Panache" ||
                                      relatedProject.name === "Smart Living") {
                                      navigate(`/project/${relatedProject.id}`, {
                                        state: { project: relatedProject },
                                      });
                                    }
                                  }}

                                  style={{
                                    cursor: relatedProject.clickable ? "pointer" : "default",
                                  }}
                                >
                                  <div className="flex-1 flex-shrink-0 text-left   py-1">
                                    {relatedProject.name}
                                  </div>
                                  {/* <div className="flex-1 flex-shrink-0 text-left pr-4  py-1">
                                    {relatedProject.scope}
                                  </div> */}
                                  {/* <div className="flex-1 flex-shrink-0 text-left break-all py-1">
                                    {relatedProject.location}
                                  </div> */}
                                  <div className="flex-1 flex-shrink-0 text-right pr-3 py-1">
                                    {relatedProject.year}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex w-full justify-between">
                                <div className="flex-1 flex-shrink-0 text-left  pr-12 py-1">
                                  No related projects found
                                </div>
                                <div className="flex-1 flex-shrink-0 text-left py-1"></div>
                                <div className="flex-1 flex-shrink-0 text-left break-all py-1"></div>
                                <div className="flex-1 flex-shrink-0 text-right pl-14 py-1"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/*project Details footer  */}
        <div className="footer h-full w-full  pt-6 pb-20 pl-3 ">
          <div className=" text-[11px] h-full w-full   font-medium flex items-start  justify-between  text-left  ">
            <div className="flex flex-col gap-1 ">

              <h5 className={` ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"}  text-[16px]   leading-5  hyphens-auto whitespace-pre-wrap tracking-normal     `}>
                We're excited to hear what you've been imagining.
                Let's bring your vision to life. Reach out to us at
                <button>
                  <a className={`${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"} `} href="mailto:write@staap.in" target="_blank" rel="noreferrer">
                    write@staap.in
                  </a>
                </button>

              </h5>

              <a href="tel:+91-9994192333"

                className={`mt-1 text-[16px]  ${project.name === "R320" ? " text-white hover:text-black " : project.name === "TOVO" || project.name === "Panache" || project.name === "FOLD" ? " text-zinc-400 hover:text-black " : "text-zinc-400 hover:text-white"} `}>+91-9994192333</a>
            </div>

          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 z-[999] ">
        <BottomNav bgColor={project.navColor} />
      </div>
    </>
  )
}

export default Project  