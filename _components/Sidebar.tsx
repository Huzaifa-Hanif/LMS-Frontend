"use client";
import { Plus, Trash2 } from "lucide-react";
import { Spin, message } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

// import { deleteChat, getAllChatsByUserId } from '@/app/lib/chats';
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from '@/store/store';
// import { setSelectedChat, setUserChats } from '@/store/slice/chatsSlice';
// import { Logo } from '@/app/(dashboard)/_components/logo';
import { AppDispatch, RootState } from "@/app/store/store";
import { setSelectedChat, setUserChats } from "@/app/store/slice/chatsSlice";
// import { useIsLogedIn } from '@/app/admin/hooks/useIsLogedIn';
import { useSession } from "next-auth/react";
import { useIsLogedIn } from "@/hooks/useIsLogedIn";
import { getUserDataFromLocalStorage } from "@/lib/auth";
import { URL } from "@/app/constants/apiEndpoints";
import Axios from "@/app/utils/axiosInstance";

const deleteChatAPI = async (chatId: string) => {
  const res = await Axios.delete(URL.DELETE_CHAT, {
    // body: JSON.stringify({ chatId }),
    data: { chatId },
  });

  if (!res.status) {
    throw new Error("Failed to delete chat");
  }

  return await res.data;
};
const getAllChatsByUserId = async (userId: string) => {
  const res = await Axios.get(`${URL.GET_CHATS + userId}`);

  if (!res.status) {
    throw new Error("Failed to fetch chats");
  }

  return res;
};
const Sidebar = () => {
  const logedIn = useIsLogedIn();
  const { data: session, status } = useSession();
  const userData = getUserDataFromLocalStorage();
  const dispatch: AppDispatch = useDispatch();

  const [hoveredChatId, setHoveredChatId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChatDelete, setLoadingChatDelete] = useState<boolean>(false);

  // const { loggedInUserData } = usersGlobalStore() as any;
  const loggedInUserData = useSelector((state: RootState) => state.user.user);

  const selectedChat = useSelector(
    (state: RootState) => state.chats.selectedChat
  );
  const userChats = useSelector((state: RootState) => state.chats.userChats);

  // const { userChats, setUserChats, selectedChat, setSelectedChat }: any = chatsGlobalStore();
  // console.log(userChats, 'userChatsuserChats');
  // console.log(selectedChat, 'selectedChatselectedChat');
  const getAllChatsOfAuthenticatedUser = async () => {
    try {
      setLoading(true);

      const response = await getAllChatsByUserId(
        session?.user.id ?? userData.id
      );
      console.log(response, "3939399");

      if (response.status) {
        // dispatch(setUserChats(response.data || []));

        dispatch(setUserChats(response?.data?.data || []));

        // setUserChats(response.data);
      } else {
        // message.error('Something went wrong!! Please try again!!');
      }
    } catch (error) {
      // message.error('Something went wrong!! Please try again!!');
    } finally {
      setLoading(false);
    }
  };

  const deleteChatHandler = async (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      setLoadingChatDelete(true);

      const response = await deleteChatAPI(chatId);

      if (response.success) {
        const updatedChatHistory = userChats.filter(
          (chat: any) => chat.id !== chatId
        );
        dispatch(setUserChats(updatedChatHistory || []));

        if (selectedChat?.id === chatId) {
          dispatch(setSelectedChat(null));
        }
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoadingChatDelete(false);
    }
  };

  useEffect(() => {
    getAllChatsOfAuthenticatedUser();
  }, []);

  return (
    <div className="flex h-full w-56 flex-col justify-between gap-3 border-r p-5 shadow-sm">
      <div className="pb-6">
        {/* <Logo /> */}
        Logo
      </div>
      <div className="flex-1 overflow-y-auto">
        <div
          className="flex w-max cursor-pointer items-center justify-center gap-2 rounded-sm border border-solid border-gray-200 p-2 text-sm text-gray-800"
          onClick={() => {
            dispatch(setSelectedChat(null));
          }}
        >
          <Plus size={15} />
          <span>New Chat</span>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <h1 className="p-2 text-sm font-bold text-gray-900">
            Your Chat History
          </h1>

          {loading && (
            <Spin
              size="large"
              className="sidebar-spinner flex h-60 items-center justify-center"
            />
          )}

          {!loading && userChats?.length === 0 && (
            <p className="p-2 text-sm text-gray-400">Nothing to Show</p>
          )}

          {!loading &&
            userChats.length !== 0 &&
            userChats?.map((chat: any) => (
              <div
                key={chat.id}
                className={classNames(
                  "flex cursor-pointer items-center justify-between p-2 hover:bg-[#0369A1] hover:bg-opacity-25",
                  {
                    "rounded bg-[#0369A1] bg-opacity-30":
                      selectedChat?.id === chat.id,
                  }
                )}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId("")}
                onClick={() => {
                  dispatch(setSelectedChat(chat));
                }}
              >
                <span className="text-sm text-black">
                  {chat.title.split(" ").length <= 3
                    ? chat.title
                    : chat.title.split(" ").slice(0, 3).join(" ") + " . . . ."}
                </span>

                {hoveredChatId === chat.id &&
                  (loadingChatDelete ? (
                    <Spin className="sidebar-spinner" size="default" />
                  ) : (
                    <Trash2
                      size={15}
                      className="text-red-400"
                      onClick={(e) => deleteChatHandler(chat.id, e)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3">
        {/* <span className="text-gray-400 text-xs">
          Designed & Developed by
        </span>

        <hr className='border border-solid border-gray-500 w-10' />

        <span className="text-gray-400 text-xs">
          Somenath Choudhury
        </span> */}
      </div>
    </div>
  );
};

export default Sidebar;
