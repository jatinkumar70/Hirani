import Script from "next/script";
import type { ReactNode } from "react";

interface ScriptLoaderProps {
  id: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
  src?: string;
  children?: ReactNode;
}

const ScriptLoader = ({
  id,
  strategy = "afterInteractive",
  src,
  children,
}: ScriptLoaderProps) => {
  if (src) {
    return <Script id={id} src={src} strategy={strategy} />;
  }

  return (
    <Script id={id} strategy={strategy}>
      {children}
    </Script>
  );
};

export default ScriptLoader;
