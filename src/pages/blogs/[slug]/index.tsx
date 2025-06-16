import Navbar from "../../../components/Common/Navbar/Navbar";
import FloatingWhatsAppButton from "../../../components/whatsapp/FloatingWhatsAppButton ";
import SingleBlog from "../../../modules/SingleBlog/SingleBlog";

export default function SingleblogPage() {
  return (
    <>
      <Navbar />
      <SingleBlog />
      <FloatingWhatsAppButton />
    </>
  );
}
