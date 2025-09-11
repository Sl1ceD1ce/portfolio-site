import {
  IconoirProvider,
  Github,
  Linkedin,
  Page,
  Code,
  SunLight,
  HalfMoon,
  Menu,
  Xmark,
} from "iconoir-react";
import "./Components.css";
import { useUserContext } from "../UserContext.tsx";
import { useState } from "react";

const socials = [
  {
    href: "https://github.com/Sl1ceD1ce",
    icon: <Github />,
  },
  {
    href: "https://www.linkedin.com/in/jason-lukman-3574b728a",
    icon: <Linkedin />,
  },
  {
    href: "./JasonLukmanResume.pdf",
    icon: <Page />,
  },
  {
    href: "https://leetcode.com/u/Sl1ceD1ce/",
    icon: <Code />,
  },
];

export function ColorThemeButton() {
  const { darkMode, toggleTheme } = useUserContext();

  return (
    <button className="ColorThemeButton" onClick={toggleTheme}>
      {darkMode ? (
        <IconoirProvider
          iconProps={{
            width: "2.5em",
            height: "2.5em",
            strokeWidth: 2,
          }}
        >
          <HalfMoon />
        </IconoirProvider>
      ) : (
        <IconoirProvider
          iconProps={{
            width: "2.5em",
            height: "2.5em",
            strokeWidth: 2,
          }}
        >
          <SunLight />
        </IconoirProvider>
      )}
    </button>
  );
}

export function SocialsButtons() {
  return (
    <div className="SocialsButtonContainer">
      <IconoirProvider
        iconProps={{
          strokeWidth: 1.3,
          width: "2.5em",
          height: "2.5em",
        }}
      >
        {socials.map(({ href, icon }) => (
          <SocialButton icon={icon} href={href} />
        ))}
      </IconoirProvider>
    </div>
  );
}

type SocialButtonProps = {
  icon: React.ReactElement;
  href: string;
};

function SocialButton({ icon, href }: SocialButtonProps) {
  return (
    <a className="SocialButton" href={href} target="_blank">
      {icon}
    </a>
  );
}

export function HeaderButtons() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleVisibility = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header>
      <ColorThemeButton />
      <nav>
        <button className="MenuToggle" onClick={toggleVisibility}>
          {showNavbar ? (
            <IconoirProvider
              iconProps={{
                width: "2.5em",
                height: "2.5em",
                strokeWidth: 1.5,
              }}
            >
              <Xmark />
            </IconoirProvider>
          ) : (
            <IconoirProvider
              iconProps={{
                width: "2.5em",
                height: "2.5em",
                strokeWidth: 1.5,
              }}
            >
              <Menu />
            </IconoirProvider>
          )}
        </button>
      </nav>
    </header>
  );
}
