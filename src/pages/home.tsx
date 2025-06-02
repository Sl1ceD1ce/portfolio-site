import { SocialsButtons } from "../components/Buttons";
import { Introduction, IntroductionInfo } from "../components/Text";

function Home() {
  // Todo: add buttons for the main header page to links
  // Todo: add dark and light mode feature
  // Todo: add the menu page button to access other parts of the site
  return (
    <body>
      <div className="HeaderBox">
        <Introduction />
        <IntroductionInfo />
        <SocialsButtons />
      </div>
    </body>
  );
}

export default Home;
