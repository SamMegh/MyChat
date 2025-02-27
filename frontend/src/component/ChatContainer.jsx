import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../files/useChatStore";
import MessageSkeleton from "../skelton/MessageSkeleton";
import Chatheader from "./Chatheader";
import Messageinput from "./messageinput";
import { checkAuthStore } from "../files/checkAuthFile";
import defaultimg from '../pages/logoimg/default-avatar.png';
import ContextMenu from "./ContextMenu";

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser, setToMessage, unSetToMessage, isImage,list, copyContaxt, replyContaxt, deleteContaxt,setToDeleteChat } = useChatStore();
  const { isAuth } = checkAuthStore();
  const [showMenu, setShowMenu] = useState(null);
  const [id, setId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    setToMessage();
    setToDeleteChat();
    return () => unSetToMessage();
  }, [selectedUser._id, getMessages, setToMessage, setToDeleteChat, unSetToMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessageLoading) return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Chatheader />
      <MessageSkeleton />
      <Messageinput />
    </div>
  );

  const showTime = (time) => {
    const [hr, min] = time.split("T")[1].split(":").slice(0, 2);
    const hrint = parseInt(hr)
    const period = (hrint > 12) ? "PM" : "AM"
    let newTime = [hr, min].join(":")
    newTime = [newTime, period].join(" ")
    return newTime
  }

  const showDate = (date) => {
    const [year, monthno, day] = date.split("T")[0].split("-").slice(0, 3)
    const monthnoint = parseInt(monthno)
    const monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthname[monthnoint-1]
    const newDate = [day, month, year].join("-")
    return newDate
  }
  const handlecontaxtmenu = (operation) => {
    if (!list.includes(operation)) {
      setId(operation)
      return
    }
    else{
      switch (operation) {
        case "Copy":
          copyContaxt(id)
          setId(null)
          break;
        case "Reply":
          replyContaxt(id)
          setId(null)
          break;
        case "Delete":
          deleteContaxt(id)
          setId(null)
          break;
        default:
          console.log("operation not found")
          setId(null)
      }
    }
    
       }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1]; // Get previous message
          const prevDate = prevMessage ? showDate(prevMessage.createdAt) : null;
          const curDate = showDate(message.createdAt);
          return (
            <div key={index}>
              {index === 0 || prevDate != curDate &&
                
                  <div className='rounded-xl bg-primary/90 mx-auto w-fit px-3 left select-none'>
                    <p className='text-bse-100'>
                      {showDate(message.createdAt)}</p>
                  </div>
              }
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
                    {showTime(message.createdAt)}
                  </time>
                </div>
                <div className={`chat-bubble flex flex-col ${message.senderid === isAuth._id ? " bg-primary text-primary-content" : ""}`}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setMenuPosition({ x: (e.clientX + 116)>window.innerWidth?e.clientX-130:e.clientX, y: e.clientY + 4 });
                    setShowMenu(message._id);
                    handlecontaxtmenu(message._id)
                  }}>
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
            </div>
          )
        }


        )}
        {isImage && <>
          <div className="skeleton h-16 w-[200px] float-right" />
        </>
        }

        <div className={`${showMenu ? "absolute duration-100" : "hidden"}`} style={{ top: menuPosition.y, left: menuPosition.x }}>
          <ContextMenu handlecontaxtmenu={handlecontaxtmenu} />
        </div>


        {
          window.addEventListener('click', () => {
            setShowMenu(null)
          })
        }
      </div>

      <Messageinput />
    </div>
  );
};
export default ChatContainer;