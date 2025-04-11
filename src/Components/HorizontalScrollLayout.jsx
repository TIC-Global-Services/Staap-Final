import { useState, useEffect, useRef, useCallback, useContext } from "react"
import gsap from "gsap"
import { ThemeContext } from "../utils/themeContext"

// Import your section components
import Hero from "./Hero"
import Work from "./Work"
import About from "./About"
import Connect from "./Connect"

const sections = [
  { id: "home", component: <Hero />, direction: "horizontal" },
  { id: "work", component: <Work />, direction: "horizontal" },
  { id: "about", component: <About />, direction: "vertical" },
  { id: "connect", component: <Connect />, direction: "vertical" },
]

const HorizontalScrollLayout = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // For mobile: track the currently mounted section index
  const [mobileMountedIndex, setMobileMountedIndex] = useState(0)

  const containerRef = useRef(null)
  const slideContainerRef = useRef(null)
  const connectSectionRef = useRef(null)
  const mobileContainerRef = useRef(null)
  const sectionsRef = useRef([])
  const mobileNavRef = useRef(null)

  const { isDarkMode } = useContext(ThemeContext)

  // Mobile detection and update on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset transforms on resize to avoid blank pages for both desktop and mobile
  useEffect(() => {
    // Reset slide container transform for desktop
    if (!isMobile) {
      // gsap.set(slideContainerRef.current, { x: "0%" })
      // gsap.set(connectSectionRef.current, { translateY: "100%" })

      if (currentSection <= 1) {
        gsap.set(slideContainerRef.current, { x: `-${currentSection * 100}%` })
        gsap.set(connectSectionRef.current, { translateY: "100%" })
      } else {
        gsap.set(slideContainerRef.current, { x: "-200%" })
        gsap.set(connectSectionRef.current, {
          translateY: currentSection === 3 ? "0%" : "100%",
        })
      }

    }
    // Reset mobile container transform for mobile
    else {
      gsap.set(mobileContainerRef.current, { x: "0%" })
    }
  }, [isMobile])

  // Desktop scrollToSection remains largely unchanged.
  const scrollToSection = useCallback((index) => {
    if (isScrolling || index < 0 || index >= sections.length) return

    setIsScrolling(true)
    setCurrentSection(index)

    if (isMobile) {
      // Mobile: use our mobile-specific function below
      mobileScrollToSection(index)
      return
    } else {
      // Desktop navigation
      if (index <= 1) {
        gsap.to(slideContainerRef.current, {
          x: `-${index * 100}%`,
          duration: 1,
          ease: "power2.inOut",
        })
        gsap.to(connectSectionRef.current, {
          translateY: "100%",
          duration: 1,
          ease: "power2.inOut",
        })
      } else {
        gsap.to(slideContainerRef.current, {
          x: "-200%",
          duration: 1,
          ease: "power2.inOut",
        })
        if (index === 3) {
          gsap.to(connectSectionRef.current, {
            translateY: "0%",
            duration: 1,
            ease: "power2.inOut",
          })
        } else {
          gsap.to(connectSectionRef.current, {
            translateY: "100%",
            duration: 1,
            ease: "power2.inOut",
          })
        }
      }

      gsap.fromTo(
        sectionsRef.current[index] || document.getElementById(sections[index].id),
        { opacity: 0.8, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        },
      )

      setTimeout(() => {
        setIsScrolling(false)
      }, 1300)
    }
  }, [isScrolling, isMobile, currentSection])

  // Mobile-specific scroll function that mounts only one component and applies fade out/in.
  const mobileScrollToSection = (index) => {
    if (isScrolling || index < 0 || index >= sections.length) return

    // Animate fade out of current mobile component
    const currentEl = mobileContainerRef.current?.querySelector(`#${sections[mobileMountedIndex].id}`)
    if (currentEl) {
      gsap.to(currentEl, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          // Update the mounted component and current section state
          setMobileMountedIndex(index)
          setCurrentSection(index)
          // Use next tick to allow the new element to mount, then fade in
          requestAnimationFrame(() => {
            const newEl = mobileContainerRef.current?.querySelector(`#${sections[index].id}`)
            if (newEl) {
              gsap.fromTo(newEl, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" })
            }
            setIsScrolling(false)
          })
        },
      })
    } else {
      // In case there is no element yet (first mount)
      setMobileMountedIndex(index)
      setCurrentSection(index)
      setIsScrolling(false)
    }
  }

  // Desktop wheel event handler
  useEffect(() => {
    if (isMobile) return

    let accumulatedDelta = 0
    const deltaThreshold = 50

    const handleWheel = (e) => {
      if (e.target instanceof Element && e.target.closest(".disable-horizontal-scroll")) return

      const target = e.target
      const isScrollableChild = target.scrollHeight > target.clientHeight

      if (isScrollableChild) {
        const scrollableElement = target
        const isAtTop = scrollableElement.scrollTop === 0
        const isAtBottom =
          Math.abs(scrollableElement.scrollHeight - scrollableElement.scrollTop - scrollableElement.clientHeight) < 2

        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          return
        }
      }

      e.preventDefault()

      if (isScrolling) return

      accumulatedDelta += Math.abs(e.deltaY)

      if (accumulatedDelta >= deltaThreshold) {
        const direction = e.deltaY > 0 ? 1 : -1
        const nextSection = currentSection + direction

        if (nextSection >= 0 && nextSection < sections.length) {
          scrollToSection(nextSection)
        }

        accumulatedDelta = 0
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isScrolling, scrollToSection, isMobile])

  // Expose scrollToSection method to parent components
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollToSection = scrollToSection
    }
  }, [scrollToSection])

  // Emit custom event when current section changes
  useEffect(() => {
    const event = new CustomEvent("sectionChange", { detail: { sectionIndex: currentSection } })
    document.dispatchEvent(event)
  }, [currentSection])

  // Initialize Connect section position
  useEffect(() => {
    if (connectSectionRef.current && !isMobile) {
      gsap.set(connectSectionRef.current, { translateY: "100%" })
    }
  }, [isMobile])

  // Device-specific touch navigation implementation
  // useEffect(() => {
  //   let touchStartX = 0;
  //   let touchStartY = 0;
  //   let touchEndX = 0;
  //   let touchEndY = 0;
  //   let startTime = 0;

  //   const handleTouchStart = (e) => {
  //     touchStartX = e.changedTouches[0].clientX;
  //     touchStartY = e.changedTouches[0].clientY;
  //     startTime = new Date().getTime();
  //   };

  //   const handleTouchEnd = (e) => {
  //     if (isScrolling) return;

  //     touchEndX = e.changedTouches[0].clientX;
  //     touchEndY = e.changedTouches[0].clientY;

  //     const deltaX = touchEndX - touchStartX;
  //     const deltaY = touchEndY - touchStartY;
  //     const elapsedTime = new Date().getTime() - startTime;

  //     // Minimum distance required to register as a swipe
  //     const minDistance = 50;
  //     // Maximum time for a touch to count as a swipe
  //     const maxTime = 300;

  //     if (isMobile) {
  //       // Mobile: Use horizontal swipe (left-right)
  //       if (Math.abs(deltaX) > minDistance && elapsedTime < maxTime) {
  //         console.log("Mobile horizontal swipe detected:", deltaX > 0 ? "right" : "left");

  //         if (deltaX > 0 && currentSection > 0) {
  //           // Swipe right - go to previous section
  //           scrollToSection(currentSection - 1);
  //         } else if (deltaX < 0 && currentSection < sections.length - 1) {
  //           // Swipe left - go to next section
  //           scrollToSection(currentSection + 1);
  //         }
  //       }
  //     } else {
  //       // Desktop: Use vertical swipe (top-down)
  //       if (Math.abs(deltaY) > minDistance && elapsedTime < maxTime) {
  //         console.log("Desktop vertical swipe detected:", deltaY > 0 ? "down" : "up");

  //         if (deltaY > 0 && currentSection > 0) {
  //           // Swipe down - go to previous section
  //           scrollToSection(currentSection - 1);
  //         } else if (deltaY < 0 && currentSection < sections.length - 1) {
  //           // Swipe up - go to next section
  //           scrollToSection(currentSection + 1);
  //         }
  //       }
  //     }
  //   };

  //   const handleTouchMove = (e) => {
  //     // Allow default scrolling in elements with the disable-touch-scroll class
  //     if (e.target.closest(".disable-touch-scroll")) {
  //       return;
  //     }

  //     if (isMobile) {
  //       // For mobile, prevent horizontal scrolling
  //       const touch = e.touches[0];
  //       const deltaX = touch.clientX - touchStartX;
  //       const deltaY = touch.clientY - touchStartY;

  //       // Only prevent default if horizontal movement is dominant
  //       if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //         e.preventDefault();
  //       }
  //     } else {
  //       // For desktop, prevent vertical scrolling
  //       e.preventDefault();
  //     }
  //   };

  //   const container = containerRef.current;
  //   if (container) {
  //     // Add the event listeners
  //     container.addEventListener("touchstart", handleTouchStart, { passive: true });
  //     container.addEventListener("touchend", handleTouchEnd, { passive: true });
  //     container.addEventListener("touchmove", handleTouchMove, { passive: false });

  //     console.log("Device-specific touch navigation listeners added");
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener("touchstart", handleTouchStart);
  //       container.removeEventListener("touchend", handleTouchEnd);
  //       container.removeEventListener("touchmove", handleTouchMove);
  //     }
  //   };
  // }, [currentSection, scrollToSection, isScrolling, isMobile]);

  return (
    <div className="h-screen w-screen overflow-hidden" ref={containerRef}>
      {isMobile ? (
        // Mobile layout – only render the active component
        <div ref={mobileContainerRef} className="h-full w-full relative">
          <div
            id={sections[mobileMountedIndex].id}
            className="absolute inset-0"
            ref={(el) => (sectionsRef.current[mobileMountedIndex] = el)}
          >
            {sections[mobileMountedIndex].component}
          </div>
        </div>
      ) : (
        // Desktop layout remains as before
        <div ref={slideContainerRef} className="flex h-full">
          <div className="flex-none w-screen h-screen" id="home" ref={(el) => (sectionsRef.current[0] = el)}>
            <Hero />
          </div>
          <div className="flex-none w-screen h-screen" id="work" ref={(el) => (sectionsRef.current[1] = el)}>
            <Work />
          </div>
          <div className="relative flex-none w-screen h-screen">
            <div
              className={`h-screen relative z-10 ${isDarkMode ? "bg-black" : "bg-white"}`}
              id="about"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <About />
            </div>
            <div
              className={`h-screen w-full absolute top-0 left-0 z-20 ${isDarkMode ? "bg-black" : "bg-white"
                } translate-y-full`}
              id="connect"
              ref={(el) => {
                sectionsRef.current[3] = el
                connectSectionRef.current = el
              }}
            >
              <Connect />
            </div>
          </div>
        </div>
      )}

      {/* <NavigationDots /> */}
    </div>
  )
}

export default HorizontalScrollLayout