import React from "react";
import { createRoot } from "react-dom/client";
import http from "./http";

import App from "./App";
const root = document.getElementById("root");

if (root) {
	createRoot(root).render(<App />);
}