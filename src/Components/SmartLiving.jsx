import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import { ThemeContext } from "../utils/themeContext";
import { projectsData } from "../utils/projectsData";
import SmartLiving2 from "./SmartLiving2";
import SmartLiving3 from "./SmartLiving3";
import SmartLiving4 from "./SmartLiving4";
import SmartLiving5 from "./SmartLiving5";

const SmartLiving = () => {
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
    <>
      {/* Fixed Navbar remains unchanged */}
    
      {/* Desktop version */}
      <div style={{backgroundColor: project.bgColor}} 
      className={`smartliving-desk ${isMobile?"hidden":"visible"} `} ref={containerRef}>

        <div ref={projectPageRef} className="w-full flex-col justify-between p-3 overflow-hidden">

          <div className="flex flex-col ml-[50%] w-1/2 justify-start items-end">
            <div className="smartcontainer w-[55%]  aspect-[4/5] mt-4 rounded-sm overflow-hidden">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[0].endsWith('.mp4') ? (
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
              <div className={`img-text w-full  text-zinc-400  items-end flex flex-col justify-start text-[11px] leading-none`}>
                <div className="h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} 
                  </h5>
                  <h5 className="whitespace-nowrap  text-right ">Site area: {project.siteArea} </h5>
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
              className={`text-[11px] text-zinc-400  whitespace-pre-wrap  w-[55%]  text-center md:text-right leading-tight mt-6 pb-3 `}
            >
              {project.desc}
            </h6>
          </div>
        </div>

        {/* smartliving page2 */}
        <SmartLiving2 project={project} isMobile={isMobile} />
        {/* smartliving page3 */}
        <SmartLiving3 project={project} isMobile={isMobile} />
        {/* smartliving page4 */}
        <SmartLiving4  project={project} isMobile={isMobile} />
        {/* smartliving page5 */}
        <SmartLiving5 project={project} isMobile={isMobile} />


      </div>



        {/* Mobile version version */}

        <div 
        // style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className={`smartliving-mobile ${isMobile ? "visible" : "hidden"} `} 
        
      >
        <div className=" relative  w-full  flex-col justify-between p-3 ">
          
          <div ref={projectPageRef2}  className=" flex top-32 flex-col w-full  justify-start items-end">
            <div className="smartcontainer  w-[68%]  aspect-[4/5]  mt-4 rounded-sm  overflow-hidden  ">
            
            {project.ProjectAssets.length > 0 && project.ProjectAssets[0].endsWith('.mp4') ? (
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

            <div className="w-[68%] mt-2  font-medium h-full text-left">
              <div className={`img-text w-full  text-zinc-400  items-end flex flex-col justify-start text-[11px] leading-none`}>
                <div className="  h-1/2 w-full flex justify-between items-center ">
                  <h5 className="font-medium  whitespace-nowrap text-left">
                    Built up Area : {project.buildArea} 
                  </h5>
                   
                   

                  <h5 className="whitespace-nowrap  text-right ">Site area: {project.siteArea} </h5>
                </div>
       
                <div className=" h-1/2 w-full flex-col justify-between items-center">
                  
                <h5 className="text-left mt-1 ">{project.scope}</h5>
                 
                  <h5 className="text-left mt-4 ">
                    Team : <br />
                    {project.team}
                  </h5>            
                </div>

                <h6
              className={`text-[11px]  text-zinc-400  whitespace-pre-wrap  w-full  text-left md:text-right leading-tight mt-5 `}
            >
              {project.desc}
            </h6>
              </div>
            </div>

            
          </div>
        </div>

        {/* smartliving page2 */}
        <SmartLiving2 project={project} isMobile={isMobile} />
        {/* smartliving page3 */}
        <SmartLiving3 project={project} isMobile={isMobile} />
        {/* smartliving page4 */}
        <SmartLiving4 project={project} isMobile={isMobile} />
        {/* smartliving page5 */}
        <SmartLiving5 project={project} isMobile={isMobile} />

        {/* related works table */}

        {/*  */}

        {/*project Details footer  */}
        {/* <div className="footer h-full w-full  pt-6 pb-12 pl-3 ">
          <div className=" text-[11px] h-full w-full   font-medium flex items-start  justify-between  text-left  ">
            <div className="flex flex-col gap-1 ">
              <h5 className={` ${project.name === "R320" ? " text-white hover:text-black ":"text-zinc-100 hover:text-white"}  text-[16px]   leading-5  hyphens-auto whitespace-pre-wrap tracking-normal     `}>
                We're excited to hear what you've been imagining.
                Let's bring your vision to life. Reach out to us at 
                <button>
                  <a className=" ml-1" href="mailto:write@staap.in" target="_blank" rel="noreferrer">
                    write@staap.in
                  </a>
                </button>
                
              </h5>

              <p
            
              className={`mt-1 ${project.name === "R320" ? " text-white hover:text-black ":"text-zinc-400 hover:text-white"} `}>+91-9994192333</p>
            </div>

          </div>
        </div> */}
         
      </div>
         
         {/* <div className="fixed bottom-0 left-0 z-[999] ">
          <BottomNav  bgColor={project.bgColor} />
         </div> */}
    </>
  )
}

export default SmartLiving  