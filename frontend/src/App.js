import Header from "./components/header/Header";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header/>
      <AppRouter />
    </>
  );
}

export default App;
