import { useContext, useEffect, useRef, useState } from "react";
import { Navbar, BottomNav } from "./Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import { ThemeContext } from "../utils/themeContext";
import { projectsData } from "../utils/projectsData";

//panche images top  2nd video
import pan2 from "../assets/Projects and Replacements/Panache/pan2.mp4";

const Panache = ({ bgColor }) => {
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
        {/* landing page */}

        <div
          ref={projectPageRef}
          className="w-full flex-col justify-between  overflow-hidden"
        >
          <div className="flex flex-col ml-[50%] w-1/2 justify-start items-end">
            <div className="smartcontainer w-[55%]  aspect-[4/5] mt-4 rounded-sm overflow-hidden">
              {project.ProjectAssets.length > 0 &&
              project.ProjectAssets[0].endsWith(".mp4") ? (
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
          className={`smartliving w-full h-screen ${
            isMobile ? "mt-4 " : "-mt-4"
          } overflow-hidden rounded-md  `}
        >
          <div className=" h-full flex justify-end   w-full">
            <div className="h-full w-1/3 mr-10  flex justify-center items-center ">
              <video
                className=" h-3/4  w-fit object-top  object-contain "
                autoPlay
                
                playsInline
                loop
                src={pan2}
              ></video>
            </div>

            <div className="text h-full w-1/2  flex justify-end items-center  ">
              <p className=" text-[11px]   w-4/5 text-zinc-400 text-right  leading-none  ">
                The Volumes overlaps and intersects creating a sense of open and
                closure on the sides, <br />
                while enveloping the essence of surrounding the other. The
                dynamic play of open and <br />
                closure enabled by a perforated brick wall, resulting in vibrant
                shadow play. A <br />
                punctured brick wall created in a curving path with angled
                bricks to create <br />a dynamic flow.
              </p>
            </div>
          </div>
        </div>

        {/* page 2*/}
        <div
          className={`smartliving w-full h-screen  mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md  px-3`}
        >
          <div className=" h-full flex justify-center w-full ">
            <div className=" h-full w-2/5  flex justify-center items-center ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
                project.ProjectAssets[1].type === "video/mp4" ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[2]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-fill rounded-sm object-center"
                    src={project.ProjectAssets[2] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[2]}
                  />
                )
              ) : null}
            </div>

            <div className="text h-full w-2/5 pt-96  flex flex-col justify-center items-end   ">
               
            <div className="hidden">
              
              <h5 className=" text-[13px] text-black ">FOYER I LIVING </h5>

              <p className=" text-[11px] text-right text-zinc-400  ">
                Designed with Comforting materials in a natural tone of wood and{" "}
                <br />
                stone, Highlighted with brass inlay and antiquities.
              </p>

                </div>
            </div>
          </div>
        </div>

        {/* {page 3} */}

        <div
          className={`smartliving w-full h-screen mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full   flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
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
                <img
                  className="w-full  rounded-sm object-center"
                  src={project.ProjectAssets[3] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[3]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* {page 4} */}
        <div
          className={`smartliving w-full mt-${
            isMobile ? "4" : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[4] ? (
              project.ProjectAssets[4].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[4]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-full rounded-sm object-center"
                  src={project.ProjectAssets[4] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[4]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 5*/}
        <div
          className={`smartliving w-full   mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md  px-3`}
        >
          <div className=" h-full flex justify-center w-full">
            <div className=" h-full w-2/5 flex justify-center items-center ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[5] ? (
                project.ProjectAssets[5].type === "video/mp4" ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[5]}
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="w-fit rounded-sm object-center"
                    src={project.ProjectAssets[5] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[5]}
                  />
                )
              ) : null}
            </div>

            <div className="text h-full w-2/5 pt-96 flex flex-col justify-center items-end   ">
               

            <div className="hidden">
                
              <h5 className=" text-[13px] leading-none text-black">
                MASTER BEDROOM
              </h5>

              <p className=" text-[11px] text-right leading-none text-zinc-400  ">
                Designed with pastel green fabric, walnut wood with grey marble,
                and timecoat concrete with <br /> brass inlays forming grids
                defining the space
              </p>

                </div>
              
            </div>
          </div>
        </div>

        {/* {page 6} */}
        <div
          className={`smartliving w-full mt-${
            isMobile ? "4" : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full   flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[6] ? (
              project.ProjectAssets[6].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[6]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[6] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[6]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 7*/}
        <div
          className={`smartliving w-full    mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md  px-3`}
        >
          <div className=" h-full flex justify-center w-full">
            <div className="  w-2/5  flex justify-center items-center ">
              {project.ProjectAssets.length > 0 && project.ProjectAssets[7] ? (
                project.ProjectAssets[7].type === "video/mp4" ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[7]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    className="w-fit rounded-sm object-center"
                    src={project.ProjectAssets[7] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[7]}
                  />
                )
              ) : null}
            </div>

            <div className=" text h-full w-2/5 pt-96 flex flex-col justify-center items-end ">
                
                <div className={`hidden`} >                 

              <h5 className=" text-[13px] leading-none  text-black">
                BAR LOUNGE I TERRACE
              </h5>

              <p className=" text-[11px] text-right leading-none text-zinc-400  ">
                Curated with walnut wood balancing with leather upholstery and
                leather finish granite, Black stone <br /> then overall the
                space is enhanced with glass brick.
              </p>

                </div>
            
            </div>

          </div>
        </div>

        {/* page 8 */}

        <div
          className={`w-full  mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full   flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[8] ? (
              project.ProjectAssets[8].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[8]}
                  muted
                  playsInline

                  autoPlay
                  loop
                />
              ) : (
                <img
                  className="w-full rounded-sm object-center"
                  src={project.ProjectAssets[8] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[8]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 9 */}

        <div
          className={`w-full  mt-${
            isMobile ? "4 " : "6"
          } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[9] ? (
              project.ProjectAssets[9].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[9]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <img
                  className="w-full rounded-sm object-center"
                  src={project.ProjectAssets[9] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[9]}
                />
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile version version */}

      <div
        // style={{backgroundColor: project.bgColor}}
        ref={mobileContainerRef}
        className="md:hidden"
      >
        <div className=" relative  w-full  flex-col justify-between p-3 ">
          {/* project 1 page  */}
          <div
            ref={projectPageRef2}
            className=" flex top-32 flex-col w-full  justify-start items-end"
          >
            <div className="smartcontainer  w-[68%]  aspect-[4/5]  mt-1 rounded-sm  overflow-hidden  ">
              {project.ProjectAssets.length > 0 &&
              project.ProjectAssets[0].endsWith(".mp4") ? (
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

        {/* page 1 */}
        <div
          className={`smartliving w-full  ${isMobile ? "mt-12 " : "mt-6"} 
          overflow-hidden rounded-md  px-3`}
        >
          <div
            className={`h-full  ${
              isMobile ? " flex-col" : "flex"
            } justify-center w-full`}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-full px-5" : "w-2/5"
              }  flex justify-center items-center`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[1] ? (
                isVideoFile(project.ProjectAssets[1]) ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[1]}
                    muted
                    playsInline
                    autoPlay
                    loop
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

            <div
              className={`h-full  ${
                isMobile ? " w-full  mt-4 " : "w-2/5 "
              } flex justify-center  items-end`}
            >
              <p
                className={`text-[11px]   ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-400 text-right leading-none  `}
              >
                The Volumes overlaps and intersects creating a sense of open and
                closure on the sides, while enveloping the essence of
                surrounding the other. The dynamic play of open and closure
                enabled by a perforated brick wall, resulting in vibrant shadow
                play. A punctured brick wall created in a curving path with
                angled bricks to create a dynamic flow.
              </p>
            </div>
          </div>
        </div>

        {/* page2 */}

        <div
          className={`smartliving w-full  ${isMobile ? "mt-12 " : "mt-6"} 
          overflow-hidden rounded-md  px-3  `}
        >
          <div
            className={`h-full  ${
              isMobile ? "flex" : "flex"
            } justify-between  items-end w-full `}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-1/2 " : "w-2/5"
              }  flex justify-c items-center`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[2] ? (
                isVideoFile(project.ProjectAssets[2]) ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[2]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : project.ProjectAssets[2].endsWith(".gif") ? (
                  <img
                    className="w-fit h-3/4 object-contain rounded-md object-center"
                    src={project.ProjectAssets[2]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-contain  rounded-sm object-center"
                    src={project.ProjectAssets[2] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[2]}
                  />
                )
              ) : null}
            </div>
            

            <div
              className={`h-full  ${
                isMobile ? " w-1/2  flex-col mt-4 hidden " : "w-2/5 "   //hidden the contents
              } flex justify-center  items-end`}
            >
              <h5 className=" text-black text-[11px] ">FOYER I LIVING </h5>
              <p
                className={`text-[11px] ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-400 text-right leading-none  `}
              >
                Designed with Comforting materials in a natural tone of wood and
                stone, Highlighted with brass inlay and antiquities.
              </p>
            </div>


          </div>
        </div>

        {/*  page 3 */}
        <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-12 h-[30vh] px-3 " : "mt-8 h-screen "
            } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[3] ? (
              isVideoFile(project.ProjectAssets[3]) ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[3]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : project.ProjectAssets[3].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[3]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[3] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[3]}
                />
              )
            ) : null}
          </div>
        </div>

        {/*page4 */}
        <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-2 h-[30vh] px-3 " : "mt-8 h-screen "
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
                  playsInline
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
        </div>

        {/* page 5 */}

        <div
          className={`smartliving w-full  ${isMobile ? "mt-6 " : "mt-6"} 
          overflow-hidden rounded-md  px-3  `}
        >
          <div
            className={`h-full  ${
              isMobile ? "flex" : "flex"
            } justify-between  items-end w-full `}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-1/2 " : "w-2/5"
              }  flex justify-c items-center`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[5] ? (
                isVideoFile(project.ProjectAssets[5]) ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[5]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : project.ProjectAssets[5].endsWith(".gif") ? (
                  <img
                    className="w-fit h-3/4 object-contain rounded-md object-center"
                    src={project.ProjectAssets[5]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-contain  rounded-sm object-center"
                    src={project.ProjectAssets[5] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[5]}
                  />
                )
              ) : null}
            </div>

            <div
              className={`h-full  ${
                isMobile ? " w-1/2  flex-col mt-4 hidden" : "w-2/5 "   //hidden the contents
              } flex justify-center  items-end`}
            >
              <h5 className=" text-black text-[11px] "> MASTER BEDROOM</h5>
              <p
                className={`text-[11px]   ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-400 text-right leading-none  `}
              >
                Designed with pastel green fabric, walnut wood with grey marble,
                and timecoat concrete with brass inlays forming grids defining
                the space.
              </p>
            </div>
          </div>
        </div>

        {/*page 6 */}
        <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-6 h-[30vh] px-3 " : "mt-8 h-screen "
            } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[6] ? (
              isVideoFile(project.ProjectAssets[6]) ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[6]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : project.ProjectAssets[6].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[6]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[6] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[6]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* page 7 */}

        <div
          className={`smartliving w-full  ${isMobile ? "mt-6 " : "mt-6"} 
          overflow-hidden rounded-md  px-3  `}
        >
          <div
            className={`h-full  ${
              isMobile ? "flex" : "flex"
            } justify-between  items-end w-full `}
          >
            <div
              className={`h-full  ${
                isMobile ? " w-1/2 " : "w-2/5"
              }  flex justify-c items-center`}
            >
              {project.ProjectAssets.length > 0 && project.ProjectAssets[7] ? (
                isVideoFile(project.ProjectAssets[7]) ? (
                  <video
                    className="w-fit h-3/4 object-cover rounded-md object-center"
                    src={project.ProjectAssets[7]}
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                ) : project.ProjectAssets[7].endsWith(".gif") ? (
                  <img
                    className="w-fit h-3/4 object-contain rounded-md object-center"
                    src={project.ProjectAssets[7]}
                    alt={project.name}
                  />
                ) : (
                  <img
                    className="w-fit h-3/4 object-contain  rounded-sm object-center"
                    src={project.ProjectAssets[7] || "/placeholder.svg"}
                    alt={project.name}
                    srcSet={project.ProjectAssets[7]}
                  />
                )
              ) : null}
            </div>

            <div
              className={`h-full  ${
                isMobile ? " w-1/2  flex-col mt-4  hidden" : "w-2/5 " //hidden the contents
              } flex justify-center  items-end`}
            >
              <h5 className=" text-black text-[11px] ">BAR LOUNGE I TERRACE</h5>
              <p
                className={`text-[11px]   ${
                  isMobile ? " w-full " : "w-4/5"
                } text-zinc-400 text-right leading-none  `}
              >
                Curated with walnut wood balancing with leather upholstery and
                leather finish granite, Black stone then overall the space is
                enhanced with glass brick.
              </p>
            </div>
          </div>
        </div>

        {/*page 8 */}
        <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-6 h-[30vh] px-3 " : "mt-8 h-screen "
            } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[8] ? (
              isVideoFile(project.ProjectAssets[8]) ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[8]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : project.ProjectAssets[8].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[8]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[8] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[8]}
                />
              )
            ) : null}
          </div>
        </div>

        {/*page 9 */}
        <div
          className={`smartliving w-full  
            ${
              isMobile ? "mt-2 h-[30vh] px-3 " : "mt-8 h-screen "
            } overflow-hidden rounded-md `}
        >
          <div className="img-big1 w-full h-full  flex justify-center overflow-hidden rounded-sm ">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[9] ? (
              isVideoFile(project.ProjectAssets[9]) ? (
                <video
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[9]}
                  muted
                  autoPlay
                  playsInline
                  loop
                />
              ) : project.ProjectAssets[9].endsWith(".gif") ? (
                <img
                  className="w-full h-full object-cover rounded-md object-center"
                  src={project.ProjectAssets[9]}
                  alt={project.name}
                />
              ) : (
                <img
                  className="w-full h-full object-fill rounded-sm object-center"
                  src={project.ProjectAssets[9] || "/placeholder.svg"}
                  alt={project.name}
                  srcSet={project.ProjectAssets[9]}
                />
              )
            ) : null}
          </div>
        </div>

        {/* <SmartLiving4 project={project} isMobile={isMobile} /> */}

        {/* smartliving page5 */}
        {/* <SmartLiving5 project={project} isMobile={isMobile} /> */}
      </div>
    </>
  );
};

export default Panache;
