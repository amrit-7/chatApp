import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import ChatPage from "./Pages/ChatPage";
const socket = socketIO.connect("http://localhost:3000");
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
