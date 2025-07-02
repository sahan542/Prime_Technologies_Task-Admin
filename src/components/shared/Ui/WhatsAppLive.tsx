import { IMAGES } from "@/image-data";
import "@/styles/whatsapp.css";
import Image from "next/image";

const WhatsAppLive = () => {
  const whatsAppNumber = "8801316315709";
  const baseUrl = "https://api.whatsapp.com/send/";
  const encodedMessage = "Hi there, is there anyone to assist me?";
  const whatsAppLink = `${baseUrl}?phone=${whatsAppNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

  return (
    <div className="fixed bottom-5 right-4 md:bottom-8 md:right-7 z-50">
      <a
        href={whatsAppLink}
        className="whatsapp-line relative"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className="absolute left-[7px] top-[7px] -z-50 size-10">
          <span className="flex size-full justify-center items-center animate-ping rounded-full bg-green-500 opacity-75"></span>
        </span>
        <Image
          src={IMAGES.shared.WhatsAppLogo}
          alt="whatsapp"
          height={40}
          width={40}
          className="whatsapp-icon z-50"
        />
      </a>
    </div>
  );
};

export default WhatsAppLive;
