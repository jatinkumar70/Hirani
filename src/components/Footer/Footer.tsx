"use client";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Images } from "../../../asserts/Import/Images";
import Section from "../../common/Section/Section";
import CancellationPolicyDialog from "../CancellationPolicyDialog/CancellationPolicyDialog";
import SocialIcon from "../SocialIcons/SocialIcons";
import { useRouter } from "next/router";

const Footer: React.FC = () => {
  const router = useRouter();
  const handleScrollToTop = () => {
    if (router.asPath === "/search") {
      window.scrollToTop(); // Ensure this function is globally defined or replace it with a direct scroll action
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling for other pages
    }
  };
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-800">
      <Section className="">
        {/* Back to Top */}
        <div className="flex justify-center mb-6">
          <button
            className="flex items-center text-lg lg:text-base gap-2 font-medium text-gray-900 focus:outline-none"
            onClick={handleScrollToTop}
            aria-label="Back to top">
            <ArrowUp size={20} /> {"Back to top"}
          </button>
        </div>

        {/* Footer Links */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-base font-medium">
          <FooterNav
            title={"Support"}
            links={[
              { href: "/contact-us", label: "Help centre" },
              { href: "/faqs", label: "FAQ" },
              { href: "https://wa.me/971521792212", label: "Chat to us" },
            ]}
          />

          <FooterNav
            title={"Other"}
            links={[
              { href: "/about-us", label: "About us" },
              { href: "/blogs", label: "Blogs" },
            ]}
          />

          <FooterNav
            title={"Account"}
            links={[
              { href: "/connect-with-us", label: "Connect with us" },
              { href: "/bnbme-your-home", label: "List a property" },
              { href: "/login", label: "Manage my bookings" },
            ]}
          />
        </section>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-base">
          <div className="flex flex-wrap items-center font-medium gap-2 mb-4 sm:mb-0">
            <span>{"© Hirani Hotels"}</span>
            <span>·</span>
            <Link href="/privacy">Privacy</Link>
            <span>·</span>
            <Link href="/terms">Terms</Link>
            <span>·</span>
            <CancellationPolicyDialog t={"Refund & Cancellations"} />
            <span>·</span>
            <span>care@hiranihotels.com</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* <LanguageSelector label={t.footer.language} /> */}
            <SocialIcons />
          </div>
        </div>
        <div className="text-center pt-4 text-base font-medium">
          <span>
            {"Website owned & managed by Hirani Hotels & Resorts"}
          </span>
        </div>
      </Section>
    </footer>
  );
};

const FooterNav = ({ title, links }: { title: any; links: any }) => (
  <nav>
    <h4 className="font-semibold mb-3">{title}</h4>
    <ul>
      {links.map((link: any, index: number) => (
        <li key={index} className="mb-2">
          <Link href={link.href} className="underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const SocialIcons = () => (
  <div className="flex items-center space-x-4">
    <SocialIcon
      name="Facebook"
      src={Images.facebook}
      href="https://www.facebook.com/bnbmehomestays"
    />
    <SocialIcon
      name="Instagram"
      src={Images.instagram}
      href="https://www.instagram.com/bnbme/"
    />
    <SocialIcon
      name="Twitter"
      src={Images.twitter}
      href="https://x.com/bnbme_homes"
    />
    <SocialIcon name={"Visa Card"} src={Images.visaCard} href="#" />
    <SocialIcon name="Master Card" src={Images.masterCard} href="#" />
  </div>
);

export default Footer;
