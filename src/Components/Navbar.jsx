"use client"

import { useRef, useState, useEffect, useContext } from "react"
import { ThemeContext } from "../utils/themeContext"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLocation, useNavigate } from "react-router-dom"
import logow from "../assets/Staap - white.png"
import logob from "../assets/Staap - black.png"

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const Links = [
    { name: "Staap", path: "" },
    { name: "Work", path: "work" },
    { name: "About", path: "about" },
    { name: "Connect", path: "connect" },
  ]

  // Desktop Navbar references and state
  const TopNavbarRef = useRef(null)
  const TopNavbarRef2 = useRef(null)
  const TopNavhoverRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { isDarkMode } = useContext(ThemeContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [touchStartY, setTouchStartY] = useState(0)
  const [touchDistance, setTouchDistance] = useState(0)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      // setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  // Check if we're on the SmartLiving page
  const isProjectPage = location.pathname.includes("/project")
  const isProjectR320 = location.pathname.includes("/project/1")

  const isProjectPagebgwhite =
    location.pathname.includes("/project/2") ||
    location.pathname.includes("/project/3") ||
    location.pathname.includes("/project/5")

  const isProjectPagebgBlack = isProjectPage && !isProjectPagebgwhite

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e) => {
    if (!TopNavbarRef.current || isProjectPage) return

    const currentY = e.touches[0].clientY
    const distance = touchStartY - currentY
    setTouchDistance(distance)

    // Only apply animations on desktop, not on mobile
    if (!isMobile) {
      // Calculate a progress value between 0 and 1 based on touch distance
      // Adjust the divisor (100) to control sensitivity
      const progress = Math.min(Math.max(distance / 100, 0), 1)

      // Manually update the navbar position based on touch movement
      if (distance > 0) {
        // Scrolling up (revealing navbar)
        gsap.to(TopNavbarRef.current, {
          filter: "blur(0px)",
          opacity: 1,
          top: "0px",
          duration: 0.3,
          ease: "power2.out",
        })
      } else if (distance < -50) {
        // Scrolling down (hiding navbar) - with threshold
        gsap.to(TopNavbarRef.current, {
          filter: "blur(0px)",
          opacity: 0,
          top: "0px",
          duration: 0.3,
          ease: "power2.in",
        })
      }

      // Do the same for mobile navbar
      if (TopNavbarRef2.current) {
        if (distance > 0) {
          gsap.to(TopNavbarRef2.current, {
            filter: "blur(0px)",
            opacity: 1,
            top: "0px",
            duration: 0.3,
            ease: "power2.out",
          })
        } else if (distance < -50) {
          gsap.to(TopNavbarRef2.current, {
            filter: "blur(0px)",
            opacity: 0,
            top: "0px",
            duration: 0.3,
            ease: "power2.in",
          })
        }
      }
    }
  }

  const handleTouchEnd = () => {
    setTouchDistance(0)
  }

  useEffect(() => {
    // Add touch event listeners to the document
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [touchStartY, isProjectPage])

  useEffect(() => {
    // Don't apply animations on SmartLiving page or on mobile
    if (isProjectPage || isMobile) return

    if (!TopNavbarRef.current) return
    let animation
    const ctx = gsap.context(() => {
      animation = gsap.from(TopNavbarRef.current, {
        filter: "blur(0px)",
        opacity: 0,
        top: "-140px",
        ease: "power2.in",
        scrollTrigger: {
          id: "navbar",
          trigger: TopNavbarRef.current,
          start: "top top",
          end: "+=1050px",
          opacity: 1,
          duration: 2.5,
          delay: 0.4,
          ease: "power2.in",
          scrub: true,
          zIndex: 88,
          pinnedContainer: true,
          onUpdate: (self) => {
            if (self.progress === 1 && animation) {
              animation.kill()
              ScrollTrigger.getById("nav-trigger")?.kill()
            }
          },
        },
      })
    }, TopNavbarRef)

    return () => {
      ctx.revert()
      animation?.kill()
    }
  }, [isProjectPage, isMobile])

  useEffect(() => {
    // Don't apply animations on SmartLiving page or on mobile
    if (isProjectPage || isMobile) return

    if (!TopNavbarRef2.current) return
    let animation
    const ctx = gsap.context(() => {
      animation = gsap.from(TopNavbarRef2.current, {
        filter: "blur(0px)",
        opacity: 0,
        top: "0px",
        ease: "power2.in",
        scrollTrigger: {
          trigger: TopNavbarRef2.current,
          start: "top top",
          end: "+=1100px",
          opacity: 1,
          duration: 2.5,
          ease: "power2.in",
          scrub: true,
          zIndex: 88,
          onUpdate: (self) => {
            if (self.progress === 1 && animation) {
              animation.kill()
              ScrollTrigger.getById("nav-trigger")?.kill()
            }
          },
        },
      })
    }, TopNavbarRef2)

    return () => {
      ctx.revert()
      animation?.kill()
    }
  }, [isProjectPage, isMobile])

  // In Navbar.jsx - for main Navbar component
  const handleNavClick = (index) => {
    setSelectedIndex(index)
    // Get the path from the Links array
    const path = Links[index].path

    // If we're on the SmartLiving page, navigate back to home with the appropriate section
    if (isProjectPage) {
      // Instead of using custom event, use navigation state
      if (index === 0) {
        // For "Staap", navigate to home
        navigate("/", { state: { fromProject: true } })
      } else {
        // For other links, navigate to the section on home page
        navigate(`/?section=${path}`, { state: { fromProject: true } })
      }
      return
    }

    // If we're on the home page, use the scrollToSection functionality
    const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden")
    if (mainContainer && mainContainer.scrollToSection) {
      mainContainer.scrollToSection(index)
    }
  }

  // Mobile menu state and toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true)

  useEffect(() => {
    setMobileMenuOpen(true)
  }, [])

  // Check for section parameter in URL when component mounts
  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      const section = params.get("section")
      if (section) {
        // Find the index of the section
        const sectionIndex = Links.findIndex((link) => link.path === section)
        if (sectionIndex !== -1) {
          // Wait for the page to load, then scroll to section
          setTimeout(() => {
            const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden")
            if (mainContainer && mainContainer.scrollToSection) {
              mainContainer.scrollToSection(sectionIndex)
              setSelectedIndex(sectionIndex)
            }
          }, 500)
        }
      }
    }
  }, [location.search])

  // Listen for section change events from HorizontalScrollLayout
  useEffect(() => {
    const handleSectionChange = (event) => {
      setSelectedIndex(event.detail.sectionIndex)
    }

    document.addEventListener("sectionChange", handleSectionChange)

    return () => {
      document.removeEventListener("sectionChange", handleSectionChange)
    }
  }, [])

  return (
    <>
      {/* Desktop Navbar (visible on md and above) */}
      <nav
        // ref={TopNavbarRef}
        className={`hidden md:flex fixed shrink-0 top-0 left-0 z-[888] h-fit w-screen flex-col justify-between items-center ${isProjectPage ? "opacity-100" : ""
          }`}
      // style={{ backgroundColor: bgColor }}
      >
        <div
          className={`navbar 
    ${isProjectR320 ? "bg-[#c6c2bf]" : isProjectPagebgwhite ? "bg-white" : "bg-black"}

    ${!isProjectPage && (isDarkMode ? "bg-black" : "bg-white")}
    backdrop-blur-sm h-24 p-3 top-0 left-0 w-full overflow-hidden flex justify-between items-center`}
        >
          <div className="logo h-16 w-14">
            <button onClick={() => handleNavClick(0)}>
              <div className="h-full w-full flex items-center justify-center">
                {isProjectPagebgwhite ? (
                  // For white background project pages - ALWAYS black logo only
                  <img
                    className="h-full w-full object-cover"
                    src={logob || "/placeholder.svg"}
                    alt="Black Logo"
                  />
                ) : isProjectR320 ? (
                  // R320 project - white logo
                  <img
                    className="h-full w-full object-cover"
                    src={logow || "/placeholder.svg"}
                    alt="White Logo"
                  />
                ) : (
                  // Other pages - based on dark mode
                  <img
                    className="h-full w-full object-cover"
                    src={isDarkMode ? logow : logob || "/placeholder.svg"}
                    alt="Logo"
                  />
                )}
              </div>
            </button>
          </div>


          <div className="links-part flex flex-col items-start leading-6 ml-32">
            {Links.map(
              (link, index) =>
                index !== 0 && (
                  <button
                    onClick={() => handleNavClick(index)}
                    key={index}
                    className={`cursor-pointer flex-shrink-0 text-[15px]
            ${isProjectPagebgwhite
                        ? "hover:text-black"
                        : isDarkMode
                          ? "hover:text-white"
                          : "hover:text-black"
                      }
            ${index === selectedIndex
                        ? isDarkMode
                          ? "text-white font-medium"
                          : "text-black font-medium"
                        : isProjectR320
                          ? "text-white/60 hover:text-white "
                          : "text-zinc-500"
                      }
          `}
                  >
                    {link.name}
                  </button>
                )
            )}
          </div>



          <div className="s_last-part relative h-full w-64  ml-60 -mr-10">
            <p
              className={`absolute w-[100%] text-wrap  text-[11px] leading-3 
                
                ${isProjectR320
                  ? "text-white"
                  : isProjectPagebgBlack && !isProjectPagebgwhite
                    ? "text-zinc-400 hover:text-white"
                    : isProjectPagebgwhite ? "text-zinc-400 hover:text-black"
                      : isDarkMode
                        ? "text-white/40 hover:text-white"
                        : "text-black/40 hover:text-black"
                }
              text-left p-1 leading-3 tracking-normal `}
            >
              {/* Every art, space, and place holds a quiet story waiting to be shared. We listen, understand, and through
              our practice, create works that speak in their own voice, whispering timeless tales of culture and life. */}
              Every art, space, and place holds a story waiting to be shared. We listen, understand, and through our
              practice, create works that are living narratives, waiting to unfold.
            </p>
          </div>

          <div className="last-part relative h-full  w-1/3">
            <p
              className={`
                ${isProjectR320
                  ? "text-white"
                  : isProjectPagebgBlack && !isProjectPagebgwhite
                    ? "text-zinc-400 hover:text-white"
                    : isProjectPagebgwhite ? "text-zinc-400 hover:text-black"
                      : isDarkMode
                        ? "text-white/40 hover:text-white"
                        : "text-black/40 hover:text-black"


                }

            text-[11px] leading-3 ml-20  p-1 
           
            text-wrap text-right tracking-normal  `}
            >
              Your space holds a story waiting to be told. We craft visions into elegant designs that echo art, culture,
              and life. Share your ideas with us, and together, let's design a space that reflects your unique
              narrative. <br />
              Contact us at
              <a className="ml-1" href="mailto:write@staap.in">
                write@staap.in.
              </a>
            </p>
          </div>
        </div>
      </nav>


      {/* Mobile Navbar (visible on small screens) - Fixed position on mobile */}
      <nav
        ref={TopNavbarRef2}
        className={`fixed top-0 left-0 flex md:hidden h-20 z-[888] w-screen backdrop-blur-sm p-3 transition-colors duration-800 
  ${isProjectPage || isMobile ? "opacity-100" : ""}
  ${isProjectR320 ? "bg-[#c6c2bf]" : isProjectPagebgwhite ? "bg-white" : "bg-black"}
  ${!isProjectPage && (isDarkMode ? "bg-black" : "bg-white")}
`}
        style={{
          position: isMobile ? "fixed" : "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="relative flex items-center justify-between gap-5 w-full">
          <button onClick={() => handleNavClick(0)}>
            {/* Logo rendering based on page type */}
            <div className="h-5 w-14">
              <div className="h-full w-full flex items-center justify-center">
                {isProjectPagebgwhite ? (
                  // White background project pages - always black logo
                  <img
                    className="h-full w-full object-cover"
                    src={logob || "/placeholder.svg"}
                    alt="Black Logo"
                  />
                ) : isProjectR320 ? (
                  // R320 project - white logo
                  <img
                    className="h-full w-full object-cover"
                    src={logow || "/placeholder.svg"}
                    alt="White Logo"
                  />
                ) : isProjectPagebgBlack ? (
                  // Black background project pages - white logo
                  <img
                    className="h-full w-full object-cover"
                    src={logow || "/placeholder.svg"}
                    alt="White Logo"
                  />
                ) : (
                  // Other pages - based on dark mode
                  <img
                    className="h-full w-full object-cover"
                    src={isDarkMode ? logow : logob || "/placeholder.svg"}
                    alt="Logo"
                  />
                )}
              </div>
            </div>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="relative flex items-center justify-end">
            <p
              className={`
          ${isProjectR320
                  ? "text-white"
                  : isProjectPagebgBlack
                    ? "text-zinc-400 hover:text-white"
                    : isProjectPagebgwhite
                      ? "text-zinc-400 hover:text-black"
                      : isDarkMode
                        ? "text-white/40 hover:text-white"
                        : "text-black/40 hover:text-black"
                }
        text-[8px] whitespace-pre-wrap hyphens-auto w-full py-1 text-right tracking-normal leading-none`}
            >
              Your space holds a story waiting to be told. We craft visions into elegant designs that echo art, culture,
              and life. Share your ideas with us, and together, let's design a space that reflects your unique
              narrative. Contact us at
              <a className="ml-1" href="mailto:write@staap.in">
                write@staap.in.
              </a>
            </p>
          </div>
        )}
      </nav>
    </>
  )
}

// BottomNav Component (visible only on mobile)
const BottomNav = () => {
  const Links = [
    { name: "Staap", path: "" },
    { name: "Work", path: "work" },
    { name: "About", path: "about" },
    { name: "Connect", path: "connect" },
  ]

  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const BottomNavRef = useRef(null)
  const BottomNavRef2 = useRef(null)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchDistance, setTouchDistance] = useState(0)

  const location = useLocation()
  const navigate = useNavigate()

  // Check if we're on the SmartLiving page
  const isProjectPage = location.pathname.includes("/project")
  const isProjectR320 = location.pathname.includes("/project/1")

  const isProjectPagebgwhite =
    location.pathname.includes("/project/2") ||
    location.pathname.includes("/project/3") ||
    location.pathname.includes("/project/5")


  const isProjectPagebgBlack = isProjectPage && !isProjectPagebgwhite


  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      // setScreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e) => {
    if ((!BottomNavRef.current && !BottomNavRef2.current) || isProjectPage || isMobile) return

    const currentY = e.touches[0].clientY
    const distance = touchStartY - currentY
    setTouchDistance(distance)

    // Only apply animations on desktop, not on mobile
    if (!isMobile) {
      // Calculate progress for animation
      const progress = Math.min(Math.max(distance / 100, 0), 1)

      // Update desktop bottom nav position based on touch
      if (BottomNavRef.current) {
        if (distance < 0) {
          // Scrolling down (revealing bottom nav)
          gsap.to(BottomNavRef.current, {
            filter: "blur(0px)",
            opacity: 1,
            bottom: "0px",
            duration: 0.3,
            ease: "power2.out",
          })
        } else if (distance > 50) {
          // Scrolling up (hiding bottom nav) - with threshold
          gsap.to(BottomNavRef.current, {
            filter: "blur(5px)",
            opacity: 0,
            bottom: "-50px",
            duration: 0.3,
            ease: "power2.in",
          })
        }
      }

      // Update mobile bottom nav position
      if (BottomNavRef2.current) {
        if (distance < 0) {
          gsap.to(BottomNavRef2.current, {
            filter: "blur(0px)",
            opacity: 1,
            bottom: "0px",
            duration: 0.3,
            ease: "power2.out",
          })
        } else if (distance > 50) {
          gsap.to(BottomNavRef2.current, {
            filter: "blur(0px)",
            opacity: 0,
            bottom: "-50px",
            duration: 0.3,
            ease: "power2.in",
          })
        }
      }
    }
  }

  const handleTouchEnd = () => {
    setTouchDistance(0)
  }

  useEffect(() => {
    // Add touch event listeners to the document
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [touchStartY, isProjectPage])

  useEffect(() => {
    // Don't apply animations on SmartLiving page or on mobile
    if (isProjectPage || isMobile) return

    if (!BottomNavRef.current) return
    let animation
    const ctx = gsap.context(() => {
      animation = gsap.from(
        BottomNavRef.current,
        {
          delay: -1.8,
          filter: "blur(5px)",
          opacity: 1,
          bottom: "-50px",
          ease: "power2.in",
          scrollTrigger: {
            trigger: BottomNavRef.current,
            start: "top bottom",
            end: "+=600px",
            // markers:true,
            opacity: 1,
            duration: 2.5,
            ease: "power2.in",
            scrub: true,
            zIndex: 88,
            onUpdate: (self) => {
              if (self.progress === 1 && animation) {
                animation.kill()
                ScrollTrigger.getById("nav-trigger")?.kill()
              }
            },
          },
        },
        "a",
      )
    }, BottomNavRef)
    return () => {
      ctx.revert()
      animation?.kill()
    }
  }, [isProjectPage, isMobile])

  useEffect(() => {
    // Don't apply animations on SmartLiving page or on mobile
    if (isProjectPage || isMobile) return

    if (!BottomNavRef2.current) return
    let animation
    const ctx = gsap.context(() => {
      animation = gsap.from(
        BottomNavRef2.current,
        {
          delay: -1.8,
          filter: "blur(2px)",
          opacity: 0,
          bottom: "0",
          ease: "power2.in",
          scrollTrigger: {
            trigger: BottomNavRef2.current,
            start: "top bottom",
            end: "+=1050px",
            opacity: 1,
            duration: 2.5,
            ease: "power2.in",
            scrub: true,
            zIndex: 88,
            onUpdate: (self) => {
              if (self.progress === 1 && animation) {
                animation.kill()
                ScrollTrigger.getById("nav-trigger")?.kill()
              }
            },
          },
        },
        "a",
      )
    }, BottomNavRef2)
    return () => {
      ctx.revert()
      animation?.kill()
    }
  }, [isProjectPage, isMobile])

  const handleNavClick = (index) => {
    setSelectedIndex(index)
    const path = Links[index].path

    // If we're on the SmartLiving page, navigate back to home with the appropriate section
    if (isProjectPage) {
      // Instead of using custom event, use navigation state like in the desktop version
      if (index === 0) {
        // For "Staap", navigate to home
        navigate("/", { state: { fromProject: true } })
      } else {
        // For other links, navigate to the section on home page
        navigate(`/?section=${path}`, { state: { fromProject: true } })
      }
      return
    }

    const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden")
    if (mainContainer?.scrollToSection) {
      mainContainer.scrollToSection(index)
    }
  }

  // Mobile menu state and toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true)

  useEffect(() => {
    setMobileMenuOpen(true)
  }, [])

  // Check for section parameter in URL when component mounts

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      const section = params.get("section")
      if (section) {
        const sectionIndex = Links.findIndex((link) => link.path === section)
        if (sectionIndex !== -1) {
          setSelectedIndex(sectionIndex)
        }
      }
    } else if (location.pathname === "/") {
      // Reset to home when on main page without section
      setSelectedIndex(0)
    }
  }, [location.search])

  // Listen for section change events from HorizontalScrollLayout
  useEffect(() => {
    const handleSectionChange = (event) => {
      const newIndex = event.detail.sectionIndex
      setSelectedIndex(newIndex)
    }

    window.addEventListener("sectionChange", handleSectionChange)
    return () => {
      window.removeEventListener("sectionChange", handleSectionChange)
    }
  }, [])

  return (
    <>
      <div
        // style={{ backgroundColor: bgColor }}
        // ref={BottomNavRef}
        className={`${isMobile ? "hidden" : "visible"} 
  h-9 w-screen fixed bottom-0 px-3 z-[888] overflow-hidden flex justify-between items-center 


  ${isProjectR320
            ? "text-white bg-[#c6c2bf]"
            : isProjectPagebgBlack && !isProjectPagebgwhite
              ? "text-zinc-400 bg-black hover:text-white"
              : isProjectPagebgwhite ? "text-zinc-400 bg-white hover:text-black"
                : isDarkMode
                  ? "text-zinc-400 bg-black  hover:text-white"
                  : "text-zinc-400 bg-white hover:text-black"
          }


  backdrop-blur-sm 
  ${isProjectPage ? "opacity-100" : ""}`}
      >
        {isProjectPage ? (
          <>
            <div className="part1 ">
              <p className={` text-[11px]  capitalize `}>India | Canada</p>
            </div>

            <div className=" flex justify-between items-center">
              <div className="part2 -ml-3">
                <button className={` text-[11px] capitalize`}>
                  @2021-2025
                  <span className="inline-block ml-1">Staap / All Rights Reserved</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="part1  w-[48%]">
              <p className={`text-[11px] capitalize `}>India | Canada</p>
            </div>

            <div className="w-[55%] flex justify-between items-center">
              <div className="part2 -ml-3">
                <button className={` text-[11px]  capitalize`}>
                  @2021-2025
                  <span className="inline-block ml-1">Staap / All Rights Reserved</span>
                </button>
              </div>

              <div className={`part3  hidden md:block `}>
                <button onClick={toggleTheme} className={`theme text-[11px] capitalize  transform `}>
                  {isDarkMode ? "[ Light mode ]" : "[ Dark mode ]"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* BottomNav Component (visible only on mobile) - Fixed position on mobile */}
      <div
        ref={BottomNavRef2}
        className={`${isMobile ? "visible" : "hidden"} 
  w-screen h-14 fixed bottom-0 py-1 px-3 z-[888] overflow-hidden flex-col justify-between items-center
  ${isProjectPage ? "opacity-100" : null}
  ${isProjectR320 ? "bg-[#c6c2bf]  " : isProjectPagebgwhite ? "bg-white" : "bg-black"}
  ${!isProjectPage && (isDarkMode ? "bg-black" : "bg-white")} 
  backdrop-blur-sm`}
        style={{
          position: isMobile ? "fixed" : "absolute",
          bottom: 0,
          left: 0,

          //backgroundColorbgColor,
        }}
      >
        <div className="part1">
          <div className="links-part flex items-center justify-between leading-6">
            {Links.map(
              (link, index) =>
                index !== 0 && (
                  <button
                    onClick={() => handleNavClick(index)}
                    key={index}
                    className={`cursor-pointer flex-shrink-0 ${isDarkMode ? "text-zinc-100 hover:text-zinc-200" : "hover:text-black"
                      } text-[14px] ${index === selectedIndex
                        ? isDarkMode
                          ? "text-zinc-200 font-medium"
                          : "text-black font-medium"
                        : "text-zinc-500"
                      }`}
                  >
                    [{link.name}]
                  </button>
                )
            )}
          </div>
        </div>

        <div className="flex text-zinc-500 mt-1 justify-between items-center">
          <button className="text-[10px] capitalize">
            ® 2021-2025
            <span className="inline-block  ml-1">Staap / All Rights Reserved</span>
          </button>

          {isProjectPage ? null : (
            <button onClick={toggleTheme} className="theme text-[11px] capitalize transform">
              {isDarkMode ? "[ Light mode ]" : "[ Dark mode ]"}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export { Navbar, BottomNav }

