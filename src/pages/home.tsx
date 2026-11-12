import { NavButtons } from "../components/Buttons";
import { Introduction, IntroductionInfo } from "../components/Introduction";
import { AboutPopup, ProjectsPopup } from "../components/PopUps";

function Home() {
  return (
    <>
      <main className="grid min-h-dvh place-items-center px-4 py-20">
        <div
          className="w-[calc(16.5rem+4vw+4px)] max-w-full rounded-sm border-2 border-frame bg-panel px-[2vw] shadow-intro min-[770px]:w-max min-[770px]:max-w-[max(50vw,36rem)] motion-safe:animate-intro"
        >
          <Introduction />
          <IntroductionInfo />
          <NavButtons />
        </div>
      </main>
      <AboutPopup />
      <ProjectsPopup />
    </>
  );
}

export default Home;
