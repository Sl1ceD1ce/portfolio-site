import { SocialsButtons } from "../components/Buttons";
import { Introduction, IntroductionInfo } from "../components/Introduction";
import "./home.css";
import "animate.css";

function Home() {
  // Todo: add dark and light mode feature
  // Todo: add the menu page button to access other parts of the site
  return (
    <div>
      <div className="animate__animated animate__fadeIn CenterBox">
        <Introduction />
        <IntroductionInfo />
        <SocialsButtons />
      </div>
    </div>
  );
}

export default Home;
