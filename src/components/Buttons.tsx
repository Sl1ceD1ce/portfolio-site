import { IconoirProvider, Github, Linkedin, Page, Mail } from "iconoir-react";

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
    href: "",
    icon: <Page />,
  },
  {
    href: "",
    icon: <Mail />
  }
];

export function SocialsButtons() {
  return (
    <div className="SocialsButtonContainer">
      <IconoirProvider
        iconProps={{
          color: "#000000",
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
  return <a href={href} target="_blank">{icon}</a>;
}
