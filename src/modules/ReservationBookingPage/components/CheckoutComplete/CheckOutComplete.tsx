"use client";

import { motion } from "framer-motion";
import { BookMarked, IdCard, MonitorCheck, PartyPopper } from "lucide-react";
import { Card } from "../../../../components/ui/Card/Card";
import { Button } from "../../../../components/ui/Button/Button";
import Link from "next/link";
import Section from "../../../../common/Section/Section";

export default function ConfirmationPage({ RecordUUID }: { RecordUUID: any }) {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-gray-800 mx-auto p-5 space-y-8 bg-white shadow-xl border-2 border-[#E7E7E8] rounded-xl">
        {/* Header Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-12 h-12 text-gray-800 flex items-center justify-center">
            <PartyPopper className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold">
            Woohoo! You are going to Dubai!
          </motion.h1>
        </div>

        {/* What Next Section */}
        <div className="space-y-6">
          <h2 className="text-xl text-gray-800 font-semibold">What next?</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show">
            {[
              {
                title: "Check-in online before arriving",
                description:
                  "Skip the queue and check in online before you arrive. It’s quick, easy, and ensures a smoother, faster experience at the front desk.",
                icon: <MonitorCheck size={25} />,
              },
              {
                title: "ID Validation may take some time",
                description:
                  "ID validation may take a few moments. We appreciate your patience while we ensure a secure and smooth check-in process.",
                icon: <IdCard size={25} />,
              },
              {
                title: "Check-in for safety & legal reasons",
                description:
                  "For safety and legal compliance, all guests are required to complete the check-in process.",
                icon: <BookMarked size={25} />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="bg-[#f2f2f2]">
                <Card className="p-2 h-full space-y-4 border-2 border-gray-300">
                  <span>{item.icon}</span>
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}>
          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-black font-semibold">
              Back home
            </Button>
          </Link>

          <Link href={`/verification?record_uuid=${RecordUUID.record_uuid}`}>
            {/* <Button
            variant="secondary"
            className="font-medium bg-black text-white">
            Complete now
          </Button> */}
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-gray-700 space-y-2">
          <p>The confirmation and receipt will be sent to your email.</p>
          <p>
            I didn&apos;t receive email.{" "}
            <button className="text-gray-800 hover:underline ml-4 font-bold">
              Resend
            </button>
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
