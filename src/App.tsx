import Home from "./pages/home";
import UserContextProvider from "./UserContext";
import { NavBar } from "./components/Buttons";

function App() {
  return (
    <UserContextProvider>
      <NavBar />
      <Home />
    </UserContextProvider>
  );
}

export default App;
