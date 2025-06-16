import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../../config/seo-config";

const DefaultSEO = () => {
  return <DefaultSeo {...NEXT_SEO_DEFAULT} />;
};

export default DefaultSEO;
