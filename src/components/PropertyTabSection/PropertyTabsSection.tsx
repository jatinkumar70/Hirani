import { useEffect, useState } from "react";
import {
  SlidingUnderline,
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs/Tabs";
import { Property } from "../../types/types";

const TabsSection = ({
  hotelData,
  onTabChange,
}: {
  onTabChange: (index: number) => void;
  hotelData: Property;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const sections = ["overview", "surroundings", "rules", "map"];
  const tabIndexMap: Record<string, number> = {
    overview: 0,
    surroundings: 1,
    rules: 2,
    // reviews: 3,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sortedEntries = [...entries].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );

        for (let entry of sortedEntries) {
          if (entry.isIntersecting) {
            const activeSection = entry.target.id;
            const newIndex = tabIndexMap[activeSection];

            if (newIndex !== activeTab) {
              setActiveTab(newIndex);
              onTabChange(newIndex);
            }
            break;
          }
        }
      },
      {
        threshold: 0.7, // Ensures section is mostly visible before activating
        rootMargin: "-5% 0px -70% 0px", // Fine-tune when a section is detected
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeTab, onTabChange, sections]);

  // Ensure "Overview" tab is active when scrolled to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveTab(0);
        onTabChange(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onTabChange]);

  return (
    <Tabs
      defaultValue="overview"
      className="mb-6"
      value={sections[activeTab]} // Keeps tab in sync with scrolling
      onValueChange={(value) => {
        const newIndex = tabIndexMap[value];

        if (newIndex !== activeTab) {
          setActiveTab(newIndex);
          onTabChange(newIndex);
          document.getElementById(value)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}>
      <TabsList className="overflow-x-auto hide-scrollbar flex gap-4 md:gap-8">
        <TabsTrigger value="overview" className="flex-shrink-0">
          Overview
        </TabsTrigger>
        {/* {hotelData.slug === "bnbme-elegant-apt-w-pool-gym-near-downtown-262899" && ( */}
        <TabsTrigger
          value={hotelData.slug === "bnbme-elegant-apt-w-pool-gym-near-downtown-262899" ? "surroundings" : "map"}
          className="flex-shrink-0"
        >
          What is nearby
        </TabsTrigger>

        {/* )} */}

        <TabsTrigger value="rules" className="flex-shrink-0">
          Things to know
        </TabsTrigger>
        {/* <TabsTrigger value="reviews" className="flex-shrink-0">
          Guest reviews (567)
        </TabsTrigger> */}
        <SlidingUnderline activeTab={activeTab} />
      </TabsList>
    </Tabs>
  );
};

export default TabsSection;
