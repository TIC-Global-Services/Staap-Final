import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import { ThemeContext } from "../utils/themeContext";
import { projectsData } from "../utils/projectsData";
import SmartLiving2 from "./SmartLiving2";
import SmartLiving3 from "./SmartLiving3";
import SmartLiving4 from "./SmartLiving4";
import SmartLiving5 from "./SmartLiving5";

const MADEIN = () => {
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
      {/*desktop version*/}
      <div
        style={{ backgroundColor: project.bgColor }}
        className={`smartliving-desk w-full  
          ${isMobile ? "hidden":"visible"}`}
        ref={containerRef}
      >
        {/*  landing page product*/}
        <div
          ref={projectPageRef}
          className="w-full flex-col justify-between p-3 overflow-hidden"
        >
          <div className="flex flex-col ml-[50%] w-1/2 justify-start items-end">
            <div className="smartcontainer w-[55%]  aspect-[4/5] mt-4 rounded-sm overflow-hidden">
              {project.ProjectAssets.length > 0 &&
              isVideoFile(project.ProjectAssets[0]) ? (
                <video
                  className="w-full h-full object-fit rounded-md object-center"
                  src={project.ProjectAssets[0]}
                  muted
                  autoPlay
                  playsInline
                  loop
                ></video>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-sm object-bottom"
                  src={project.ProjectAssets[0] || "/placeholder.svg"}
                  alt={`${project.name} 0`}
                  srcset={project.ProjectAssets[0]}
                />
              )}
            </div>
            <div className="w-[55%]  mt-4  font-medium h-full text-left">
              <div
                className={`img-text w-full    text-zinc-500  items-end flex flex-col justify-start text-[11px] leading-none`}
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
              className={`text-[11px]  text-zinc-500  w-[55%]  text-center md:text-right leading-tight mt-6 pb-3 `}
            >
              {project.desc}
            </h6>
          </div>
        </div>

        {/* r320 page2 */}

        <div
          className={`smartliving w-full mt-6 overflow-hidden rounded-md px-3`}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
              isVideoFile(project.ProjectAssets[1]) ? (
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
                  className="w-full rounded-sm object-center"
                  src={project.ProjectAssets[1] || "/placeholder.svg"}
                  alt={`${project.name} 1`}
                  srcSet={project.ProjectAssets[1]}
                />
              )
            ) : null}
          </div>
        </div> 

        {/* r320 page3 */}
        <div
          className={`relative  w-full px-3  flex justify-between gap-2  overflow-y-visible-visible items-start `}
        >
          {project ? (
            <div className="h-full  w-full">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
                isVideoFile(project.ProjectAssets[2]) ? (
                  <video
                    className="w-full h-fit object-contain rounded-md object-center"
                    src={project.ProjectAssets[2]}
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full  rounded-sm object-center "
                    src={project.ProjectAssets[2] || "/placeholder.svg"}
                    alt={`${project.name} 2`}
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div> 
        
        {/* r320 page4 */}
        
        <div
          className={`relative h-fit w-full  flex gap-2 overflow-hidden items-start  px-3 `}
        >
          {project ? (
            <div className="h-[85%] w-full">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                isVideoFile(project.ProjectAssets[3]) ? (
                  <video
                    className="w-full h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[3]}
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className={`w-full  h-fit object-cover rounded-sm object-center`}
                    src={project.ProjectAssets[3] || "/placeholder.svg"}
                    alt={`${project.name} 3`}
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div> 
        {/* smartliving page5 */}
        
        <div
          className={`relative  w-full  -mt-11  flex  overflow-hidden items-center  px-3`}
        >
          {project ? (
            <div className="h-full w-full ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[5] ? (
                isVideoFile(project.ProjectAssets[5]) ? (
                  <video
                    className="w-full h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[5]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-full h-full  object-fit  rounded-sm object-center"
                    src={project.ProjectAssets[5] || "/placeholder.svg"}
                    alt={`${project.name} 5`}
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div>
        
        {/* smartliving page5 */}
        
        <div
          className={`relative  w-full  -mt-11  flex  overflow-hidden items-center  px-3`}
        >
          {project ? (
            <div className="h-full w-full ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
                isVideoFile(project.ProjectAssets[4]) ? (
                  <video
                    className="w-full h-full object-cover rounded-md object-center"
                    src={project.ProjectAssets[4]}
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full  object-fit  rounded-sm object-center"
                    src={project.ProjectAssets[4] || "/placeholder.svg"}
                    alt={`${project.name} 4`}
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div>

      </div>

      {/* mobile version */}
      <div
        style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className={`smartliving-desk ${
          isMobile ? "visible": "hidden"
        } w-full  pb-4 `}
      >



        <div className=" relative  w-full  flex-col justify-between p-3 ">
          <div
            ref={projectPageRef2}
            className=" flex top-32 flex-col w-full  justify-start items-end"
          >
            <div className="smartcontainer  w-[68%]  aspect-[4/5] mt-1 rounded-sm  overflow-hidden  ">
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

            <div className="w-[70%] mt-2 font-medium h-full text-left">
              <div
                className={`img-text w-full  ${
                  project.name === "R320" ? " text-zinc-500  " : "text-zinc-500 "
                }  items-end flex flex-col justify-start text-[11px] leading-none`}
              >
                <div className="  h-1/2 w-full flex justify-between gap-3 items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} 
                  </h5>

                  <h5 className="whitespace-nowrap   text-right ">
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
                    project.name === "R320" ? " text-zinc-500  " : "text-zinc-500 "
                  }   w-full  text-right md:text-right leading-tight mt-5 `}
                >
                  {project.desc}
                </h6>
              </div>
            </div>
          </div>
        </div>      
      
      {/* page 1 */}
      <div
      className={`smartliving w-full mt-4 
      } overflow-hidden rounded-md  `}
    >
      <div className="img-big1 w-full   flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
          project.ProjectAssets[1].type === "video/mp4" ? (
            <video
              className="w-full h-fit object-cover rounded-md object-center"
              src={project.ProjectAssets[1]}
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              className="w-full object-cover  rounded-sm object-center"
              src={project.ProjectAssets[1] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[1]}
            />
          )
        ) :null}
      </div>
    </div>

      {/* page 2 */}
      <div
      className={`smartliving  w-full 
      } overflow-hidden rounded-md `}
    >
      <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
          project.ProjectAssets[2].type === "video/mp4" ? (
            <video
              className="w-full rounded-md object-center"
              src={project.ProjectAssets[2]}
              muted
              autoPlay
              playsInline
              loop
            />
          ) : (
            <img
              className="w-full object-cover rounded-sm object-center"
              src={project.ProjectAssets[2] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[2]}
            />
          )
        ) :null}
      </div>
    </div>

      {/* page 3 */}
      <div
      className={`smartliving  w-full  
      } overflow-hidden rounded-md  `}
    >
      <div className="img-big1 w-full   flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
          project.ProjectAssets[3].type === "video/mp4" ? (
            <video
              className="w-full h-fit object-fit rounded-md object-center"
              src={project.ProjectAssets[3]}
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              className="w-full   rounded-sm object-center"
              src={project.ProjectAssets[3] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[3]}
            />
          )
        ) :null}
      </div>
    </div>


      {/* page 4 */}
      <div
      className={`smartliving w-full 
      } overflow-hidden rounded-md   `}
    >
      <div className="img-big1 w-full   flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[5] ? (
          isVideoFile(project.ProjectAssets[5]) ? (
            <video
              className="w-full aspect-auto object-cover rounded-md object-center"
              src={project.ProjectAssets[5]}
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              className="w-full h-full object-fit  rounded-sm object-center"
              src={project.ProjectAssets[5] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[5]}
            />
          )
        ) :null}
      </div>
    </div>

      {/* page 4 */}
      <div
      className={`smartliving  w-full  
      } overflow-hidden rounded-md  `}
    >
      <div className=" w-full  flex justify-center overflow-hidden rounded-sm ">
       
        {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
          isVideoFile(project.ProjectAssets[4]) ? (
            <video
              className="w-full object-cover rounded-md object-center"
              src={project.ProjectAssets[4]}
              muted
              autoPlay
              playsInline
              loop
            />
          ) : (
            <img
              className="w-full h-full object-fit  rounded-sm object-center"
              src={project.ProjectAssets[4] || "/placeholder.svg"}
              alt={project.name}
              srcSet={project.ProjectAssets[4]}
            />
          )
        ) :null}
      </div>
    </div>


    </div>
    </>
  )
}

export default MADEIN;