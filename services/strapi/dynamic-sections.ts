import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
        "layout.feactures-section": {
          populate: {
            feature: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

export async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  // console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
