import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
