import Home from "./pages/home";
import UserContextProvider from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  );
}

export default App;
