"use client";

import { useEffect, useState } from "react";
import { Menu, Send, Loader } from "lucide-react";
import { Drawer, message } from "antd";
import { useChat } from "ai/react";

import Sidebar from "./Sidebar";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { setSelectedChat, setUserChats } from "@/app/store/slice/chatsSlice";
import { useSession } from "next-auth/react";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";
import { getUserDataFromLocalStorage } from "@/lib/auth";
const ChatArea = () => {
  const { data: session, status } = useSession();

  const [
    showSidebarOnMobileResponsiveness,
    setShowSidebarOnMobileResponsiveness,
  ] = useState(false);

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
  });
  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );
  const userChats = useSelector((state: RootState) => state.chats.userChats);
  const dispatch: AppDispatch = useDispatch();
  const userData = getUserDataFromLocalStorage();

  // const { loggedInUserData }: any = usersGlobalStore();
  const loggedInUserData = useSelector((state: RootState) => state.user.user);

  const createNewChatAPI = async (chatData: {
    user: string;
    messages: any[];
    title: string;
  }) => {
    console.log("Attempting to create new chat with data:", chatData);
    try {
      const res = await Axios.post(URL.CREATE_CHAT, chatData);

      if (res.status < 200 || res.status >= 300) {
        throw new Error("Failed to create chat");
      }

      return res.data;
    } catch (error) {
      console.error("Error creating new chat:", error);
      throw error;
    }
  };

  const createOrUpdateChat = async () => {
    try {
      console.log("Selected chat:", selectedChat);
      console.log("User ID:", userData.id);

      if (!selectedChat) {
        console.log("Creating a new chat...");
        const response = await createNewChatAPI({
          user: session?.user.id ?? userData.id,
          messages: messages,
          title: messages[0]?.content || "Untitled",
        });

        console.log("New chat created:", response);

        if (response?.success) {
          dispatch(setSelectedChat(response?.data));
          dispatch(setUserChats([response?.data, ...userChats]));
        }
      } else {
        console.log("Updating existing chat...");
        const response = await updateChatAPI(selectedChat.id, messages);

        console.log("Updated chat response:", response);

        const updatedChats = userChats.map((chat: any) =>
          chat.id === selectedChat.id ? { ...chat, messages } : chat
        );

        dispatch(setUserChats(updatedChats));
      }
    } catch (error) {
      message.error("Something went wrong! Please try again!");
      console.error("Error in createOrUpdateChat:", error);
    }
  };

  const updateChatAPI = async (chatId: string, messagesArray: any[]) => {
    const res = await Axios.put(URL.CREATE_CHAT, {
      body: JSON.stringify({ chatId, messagesArray }),
    });

    if (!res.status) {
      throw new Error("Failed to update chat");
    }

    return await res.data;
  };

  // const createOrUpdateChat = async () => {
  //   try {
  //     console.log(selectedChat, "++++++++++");
  //     console.log(userData.id, "------------");
  //     if (!selectedChat) {
  //       console.log("inside");
  //       const response = createNewChatAPI({
  //         user: session!.user.id ?? userData.id,
  //         messages: messages,
  //         title: messages[0].content,
  //       });
  //       console.log(response, "03okldkfldk");
  //       // if (response?.success) {
  //       //   dispatch(setSelectedChat(response?.data));

  //       //   dispatch(setUserChats([response?.data, ...userChats]));
  //       // }
  //     } else {
  //       // await updateChatAPI({ chatId: selectedChat?.id, messagesArray: messages });
  //       const response = await updateChatAPI(selectedChat.id, messages);

  //       const updatedChats = userChats.map((chat: any) =>
  //         chat.id === selectedChat.id ? { ...chat, messages } : chat
  //       );

  //       dispatch(setUserChats(updatedChats));
  //     }
  //   } catch (error: any) {
  //     message.error(error + "Something went wrong! Please try again!");
  //   }
  // };

  useEffect(() => {
    console.log(messages, "000090mesage");
    if (messages.length > 0) {
      createOrUpdateChat();
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat?.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  return (
    <div className="bg-chatareacolor flex flex-1 flex-col overflow-y-auto p-5">
      <div className="flex justify-between px-5">
        <div className="flex items-center justify-center gap-2">
          <Menu
            className="flex cursor-pointer text-black lg:hidden"
            onClick={() => setShowSidebarOnMobileResponsiveness(true)}
            size={16}
          />

          <h1 className="text-sm font-bold uppercase text-yellow-950 lg:text-xl">
            Ask Anything From US
          </h1>
        </div>

        {/* <UserButton /> */}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="text-black">
          <Messages messages={messages} isLoading={isLoading} />
        </div>

        <form onSubmit={handleSubmit} className="relative mt-3">
          <div className="bg-sidebarcolor flex items-center rounded focus-within:border focus-within:border-white focus-within:outline-none">
            <textarea
              name="prompt"
              value={input}
              onChange={handleInputChange}
              id="input"
              placeholder="Enter your prompt..."
              className="bg-sidebarcolor w-full resize-none rounded-l p-5 text-sm text-white placeholder-white focus:border-none"
              style={{ flex: 1, maxHeight: "100px", overflowY: "auto" }}
              rows={1}
            />

            {isLoading ? (
              <Loader className="animate-spin p-3 text-gray-300 transition-all duration-150" />
            ) : (
              <button type="submit" disabled={!input.trim()} className="p-3">
                <Send
                  className={`ml-3 ${
                    !input.trim()
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer text-white"
                  }`}
                />
              </button>
            )}
          </div>
        </form>
      </div>

      {showSidebarOnMobileResponsiveness && (
        <Drawer
          open={showSidebarOnMobileResponsiveness}
          onClose={() => setShowSidebarOnMobileResponsiveness(false)}
          placement="left"
        >
          <Sidebar />
        </Drawer>
      )}
    </div>
  );
};

export default ChatArea;
