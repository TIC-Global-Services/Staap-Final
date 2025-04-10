"use client"

import { useContext, useEffect, useRef, useState } from "react"

import floydAward from "../assets/Projects and Replacements/Award images/FOAID.png"
import ArchDAward from "../assets/Projects and Replacements/Award images/archidairies.png"
import RethinkFAward from "../assets/Projects and Replacements/Award images/Rethinking the future.png"
import ToffuAward from "../assets/Projects and Replacements/Award images/Toffu.png"

import logow from "../assets/Staap - white.png"
import logob from "../assets/Staap - black.png"

import { ThemeContext } from "../utils/themeContext"

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  //State to track which publication link is hovered
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isUserHovering, setIsUserHovering] = useState(false)
  const timerRef = useRef(null)


  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  const hovertexts = [
    {
      text: "[toffu.co] Panache - Facade + Illustration",
      img: ToffuAward,
    },
    {
      text: "[Rethinking the Future] TOVO - Bangalore ",
      link: "https://www.re-thinkingthefuture.com/architecture/commercial/10919-tovo-by-staap/",
      img: RethinkFAward,
    },
    {
      text: "[FOAID] - Platinum Winner - Bar and Lounge",
      img: floydAward,
    },
    {
      text: "[Archidairies] TOVO - Bangalore",
      link: "https://www.archidiaries.com/projects/tovo-staap/",
      img: ArchDAward,
    },
  ]



      // Auto-cycle effect only runs when user is not hovering
      useEffect(() => {
        if (!isUserHovering) {
          const intervalId = setInterval(() => {
            setHoveredIndex((prevIndex) => {
              if (prevIndex === null) return 0
              return (prevIndex + 1) % hovertexts.length
            })
          }, 1300) // 1.3 seconds interval
    
          return () => clearInterval(intervalId)
        }
      }, [isUserHovering, hovertexts.length])
    
  







  return (
    <div
      s="true"
      style={isMobile ? { WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" } : {}}
      className={`h-full w-screen    ${
        isMobile ? "overflow-y-auto  mt-20 pb-56 h-screen touch-pan-y " : "overflow-hidden"
      } mt-24 `}
    >
      <div
        className={`about-container mt-1 w-full h-full flex flex-col items-start gap-2 px-3 py-1  ${
          isMobile ? "overflow-y-auto" : "overflow-hidden"
        } `}
      >
        {/* {desktop responsive part1} */}
        <div
          className={`part1 ${isMobile ? "hidden" : "visible"}  relative h-[24%] w-full pb-4  ${
            isDarkMode ? "border-b-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"
          } `}
        >
          <div className="text-[11px] h-full w-full flex justify-between text-left">
            <h5 className={`w-[19%] text-[15px] `}>About</h5>

            <div
              className={`w-[28%] flex justify-start items-start gap-8 ${
                isDarkMode ? "text-zinc-400" : "text-black/40"
              } h-full text-left ml-11 mr-0.5 text-[11px]`}
            >
              <div className="left-part">
                <p>Architecture</p>
                <p>Interior</p>
                <p>Product Design</p>
                <p>Landscape</p>
              </div>

              <div className="right-part">
                <p>Research</p>
                <p>Installation</p>
                <p>Curation</p>
                <p>Design, Built and Mangement</p>
              </div>
            </div>

            <div
              className={` relative w-[62.5%] h-full  flex-col justify-center items-start ml-12 ${
                isMobile ? "mr-0" : "mr-6 "
              } gap-2 text-[11px] font-medium ${isMobile ? "text-right" : "text-left"} `}
            >
              <div className=" w-full flex justify-between items-start  ">
                <div className={`w-2/5 `}>
                  <div className={`img_container h-5 w-14 `}>
                    <img
                      className=" h-full w-full object-contain object-left leading-none"
                      src={`${isDarkMode ? logow : logob}`}
                      alt="logo"
                      srcSet={`${isDarkMode ? logow : logob}`}
                    />
                  </div>
                  <p className=" w-full  ">Stories of Art and Architectural Practice </p>
                </div>

                <div className="w-3/5  text-[10px] pl-2 leading-3 text-justify ">
                  <h6>
                    Staap - Stories of Art and Architecture Practice, was established in 2021 in Chennai, India,
                    specializing in architecture, interiors, landscape, and design. We work on projects ranging from
                    local to global. As a collective team of young, passionate, like-minded individuals, not just
                    architects, but creatives from diverse disciplines. A space, a platform where we explore, learn, and
                    create.
                  </h6>
                </div>
              </div>

              <div className=" w-full flex items-start justify-between  mt-5 ">
                <div className={`w-2/5 `}>
                  <p className=" w-full leading-none mb-4 text-[12px] ">கலைகளின் கதைகள்</p>
                  <p className="leading-3 text-zinc-400 italic text-[9px] w-11/12">
                    “Stories of Art”: the art of telling a narrative through design, and “Practice”:
                    perfecting it through a repetitive pattern of learning and creating.
                  </p>
                </div>

                <div className="w-3/5 text-[10px]  pl-2 leading-3 text-justify  ">
                  <h6>
                    As an award-winning practice, Staap envisions design as a narrative, a way of connecting the dots of
                    life, culture, and human experience. Each project comes with its own unique challenges and
                    characteristics. Our process begins with a profound understanding, reading between the lines,
                    listening to what a space truly needs, and uncovering the unique essence that defines it. We then
                    curate design around this understanding, bringing it to life. At Staap, we create works that are
                    living narratives, waiting to unfold.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile version */}

        <div
          className={`part1 ${isMobile ? "visible" : "hidden"}  pb-2  w-full ${
            isDarkMode ? "border-b-[0.2px] border-zinc-600" : " border-b-[0.2px] border-zinc-400  "
          } `}
        >
          <div className="text-[11px] h-full w-full flex-col justify-between text-left">
            <h5 className="w-[19%] text-[13px]">About</h5>

            <div className={`w-full mt-2 flex-col justify-center items-start  font-medium text-left   `}>
              <div className={`w-full  flex-col justify-between pb-2 `}>
                <p>Stories of Art and Architectural Practice </p>
                <p className="w-full leading-none  my-2  text-[13px] ">கலைகளின் கதைகள்</p>
                <p className="leading-3 text-zinc-400 italic text-[9px] w-11/12">
                  “Stories of Art”: the art of telling a narrative through design, and “Practice”:
                  perfecting it through a repetitive pattern of learning and creating.
                </p>
              </div>

              <h5
                className={`font-medium leading-3 w-full  ${
                  isMobile ? "whitespace-pre-wrap  text-justify text-[10px] " : "none"
                }  break-words hyphens-auto mb-2`}
              >
                Staap - Stories of Art and Architecture Practice, was established in 2021 in Chennai, India,
                specializing in architecture, interiors, landscape, and design. We work on projects ranging from local
                to global. As a collective team of young, passionate, like-minded individuals, not just architects, but
                creatives from diverse disciplines. A space, a platform where we explore, learn, and create.
              </h5>

              <h6
                className={`whitespace-pre-wrap text-justify leading-3 ${isMobile ? "text-[10px]": "none"}  break-words hyphens-auto font-medium pb-2   ${
                  isDarkMode ? "border-b-[0.2px] border-zinc-600" : " border-b-[0.2px] border-zinc-400"
                }  `}
              >
                As an award-winning practice, Staap envisions design as a narrative, a way of connecting the dots of
                life, culture, and human experience. Each project comes with its own unique challenges and
                characteristics. Our process begins with a profound understanding, reading between the lines, listening
                to what a space truly needs, and uncovering the unique essence that defines it. We then curate design
                around this understanding, bringing it to life. At Staap, we create works that are living narratives,
                waiting to unfold.
              </h6>
            </div>

            <div
              className={`w-fit mt-2  flex justify-start items-start gap-8 ${
                isDarkMode ? "text-zinc-400" : "text-black/40"
              }  text-left   `}
            >
              <div className="left-part">
                <p>Architecture</p>
                <p>Interior</p>
                <p>Product Design</p>
                <p>Landscape</p>
              </div>

              <div className="right-part">
                <p>Research</p>
                <p>Installation</p>
                <p>Curation</p>
                <p>Design, Built and Mangement</p>
              </div>
            </div>
          </div>
        </div>

        {/* {desktop responsive part2 } */}
        <div
          className={`part2 ${isMobile ? "hidden " : "visible"} h-fit pb-4   w-full  ${
            isDarkMode ? "border-b-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"
          } duration-500 transition-colors ease-in`}
        >
          <div
            className={` text-[11px] -mt-[2px] '}   h-full w-full  flex-wrap-reverse items-end flex justify-between text-left`}
          >
            <h5 className={` text-[15px] }`}>Team</h5>

            <div
              className={` w-[55%] h-fit  flex flex-col items-start  gap-6  -mr-2  text-left  text-zinc-400 text-[11px]'} `}
            >
              <div
                className={`row1 flex justify-start  ${
                  isDarkMode ? " text-white" : "text-black"
                }  items-start ml-1 w-2/3 `}
              >
                <div className={`w-[26%]   h-full text-left`}>
                  <h5>[Principle Architect]</h5>
                  <h5>[Associate]</h5>
                </div>
                <div className="w-[30%] ml-3 mr-1 h-full text-left   ">
                  <h5>Mithun Adhitya</h5>
                  <h5>Karthik Keshav</h5>
                  <h5>Anjhana Kumar</h5>
                  <h5>Mithra Anantham</h5>
                  <h5>Benny Samuel</h5>
                </div>

                <div className="w-[20%]   h-full text-left ">
                  <h5>[Designer]</h5>
                  <h5>[Parametric]</h5>
                  <h5>[Urban designer]</h5>
                  <h5>[Designer]</h5>
                  <h5>[Creative]</h5>
                </div>
              </div>

              <div className={`row2 flex justify-start items-start  w-2/3 `}>
                <div className={`w-[26%] h-full ${isDarkMode ? " text-white" : "text-black"}  ml-1 text-left `}>
                  <h5>[Architect]</h5>
                </div>
                <div className="w-[30%] h-full ml-3 mr-1 text-left">
                  <h5 className={`${isDarkMode ? " text-white" : "text-black"}`}>Sanjay Kannan </h5>
                  <p>Rukkesh Kannan</p>
                  <p>Sonika Matta</p>
                </div>

                <div className={`w-[20%] h-full text-left ${isDarkMode ? " text-white" : "text-black"}`}>
                  <h5>Kavin Raj</h5>
                  <h5>Vinmeen Kritheka</h5>
                  <h5>Vyomini Balamurugan</h5>
                  <p className=" text-zinc-400">Sai Sidharth</p>
                  <p className=" text-zinc-400">Harish Raghavan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {mobile responsive} */}

        <div
          className={`relative part2 ${isMobile ? "visible pt-1" : "hidden"}  pb-6 w-full  ${
            isDarkMode ? "border-b-[0.2px] border-zinc-700" : "border-b-[0.2px] border-zinc-400"
          }`}
        >
          <div className="text-[11px]  -mt-[2px] h-full w-full  flex-col items-start flex justify-between text-left">
            <h5 className="text-[13px]">Team</h5>

            <div className="relative w-full h-fit  mt-2 flex flex-col items-start  gap-6 text-[11px] text-left text-zinc-400 ">
              <div
                className={`row1 flex justify-between w-full  items-start ${
                  isDarkMode ? " text-white" : "text-black"
                }  `}
              >
                <div className="w-[50%]   h-full  text-left  ">
                  <p>[Principle Architect]</p>
                  <p>[Associate]</p>
                </div>
                <div className="w-2/3 ml-4   h-full text-left   ">
                  <h5>Mithun Adhitya</h5>
                  <h5>Karthik Keshav</h5>
                  <h5>Anjhana Kumar</h5>
                  <h5>Mithra Anantham</h5>
                  <h5>Benny Samuel</h5>
                </div>

                <div className="w-[50%] mr-4  h-full text-left ">
                  <h5>[Designer]</h5>
                  <h5>[Parametric]</h5>
                  <h5>[Urban designer]</h5>
                  <h5>[Designer]</h5>
                  <h5>[Creative]</h5>
                </div>
              </div>

              <div className="row2 flex justify-between w-full items-start  ">
                <div className={`w-[50%]  h-full text-left ${isDarkMode ? " text-white" : "text-black"} `}>
                  <p>[Architect]</p>
                </div>
                <div className={`w-2/3 h-full ml-4 ${isDarkMode ? " text-white" : "text-black"}  text-left`}>
                  <h5>Sanjay Kannan </h5>
                  <p className=" text-zinc-400">Rukkesh Kannan</p>
                  <p className=" text-zinc-400">Sonika Matta</p>
                </div>

                <div className={`w-[50%] mr-4 h-full ${isDarkMode ? " text-white" : "text-black"}  text-left `}>
                  <h5>Kavin Raj</h5>
                  <h5>Vinmeen Kritheka</h5>
                  <h5>Vyomini Balamurugan</h5>
                  <p className=" text-zinc-400">Sai Sidharth</p>
                  <p className=" text-zinc-400">Harish Raghavan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //publication awwards */}
        <div className="part3 h-full w-full pb-10 ">
          <div
            className={`text-[11px] ${
              isMobile ? "py-3 " : " "
            } h-full text-[15px]  w-full font-medium flex justify-between text-left`}
          >
            {/* Left Column: Title and Image container */}
            <div className={` w-[32.4%]   ${isMobile ? "flex-col " : "flex"} justify-between  relative`}>
              <h5 className={` ${isMobile ? "text-[13px]" : "text-[15px]"} capitalize w-fit text-nowrap `}>
                Publications and Awards
              </h5>

              {/* Render the image container only when hovering */}
              {hoveredIndex !== null && (
                <div
                  className={`img-about ${
                    isMobile ? " h-[11rem] w-[9rem] mt-3 " : "h-[14rem] w-[12rem] pt-0.5 "
                  }overflow-hidden`}
                >
                  <img
                    className="h-full w-full object-cover rounded-sm object-center transition duration-400 ease-linear"
                    src={hovertexts[hoveredIndex].img || "/placeholder.svg"}
                    alt={hovertexts[hoveredIndex].text}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Year and list of publication links */}

            <div
              className={` w-[53%] ${
                isMobile ? "mr-0 w-[54%] " : "mr-4"
              }   h-full  flex-col  justify-center items-start  'text-[11px]  `}
            >
              <div className={` ${isMobile ? "text-[11px]" : "text-[12px]"}  text-zinc-400`}>
              {hovertexts.map((item, index) => (
                <div key={index} className="relative ml-0.5">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      // Clear any pending timer and mark the user as hovering
                      clearTimeout(timerRef.current)
                      setIsUserHovering(true)
                      setHoveredIndex(index)
                    }}
                    onMouseLeave={() => {
                      // Start a timer to resume auto-cycle after 3 seconds
                      timerRef.current = setTimeout(() => {
                        setIsUserHovering(false)
                        setHoveredIndex(null)
                      }, 2500)
                    }}
                    className={`
                      ${isDarkMode ? "hover:text-white" : "hover:text-black"}
                      ${isDarkMode
                        ? hoveredIndex === index ? "text-white" : "text-zinc-400"
                        : hoveredIndex === index ? "text-black" : "text-zinc-400"}
                      whitespace-pre-wrap hyphens-manual text-balance cursor-pointer shrink-0 transition ease-linear duration-300
                    `}
                  >
                    {item.text}
                  </a>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

