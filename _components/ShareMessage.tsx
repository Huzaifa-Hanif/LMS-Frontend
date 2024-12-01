import { Modal } from "antd";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const ShareMessage = ({
  openModal,
  setOpenModal,
  messageToShare,
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  messageToShare: string;
}) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      title="Share the Message"
      centered
      footer={null}
      className="!text-center"
    >
      <div className="flex items-center justify-center gap-3 lg:gap-5">
        <WhatsappShareButton url={messageToShare}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TwitterShareButton url={messageToShare}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </Modal>
  );
};

export default ShareMessage;
