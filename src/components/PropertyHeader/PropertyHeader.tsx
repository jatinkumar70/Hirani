"use client";

import { useState, useEffect } from "react";
import { Heart, Share, MessageCircle, Link as LinkIcon, X } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import { usePathname, useSearchParams } from "next/navigation";
import { showSuccessToast } from "../../utils/toaster/toast";

// Import your dialog components (adjust path as necessary)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/Dialog/Dialog";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";

interface PropertyHeaderProps {
  title: string;
  propertyId?: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ title, propertyId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const baseUrl = "https://www.bnbmehomes.com";
    const currentUrl = `${baseUrl}${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""
      }`;
    setShareUrl(currentUrl);
  }, [pathname, searchParams]);

  // Simple mobile device detection
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  }, []);

  // Only show the text after "|" if it exists, otherwise show the whole title
  const formattedTitle = title.includes("|")
    ? title.split("|")[1].trim()
    : title;

  // Messenger share element
  // On mobile, use the fb-messenger:// deep link, on desktop prompt the user to copy the link
  const renderMessengerShare = () => {
    if (isMobile) {
      return (
        <a
          href={`fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`}
          className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity"
        >
          <FaFacebookMessenger color="#AA987A" className="h-10 w-10" />
          <span>Messenger</span>
        </a>
      );
    } else {
      return (
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            showSuccessToast("Link copied to clipboard!");
            window.location.href = "https://www.messenger.com/";
          }}
          className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity bg-transparent border-none"
        >
          <FaFacebookMessenger color="#AA987A" className="h-10 w-10" />
          <span>Messenger</span>
        </button>
      );
    }
  };


  return (
    <div className="flex justify-between items-center mb-3 lg:mt-0 -mt-4">
      <h1 className="md:text-2xl text-lg font-semibold text-gray-800">
        {formattedTitle}
      </h1>
      <div className="md:flex gap-4 hidden">
        {/* Dialog for Share Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 text-gray-800 text-base"
            >
              <Share size={20} />
              Share
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogTitle className="text-lg -mt-4 font-bold text-center p-1">
              Share This Property
              <DialogClose className="p-1 absolute right-7 top-3 rounded-lg opacity-70 transition-all hover:opacity-100 disabled:pointer-events-none outline-none border-none hover:outline hover:border border-black hover:bg-black/80 hover:text-gray-100 duration-300">
                <X size={20} />
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              {/* Grid of share options */}
              <div className="grid grid-cols-2 pt-4 gap-y-6 gap-x-8 justify-items-center my-4">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity"
                >
                  <FaFacebook color="#AA987A" className="h-10 w-10" />
                  <span>Facebook</span>
                </a>
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity"
                >
                  <FaWhatsapp color="#AA987A" className="h-10 w-10" />
                  <span>WhatsApp</span>
                </a>
                {/* Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity"
                >
                  <FaSquareXTwitter color="#AA987A" className="h-10 w-10" />
                  <span>Twitter</span>
                </a>
                {/* Messenger */}
                {renderMessengerShare()}
                {/* Messages */}
                <a
                  href={`sms:?&body=${encodeURIComponent(shareUrl)}`}
                  className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity"
                >
                  <MessageCircle color="#AA987A" className="h-10 w-10" />
                  <span>Messages</span>
                </a>
                {/* Copy Link */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any default behavior (such as redirection)
                    navigator.clipboard.writeText(shareUrl);
                    showSuccessToast("Link copied to clipboard!");
                  }}
                  className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:opacity-80 transition-opacity bg-transparent border-none"
                >
                  <LinkIcon color="#AA987A" className="h-10 w-10" />
                  <span>Copy Link</span>
                </button>
              </div>
            </DialogDescription>
            <DialogClose />
          </DialogContent>
        </Dialog>

        {/* Save Button */}
        <Button
          variant="default"
          size="sm"
          className="text-gray-800 flex items-center gap-2 text-base"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Heart
            className={`h-5 w-5 ${isSaved ? "text-red-500 fill-current" : ""}`}
          />
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default PropertyHeader;
