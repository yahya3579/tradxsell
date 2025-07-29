import { React, useState, useContext, useEffect, useRef } from "react";
import {
  ListGroup,
  Form,
  Button,
  Image,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./chat.css";
import axios from "axios";
import Logo from "../../logo.png";
import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../../AuthContext";
import chatting from "../Assets/chatting.png";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";


export default function Chat() {
  const navigate = useNavigate();
  const { email, loggedIn, username, role, id } = useContext(AuthContext);
  if (!loggedIn) {
    navigate('/');
  }
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messagess, setMessages] = useState(null);
  const [combineMessages, setCombineMessages] = useState([]);
  const [newMessageStatus, setnewMessageStatus] = useState(true);
  const chatWindowRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const { handleLogout, } = useContext(AuthContext);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [combineMessages]);


  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/chat/${id}`);
        setChats(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Network Error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChats();
    }
  }, [id]);

  // Transform chat data for UI
  const transformedContacts = chats.map((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1] || {
      text: "No messages yet",
      timestamp: { $date: null },
    };

    const timestamp = lastMessage?.timestamp?.$date || lastMessage?.timestamp;

    let formattedTime = "Unknown time";
    if (timestamp) {
      const date = new Date(timestamp);
      formattedTime = isNaN(date.getTime())
        ? "Invalid date"
        : date.toLocaleTimeString();
    }

    const otherParticipant = chat.participants.find(
      (participant) => participant._id !== id
    );

    return {
      id: chat._id,
      name: `${otherParticipant?.username || "Unknown"}`,
      image:
        otherParticipant?.image ||
        "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
      message: lastMessage.text,
      time: formattedTime,
    };
  });

  const filteredContacts = transformedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    // Fetch the messages for the selected contact
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST_URL}/chats/${contact.id}`
      );
      setMessages(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Network Error");
    }
  };

  useEffect(() => {
    if (selectedContact || newMessageStatus) {
      handleContactClick(selectedContact);
    }
  }, [newMessageStatus]);

  useEffect(() => {
    if (messagess) {
      const participant0Id = messagess?.participants[0]?._id;
      const participant1Id = messagess?.participants[1]?._id;

      // Initialize categories
      const categorizedMessages = {
        participant0Messages: [],
        participant1Messages: [],
      };

      // Categorize messages based on sender ID
      messagess?.messages.forEach((message) => {
        const senderId = message.sender?._id;

        if (senderId === participant0Id) {
          categorizedMessages.participant0Messages.push(message);
        } else if (senderId === participant1Id) {
          categorizedMessages.participant1Messages.push(message);
        }
      });

      setCombineMessages(categorizedMessages);
    } else {
      console.error("messagess is undefined or null.");
    }
  }, [messagess, newMessageStatus]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Store the base64 data of the file
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  // Handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const senderId = localStorage.getItem("id");
    const receiverId = messagess?.participants
      .filter((participant) => participant._id !== senderId)
      .map((participant) => participant._id)[0];

    // Ensure senderId, receiverId, and message text are valid
    if (!senderId || !receiverId || (!newMessage.trim() && !file)) {
      alert("Please enter a valid message or select a file.");
      return;
    }
    try {
      // Prepare data to send to the API
      const messageData = {
        senderId,
        receiverId,
        text: newMessage,
        file: file, // Send the base64 file data
      };

      // Send message via API
      const response = await axios.post(
        `${process.env.REACT_APP_LOCALHOST_URL}/chat/send`,
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful message sending (clear message input, etc.)
      console.log("Message sent:", response.data);
      setNewMessage(""); // Clear input field after sending
      setFile(null); // Clear file state
      setnewMessageStatus((prevStatus) => !prevStatus);

      // You may also want to update the UI with the new message or update state accordingly
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading chats...</p>
      </div>
    );
  }

  const loggedInUserId = localStorage.getItem("id");
  const allMessages = [
    ...(combineMessages?.participant0Messages || []),
    ...(combineMessages?.participant1Messages || []),
  ];

  // Sort the messages by timestamp in ascending order (oldest to newest)
  const sortedMessages = allMessages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  console.log("sorted messages", sortedMessages);
  
  
 const userName = localStorage.getItem('username');
 const Role = localStorage.getItem('role');
  return (
    <div >
     <div style={{ height: "10vh", backgroundColor: "#FB5420" }}>
  <div className="d-flex justify-content-between align-items-center h-100">
    
    {/* Left Section: Orange background */}
    <div
      className="d-flex align-items-center"
      style={{ backgroundColor: "white", height: "100%", padding: "0 0px", marginLeft:'0px' }}
    >
      {/* Hamburger - only on small screens */}
      <Button
        variant="link"
        className="d-md-none me-2"
        onClick={() => setShowSidebar(!showSidebar)}
        style={{ color: "black" }}
      >
        <FiMenu size={24} />
      </Button>

      {/* Logo - only on medium+ screens */}
      <NavLink to="/" className="navbar-brand d-none d-md-block">
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "0px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "100%" }}
          />
        </div>
      </NavLink>
    </div>

    {/* Center Section: Chat title */}
    <div
      className="flex-grow-1 text-center"
      style={{
        fontSize: "28px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#FB5420",
        padding: "12px 24px",
        borderRadius: "8px",
        margin: "0 16px",
        maxWidth: "200px"
      }}
    >
      Chat
    </div>

    {/* Right Section: User Info */}
    <div className="d-flex align-items-center me-3">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
        width={35}
        height={35}
        alt={userName}
        className="me-2 rounded-circle"
      />
      <div style={{ lineHeight: "1" }}>
        <span style={{ fontWeight: "bold" }}>{userName}</span>
        <br />
        <small style={{ color: "white" }}>{Role}</small>
      </div>
    </div>
  </div>
</div>


      <div className="d-flex flex-column flex-md-row" style={{ height: "90vh" }}>
        {/* chat sidebar  */}
        <div
          className={`text-white p-2 sidebar-container d-flex flex-column justify-content-between ${showSidebar ? "d-block" : "d-none"} d-md-block`}
        >
          {/* Top section - Messages and Contacts */}
          <div>
            <h3 className="text-black p-2">Messages</h3>
            <input
              type="text"
              className="form-control mb-3 p-2 search-input rounded-1"
              style={{ backgroundColor: "#FFC9B9" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contact, messages..."
            />
            <div className="contact-list-container">
              <ListGroup>
                {filteredContacts.map((contact, index) => (
                  <ListGroup.Item
                  key={contact.id}
                  className={`d-flex align-items-center border-0 p-2 ${selectedContact?.id === contact.id ? 'selected-contact' : ''}`}
                  onClick={() => {
                    handleContactClick(contact);
                    setShowSidebar(false);
                  }}
                >
                    <Image
                      src={contact.image}
                      roundedCircle
                      width={35}
                      height={35}
                      alt={contact.name}
                      className="me-3"
                    />
                    <div className="flex-grow-1">
                      <strong className="userName-text">{contact.name}</strong>
                      <p className="mb-0 userrecent-text">{contact.message}</p>
                    </div>
                    <span className="time-text">{contact.time}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>

          {/* Bottom section - Buttons */}
          <div className="d-flex flex-column" style={{ height: "0vh" }}>
  {/* Other content goes here */}

  <div className="mt-auto d-flex flex-column align-items-center">
    <NavLink
      to="/"
      className="btn mb-2"
      style={{
        backgroundColor: '#FB5420',
        color: 'white',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        width: '200px',
        marginTop:'20px'
      }}
    >
      Go to Dashboard
    </NavLink>
    <NavLink
      to="/logout"
      className="btn"
      onClick={handleLogout}
      style={{
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ED4F1E',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        width: '200px',
      }}
    >
      Logout
    </NavLink>
  </div>
</div>

        </div>



        {selectedContact ? (
          <div className="d-flex flex-column flex-grow-1 chat-window-div p-3" >
            <div className="upper-user-container">
              <div className="d-flex align-items-center">
                <Image
                  src={selectedContact?.image}
                  roundedCircle
                  width={30}
                  height={30}
                  alt={selectedContact?.name}

                  className="me-3 white-icon"
                />
                <span className="fw-bold text-white">{selectedContact?.name}</span>
              </div>
            </div>
            <div
              className="flex-grow-1 p-4"
              style={{ overflowY: "scroll", background:"white" }}
              ref={chatWindowRef}
            >
              {sortedMessages.length > 0 ? (
                sortedMessages.map((msg, index) => {
                  // Check if the sender is the logged-in user
                  const isLoggedInUser = msg.sender._id === loggedInUserId;

                  return (
                    <div
                      key={index}
                      className={`d-flex ${isLoggedInUser
                        ? "justify-content-end"
                        : "justify-content-start"
                        }`}
                    >
                      {/* Display the message from the participant if it's not the logged-in user */}
                      {!isLoggedInUser && (
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" // Replace with actual participant image URL
                          roundedCircle
                          width={35}
                          height={35}
                          alt="Participant"
                          className="me-2"
                        />
                      )}

                      {/* Message container */}
                      <div
                        className={`p-2 my-2 rounded ${isLoggedInUser
                          ? "sender-msg-text text-white"
                          : "bg-white"
                          }`}
                        style={{ maxWidth: "60%" }}
                      >
                        <p className="mb-1">{msg.text}</p>
                        {msg.file && (
                          <img
                            src={`${process.env.REACT_APP_LOCALHOST_URL}${msg.file}`}
                            alt="Sent file"
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                          />
                        )}
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                      </div>

                      {/* Display the logged-in user's name if the message is from them */}
                      {isLoggedInUser && (
                        <p className="ms-2">{localStorage.getItem("username")}</p> // Replace with the key for username in localStorage
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No messages available</p>
              )}
            </div>
            <Form onSubmit={handleSendMessage} className="p-3" style={{background:"white", borderRadius:"0.5px 0px 12px 12px"}}>
              <div className="position-relative w-100">
                <Form.Control
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="message-input ps-5 pe-5"
                  style={{
                    backgroundColor: "#292D32",
                    color: "white",
                    border: "none",
                    height: "45px",
                    borderRadius: "8px",
                  }}
                />

                {/* + Icon (File Upload) */}
                <label
                  htmlFor="file-upload"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  <FiPlus color="white" size={18} />
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {/* Send Button */}
                <Button
                  type="submit"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#ec5b2c",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                >
                  Send
                </Button>
              </div>
            </Form>


          </div>
        ) : (
          <div className="d-flex flex-column flex-grow-1 chat-window-div">
            {/* <div className="upper-user-container">
            <div className="d-flex align-items-center">
             
            </div>
          </div> */}
            <div
              className="flex-grow-1 p-4 d-flex flex-column justify-content-center align-items-center"
              style={{ overflowY: "scroll" }}
            >
              <p className="mb-2 ">Choose a contact to begin the conversation!</p>
              <img src={chatting} className="img-fluid w-25 h-50 rounded" alt="chatting" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
