import {
  IconoirProvider,
  Github,
  Linkedin,
  Page,
  Code,
  SunLight,
  HalfMoon,
  Folder,
  InfoCircle,
} from "iconoir-react";

import { useUserContext } from "../UserContext.tsx";
import { usePopupContext } from "../PopUpContext.tsx";
import type { PopupType } from "../PopUpContext.tsx";

const iconSize = "size-6 shrink-0 min-[770px]:size-10";
const buttonInteraction = `cursor-pointer text-ink focus-visible:outline-2 focus-visible:outline-offset-4
  focus-visible:outline-frame motion-safe:transition-transform motion-safe:duration-150
  motion-safe:ease-out motion-safe:hover:scale-115`;
const navButtonStyle = `flex min-h-11 flex-col items-center justify-center min-[770px]:items-stretch ${buttonInteraction}`;
const navLabelStyle = "pt-[10%] text-center text-[0.6rem] font-semibold";

const socials = [
  {
    href: "https://github.com/Sl1ceD1ce",
    icon: <Github />,
    label: "Github",
  },
  {
    href: "https://www.linkedin.com/in/jason-lukman-3574b728a",
    icon: <Linkedin />,
    label: "Linkedin",
  },
  {
    href: `${import.meta.env.BASE_URL}JasonLukmanResume.pdf`,
    icon: <Page />,
    label: "Resume",
  },
  {
    href: "https://leetcode.com/u/Sl1ceD1ce/",
    icon: <Code />,
    label: "Leetcode",
  },
];

type SocialButtonProps = {
  icon: React.ReactElement;
  href: string;
  label: string;
};

const PopUpLinks: PopUpLinksProps[] = [
  {
    icon: <InfoCircle />,
    label: "About",
  },
  {
    icon: <Folder />,
    label: "Projects",
  },
];

type PopUpLinksProps = {
  icon: React.ReactElement;
  label: PopupType;
};

function ColorThemeButton() {
  const { darkMode, toggleTheme } = useUserContext();
  const ThemeIcon = darkMode ? HalfMoon : SunLight;

  return (
    <button
      type="button"
      className={buttonInteraction}
      aria-label="Dark mode"
      aria-pressed={darkMode}
      onClick={toggleTheme}
    >
      <ThemeIcon aria-hidden="true" className={iconSize} strokeWidth={2} />
    </button>
  );
}

export function NavButtons() {
  return (
    <nav
      aria-label="Portfolio"
      className="grid grid-cols-3 pb-[3%] min-[320px]:grid-cols-6 min-[770px]:flex min-[770px]:gap-12"
    >
      <IconoirProvider
        iconProps={{
          strokeWidth: 1.3,
          className: iconSize,
          "aria-hidden": true,
        }}
      >
        {PopUpLinks.map(({ icon, label }) => (
          <PopUpButtons key={label} icon={icon} label={label} />
        ))}

        {socials.map(({ href, icon, label }) => (
          <SocialButton key={label} icon={icon} href={href} label={label} />
        ))}
      </IconoirProvider>
    </nav>
  );
}

function SocialButton({ icon, href, label }: SocialButtonProps) {
  return (
    <a className={navButtonStyle} href={href} target="_blank" rel="noopener noreferrer">
      {icon}
      <span className={navLabelStyle}>{label}</span>
    </a>
  );
}

function PopUpButtons({ icon, label }: PopUpLinksProps) {
  const { closePopup, openPopup, popups } = usePopupContext();

  return (
    <button
      type="button"
      className={navButtonStyle}
      aria-haspopup="dialog"
      aria-expanded={popups[label]}
      aria-controls={`${label.toLowerCase()}-popup`}
      onClick={() => (popups[label] ? closePopup(label) : openPopup(label))}
    >
      {icon}
      <span className={navLabelStyle}>{label}</span>
    </button>
  );
}

export function Header() {
  return (
    <header className="absolute inset-x-8 top-8 flex justify-between">
      <ColorThemeButton />
    </header>
  );
}
