import { NavButtons } from "../components/Buttons";
import { Introduction, IntroductionInfo } from "../components/Introduction";
import { AboutPopup, ProjectsPopup } from "../components/PopUps";
import "./home.css";
import "animate.css";

function Home() {
  return (
    <div>
      <div className="animate__animated animate__fadeIn CenterBox">
        <Introduction />
        <IntroductionInfo />
        <NavButtons />
        <AboutPopup />
        <ProjectsPopup />
      </div>
    </div>
  );
}

export default Home;
