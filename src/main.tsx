import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

const rootEl = document.createElement("div");
rootEl.id = "app";
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

root.render(<App />);
