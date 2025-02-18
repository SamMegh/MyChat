import { useEffect, useRef } from "react";
import { useChatStore } from "../files/useChatStore";
import MessageSkeleton from "../skelton/MessageSkeleton";
import Chatheader from "./Chatheader";
import Messageinput from "./messageinput";
import { checkAuthStore } from "../files/checkAuthFile";
import defaultimg from '../pages/logoimg/default-avatar.png';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, setToMessage, unSetToMessage } = useChatStore();
  const { isAuth } = checkAuthStore();
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
  if (isMessagesLoading)
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
            className={`chat ${message.senderid === isAuth._id ? "chat-end " : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
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
            <div className={`chat-bubble flex flex-col ${message.senderid === isAuth._id ? " bg-primary text-primary-content" : ""}`}>
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
      </div>

      <Messageinput />
    </div>
  );
};
export default ChatContainer;