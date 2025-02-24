import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../files/useChatStore";
import MessageSkeleton from "../skelton/MessageSkeleton";
import Chatheader from "./Chatheader";
import Messageinput from "./messageinput";
import { checkAuthStore } from "../files/checkAuthFile";
import defaultimg from '../pages/logoimg/default-avatar.png';
import ContextMenu from "./ContextMenu";

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser, setToMessage, unSetToMessage ,isImage} = useChatStore();
  const { isAuth } = checkAuthStore();
  const [showMenu, setShowMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    setToMessage();
    return () => unSetToMessage();
  }, [selectedUser._id, getMessages, setToMessage, unSetToMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu) setShowMenu(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  if (isMessageLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <Chatheader />
        <MessageSkeleton />
        <Messageinput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderid === isAuth._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
            onContextMenu={(e) => {
              e.preventDefault();
              setMenuPosition({ x: e.clientX + 4, y: e.clientY + 4 });
              setShowMenu(message._id);
            }}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderid === isAuth._id
                      ? isAuth.profileimage || defaultimg
                      : selectedUser.profileimage || defaultimg
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {/* time here */}
              </time>
            </div>
            <div className={`chat-bubble flex flex-col ${message.senderid === isAuth._id ? "bg-primary text-primary-content" : ""}`}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.message && <p>{message.message}</p>}
            </div>
          </div>
        ))}

        {isImage && (
          <div className="skeleton h-16 w-[200px] float-right" />
        )}

        {/* Context Menu */}
        {showMenu && (
          <div
            className="absolute duration-100 rounded-md z-50"
            style={{ top: menuPosition.y, left: menuPosition.x }}
          >
            <ContextMenu />
          </div>
        )}
      </div>

      <Messageinput />
    </div>
  );
};

export default ChatContainer;
