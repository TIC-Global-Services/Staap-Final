// Add this to your Loader component to manage touch events during the loading state

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState, useRef, useEffect } from "react";

import logow from "../assets/Staap - white.png";


import loadervid from "../assets/loading screen.mp4";
// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const Loader = () => {
  const loaderRef = useRef(null);
  const loaderRef2 = useRef(null);
  const loaderRef2mob = useRef(null);
  const slidePageRef = useRef(null);
  const slidePageRef2 = useRef(null);
  const centertext = useRef(null);
  const centertext2 = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [loaderActive, setLoaderActive] = useState(true);

  // Responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Component to display the formatted date
  const DateDisplay = () => (
    <div className="leading-none text-left text-zinc-50">
      [{new Date().getDate()}] {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).replace(/[a-z]/g, c => c.toUpperCase())} <br/>
      {new Date().toLocaleDateString("en-US", { weekday: "long" })}
    </div>
  );

  
  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Video Loader Animation
  useEffect(() => {
    if (!loaderRef.current) return;

    gsap.from(loaderRef.current, {
      opacity: 1,
      // scale:1,
      duration:3.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          // delay: 0.5,
          duration: 3.1,
          stagger: true,
          ease: "power1.in",
          onComplete: () => {
            gsap.set(loaderRef.current, { display: "none", pointerEvents: "none" });
          },
        });
      },
    });
  }, [loaderRef.current]);

  // Scroll-triggered fade-out animation
  
  useEffect(() => {
    if (!loaderRef2.current) return;
    
    gsap.to(loaderRef2.current, {
      opacity: 0,
      filter: "blur(6px)",
      duration:2.5,
      ease: "power2.in",
      scrollTrigger: {
        trigger: loaderRef2.current,
        start: "top top",
        background: "transparent",
        scrub: 5,
        end: "+=850px",
        onLeave: () => {
          gsap.set(loaderRef2.current, { display: "none", pointerEvents: "none" });
          setLoaderActive(false);
        },
      },
    });

    if (!loaderRef2mob.current) return;
    
    gsap.to(loaderRef2mob.current, {
      opacity:0,
      delay:5.5,
      color: "transparent",
      duration:1.8,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(loaderRef2mob.current, { display: "none", pointerEvents: "none" });
        setLoaderActive(false);
      },
    });


  }, []);


  //click animation for landing page  
  useEffect(() => {
    if (!loaderRef2.current || !slidePageRef.current ) return;
    
    slidePageRef.current.addEventListener('click', () => {
      gsap.to(loaderRef2.current, {
        opacity:0,
        duration: 1.2,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(loaderRef2.current, { display: "none", pointerEvents: "none" });
          setLoaderActive(false);
        },
      });
    });

    // slidePageRef2.current.addEventListener('click', () => {
    //   gsap.to(loaderRef2mob.current, {
    //     y: "-100%",
    //     duration:1.2,
    //     ease: "power1.in",
    //     onComplete: () => {
    //       gsap.set(loaderRef2mob.current, { display: "none", pointerEvents: "none" });
    //       setLoaderActive(false);
    //     },
    //   });
    // });

  }, []);




//   useEffect(() => {
//   console.log("slidePageRef2:", slidePageRef2.current);
//   if (!slidePageRef2.current) return;

//   slidePageRef2.current.addEventListener("click", () => {
//     console.log("Clicked on slidePageRef2");
//     gsap.to(loaderRef2mob.current, {
//       y:"-100%",
//       duration: 1,
//       ease: "power2.in",
//       onComplete: () => {
//         gsap.set(loaderRef2mob.current, { display: "none", pointerEvents: "none" });
//       },
//     });
//   });
// }, []);



  // Touch event handling
  useEffect(() => {
    if (!loaderActive) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (loaderActive) {
        e.preventDefault();
      }

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY;

      if (deltaY < -50) {
        ScrollTrigger.create({
          trigger: loaderRef2.current || loaderRef2mob.current,
          start: "top top",
          onEnter: () => {
            window.scrollTo(0, 100);
          }
        });
      }
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;

      if (deltaY < -100) {
        if (loaderRef2.current) {
          gsap.to(loaderRef2.current, {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              gsap.set(loaderRef2.current, { display: "none", pointerEvents: "none" });
              setLoaderActive(false);
            }
          });
        }

        if (loaderRef2mob.current) {
          gsap.to(loaderRef2mob.current, {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              gsap.set(loaderRef2mob.current, { display: "none", pointerEvents: "none" });
              setLoaderActive(false);
            }
          });
        }
      }
    };

    const loaderElements = [loaderRef2.current, loaderRef2mob.current].filter(Boolean);

    loaderElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    return () => {
      loaderElements.forEach(element => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      });
    };
  }, [loaderActive]);

  // Add a swipe indicator for mobile
  const SwipeIndicator = () =>(
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 text-center text-white text-xs opacity-80 pointer-events-none">
      <div className="animate-bounce mb-1">↓</div>
      <div>Swipe Down To Continue</div>
    </div>
  );

  return (
    <div className="w-full ">
      {/* Video Loader */}
      <div ref={loaderRef} className={` fixed h-[100%]  ${isMobile?"top-1/2":"top-[47%]"} left-1/2 bg-black -translate-x-1/2 -translate-y-1/2  w-[100%] z-[999] `}>
        <div className={`load-container  h-full w-full `}>        
            <video className={`h-full w-full  object-contain ${isMobile ? "object-cover" : ""}`} src={loadervid} autoPlay playsInline muted></video>
        </div>
      </div>

      {/* Overlay Loader - Desktop */}
      <div ref={loaderRef2} className="fixed  hidden md:block bg-black top-0 left-0 z-[988]  backdrop-blur-lg h-screen w-screen">
       
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-full">
          <div className="z-40 text-zinc-50 text-[10px] leading-none flex justify-between items-start px-3">
            {/* Date Display */}
            <div className="logo">
              <div className="text-zinc-50">
                <DateDisplay />
              </div>
            </div>

            {/* Time & Location */}
            <div className="links-part flex flex-col items-start leading-none ml-24 mr-2">
              <p>{currentTime} IST</p>
              <div className="location flex items-center gap-2">
                <p>12.9351N, 80.2310E </p>
              </div>
            </div>

            {/* Scrambled Text Animation */}
            <div  className="s_last-part scrambleText  relative w-64 ml-48 mr-4">
              <p className="text-left leading-none tracking-tight">
              <span onClick={()=> slidePageRef} ref={slidePageRef}  className="cursor-pointer inline-block h-3 w-fit saturate-200 brightness-100 text-[11px] opacity-100 leading-none">
                  Staap  <sup className=" text-[5px] -top-2 -left-0.5 ">®</sup>
                  </span><br />
                  <span onClick={()=> slidePageRef} ref={slidePageRef} className=" cursor-pointer" >

                Stories of Art and Architectural Practice
                  </span>
              </p>
            </div>

            {/* Description Text */}
            <div className="relative  text-justify text-[9px] w-[27.3%] leading-none ">
              <p className="font-[500] w-full text-right ">
              “Stories of Art”: the art of telling a narrative through design, and “Practice”: perfecting it through a repetitive pattern of learning and creating.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version */}
       
      <div ref={loaderRef2mob} className={`md:hidden bg-black w-full px-2 h-screen fixed top-1/2 left-1/2 -translate-x-1/2 text-white -translate-y-1/2 inset-0 z-[900]`}> 
        {/* {isMobile && loaderActive && <SwipeIndicator />} */}
        
              
        {/* <div className="absolute bg-red-600 top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <p className="text-left tracking-tight text-[9px] text-zinc-50  mb-1 leading-none ">
            <span onClick={()=>slidePageRef2} ref={slidePageRef2} className=" inline-block h-3 w-8   leading-none  -mb-0.5">
                  <img className="h-full w-full object-cover" src={logow} alt="logo" srcSet="" />
            </span> <br />
              Stories of Art and Architectural Practice
            </p>
          </div> */}



        {/* <div className="flex items-center justify-between h-full w-full text-[9px]">
          
          <div className="text-left text-[10px]">
            <DateDisplay />
          </div>

          
          <div className="links-part flex flex-col items-start leading-none">
            <p>{currentTime} IST</p>
            <div className="location flex gap-1">
            <p>12.9351N, 80.2310E </p>
            </div>
          </div>

          
          <div className="">
            <p className="text-right tracking-tight text-zinc-50  mb-1 leading-none ">
            <span onClick={()=> slidePageRef2} ref={slidePageRef2} className=" inline-block h-3 w-8   leading-none  -mb-0.5">
                  <img className="h-full w-full object-cover" src={logow} alt="logo" srcSet="" />
            </span> <br />
              Stories of Art and Architectural Practice
            </p>
          </div>
        </div> */}


      </div>
       

     
    </div>
  );
};

export default Loader;