"use client";

import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  loading: externalLoading = false,
}) => {
  return (
    <div>
      <div>
        <div className="min-h-screen relative">
          {children}
          <Footer />
          {/* {isLoading && <LoadingIndicator isLoading={isLoading} />} */}
        </div>
      </div>
    </div>
  );
};
