import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import { ThemeContext } from "../utils/themeContext";
import { projectsData } from "../utils/projectsData";
import SmartLiving2 from "./SmartLiving2";
import SmartLiving3 from "./SmartLiving3";
import SmartLiving4 from "./SmartLiving4";
import SmartLiving5 from "./SmartLiving5";

const R320 = () => {
  const containerRef = useRef(null);
  const { projectId } = useParams();
  const location = useLocation();
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
  }, [projectPageRef, location.state]);

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
  }, [projectPageRef2, location.state]);

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
    <div>
      {/* Desktop version */}
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
                  alt=""
                  srcset={project.ProjectAssets[0]}
                />
              )}
            </div>
            <div className="w-[55%]  mt-4  font-medium h-full text-left">
              <div
                className={`img-text w-full text-zinc-100  items-end flex flex-col justify-start text-[11px] leading-none`}
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
              className={`text-[11px]  text-zinc-100  whitespace-pre-wrap  w-[55%]  text-center md:text-right leading-tight mt-6 pb-3 `}
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
                  className="w-full h-full object-contain rounded-sm object-center"
                  src={project.ProjectAssets[1] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[1]}
                />
              )
            ) : null}
          </div>
        </div> 

        {/* r320 page3 */}
         <div
          className={`relative h-screen w-full px-3 mt-8 flex justify-between gap-2  overflow-y-visible-visible items-start `}
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
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-full   rounded-sm object-center "
                    src={project.ProjectAssets[2] || "/placeholder.svg"}
                    alt={project.name}
                  />
                )
              ) : null}
            </div>
          ) : null}
      
        </div> 
        
        {/* r320 page4 */}
        
         <div
          className={`relative h-screen w-full mt-8 flex gap-2 overflow-hidden items-start  px-3 `}
        >
          {project ? (
            <div className="h-[85%] w-full">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
                isVideoFile(project.ProjectAssets[3]) ? (
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
                    className={`w-full  h-fit object-contain  rounded-sm object-center`}
                    src={project.ProjectAssets[3] || "/placeholder.svg"}
                    alt={project.name}
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div> 

        {/* smartliving page5 */}
        
        <div
          className={`relative h-[140vh] w-full mt-12 flex gap-2 overflow-hidden items-center  px-3`}
        >
          {project ? (
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
          ) : null}
        </div>

      </div>

      {/* Mobile version version */}

      <div
        style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className={`smartliving-desk ${
          isMobile ? "visible" : "hidden"
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
                  project.name === "R320" ? " text-zinc-100  " : "text-zinc-500 "
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
                    project.name === "R320" ? " text-zinc-100  " : "text-zinc-500 "
                  }  whitespace-pre-wrap  w-full  text-right md:text-right leading-tight mt-5 `}
                >
                  {project.desc}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* r320 page2 */}

        <div
          className={`smartliving w-full   ${isMobile ? "mt-12" : "mt-6"} 
          overflow-hidden rounded-md  px-3`}
        >
          <div
            className={`h-full  ${
              isMobile ? " flex-col" : "flex"
            } justify-center w-full`}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-full  mt-4 " : "w-2/5 "
              } flex-col justify-center  items-end`}
            >
              <h5 className="  mb-1 text-[11px] text-zinc-50 text-right">
                Design Evolution{" "}
              </h5>
              <p
                className={`text-[11px]  ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-100 text-right leading-none  `}
              >
                The project unfolds in two mirrored phases, featuring a central
                core that sculpts the block by filleting its edges for a
                welcoming aesthetic. Situated on a 16,500  site tapering
                towards Old Mahabalipuram Road, the design introduces a
                punctured core between two rigid structures. This central void
                draws the structure’s edges inward, creating filleted corners
                that enhance the façade’s visual appeal. The massing evolves
                hierarchically from the ground to the second floor, resulting in
                an inviting building.
              </p>
            </div>

            <div
              className={`h-full mt-2  ${isMobile ? " w-full " : "w-2/5"}
               flex justify-center items-center`}
            >
              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[5] ? (
                  isVideoFile(project.ProjectAssets[5]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[5]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[5].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[5]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover rounded-sm object-bottom"
                      src={project.ProjectAssets[5] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[5]}
                    />
                  )
                ) : null}
              </div>

              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[6] ? (
                  isVideoFile(project.ProjectAssets[6]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[6]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[6].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[6]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover  rounded-sm object-center"
                      src={project.ProjectAssets[6] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[6]}
                    />
                  )
                ) : null}
              </div>

              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[7] ? (
                  isVideoFile(project.ProjectAssets[7]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[7]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[7].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[7]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover  rounded-sm object-center"
                      src={project.ProjectAssets[7] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[7]}
                    />
                  )
                ) : null}
              </div>

              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[8] ? (
                  isVideoFile(project.ProjectAssets[8]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[8]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[8].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[8]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover  rounded-sm object-center"
                      src={project.ProjectAssets[8] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[8]}
                    />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* r320 page 3 */}
        <div
          className={`smartliving w-full ${isMobile ? "mt-2" : "mt-6"} 
          overflow-hidden rounded-md  px-3`}
        >
          <div
            className={`h-full ${
              isMobile ? " flex-col" : "flex"
            } justify-center w-full`}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-full  mt-4 " :"w-2/5 "
              } flex-col justify-center  items-end`}
            >
              <h5 className=" text-zinc-50 mb-1 text-[11px] text-right">
                Scale and Proportion
              </h5>
              <p
                className={`text-[11px]   ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-100 text-right leading-none  `}
              >
                The golden ratio, approximately 1:1.618, has been employed since
                Renaissance to achieve aesthetically pleasing proportions in
                design. By aligning a project’s framework and scale to this
                ratio,designers can enhance the visual appeal of structure.
                Implementing 1:1 ratio within the design concept further refines
                façade’s complexity. Additionally, aligning the grid with the
                building’s axis fosters visual cohesion, ensuring the façade
                embodies the intended scale and proportional characteristics.
              </p>
            </div>

            <div
              className={`h-[15vh] mt-2 ${
                isMobile ? " w-full " : "w-2/5"
              }  flex justify-center items-center`}
            >
              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[9] ? (
                  <div className="h-full  w-full">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
                isVideoFile(project.ProjectAssets[2]) ? (
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
                    className="w-full   rounded-sm object-center "
                    src={project.ProjectAssets[2] || "/placeholder.svg"}
                    alt={project.name}
                  />
                )
              ) : null}
            </div>
                ) : null}
              </div>

            
            </div>
          </div>
        </div>

        {/* r320 page 4 */}
        <div
          className={`smartliving w-full   ${isMobile ? "mt-2" : "mt-6"} 
          overflow-hidden rounded-md  px-3`}
        >
          <div
            className={`h-full  ${
              isMobile ? " flex-col" : "flex"
            } justify-center w-full`}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-full  mt-4 " : "w-2/5 "
              } flex-col justify-center   items-end`}
            >
              <h5 className=" text-zinc-50 mb-1 text-[11px] text-right">
              Facade Axonometric and detail 
              </h5>

              <p
                className={`text-[11px]   ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-100 text-right leading-none  `}
              >
                The facade is illuminated with
                flush lights and spotlights, enhancing its aesthetic appeal. The
                structure consists of 250 mm thick post-tensioned floor slab
                anchor ing a framework of 100x100 mm folded metal sheets and
                100x20 mm mild steel L angles bordering the glass panels. The
                facade incorporates 1500x3500 mm, 12 mm thick single-glazed
                glass panels within an aluminum framing system. Additionally,
                1500x3500 mm, 6 mm thick Corten steel panels are fixed atop the
                framework with 20 mm groove spacing. Internal finishes include
                plaster and tile flooring as per approved specifications.
              </p>
            </div>

            <div
              className={`h-full mt-2  ${
                isMobile ? " w-full " : "w-2/5"
              }  flex justify-center items-center`}
            >
              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[12] ? (
                  isVideoFile(project.ProjectAssets[12]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[12]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[12].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[12]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover  rounded-sm object-center"
                      src={project.ProjectAssets[12] || "/placeholder.svg"}
                      alt={project.name}
                      srcSet={project.ProjectAssets[12]}
                    />
                  )
                ) : null}
              </div>

              <div className=" flex-1">
                {project.ProjectAssets.length > 0 &&
                project.ProjectAssets[13] ? (
                  isVideoFile(project.ProjectAssets[13]) ? (
                    <video
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[13]}
                      muted
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : project.ProjectAssets[13].endsWith(".gif") ? (
                    <img
                      className="w-fit h-full object-cover rounded-md object-center"
                      src={project.ProjectAssets[13]}
                      alt={project.name}
                    />
                  ) : (
                    <img
                      className="w-fit h-full object-cover rounded-sm object-center"
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
       

       {/* r320 page 5 */}
          <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-4 h-[40vh]  px-3 " : "mt-8 h-screen "
            } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
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
              ) : project.ProjectAssets[4].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-cover rounded-sm object-center"
                  src={project.ProjectAssets[4] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[4]}
                />
              )
            ) : null}
          </div>
        </div>

      </div>

    </div>
  );
};

export default R320;
