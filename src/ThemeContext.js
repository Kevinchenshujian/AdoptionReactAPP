import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]); //hook-shape like, a state and a updater

export default ThemeContext;
