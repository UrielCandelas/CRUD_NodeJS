import { BrowserRouter , Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Consult from "./pages/Consult/Consult";
import Edit from "./pages/Edit/Edit";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consult" element={<Consult />} />
            <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
