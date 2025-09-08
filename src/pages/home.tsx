import { SocialsButtons, ColorThemeButton } from "../components/Buttons";
import { Introduction, IntroductionInfo } from "../components/Introduction";
import "./home.css"
import 'animate.css';


function Home() {
  // Todo: add dark and light mode feature
  // Todo: add the menu page button to access other parts of the site
  return (
    <body>
      <ColorThemeButton />
      <div className="HeaderBox">
        <Introduction />
        <IntroductionInfo />
        <SocialsButtons />
      </div>
    </body>
  );
}

export default Home;
