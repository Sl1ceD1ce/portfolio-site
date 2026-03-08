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

import "./Components.css";
import { useUserContext } from "../UserContext.tsx";
import { usePopupContext } from "../PopUpContext.tsx";
import type { PopupType } from "../PopUpContext.tsx";

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
    href: "./JasonLukmanResume.pdf",
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

  return (
    <button className="ColorThemeButton" onClick={toggleTheme}>
      {darkMode ? (
        <IconoirProvider
          iconProps={{
            strokeWidth: 2,
          }}
        >
          <HalfMoon />
        </IconoirProvider>
      ) : (
        <IconoirProvider
          iconProps={{
            strokeWidth: 2,
          }}
        >
          <SunLight />
        </IconoirProvider>
      )}
    </button>
  );
}

export function NavButtons() {
  return (
    <nav className="NavButtonContainer">
      <IconoirProvider
        iconProps={{
          strokeWidth: 1.3,
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
    <a className="SocialButton" href={href} target="_blank">
      {icon} <label>{label}</label>
    </a>
  );
}

function PopUpButtons({ icon, label }: PopUpLinksProps) {
  const { openPopup } = usePopupContext();

  return (
    <button
      className="SocialButton PopUpButtons"
      onClick={() => openPopup(label)}
    >
      {icon} <label>{label}</label>
    </button>
  );
}

export function Header() {
  return (
    <header>
      <ColorThemeButton />
    </header>
  );
}
