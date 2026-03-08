import { useRef, useState, useEffect } from "react";
import { usePopupContext } from "../PopUpContext.tsx";
import { Xmark } from "iconoir-react";
import "./PopUps.css";

interface Position {
  x: number;
  y: number;
}

export function useDraggable(initial: Position = { x: 100, y: 100 }) {
  const [position, setPosition] = useState<Position>(initial);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { position, handleMouseDown };
}

export function AboutPopup() {
  const { popups, closing, closePopup } = usePopupContext();
  const { position, handleMouseDown } = useDraggable({ x: 100, y: 100 });

  if (!popups.About) return null;

  return (
    <div
      className={`animate__animated ${closing.About ? "animate__zoomOut" : "animate__zoomIn"} popup-card`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className="popup-titlebar" onMouseDown={handleMouseDown}>
        <h2 id="popup-title-header">About me</h2>
        <button className="popup-close" onClick={() => closePopup("About")}>
          <Xmark />
        </button>
      </div>
      <span id="about-me-header">
        <img
          id="about-me-img"
          src="/scout-cat.webp"
          alt="cat dressed up as an attack on titan scout!"
        />
        <span id="about-me-text-header">
          <h3 id="about-me-title">Jason Lukman</h3>
          <strong id="about-me-sub-title">Software Engineer</strong>
        </span>
      </span>
      <div className="popup-content">
        <strong>Welcome to my website!</strong>
        <p>
          As you may already know my name is Jason! I'm passionate about and
          interested in software engineering. In particular I love web
          development and learning how to create more user centric software.
        </p>
        <p>In my free time I like to:</p>
        <ul>
          <li>Work on and improve this website!</li>
          <li>Turn random ideas I have into real projects.</li>
          <li>Hone and refine my software development skills.</li>
        </ul>
        --- Non work related Interests and Hobbies ---
        <ul>
          <li>Long distance running and gym</li>
          <li>Watching the NBA and playing basketball</li>
          <li>Gaming (Valorant and CS2)</li>
          <li>Fih 🐟</li>
        </ul>
        <div>
          Contact me at this{" "}
          <a className="email-link" href="mailto:jasonlukman729@gmail.com">
            email!
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectsPopup() {
  const { popups, closing, closePopup } = usePopupContext();
  const { position, handleMouseDown } = useDraggable({ x: 200, y: 150 });

  if (!popups.Projects) return null;

  return (
    <div
      className={`animate__animated ${closing.Projects ? "animate__zoomOut" : "animate__zoomIn"} popup-card`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className="popup-titlebar" onMouseDown={handleMouseDown}>
        <h2 id="popup-title-header">Projects</h2>
        <button className="popup-close" onClick={() => closePopup("Projects")}>
          <Xmark />
        </button>
      </div>
      <div className="popup-content">
        <p>This section is under construction check back later!</p>
      </div>
    </div>
  );
}
