"use client";

import type React from "react";
import CancellationPolicyDialog from "../../../../components/CancellationPolicyDialog/CancellationPolicyDialog";

type InfoSection = {
  title: string;
  items: string[];
};

const thingsToKnowData: InfoSection[] = [
  {
    title: "House rules",
    items: ["Check-in after 15:00", "Checkout before 12:00"],
  },
  {
    title: "Safety & property",
    items: ["Carbon monoxide alarm", "Smoke alarm"],
  },
  {
    title: "Cancellation policy",
    items: [
      "Refundable and non-refundable options available. Refund eligibility depends on the notice period.",
      "Please refer to the full policy for details.",
    ],
  },
];

const PropertyThingsToKnow: React.FC = () => {
  return (
    <div
      className="container mx-auto py-8"
      id="rules"
      style={{ scrollMarginTop: "100px" }}>
      <h2 className="text-xl text-gray-800 font-bold mb-6">Things to know</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {thingsToKnowData.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg text-gray-800 font-semibold">
              {section.title}
            </h3>
            <ul className="space-y-3 text-base font-medium text-gray-900">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {section.title === "Cancellation policy" && (
              <CancellationPolicyDialog
                t={
                  <span className="text-sm text-gray-900 underline mt-3">
                    See more
                  </span>
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyThingsToKnow;
