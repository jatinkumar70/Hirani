import { useRouter } from "next/router";
import { Images } from "../../../../asserts/Import/Images";
import { Button } from "../../ui/Button/Button";
import Section from "../../../common/Section/Section";

interface BannerProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}

export const Banner = ({ isSubmitted, setIsSubmitted }: BannerProps) => {
  const scrollToSignupForm = () => {
    // Reset submitted status
    setIsSubmitted(false);

    // Reset URL if it has the success parameter
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    if (
      searchParams.has("enquiry") &&
      searchParams.get("enquiry") === "success"
    ) {
      searchParams.delete("enquiry");

      const newUrl =
        window.location.pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");

      window.history.replaceState({}, "", newUrl);
    }

    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById("signup-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="relative h-full bg-cover bg-center text-white flex items-center"
      style={{
        minHeight: "450px",
        backgroundImage: `url(${Images.HeroImage.src})`,
      }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <Section className="relative">
        <div className="flex flex-col items-start gap-3 text-3xl font-semibold mb-6 w-full lg:w-[700px]">
          <h1 className="">
            Maximise your{" "}
            <span className="font-bold text-primary-gold">
              property earnings
            </span>{" "}
            with bnbme,
          </h1>
          <span>a top property management company</span>
        </div>
        <Button
          onClick={scrollToSignupForm}
          className="bg-[#D4B779] px-8 text-white text-md font-bold rounded-3xl hover:bg-[#c4a86c] transition-colors">
          List your property now
        </Button>
      </Section>
    </div>
  );
};
