"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { ThemeContext } from "../utils/themeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import logow from "../assets/Staap - white.png";
import logob from "../assets/Staap - black.png";

gsap.registerPlugin(ScrollTrigger);

const Links = [
  { name: "Staap", path: "" },
  { name: "Work", path: "work" },
  { name: "About", path: "about" },
  { name: "Connect", path: "connect" },
];

const Navbar = ({ bgColor }) => {
  const topNavbarRef = useRef(null);
  const topNavbarRef2 = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const isProjectPage = location.pathname.includes("/project");
  const isProjectR320 = location.pathname.includes("/project/1");
  const isProjectPagebgwhite =
    location.pathname.includes("/project/2") ||
    location.pathname.includes("/project/3") ||
    location.pathname.includes("/project/5");
  const isProjectPagebgBlack = isProjectPage && !isProjectPagebgwhite;

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch handling
  const [touchState, setTouchState] = useState({ startY: 0, distance: 0 });

  const handleTouchStart = (e) => setTouchState((prev) => ({ ...prev, startY: e.touches[0].clientY }));

  const handleTouchMove = (e) => {
    if (isProjectPage || isMobile) return;

    const currentY = e.touches[0].clientY;
    const distance = touchState.startY - currentY;
    setTouchState((prev) => ({ ...prev, distance }));

    const animateNavbar = (ref, isVisible) => {
      if (ref.current) {
        gsap.to(ref.current, {
          filter: "blur(0px)",
          opacity: isVisible ? 1 : 0,
          top: "0px",
          duration: 0.3,
          ease: isVisible ? "power2.out" : "power2.in",
        });
      }
    };

    animateNavbar(topNavbarRef, distance > 0);
    animateNavbar(topNavbarRef2, distance > 0);
  };

  const handleTouchEnd = () => setTouchState((prev) => ({ ...prev, distance: 0 }));

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchState.startY, isProjectPage, isMobile]);

  // GSAP animations
  useEffect(() => {
    if (isProjectPage || isMobile) return;

    const animateNavbar = (ref, config) => {
      if (!ref.current) return;
      const ctx = gsap.context(() => {
        const animation = gsap.from(ref.current, {
          ...config,
          scrollTrigger: {
            trigger: ref.current,
            start: config.start,
            end: config.end,
            scrub: true,
            zIndex: 88,
            onUpdate: (self) => {
              if (self.progress === 1) {
                animation.kill();
                ScrollTrigger.getById("nav-trigger")?.kill();
              }
            },
          },
        });
      }, ref);
      return () => ctx.revert();
    };

    animateNavbar(topNavbarRef, {
      filter: "blur(0px)",
      opacity: 0,
      top: "-140px",
      ease: "power2.in",
      start: "top top",
      end: "+=1050px",
    });

    animateNavbar(topNavbarRef2, {
      filter: "blur(0px)",
      opacity: 0,
      top: "0px",
      ease: "power2.in",
      start: "top top",
      end: "+=1100px",
    });
  }, [isProjectPage, isMobile]);

  // Navigation handler
  const handleNavClick = (index) => {
    setSelectedIndex(index);
    const path = Links[index].path;

    if (isProjectPage) {
      navigate(index === 0 ? "/" : `/?section=${path}`, { state: { fromProject: true } });
      return;
    }

    const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden");
    if (mainContainer?.scrollToSection) {
      mainContainer.scrollToSection(index);
    }
  };

  // Handle section parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      const sectionIndex = Links.findIndex((link) => link.path === section);
      if (sectionIndex !== -1) {
        setTimeout(() => {
          const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden");
          if (mainContainer?.scrollToSection) {
            mainContainer.scrollToSection(sectionIndex);
            setSelectedIndex(sectionIndex);
          }
        }, 500);
      }
    } else if (location.pathname === "/") {
      setSelectedIndex(0);
    }
  }, [location.search]);

  // Listen for section change events
  useEffect(() => {
    const handleSectionChange = (event) => setSelectedIndex(event.detail.sectionIndex);
    document.addEventListener("sectionChange", handleSectionChange);
    return () => document.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  // Styling helpers
  const getTextColorClass = () =>
    isProjectR320
      ? "text-white/80 hover:text-white"
      : isProjectPagebgBlack
        ? "text-zinc-400 hover:text-white"
        : isProjectPagebgwhite
          ? "text-zinc-400 hover:text-black"
          : isDarkMode
            ? "text-white/40 hover:text-white"
            : "text-black/40 hover:text-black";

  const getLinkColorClass = (index) => {
    const isSelected = index === selectedIndex;

    if (isSelected) {
      return isDarkMode ? "text-white font-medium" : "text-black font-medium";
    }

    if (isProjectPagebgBlack) {
      return "text-zinc-500 hover:text-white";
    }

    if (isProjectR320) {
      return "text-white hover:text-white"; // For R320: slightly transparent white
    }

    if (isProjectPagebgwhite) {
      return "text-zinc-500 hover:text-black";
    }

    return isDarkMode ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-black";
  };


  const getLogo = () =>
    isProjectPagebgwhite ? logob : isProjectR320 || isProjectPagebgBlack ? logow : isDarkMode ? logow : logob;

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 z-[888] w-screen h-fit flex-col ${isProjectPage ? "opacity-100" : ""}`}
      >
        <div
          className="navbar backdrop-blur-sm h-24 p-3 w-full flex justify-between items-center"
          style={{ backgroundColor: isProjectPage ? bgColor : isDarkMode ? "black" : "white" }}
        >
          <div className="logo h-16 w-14">
            <button onClick={() => handleNavClick(0)}>
              <img className="h-full w-full object-cover" src={getLogo() || "/placeholder.svg"} alt="Logo" />
            </button>
          </div>

          <div className="links-part flex flex-col items-start leading-6 ml-32">
            {Links.slice(1).map((link, index) => (
              <button
                key={index + 1}
                onClick={() => handleNavClick(index + 1)}
                className={`cursor-pointer text-[15px] ${isProjectR320 && '!text-white/60 hover:!text-white'} ${getLinkColorClass(index + 1)}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="s_last-part w-64 ml-60 -mr-10">
            <p className={`text-[11px] leading-3 text-left p-1 tracking-normal ${getTextColorClass()}`}>
              Every art, space, and place holds a story waiting to be shared. We listen, understand, and through our
              practice, create works that are living narratives, waiting to unfold.
            </p>
          </div>

          <div className="last-part w-1/3">
            <p className={`text-[11px] leading-3 ml-20 p-1 text-right tracking-normal ${getTextColorClass()}`}>
              Your space holds a story waiting to be told. We craft visions into elegant designs that echo art, culture,
              and life. Share your ideas with us, and together, let's design a space that reflects your unique narrative.{" "}
              <br />
              Contact us at <a href="mailto:write@staap.in">write@staap.in.</a>
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        ref={topNavbarRef2}
        className={`flex md:hidden fixed top-0 left-0 h-20 z-[888] justify-between w-screen backdrop-blur-sm p-3 ${isProjectPage ? "opacity-100" : ""}`}
        style={{ backgroundColor: isProjectPage ? bgColor : isDarkMode ? "black" : "white" }}
      >
        <button onClick={() => handleNavClick(0)}>
          <div className="h-5 w-14">
            <img className="h-full w-full object-cover" src={getLogo() || "/placeholder.svg"} alt="Logo" />
          </div>
        </button>
        <p
          className={`text-[8px] max-w-sm whitespace-pre-wrap hyphens-auto w-full py-1 text-right tracking-normal leading-none ${getTextColorClass()}`}
        >
          Your space holds a story waiting to be told. We craft visions into elegant designs that echo art, culture, and
          life. Share your ideas with us, and together, let's design a space that reflects your unique narrative. Contact
          us at <a href="mailto:write@staap.in">write@staap.in.</a>
        </p>
      </nav>
    </>
  );
};

const BottomNav = ({ bgColor }) => {
  const bottomNavRef2 = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const isProjectPage = location.pathname.includes("/project");
  const isProjectR320 = location.pathname.includes("/project/1");
  const isProjectPagebgwhite =
    location.pathname.includes("/project/2") ||
    location.pathname.includes("/project/3") ||
    location.pathname.includes("/project/5");
  const isProjectPagebgBlack = isProjectPage && !isProjectPagebgwhite;

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch handling
  const [touchState, setTouchState] = useState({ startY: 0, distance: 0 });

  const handleTouchStart = (e) => setTouchState((prev) => ({ ...prev, startY: e.touches[0].clientY }));

  const handleTouchMove = (e) => {
    if (isProjectPage || isMobile || !bottomNavRef2.current) return;

    const currentY = e.touches[0].clientY;
    const distance = touchState.startY - currentY;
    setTouchState((prev) => ({ ...prev, distance }));

    gsap.to(bottomNavRef2.current, {
      filter: "blur(0px)",
      opacity: distance < 0 ? 1 : 0,
      bottom: distance < 0 ? "0px" : "-50px",
      duration: 0.3,
      ease: distance < 0 ? "power2.out" : "power2.in",
    });
  };

  const handleTouchEnd = () => setTouchState((prev) => ({ ...prev, distance: 0 }));

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchState.startY, isProjectPage, isMobile]);

  // GSAP animations
  useEffect(() => {
    if (isProjectPage || isMobile || !bottomNavRef2.current) return;

    const ctx = gsap.context(() => {
      const animation = gsap.from(bottomNavRef2.current, {
        filter: "blur(2px)",
        opacity: 0,
        bottom: "0",
        ease: "power2.in",
        scrollTrigger: {
          trigger: bottomNavRef2.current,
          start: "top bottom",
          end: "+=1050px",
          scrub: true,
          zIndex: 88,
          onUpdate: (self) => {
            if (self.progress === 1) {
              animation.kill();
              ScrollTrigger.getById("nav-trigger")?.kill();
            }
          },
        },
      });
    }, bottomNavRef2);
    return () => ctx.revert();
  }, [isProjectPage, isMobile]);

  // Navigation handler
  const handleNavClick = (index) => {
    setSelectedIndex(index);
    const path = Links[index].path;

    if (isProjectPage) {
      navigate(index === 0 ? "/" : `/?section=${path}`, { state: { fromProject: true } });
      return;
    }

    const mainContainer = document.querySelector(".h-screen.w-screen.overflow-hidden");
    if (mainContainer?.scrollToSection) {
      mainContainer.scrollToSection(index);
    }
  };

  // Handle section parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      const sectionIndex = Links.findIndex((link) => link.path === section);
      if (sectionIndex !== -1) {
        setSelectedIndex(sectionIndex);
      }
    } else if (location.pathname === "/") {
      setSelectedIndex(0);
    }
  }, [location.search]);

  // Listen for section change events
  useEffect(() => {
    const handleSectionChange = (event) => setSelectedIndex(event.detail.sectionIndex);
    window.addEventListener("sectionChange", handleSectionChange);
    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  // Styling helpers
  const getTextColorClass = () =>
    isProjectR320
      ? "!text-white"
      : isProjectPagebgBlack
        ? "!text-zinc-400 hover:text-white"
        : isProjectPagebgwhite
          ? "!text-zinc-400 hover:text-black"
          : isDarkMode
            ? "!text-zinc-400 hover:text-white"
            : "!text-zinc-400 hover:text-black";

  const getLinkColorClass = (index) =>
    index === selectedIndex
      ? isDarkMode
        ? "text-zinc-100 font-medium"
        : "text-black font-medium"
      : isProjectR320
        ? "text-white/80"
        : isDarkMode
          ? "text-zinc-500 hover:text-zinc-200"
          : "text-zinc-500 hover:text-black";

  return (
    <>
      {/* Desktop BottomNav (hidden on mobile) */}
      <div
        className={`h-9 w-screen fixed bottom-0 px-3 z-[888] flex justify-between items-center backdrop-blur-sm ${isMobile ? "hidden" : "visible"
          } ${isProjectPage ? "opacity-100" : ""} ${getTextColorClass()}`}
        style={{ backgroundColor: isProjectPage ? bgColor : isDarkMode ? "black" : "white" }}
      >
        <p className="text-[11px] capitalize">India | Canada</p>
        <button className="text-[11px] capitalize -ml-3">
          © 2021-2025 <span className="inline-block ml-1">Staap / All Rights Reserved</span>
        </button>
        {!isProjectPage && (
          <button onClick={toggleTheme} className="text-[11px] capitalize hidden md:block">
            {isDarkMode ? "[ Light mode ]" : "[ Dark mode ]"}
          </button>
        )}
      </div>

      {/* Mobile BottomNav */}
      <div
        ref={bottomNavRef2}
        className={`w-screen h-14 fixed bottom-0 py-1 px-3 z-[888] flex-col backdrop-blur-sm ${isMobile ? "visible" : "hidden"
          } ${isProjectPage ? "opacity-100" : ""}`}
        style={{ backgroundColor: isProjectPage ? bgColor : isDarkMode ? "black" : "white" }}
      >
        <div className="links-part flex items-center justify-between leading-6">
          {Links.slice(1).map((link, index) => (
            <button
              key={index + 1}
              onClick={() => handleNavClick(index + 1)}
              className={`cursor-pointer text-[14px] ${getLinkColorClass(index + 1)}`}
            >
              [{link.name}]
            </button>
          ))}
        </div>
        <div className="flex text-zinc-500 mt-1 justify-between items-center">
          <button className={`text-[10px] capitalize ${getTextColorClass()}`}>
            © 2021-2025 <span className="inline-block ml-1">Staap / All Rights Reserved</span>
          </button>
          {!isProjectPage && (
            <button onClick={toggleTheme} className="text-[11px] capitalize">
              {isDarkMode ? "[ Light mode ]" : "[ Dark mode ]"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export { Navbar, BottomNav };