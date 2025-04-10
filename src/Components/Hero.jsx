import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import tovo from "../assets/tovo.mp4";
import hero_mob from "../assets/hero_mob.mp4";
import hero_desk from "../assets/hero_desk.mp4";

import logow from "../assets/Staap - white.png";
const DateDisplay = () => {
  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const year = date.getFullYear();

  return (
    <div className="leading-none text-left text-zinc-50">
      [{new Date().getDate()}]{" "}
      {new Date()
        .toLocaleDateString("en-US", { month: "short", year: "numeric" })
        .replace(/[a-z]/g, (c) => c.toUpperCase())}
      <br />
      {date.toLocaleDateString("en-US", { weekday: "long" })}
    </div>
  );
};

const Hero = () => {
  const vidRef = useRef(null);
  const vidContainer = useRef(null);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   if (!vidRef.current) return;
  //   let animation;

  //   const ctx = gsap.context(() => {
  //     animation = gsap.from(vidRef.current, {
  //       opacity: 1,
  //       filter: "blur(8px)",
  //       // filter: "saturate(0)",
  //       ease: "power2.in",
  //       scrollTrigger: {
  //         trigger:vidContainer.current,
  //         start: "top top",
  //         delay:0,
  //         opacity:1,
  //         filter: "blur(0px)",
  //         // filter: "saturate(1)",
  //         end: "+=1220px",
  //         scrub:2,
  //         pinnedContainer: true,
  //         ease: "Power1",
  //         onUpdate: (self) => {
  //           if (self.progress === 1 && animation) {
  //             // animation.kill();
  //             // ScrollTrigger.getById("nav-trigger")?.kill();
  //           }

  //         },
  //         // markers: true,
  //       },

  //     });
  //     return () => {
  //       ctx.revert();
  //       // animation?.kill();
  //     };

  //   }, []);

  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date().toLocaleTimeString());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

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

  return (
    <div
      ref={vidContainer}
      className="hero h-full  z-[90] w-full overflow-hidden"
    >
      <div className="vid-container h-screen  w-screen overflow-hidden font-semibold">
        {isMobile ? (
          <video
            data-speed="-0.8"
            ref={vidRef}
            className="h-full w-full object-contain object-center transition-all  duration-300"
            src={hero_mob}
            autoPlay
            muted
            loop
            playsInline 
          />
        ) : (
          <video
            data-speed="-0.8"
            ref={vidRef}
            className="h-full w-full object-cover  scale-y-95  object-center transition-all  duration-300"
            src={hero_desk}
            autoPlay
            muted
            loop
            playsInline 
          />
        )}
      </div>

      {/* Desktop Overlay: Visible on md and above */}
      <div className="hidden md:block fixed top-0 left-0 z-[888]  h-screen w-screen">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="z-40 text-zinc-50 text-[10px]  leading-none flex justify-between items-start px-3">
            {/* Date Display */}
            <div className="logo text-left ">
              <DateDisplay />
            </div>

            {/* Time & Location */}
            <div className="links-part flex flex-col items-start leading-3 ml-24 mr-2 ">
              <p>{currentTime} IST</p>
              <div className="location flex items-center gap-2">
                <p>12.9351N, 80.2310E </p>
              </div>
            </div>

            {/* Scrambled Text Animation */}
            <div className="s_last-part scrambleText relative w-64 ml-48 mr-4">
              <p className="text-left leading-none tracking-tight text-white">
                <a href="/">
                  <span className="cursor-pointer inline-block h-3 w-fit  text-[11px]   opacity-100 leading-none">
                    Staap <sup className=" text-[5px] -top-2 -left-0.5">®</sup>
                  </span>
                </a>
                <br />
                Stories of Art and Architectural Practice
              </p>
            </div>

            {/* Description Text */}
            <div className="relative text-justify  text-[9px] w-[27.3%] leading-none ">
              <p className="font-[500] w-full text-right ">
              “Stories of Art”: the art of telling a narrative through design, and “Practice”: perfecting it through a repetitive pattern of learning and creating.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay: Visible on small screens */}
      <div className="block md:hidden  p-2  fixed h-screen w-screen   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 z-[888]  ">
        <div className="flex items-center justify-between  h-full w-full text-[8px]">
          {/* Date Display */}
          <div className="text-left  leading-none ">
            <DateDisplay />
          </div>

          {/* Time & Location */}

          <div className="links-part flex text-zinc-100 flex-col items-start leading-none ">
            <p>{currentTime} IST</p>
            <div className="location flex gap-1">
              <p>12.9351N, 80.2310E </p>
            </div>
          </div>

          {/* Scrambled Text Animation */}
          <div className="">
            <p className="text-right  text-zinc-100 leading-none ">
              <a href="/">
                <span className="cursor-pointer inline-block h-3 w-fit  text-[10px] opacity-100 leading-none">
                  Staap <sup className=" text-[5px] -top-2 -left-0.5">®</sup>
                </span>
              </a>{" "}
              <br />
              Stories of Art and Architectural Practice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
