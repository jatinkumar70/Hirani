"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "../../../../components/FeatureCard/FeatureCard";
import { features } from "../../../../data/feature";
import { CallBackForm } from "../../../../components/CallBackForm/CallBackForm";
import SignUpForm from "../../Component/SignupForm";
import Section from "../../../../common/Section/Section";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface WhyUsProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  referral: string | null;
}

export const WhyUs = ({
  isSubmitted,
  setIsSubmitted,
  referral,
}: WhyUsProps) => {
  return (
    <Section className="pt-18 bg-gray-50 mt-[8%] flex flex-col lg:flex-row">
      <motion.div
        className="max-w-6xl mx-auto lg:flex-row gap-4 flex-1"
        initial="hidden"
        animate="show"
        variants={container}>
        <motion.h2
          className="text-3xl pt-6 font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Why us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              image={feature.image}
              description={feature.description}
              title={""} // title={Feature ${index + 1}}
            />
          ))}
        </div>
      </motion.div>
        <SignUpForm
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          referral={referral}
        />
    </Section>
  );
};
