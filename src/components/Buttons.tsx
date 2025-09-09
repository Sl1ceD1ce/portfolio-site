import {
  IconoirProvider,
  Github,
  Linkedin,
  Page,
  Mail,
  SunLight,
  HalfMoon,
} from "iconoir-react";
import "./Components.css";
import { useUserContext } from "../UserContext.tsx";

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
    href: "",
    icon: <Mail />,
  },
];

// create user context to access the dark mode state
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
