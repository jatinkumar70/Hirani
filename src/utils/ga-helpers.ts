import { isProduction } from "../constants/constants";

interface IGTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const gaTagPageView = (): void => {
  if (isProduction) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

export const gaTagSendEvent = ({
  action,
  category,
  label,
  value,
}: IGTagEvent): void => {
  if (isProduction) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
export const gaSendCustomEvent = ({ action, ...rest }: any): void => {
  if (isProduction) {
    const sendEvent = () => {
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", action, { ...rest });
      } else {
        console.warn("gtag function is not available");
        setTimeout(sendEvent, 100); // Retry after 100ms
      }
    };

    if (typeof window !== "undefined") {
      sendEvent(); // Only call when 'window' is available
    }
  }
};
