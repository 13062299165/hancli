import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
let root = document.getElementById("root");
if (root) {
    createRoot(root).render(<App />)
}