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
      window.scrollTo({ top: 0, behavior: "smooth" }); // Fix: use this consistently
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-200 text-gray-700 rounded-t-3xl shadow-2xl">
      <Section className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Back to Top */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-gray-800 font-medium hover:text-black transition-colors"
          >
            <ArrowUp size={20} />
            Back to top
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-sm md:text-base font-medium">
          <FooterNav
            title="Support"
            links={[
              { href: "/contact-us", label: "Help Centre" },
              { href: "/faqs", label: "FAQ" },
              { href: "https://wa.me/971521792212", label: "Chat with Us" },
            ]}
          />
          <FooterNav
            title="Company"
            links={[
              { href: "/about-us", label: "About Us" },
              { href: "/blogs", label: "Blog" },
            ]}
          />
          <FooterNav
            title="Account"
            links={[
              { href: "/connect-with-us", label: "Connect" },
              { href: "/bnbme-your-home", label: "List a Property" },
              { href: "/login", label: "My Bookings" },
            ]}
          />
          <FooterNav
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ]}
          />
          <div className="col-span-2">
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="mb-1">© H&RA Northern India</p>
            <p className="mb-1">Email: <a href="mailto:hrani.1950@gmail.com" className="underline">hrani.1950@gmail.com</a></p>
            <CancellationPolicyDialog t="Refund & Cancellations" />
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-between items-center mt-12 flex-col sm:flex-row gap-4 border-t pt-6 border-gray-200">
          <span className="text-sm font-medium text-center sm:text-left">
            Website owned and managed by H&RA Northern India
          </span>
          <SocialIcons />
        </div>
      </Section>
    </footer>
  );
};

const FooterNav = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <nav>
    <h4 className="font-semibold mb-3 text-gray-900">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-gray-700 hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const SocialIcons = () => (
  <div className="flex gap-4 items-center">
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
    <SocialIcon name="Visa Card" src={Images.visaCard} href="#" />
    <SocialIcon name="Master Card" src={Images.masterCard} href="#" />
  </div>
);

export default Footer;
