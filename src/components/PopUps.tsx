import { useId, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { ArrowDownRight, Minus, Plus, Xmark } from "iconoir-react";
import { usePopupContext } from "../PopUpContext";
import type { PopupType } from "../PopUpContext";
import { Projects } from "./Projects";

interface Position {
  x: number;
  y: number;
}

interface Frame extends Position {
  width: number;
  height: number;
}

interface WindowGesture {
  action: "move" | "resize";
  pointerId: number;
  start: Position;
  frame: Frame;
}

const initialHeights: Record<PopupType, number> = { About: 544, Projects: 408 };
const minimumWidth = 256;
const minimumHeight = 176;
const resizeStep = 64;
const sizeButtonClass = "grid size-11 shrink-0 place-items-center rounded-sm touch-manipulation cursor-pointer hover:bg-frame/10 focus-visible:outline-2 focus-visible:outline-frame aria-disabled:opacity-40 aria-disabled:cursor-default";

function getViewportBounds(padding: number): Frame {
  const { clientWidth, clientHeight } = document.documentElement;
  const viewport = window.visualViewport;
  const width = Math.min(viewport?.width ?? clientWidth, clientWidth);
  const height = Math.min(viewport?.height ?? clientHeight, clientHeight);

  return {
    x: (viewport?.offsetLeft ?? 0) + padding,
    y: (viewport?.offsetTop ?? 0) + padding,
    width: Math.max(1, width - 2 * padding),
    height: Math.max(1, height - 2 * padding),
  };
}

function fitFrame(frame: Frame, bounds: Frame): Frame {
  const width = Math.min(bounds.width, Math.max(minimumWidth, frame.width));
  const height = Math.min(bounds.height, Math.max(minimumHeight, frame.height));

  return {
    x: Math.max(bounds.x, Math.min(frame.x, bounds.x + bounds.width - width)),
    y: Math.max(bounds.y, Math.min(frame.y, bounds.y + bounds.height - height)),
    width,
    height,
  };
}

interface PopupWindowProps {
  name: PopupType;
  title: string;
  children: ReactNode;
}

function PopupWindow({ name, title, children }: PopupWindowProps) {
  const { popups, closePopup } = usePopupContext();
  const isOpen = popups[name];
  const titleId = useId();
  const popupId = `${name.toLowerCase()}-popup`;
  const panelRef = useRef<HTMLElement>(null);
  const gestureRef = useRef<WindowGesture | null>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [bounds, setBounds] = useState<Frame | null>(null);
  const visibleFrame = frame && bounds ? fitFrame(frame, bounds) : null;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!isOpen || !panel) return;

    const viewport = window.visualViewport;
    const updateBounds = () => setBounds(getViewportBounds(8));
    const viewportBounds = getViewportBounds(8);
    const initialBounds = getViewportBounds(16);
    setBounds(viewportBounds);
    setFrame((current) => {
      const openingBounds = current ? viewportBounds : initialBounds;
      const fitted = fitFrame(current ?? {
        x: openingBounds.x,
        y: openingBounds.y,
        width: 640,
        height: initialHeights[name],
      }, openingBounds);

      return {
        ...(current ?? fitted),
        x: openingBounds.x + (openingBounds.width - fitted.width) / 2,
        y: openingBounds.y + (openingBounds.height - fitted.height) / 2,
      };
    });
    panel.focus({ preventScroll: true });

    window.addEventListener("resize", updateBounds);
    viewport?.addEventListener("resize", updateBounds);
    viewport?.addEventListener("scroll", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
      viewport?.removeEventListener("resize", updateBounds);
      viewport?.removeEventListener("scroll", updateBounds);
      gestureRef.current = null;
    };
  }, [isOpen, name]);

  function startGesture(event: PointerEvent<HTMLDivElement>, action: WindowGesture["action"]) {
    if (!event.isPrimary || event.button !== 0 || !visibleFrame || gestureRef.current) return;

    gestureRef.current = {
      action,
      pointerId: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      frame: visibleFrame,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    panelRef.current?.focus({ preventScroll: true });
  }

  function moveGesture(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId || !bounds) return;

    const deltaX = event.clientX - gesture.start.x;
    const deltaY = event.clientY - gesture.start.y;
    const original = gesture.frame;
    const nextFrame = gesture.action === "move"
      ? { ...original, x: original.x + deltaX, y: original.y + deltaY }
      : { ...original, width: original.width + deltaX, height: original.height + deltaY };
    setFrame(fitFrame(nextFrame, bounds));
  }

  function endGesture(event: PointerEvent<HTMLDivElement>) {
    if (gestureRef.current?.pointerId === event.pointerId) gestureRef.current = null;
  }

  function resizeWindow(change: number) {
    if (!visibleFrame || !bounds) return;

    setFrame(fitFrame({
      ...visibleFrame,
      width: visibleFrame.width + change,
      height: visibleFrame.height + change,
    }, bounds));
  }

  function close() {
    closePopup(name);
    document.querySelector<HTMLButtonElement>(`[aria-controls="${popupId}"]`)?.focus({ preventScroll: true });
  }

  const canShrink = visibleFrame && bounds && (
    visibleFrame.width > Math.min(minimumWidth, bounds.width) ||
    visibleFrame.height > Math.min(minimumHeight, bounds.height)
  );
  const canGrow = visibleFrame && bounds && (
    visibleFrame.width < bounds.width || visibleFrame.height < bounds.height
  );

  return (
    <section
      ref={panelRef}
      id={popupId}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      inert={!isOpen}
      className={`fixed top-0 left-0 z-100 flex origin-center flex-col rounded-2xl bg-panel text-ink shadow-window outline-none focus-within:z-[101]
        motion-safe:duration-200 motion-safe:ease-out
        ${isOpen
          ? "visible opacity-100 motion-safe:transition-[opacity,scale]"
          : "invisible opacity-0 motion-safe:scale-95 motion-safe:transition-[opacity,scale,visibility]"}`}
      style={visibleFrame ? {
        translate: `${visibleFrame.x}px ${visibleFrame.y}px`,
        width: visibleFrame.width,
        height: visibleFrame.height,
      } : undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <div
        className="flex shrink-0 touch-none cursor-grab items-center justify-between rounded-t-2xl bg-frame px-4 py-1.5 text-canvas select-none active:cursor-grabbing sm:px-8"
        onPointerDown={(event) => startGesture(event, "move")}
        onPointerMove={moveGesture}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        onLostPointerCapture={endGesture}
      >
        <h2 id={titleId} className="text-base font-semibold">{title}</h2>
        <button
          type="button"
          aria-label={`Close ${name}`}
          className="-mr-2.5 grid size-11 shrink-0 cursor-pointer place-items-center rounded-sm focus-visible:outline-2 focus-visible:outline-canvas motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-115"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={close}
        >
          <Xmark aria-hidden="true" className="size-6" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {frame && children}
      </div>

      <div className="flex shrink-0 items-center justify-end px-1">
        <button
          type="button"
          aria-label={`Make ${name} window smaller`}
          title="Make window smaller"
          aria-disabled={!canShrink}
          className={sizeButtonClass}
          onClick={() => { if (canShrink) resizeWindow(-resizeStep); }}
        >
          <Minus aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          aria-label={`Make ${name} window larger`}
          title="Make window larger"
          aria-disabled={!canGrow}
          className={sizeButtonClass}
          onClick={() => { if (canGrow) resizeWindow(resizeStep); }}
        >
          <Plus aria-hidden="true" className="size-5" />
        </button>
        <div
          aria-hidden="true"
          title="Drag to resize"
          className="grid size-11 shrink-0 touch-none cursor-nwse-resize place-items-center rounded-sm select-none hover:bg-frame/10"
          onPointerDown={(event) => startGesture(event, "resize")}
          onPointerMove={moveGesture}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          onLostPointerCapture={endGesture}
        >
          <ArrowDownRight aria-hidden="true" className="size-5" />
        </div>
      </div>
    </section>
  );
}

export function AboutPopup() {
  return (
    <PopupWindow name="About" title="About me">
      <div className="mb-4 flex items-center gap-4 border-b-2 border-[#222] px-4 pt-8 pb-4 sm:gap-8 sm:px-8">
        <img
          className="aspect-square w-[15%] rounded-full object-cover"
          src={`${import.meta.env.BASE_URL}scout-cat.webp`}
          alt="cat dressed up as an attack on titan scout!"
        />
        <div className="flex flex-col gap-2 sm:gap-4">
          <h3 className="text-[1.25rem] font-semibold text-highlight sm:text-[2rem]">Jason Lukman</h3>
          <strong className="font-semibold">Software Engineer</strong>
        </div>
      </div>
      <div className="mx-4 sm:mx-8">
        <strong>Welcome to my website!</strong>
        <p className="my-4">
          As you may already know my name is Jason! I'm passionate about and
          interested in software engineering. In particular I love web
          development and learning how to create more user centric software.
        </p>
        <p className="my-4">In my free time I like to:</p>
        <ul className="my-4 list-disc ps-10">
          <li>Work on and improve this website!</li>
          <li>Turn random ideas I have into real projects.</li>
          <li>Hone and refine my software development skills.</li>
        </ul>
        --- Non work related Interests and Hobbies ---
        <ul className="my-4 list-disc ps-10">
          <li>Long distance running and gym</li>
          <li>Watching the NBA and playing basketball</li>
          <li>Gaming (Valorant and CS2)</li>
          <li>Fih 🐟</li>
        </ul>
        <div>
          Contact me at this{" "}
          <a className="text-highlight underline" href="mailto:jasonlukman729@gmail.com">
            email!
          </a>
        </div>
      </div>
    </PopupWindow>
  );
}

export function ProjectsPopup() {
  return (
    <PopupWindow name="Projects" title="Projects">
      <div className="mx-4 pt-4 sm:mx-8">
        <Projects />
      </div>
    </PopupWindow>
  );
}
