/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";
import NavBar from "../components/Navbar";
import ChatBody from "../components/ChatBody";
import { useEffect, useState } from "react";

const ChatPage = ({ socket }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    socket.on("set-username", (name) => {
      setUsername(name);
    });
  }, []);
  return (
    <Box sx={{ p: 0 }}>
      <>
        <NavBar />
      </>
      <Container maxWidth="xl">
        <ChatBody socket={socket} username={username} />
      </Container>
    </Box>
  );
};

export default ChatPage;
