import Home from "./pages/home";
import UserContextProvider from "./UserContext";
import { HeaderButtons } from "./components/Buttons";

function App() {
  return (
    <UserContextProvider>
      <HeaderButtons />
      <Home />
    </UserContextProvider>
  );
}

export default App;
