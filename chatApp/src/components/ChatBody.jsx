/* eslint-disable react/prop-types */
import { SendRounded } from "@mui/icons-material";
import { Box, Paper, Typography, TextField, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatBody = ({ socket, username }) => {
  const date = new Date();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessage("");
    if (message.trim() !== "") {
      socket.emit("message", {
        message: message,
        name: username,
        time: time,
      });
    }
  };
  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get("http://localhost:3000/messages");
      setAllMessages(response.data);
    };
    getMessages();
  });
  return (
    <>
      <Typography component={"div"}>
        Your username is
        <Typography sx={{ color: "#00aefe" }}>{username}</Typography>
      </Typography>
      <Paper
        sx={{
          p: 2,
          mt: 2,
          mx: 2,
          minHeight: 400,
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        {allMessages.map((data) => {
          return (
            <Box
              key={data._id}
              sx={{
                maxWidth: 400,
                width: 100,
                px: 2,
                py: 1,
                m: 3,
                borderRadius: 2,
                bgcolor: "#FFF0CE",
                display: "flex",
                flexDirection: "column",
                boxShadow: 5,
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: "#0C356A" }}
              >
                {data.name}
              </Typography>
              <Typography sx={{ lineHeight: 1, mt: 0.7 }}>
                {data.message}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 10,
                  color: "#aeaeae",
                  ml: "auto",
                  width: "fit-content",
                }}
              >
                {time}
              </Typography>
            </Box>
          );
        })}
      </Paper>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            width: 500,
            boxShadow: 8,
            borderRadius: 4,
            alignItems: "center",
            px: 1,
          }}
        >
          <form
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <TextField
              value={message}
              variant="standard"
              placeholder="Enter your message"
              fullWidth
              sx={{ border: "none", outline: "none" }}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={handleMessageChange}
            />
            <IconButton
              type="submit"
              onClick={handleSendMessage}
              disableRipple={true}
              sx={{
                color: "#00aefe",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <SendRounded sx={{ fontSize: 40 }} />
            </IconButton>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ChatBody;
