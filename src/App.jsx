import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Agent from "./pages/Agent";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import ClickSpark from './ReactBits/ClickSpark';

export default function App() {
  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor='#38b8f8'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ClickSpark>

    </ThemeProvider>
  );
}
