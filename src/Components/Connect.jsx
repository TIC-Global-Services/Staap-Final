import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../utils/themeContext";

const Connect = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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

  // Device detection (you might want to refine this check based on your needs)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  // Set the bottom value based on the device
  const marValue = isIOS ? "-32px" : "-13px";

  return (
    <div className=" relative w-full px-3  ">
      <div
        style={{
          WebkitOverflowScrolling: Touch,
          overscrollBehavior: "contain",
        }}
        className={`contact-container  ${
          isMobile
            ? "pt-20  pb-24  overflow-y-auto max-h-screen touch-pan-y "
            : "pt-24 overflow-hidden"
        }`}
      >
        <div
          className={`part1 h-fit w-full mt-[6px] pb-2  ${
            isDarkMode
              ? "border-b-[0.2px] border-zinc-700"
              : "border-b-[0.2px] border-zinc-400"
          }  `}
        >
          <div
            className={`text-[11px]  h-full w-full  ${
              isMobile ? "flex-col  " : "flex"
            } items-start  justify-between  text-left  `}
          >
            <button
              className={`
                ${isMobile ? "text-[13px]" : "text-[15px]"}  leading-3`}
            >
              Address
            </button>

            <div
              className={` ${
                isMobile ? "relative w-full mt-4 " : "w-[54.5%] relative  px-1 "
              }   flex   items-start  text-[11px]   font-medium   text-zinc-400 `}
            >
              <div
                className={`row1  h-full w-1/2                 
               ${isMobile ? " w-3/5" : " w-1/2"}   
              `}
              >
                <div
                  className={`w-fit  h-full flex-col items-end justify-end   whitespace-break-spaces`}
                >
                  {isMobile ? (
                    <h5
                      className={`mb-2  w-full leading-3 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      4/456, 2nd Main Rd, Chandrasekhar <br />
                      Avenue, Thoraipakkam,Chennai, Tamil <br />
                      Nadu 600097
                    </h5>
                  ) : (
                    <h5
                      className={`mb-2 leading-3  ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      4/456, 2nd Main Rd, Chandrasekhar <br />
                      Avenue, Thoraipakkam,Chennai, <br />
                      Tamil Nadu 600097
                    </h5>
                  )}

                  <p className="cursor-pointer  mt-1">
                    Contact - +91-9994192333{" "}
                  </p>

                  <a
                    className="cursor-pointer"
                    target="_blank"
                    href="https://maps.app.goo.gl/t9jBmD2iLm6vj2D57"
                  >
                    [View in Maps]
                  </a>

                  <p className={`mt-3 text-[11px] `}>
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div
                className={`row1  h-full ${
                  isMobile ? "w-[46%] " : "w-1/2"
                }  `}
              >
                <div
                  className={`w-fit  h-full flex-col  items-end justify-end   whitespace-break-spaces`}
                >
                  <h5
                    className={`mb-1 !text-zinc-400  ${
                      isMobile ? "text-right -mb-1" : " text-left "
                    } `}
                  >
                    Vendors and Collaborators
                  </h5>

                  <div
                    className={` ${
                      isMobile
                        ? " flex w-full   text-right justify-end items-center "
                        : "flex text-left justify-between items-center "
                    }   ${
                      isDarkMode ? " text-white" : " text-black"
                    }   w-fit h-full  `}
                  >
                    {isMobile ? (
                      <>
                    
                        <button className={` leading-none -mt-0.5 mb-2`}>
                          <a
                            className=""
                            href="mailTo:work@staap.in"
                            target="_blank"
                          >
                          Reach ws work@staap.in
                          </a>
                        </button>
                      </>
                    ) : (
                      <>

                        <p className="inline-block text-zinc-400">Reach Us At</p>
                        <button className={` ml-12  my-1`}>
                          <a
                            className=""
                            href="mailTo:work@staap.in"
                            target="_blank"
                          >
                            work@staap.in
                          </a>
                        </button>
                      </>
                    )}
                  </div>
        
              {isMobile ?(

                  <p
                    className={` mt-14 w-full leading-none 
                    text-[11px] text-zinc-400  text-right `}
                  >
                    Working Hours 10 AM - 6 PM Monday to Friday
                  </p>
              ):(

                  <p  className={` text-left   mt-10
                     text-[11px] text-zinc-400 `}
                  >
                    Working Hours <br />10 AM - 6 PM Monday to Friday
                  </p>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`part2 h-fit w-full ${
            isMobile ? " pt-4" : "pt-20"
          }  pb-3 ${
            isDarkMode
              ? "border-b-[0.2px] border-zinc-700"
              : "border-b-[0.2px] border-zinc-400"
          }   `}
        >
          <div className="h-full w-full  font-medium flex items-start  justify-between  text-left  ">
            <div
              className={`${
                isMobile ? "text-[13px] " : "text-[15px]"
              } leading-4`}
            >
              <button>Careers</button>
              <p className={`text-[12px] text-zinc-400 `}>Join Us</p>
            </div>

            <div
              className={`${
                isMobile ? "w-3/4 pt-4 flex-col " : "w-[55%] "
              } h-fit  p-3 flex  justify-start items-start  text-[11px]  text-left    `}
            >
              <div
                className={`row1 flex   justify-between items-start ${
                  isMobile ? "w-full" : "w-1/2 "
                } `}
              >
                <div
                  className={`  h-full ${
                    isMobile ? "w-full " : "w-1/2"
                  }  whitespace-pre-wrap  text-left     `}
                >
                  <h5 className=" leading-3 ">
                    We’re always keen to connect with talented creatives. For
                    future roles or freelance opportunities
                  </h5>
                </div>
              </div>

              <div
                className={`row1 ${
                  isMobile ? " flex mt-1 w-full " : "flex text-left"
                }  justify-between w-1/2  `}
              >
                <div
                  className={` ${
                    isMobile ? " flex w-full  mt-2 " : "flex text-left"
                  } justify-between  items-center w-fit h-full  `}
                >
                  <p className="inline-block text-zinc-400">Reach Us At</p>

                  <button className={`${isMobile ? "" : "ml-12"}`}>
                    <a className="" href="mailTo:work@staap.in" target="_blank">
                      work@staap.in
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* desktop version*/}
        <div
          className={`part3 ${
            isMobile ? " hidden pt-12 " : "pt-16 visible"
          } h-fit w-full  pb-4   `}
        >
          <div
            className={` text-[11px] h-full w-full  font-medium flex items-start  justify-between  text-left  `}
          >
            <div className="flex flex-col gap-4 ">
              <h5 className="text-[15px] leading-4 font-normal">
                General Queries
              </h5>

              <div className=" flex justify-center gap-10 items-start ">
              <h5 className={` text-[15px] leading-4 font-normal `}>
                Reach out to us at
                <button>
                  <a
                    className="ml-2 "
                    href="mailTo:Write@staap.in"
                    target="_blank"
                  >
                    write@staap
                  </a>
                </button>
                .in and let’s bring
                <br />
                your vision to life. We’re excited to hear what
                <br />
                you’ve been imagining.
              </h5>

              <div className=" flex-col  ">
                <div className="flex flex-col  items-start  ">
                  <p className={` text-[11px] text-zinc-400  capitalize  `}>
                    Follow us on
                  </p>
                  <button>
                    <a
                      className=" capitalize text-zinc-400 pt-1 "
                      href="https://www.instagram.com/staap.in"
                      target="_blank"
                    >
                      [Instagram]
                    </a>
                  </button>
                </div>

                <div className="flex flex-col  items-start mt-2 ">
                  <p className={` text-[11px] text-zinc-400  capitalize  `}>
                    Add us on
                  </p>
                  <button>
                    <a
                      className=" capitalize text-zinc-400 pt-1 "
                      href="https://in.linkedin.com/company/staapin"
                      target="_blank"
                    >
                      [LinkedIn]
                    </a>
                  </button>
                </div>
              </div>

              </div>
              
              <h5 className="text-[15px] -mt-3 leading-none font-normal">+91-9994192333</h5>


            </div>
              
              

            <div
              className={`w-[55%] h-fit  flex  items-start  text-[11px] text-zinc-400 font-medium  text-left  px-2 `}
            >
              <div className="row1 flex  justify-between items-start  w-1/2 ">
                <div className="w-3/4 h-full text-left   ">
                  <p className={`text-[12px] text-zinc-400  capitalize  `}>
                    Privacy
                  </p>

                  <p className=" mt-1 text-justify leading-3 ">
                    You, and your privacy, matter to us. We don’t engage in
                    creepy practices like invasive data tracking,
                    fingerprinting, or selling your information to third
                    parties. We use Plausible, an open-source, cookie-free, an
                    alytics tool that respects your privacy by not collecting
                    personal data.
                  </p>
                </div>
              </div>

              <div className="row2 flex justify-between w-1/2 ml-1 ">
                <div
                  className={`w-3/5  h-full text-[11px] text-zinc-400  text-left `}
                >
                  <p className={`text-[12px] text-zinc-400  capitalize`}>
                    Thank you
                  </p>

                  <p className="mt-1 text-justify leading-3">
                    Architecture is a vast, ever-evolving land scape of ideas,
                    spaces, and experiences. Thanks for exploring our little
                    corner of design and creativity.
                  </p>
                </div>

                <div
                  className={`w-fit flex flex-col items-end text-[12px] text-zinc-400 text-right`}
                >
                  <p className="">
                    Copyright <br />® 2021-2025
                  </p>

                  <p
                    className={` text-[12px] mt-[4.5rem] text-zinc-400  w-full   leading-4 `}
                  >
                    Designed by Staap <br />
                    <a
                      href="https://www.theinternetcompany.one/"
                      target="_blank"
                    >
                      Developed by TIC Global
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile responsive version */}
        <div
          className={`part3 ${
            isMobile ? "pt-3  visible" : "pt-16 hidden"
          }  h-fit w-full  pb-4   `}
        >
          <div className="text-[11px] h-full w-full  font-medium flex-col items-start  justify-between  text-left  ">
            <div className="flex w-full  flex-col gap-2  ">
 
            <h5 className="text-[15px] leading-4 font-normal">General Queries</h5>
             
              <h5 className=" text-[15px] whitespace-pre-wrap text-wrap leading-4 font-normal ">
                Reach out to us at
                <button>
                  <a
                    className="ml-1"
                    href="mailTo:Write@staap.in"
                    target="_blank"
                  >
                    write@staap
                  </a>
                </button>
                .in and let’s bring your vision to life. We’re excited to hear
                what
                <br />
                you’ve been imagining.
              </h5>

              <h5 className="text-[15px] leading-none font-normal">+91-9994192333</h5>
 
                 
              <div className=" mt-3  flex  gap-2 justify-between items-start ">
                <div className="flex flex-col items-start  ">
                  <p className=" text-[12px] text-zinc-400  capitalize">
                    Follow us on
                  </p>
                  <button>
                    <a
                      className=" capitalize text-zinc-400 pt-1 "
                      href="https://www.instagram.com/staap.in"
                      target="_blank"
                    >
                      [Instagram]
                    </a>
                  </button>
                </div>

                <div className="flex flex-col  items-start   ">
                  <p className=" text-[12px] text-zinc-400  capitalize">
                    Add us on
                  </p>
                  <button>
                    <a
                      className=" capitalize text-zinc-400 pt-1 "
                      href="https://in.linkedin.com/company/staapin"
                      target="_blank"
                    >
                      [LinkedIn]
                    </a>
                  </button>
                </div>
              </div>
            </div>

            {/* 
            <div className="copyright mt-[72px]">
            <p className=" ">
                      Copyright <br />
                      ® 2021-2025
                    </p>
            </div> */}

            <div className="w-full  pt-5 h-fit flex  items-start  text-[11px] text-zinc-400 font-medium  text-left  ">
              <div className="row1  flex  justify-between items-start  w-1/2 ">
                <div className="w-[90%]  h-full text-left   ">
                  <p className="text-zinc-400 text-[11px]">Privacy</p>

                  <p className=" mt-1   whitespace-break-spaces  text-balance   tracking-normal leading-3">
                    You, and your privacy, matter to us. We don’t engage in
                    creepy practices like invasive data tracking,
                    fingerprinting, or selling your information to third
                    parties. We use Plausible, an open-source, cookie-free, an
                    alytics tool that respects your privacy by not collecting
                    personal data.
                  </p>
                </div>
              </div>

              <div className="row2   flex justify-between w-1/2  ">
                <div className="w-3/4  h-full text-[11px] text-zinc-400  text-left ">
                  <p className="text-zinc-400  text-[11px]">Thank you</p>

                  <p className="mt-1  whitespace-break-spaces  text-balance  tracking-normal  leading-3 ">
                    Architecture is a vast, ever-evolving land scape of ideas,
                    spaces, and experiences. Thanks for exploring our little
                    corner of design and creativity.
                  </p>
                </div>
              </div>

              <div className=" flex flex-col items-end text-[11px] text-zinc-400 text-right">
                <p className="text-nowrap">
                  Copyright <br />® 2021-2025
                </p>
              </div>
            </div>
            <p
              style={isMobile ? { marginTop: marValue } : {}}
              className="text-[11px] text-zinc-400  text-right text-nowrap w-full leading-4 "
            >
              Designed by Staap <br />
              <a href="https://www.theinternetcompany.one/" target="_blank">
                Developed by TIC Global
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
