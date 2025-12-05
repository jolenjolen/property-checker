import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import Nav from "./components/Nav";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}
