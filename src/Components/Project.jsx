import { useContext, useEffect, useRef, useState } from "react";
import { Navbar, BottomNav } from "./Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { projectsData } from "../utils/projectsData";
import Panache from "./Panache";
import SmartLiving from "./SmartLiving";
import FOLD from "./FOLD";
import TOVO from "./TOVO";
import R320 from "./R320";
import MADEIN from "./MADEIN";

const Project = () => {
  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const projectPageRef = useRef(null);
  const projectPageRef2 = useRef(null);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Find project and handle invalid projectId
  const project = projectsData.find((p) => p.id === projectId) || location.state?.project;
  if (!project) {
    navigate("/?section=work");
    return null;
  }

  

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on project change
  useEffect(() => {
    const scrollContainer = isMobile ? mobileContainerRef.current : containerRef.current;
    scrollContainer?.scrollTo({ top: 0, behavior: "instant" });
  }, [projectId, isMobile]);

  // GSAP animations
  useEffect(() => {
    if (location.state?.skipAnimation) return;

    const animateRefs = [
      { ref: projectPageRef, yPercent: "54%" },
      { ref: projectPageRef2, yPercent: "62%" },
    ];

    animateRefs.forEach(({ ref, yPercent }) => {
      if (ref.current) {
        gsap.from(ref.current, {
          yPercent: parseFloat(yPercent),
          duration: yPercent === "54%" ? 1 : 1.3,
          ease: "power1.in",
        });
      }
    });
  }, [location.state]);

  // Desktop scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    let startY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const deltaY = startY - e.touches[0].clientY;
      container.scrollTop += deltaY;
      startY = e.touches[0].clientY;
    };

    const handleWheel = (e) => {
      container.scrollTop += e.deltaY;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", () => (isDragging = false), { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", () => { });
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile]);

  // Related projects logic
  const relatedProjects = (() => {
    const typologyMap = {
      Workspace: "Commercial",
      Commercial: "Workspace",
      "Pre-fab": "Product",
      Product: "Pre-fab",
      Industrial: "Experience",
      Experience: "Industrial",
      Retail: "Industrial",
    };

    const matchingTypology = typologyMap[project.typology] || project.typology;
    let related = projectsData.filter(
      (p) => p.id !== project.id && (p.typology === matchingTypology || p.typology === project.typology)
    );

    if (related.length < 3) {
      related = [
        ...related,
        ...projectsData.filter((p) => p.id !== project.id && !related.some((r) => r.id === p.id)),
      ];
    }

    return related.slice(0, 3);
  })();

  // Navigation handlers
  const handleBack = () => navigate("/?section=work", { state: { fromProject: true, skipAnimation: true } });

  const handleRelatedProjectClick = (relatedProject) => {
    const allowedNames = ["R320", "MADE IN", "TOVO", "FOLD", "Panache", "Smart Living"];
    if (allowedNames.includes(relatedProject.name)) {
      navigate(`/project/${relatedProject.id}`, { state: { project: relatedProject } });
    }
  };

  // Styling helpers
  const getBorderClass = (name) =>
    ["R320", "MADE IN", "Smart Living"].includes(name)
      ? "border-t-[0.2px] border-zinc-100"
      : ["TOVO", "Panache", "FOLD"].includes(name)
        ? "border-t-[0.2px] border-zinc-700"
        : "";

  const getTextColorClass = (name) =>
    name === "R320"
      ? "!text-white/60 hover:text-white"
      : ["TOVO", "Panache", "FOLD"].includes(name)
        ? "!text-zinc-400 hover:text-black"
        : "!text-zinc-400 hover:text-white";

  const getTitleColorClass = (name) =>
    ["R320", "TOVO", "Panache", "FOLD"].includes(name)
      ? name === "R320"
        ? "!text-white"
        : "!text-black"
      : "!text-white";

  // Project component renderer
  const renderProjectComponent = () => {
    const components = {
      Panache: <Panache project={project} />,
      TOVO: <TOVO project={project} />,
      "MADE IN": <MADEIN project={project} />,
      FOLD: <FOLD />,
      "Smart Living": <SmartLiving />,
      R320: <R320 />,
    };
    return components[project.name] || null;
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[999]">
        <Navbar bgColor={project.bgColor} />
      </div>

      {/* Desktop Version */}
      <div
        ref={containerRef}
        style={{ backgroundColor: project.bgColor }}
        className={`w-full pt-24 pb-4 mt-3 overflow-y-auto h-dvh ${isMobile ? "hidden" : "block"}`}
      >
        <div
          style={{ backgroundColor: project.bgColor }}
          className="w-full fixed top-24 left-0 px-3 z-[777] flex justify-between items-center"
        >
          <h5
            onClick={handleBack}
            className={`text-[11px] !bg-transparent ${project.name === "R320" ? "!text-white" : "!text-zinc-400"
              } cursor-pointer py-2 w-1/4`}
          >
            [Back]
          </h5>
          <div
            style={{ backgroundColor: project.bgColor }}
            className={`w-1/2 py-2 flex justify-between items-center text-[11px] ${project.name === "R320" ? "text-white" : "text-zinc-400"
              }`}
          >
            <div className="flex items-center gap-4">
              <h6 className={`w-52 !bg-transparent ${project.name === "R320" ? "!text-white" : "!text-zinc-400"}`}>{project.name}</h6>
              <h6 className={` !bg-transparent ${project.name === "R320" ? "!text-white" : "!text-zinc-400"}`}>{project.scope}</h6>
            </div>
            <div className="flex justify-between gap-4 w-1/2">
              <h6 className={`!bg-transparent ${project.name === "R320" ? "!text-white" : "!text-zinc-400"}`}>{project.location}</h6>
              <h6 className={`${project.name === "R320" ? "!text-white" : "!text-zinc-400"} !bg-transparent`}>{project.year}</h6>
            </div>
          </div>
        </div>

        <div ref={projectPageRef}>{renderProjectComponent()}</div>

        {/* Related Works */}
        <div className="w-screen mt-12 h-fit pl-3">
          <div className={`h-fit w-full pt-2 pb-4 border-b-[0.2px] border-t-[0.2px] ${getBorderClass(project.name)}`}>
            <div className="text-[11px] h-full w-full font-medium flex justify-between">
              <div className="w-[18%] text-left">
                <h5 className={`${getTitleColorClass(project.name)} !bg-transparent`}>Related Works</h5>
              </div>
              <div className={`w-[53.8%] ml-1 mr-3 flex-col text-[11px] ${getTextColorClass(project.name)}`}>
                <table className="w-full">
                  <tbody>
                    {relatedProjects.map((relatedProject, index) => (
                      <tr
                        key={relatedProject.id}
                        className={`${index !== 0 ? getBorderClass(project.name) : ""} ${getTextColorClass(
                          project.name
                        )}`}
                        onClick={() => handleRelatedProjectClick(relatedProject)}
                        style={{ cursor: relatedProject.clickable ? "pointer" : "default" }}
                      >
                        <td className="flex-1 pr-10 py-1">{relatedProject.name}</td>
                        <td className="flex-1 -ml-1 py-1">{relatedProject.scope}</td>
                        <td className="flex-1 ml-1 py-1">{relatedProject.location}</td>
                        <td className="flex-1 text-right pl-12 py-1">{relatedProject.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer w-full pt-6 pb-16 pl-3">
          <div className="text-[11px] w-full font-medium flex justify-between text-left">
            <div className="flex flex-col gap-1">
              <h5 className={`${getTitleColorClass(project.name)} !bg-transparent text-[18px] leading-6`}>
                Let's bring your vision to life. We're excited to hear
                <br />
                what you've been imagining. Reach out to us at
                <br />
                <a href="mailto:write@staap.in" target="_blank" rel="noreferrer">
                  write@staap.in
                </a>
                .
              </h5>
              <a
                href="tel:+91-9994192333"
                className={`mt-1 text-[15px] ${project.name === "R320" ? "text-white" : "text-zinc-400"}`}
              >
                +91-9994192333
              </a>
            </div>
            <div className={`w-[55%] flex text-[11px] ${project.name === "R320" ? "text-white" : "text-zinc-400"} pr-2`}>
              <div className="w-1/2">
                <div className="w-3/4 ml-2">
                  <p className="capitalize">Follow us on</p>
                  <a
                    className="capitalize pt-1"
                    href="https://www.instagram.com/staap.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    [Instagram]
                  </a>
                  <div className="flex flex-col mt-2">
                    <p className="capitalize">Add us on</p>
                    <a
                      className="capitalize pt-1"
                      href="https://in.linkedin.com/company/staapin"
                      target="_blank"
                      rel="noreferrer"
                    >
                      [LinkedIn]
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-between">
                <div className="w-[60%] text-[11px]">
                  <p className="text-[12px]">Thank you</p>
                  <p className="mt-1 leading-3">
                    Architecture is a vast, ever-evolving landscape of ideas, spaces, and experiences. Thanks for
                    exploring our little corner of design and creativity.
                  </p>
                </div>
                <div className="flex flex-col pr-1 items-end text-[12px] text-right">
                  <p>
                    Copyright <br />© 2021-2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div
        ref={mobileContainerRef}
        style={{ backgroundColor: project.bgColor }}
        className={`w-full pt-20 pb-20 overflow-y-auto max-h-screen touch-pan-y ${isMobile ? "visible" : "hidden"}`}
      >
        <div className="w-full flex-col p-3">
          <div className="flex justify-end items-center -mt-1">
            <div style={{ backgroundColor: project.bgColor }} className="fixed w-full z-[777]">
              <div
                className={`text-[11px] ${getTextColorClass(project.name)}  py-1 w-full flex justify-between items-center`}
              >
                <h6 className={`ml-6 !bg-transparent ${project.name === "R320" ? "!text-white" : "!text-zinc-400"}`}>{project.name}</h6>
                <h6 className={`${project.name === "R320" ? "!text-white" : "!text-zinc-400"} !bg-transparent`}>{project.year}</h6>
              </div>
            </div>
          </div>
        </div>

        <div ref={projectPageRef2}>{renderProjectComponent()}</div>

        {/* Related Works */}
        <div className="w-screen mt-24 h-fit px-3">
          <div className={`h-fit w-full pt-1 pb-4 border-b-[0.2px] border-t-[0.2px] ${getBorderClass(project.name)}`}>
            <div className="text-[11px] w-full font-medium flex-col">
              <h5 className={`text-[12px] ${getTextColorClass(project.name)} !bg-transparent capitalize`}>Related Works</h5>
              <table className="w-full">
                <tbody>
                  {relatedProjects.map((relatedProject, index) => (
                    <tr
                      key={relatedProject.id}
                      className={`${index !== 0 ? getBorderClass(project.name) : ""} ${getTextColorClass(
                        project.name
                      )}`}
                      onClick={() => handleRelatedProjectClick(relatedProject)}
                      style={{ cursor: relatedProject.clickable ? "pointer" : "default" }}
                    >
                      <td className="flex-1 py-1">{relatedProject.name}</td>
                      <td className="flex-1 text-right pr-3 py-1">{relatedProject.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="footer w-full pt-6 pb-20 pl-3">
          <div className="text-[11px] w-full font-medium flex justify-between text-left">
            <div className="flex flex-col gap-1">
              <h5
                className={`${getTextColorClass(project.name)} !bg-transparent text-[16px] leading-5 hyphens-auto whitespace-pre-wrap tracking-normal`}
              >
                We're excited to hear what you've been imagining.
                Let's bring your vision to life. Reach out to us at
                <a
                  className={`ml-1 ${getTextColorClass(project.name)}`}
                  href="mailto:write@staap.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  write@staap.in
                </a>
              </h5>
              <a href="tel:+91-9994192333" className={`mt-1 text-[16px] ${getTextColorClass(project.name)}`}>
                +91-9994192333
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-[999]">
        <BottomNav bgColor={project.navColor} />
      </div>
    </>
  );
};

export default Project;