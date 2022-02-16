import "./App.css";
import React from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Header />
        <Home />
        <Footer />
      </CssBaseline>
    </div>
  );
}

export default App;
