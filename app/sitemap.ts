import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://kanestone.co.uk", changeFrequency: "monthly", priority: 1 }];
}
