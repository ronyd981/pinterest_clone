import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { ModalProvider } from "@/context";

import { Home, Pin, Profile, Today, CreatePin, EditProfile } from "@/pages";
import { Private, Public } from "@/layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Public />}>
              <Route index element={<Home />} />
              <Route path="/pin/:id" element={<Pin />} />
              <Route path="/today" element={<Today />} />
              <Route element={<Private />}>
                <Route path="/create-pin" element={<CreatePin />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile/:id/edit" element={<EditProfile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
