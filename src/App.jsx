"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import Loader from "./Components/Loader"
import { Navbar, BottomNav } from "./Components/Navbar"
import SmartLiving from "./Components/SmartLiving"
import HorizontalScrollLayout from "./Components/HorizontalScrollLayout"
import Panache from "./Components/Panache"
import Project from "./Components/Project"

gsap.registerPlugin(ScrollTrigger)

const DisableDevTools = () => {
  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault()
    const handleKeyDown = (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) ||
        (event.ctrlKey && event.key === "U")
      ) {
        event.preventDefault()
      }
    }

    const handleDevToolsOpen = () => {
      debugger // Triggers if DevTools is opened
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    // Detect DevTools open using debugger statement
    setInterval(handleDevToolsOpen, 1000)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}

const MainPanels = () => {
  const containerRef = useRef(null)
  const lenisRef = useRef(null)
  const cursorTextRef = useRef(null)
  const NavRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const location = useLocation()

  const [skipLoader, setSkipLoader] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  // Replace the existing custom event handler with this
  useEffect(() => {
    // Check if we're navigating from a project page using location state
    if (location.state && location.state.fromProject) {
      setSkipLoader(true);
      setIsLoading(false); // Immediately set loading to false
    } else if (location.pathname === '/') {
      // Only reset skipLoader if we're on the home page and not coming from a project
      // This prevents the loader from showing when navigating directly to the home page
      setSkipLoader(false);
    }
  }, [location]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorTextRef.current) {
        gsap.to(cursorTextRef.current, {
          x: e.clientX + 20 + "px",
          y: e.clientY - 20 + "px",
          duration: 0.2,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (skipLoader) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 7000)

    return () => clearTimeout(timer)
  }, [skipLoader])

  useEffect(() => {
    // Only initialize Lenis if not mobile
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "horizontal",
      gestureDirection: "horizontal",
      smooth: true,
      smoothTouch: true,
      smoothmobile: true,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const slider = useRef()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let pixelsPause = 1350
      const panels = gsap.utils.toArray(".panel")

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          scrub: 12, // Adjusted scrub value to 1 for smooth scroll progress
          snap: 1 / (panels.length - 1),
          start: () => `top+=${pixelsPause} 2% `,
          end: () => "+=" + window.innerWidth * panels.length,
          // markers: { startColor: "fuchsia", endColor: "fuchsia", indent: 400 },
          onLeaveBack: () => {
            if (pixelsPause !== 500) {
              pixelsPause = 500
              ScrollTrigger.refresh()
            }
          },
        },
      })

      ScrollTrigger.create({
        trigger: slider.current,
        start: "top top",
        end: () => "+=" + (window.innerWidth * panels.length + pixelsPause),
        pin: true,
        onLeaveBack: () => {
          if (pixelsPause !== 500) {
            pixelsPause = 500
            ScrollTrigger.refresh()
          }
        },
      })
    }, containerRef)
    return () => ctx.revert()
  })




  return (
    <div className="App " ref={containerRef}>
      <div
        ref={cursorTextRef}
        className={`fixed -top-10 pointer-events-none z-[9999] text-[11px] font-medium ${isLoading ? "opacity-100" : "opacity-0"
          }`}
      >
        [Scroll]
      </div>

      <div className="flex flex-col items-center justify-center">
        {!skipLoader && <Loader setIsLoading={setIsLoading} />}
      </div>

      <nav ref={NavRef} className="fixed top-0 left-0 z-50">
        <Navbar currentPage={currentPage} container={containerRef.current} setCurrentPage={setCurrentPage} />
      </nav>

      <div
        ref={slider}
        style={{ minWidth: isMobile ? "100vw" : "600vw", maxHeight: "100vh" }}
        className="container flex flex-wrap"
      >
        <HorizontalScrollLayout />
      </div>
      {/* <Connect/> */}
      <BottomNav />
    </div>
  )
}

const App = () => {
  return (
    <main className="App">
      {/* <DisableDevTools/> */}
      <Routes>
        <Route path="/" element={<MainPanels />} />
        {/* <Route path="/smartliving/:projectId" element={<SmartLiving />} /> */}
        <Route path="/Panache" element={<Panache/>} />
        <Route path="/project/:projectId" element={<Project/>} />
        
        {/* <Route path="/smartliving/:projectId" element={<SmartLiving />} /> */}

        <Route path="/work" element={<MainPanels />} />
        <Route path="/about" element={<MainPanels />} />
        <Route path="/connect" element={<MainPanels />} />
      </Routes>
    </main>
  )
}

export default App

