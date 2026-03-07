import Home from "./pages/home";
import UserContextProvider from "./UserContext";
import { PopupProvider } from "./PopUpContext";
import { Header } from "./components/Buttons";

function App() {
  return (
    <UserContextProvider>
      <PopupProvider>
        <Header />
        <Home />
      </PopupProvider>
    </UserContextProvider>
  );
}

export default App;
