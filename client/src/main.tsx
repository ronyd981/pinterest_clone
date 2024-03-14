import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "@/context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { VITE_GOOGLE_CLIENT_ID } from "@/config";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
    <UserProvider>
      <App />
    </UserProvider>
  </GoogleOAuthProvider>
);
