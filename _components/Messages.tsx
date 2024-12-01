import { Button, message, Spin } from "antd";
import { Bot, CopyIcon, Share } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, useState } from "react";

// import usersGlobalStore from "@/store/users-store";
import ShareMessage from "./ShareMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
// import { RootState } from "@/store/store";

const Messages = ({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) => {
  const messagesRef = useRef<any>(null);

  // const { loggedInUserData }: any = usersGlobalStore();
  const loggedInUserData = useSelector((state: RootState) => state.user.user);

  const [messageToShare, setMessageToShare] = useState<string>("");
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const onCopyChatMessage = (messageContentOfAssistant: string) => {
    navigator.clipboard.writeText(messageContentOfAssistant);

    message.success("chat copied to clipboard");
  };

  return (
    <div
      className="flex flex-col gap-7 max-h-[75vh]  mt-7 !h-[70vh] overflow-y-auto scroll-smooth"
      ref={messagesRef}
    >
      {messages?.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="p-5 border border-gray-600 rounded text-gray-400 text-center text-sm lg:text-base">
            Hey, <span className="font-bold">{loggedInUserData?.fullname}</span>
            , I am <span className="font-semibold">Next Gemini ChatApp</span>.
            How can I help you today?
          </p>
        </div>
      )}

      {messages?.map((message) =>
        message.role === "user" ? (
          <div className="flex justify-end mr-5 text-sm" key={message?.id}>
            <span className="bg-[#0369A1] text-white p-3 rounded">
              {message?.content}
            </span>
          </div>
        ) : (
          <div className="flex gap-2" key={message?.id}>
            <div className="border border-gray-300 border-solid rounded-full h-6 w-6 flex items-center justify-center">
              <Bot size={16} />
            </div>

            <span className="flex-1 mr-5 flex-col gap-3 -mt-4">
              <Markdown
                className="markdown"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {message?.content}
              </Markdown>

              {/* copy and share button for each text */}
              <div className="flex gap-5 -ml-4">
                <Button
                  ghost
                  className="border-none"
                  onClick={() => onCopyChatMessage(message?.content)}
                >
                  <CopyIcon size={16} className="text-gray-700" />
                </Button>

                <Button
                  ghost
                  className="border-none"
                  onClick={() => {
                    setMessageToShare(message.content);

                    setOpenShareModal(true);
                  }}
                >
                  <Share size={16} className="text-gray-700" />
                </Button>
              </div>
            </span>

            {openShareModal && (
              <ShareMessage
                openModal={openShareModal}
                setOpenModal={setOpenShareModal}
                messageToShare={message?.content}
              />
            )}
          </div>
        )
      )}

      <div className="flex justify-start">
        {isLoading && <Spin className="small" />}
      </div>
    </div>
  );
};

export default Messages;
