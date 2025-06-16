"use client";

import { motion } from "framer-motion";
import { Crown, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/Button/Button";


interface PDFViewerProps {
  pdfPath: string;
}

export default function PDFViewer({ pdfPath }: PDFViewerProps) {
  const [showDownloadConfirmation, setShowDownloadConfirmation] =
    useState(false);

  function downloadPDF() {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop() || "hotel-irada-pune.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowDownloadConfirmation(true);
    setTimeout(() => setShowDownloadConfirmation(false), 3000);
  }

  return (
    <div className="flex flex-col items-center gap-8 py-2">
      {/* PDF Preview */}
      <div className="w-full relative overflow-hidden rounded-xl h-screen sm:h-[100vh] transition-all duration-500 ease-in-out">
        {/* Elegant frame */}
        <div
          className="absolute inset-0 border border-amber-500/10 rounded-xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 20px rgba(251,191,36,0.05)",
            zIndex: 2,
          }}
        />

        <div className="w-full h-full overflow-hidden lg:flex hidden">
          <iframe
            src={`${pdfPath}#view=FitH`}
            className="w-full h-full border-0"
            title="Hotel Irada Pune PDF"
          />
        </div>
        <div className="w-full h-full overflow-hidden lg:hidden block">
          <iframe
            src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            className="w-full h-full border-0"
            title="Hotel Irada Pune PDF"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full my-6">
        <div className="relative">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              onClick={downloadPDF}
              className="bg-gradient-to-r from-primary-gold to-primary-gold hover:from-primary-gold hover:to-primary-gold text-white font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all border border-amber-500/20"
              style={{ boxShadow: "0 10px 25px -5px rgba(251,191,36,0.2)" }}>
              <Download className="h-5 w-5 mr-3" />
              Download Brochure
            </Button>
          </motion.div>

          {showDownloadConfirmation && (
            <div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-900/90 to-amber-800/90 text-amber-100 px-6 py-3 rounded-lg shadow-lg text-sm whitespace-nowrap backdrop-blur-sm border border-amber-500/20"
              style={{ boxShadow: "0 5px 15px rgba(251,191,36,0.15)" }}>
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-amber-300" />
                <span>Download started!</span>
              </div>
            </div>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={() => window.open(pdfPath, "_blank")}
            className="border-amber-500/20 text-amber-900  px-8 py-6 rounded-xl backdrop-blur-sm"
            style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}>
            <ExternalLink className="h-5 w-5 mr-3" />
            View Full Screen
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
