import { generateDownloadUrl } from "#src/initializers/aws";
import Content from "#src/modules/content/content.model";

export default class ContentService {
  static async getContent(type: string, lang: string) {
    const content = await Content.find({ type }).sort({ index: 1 }).lean();

    return content;
  }
  static async addContent(type: string, data: any) {
    try {
      const content = new Content({
        type,
        data: data.data,
        title: data.title,
        relationType: data.relationType,
      });
      await content.save();
      return { message: "Content added successfully", content };
    } catch (error) {
      throw error;
    }
  }

  static async updateSingleContent(id: string, data: any) {
    try {
      const content = await Content.findByIdAndUpdate(id, data, { new: true });
      return { message: "Content updated successfully", content };
    } catch (error) {
      throw error;
    }
  }
}

export async function traverseAndModifyDataWithSignedUrls(
  data: any,
  locale: string
): Promise<void> {
  if (!data) return;

  // Helper function to check if string ends with image extension
  const isImageUrl = (url: string): boolean => {
    const lowercased = url.toLowerCase();
    return (
      lowercased.endsWith(".jpg") ||
      lowercased.endsWith(".jpeg") ||
      lowercased.endsWith(".png")
    );
  };

  // Helper function to generate signed URL
  const processImageUrl = async (value: any): Promise<any> => {
    if (typeof value === "string" && isImageUrl(value)) {
      return generateDownloadUrl(value);
    } else if (Array.isArray(value)) {
      console.log("Array", value);

      // Handle array of image URLs
      return await Promise.all(
        value.map(async (item) => {
          if (typeof item === "string" && isImageUrl(item)) {
            console.log("Generating signed URL for", item);

            const url = await generateDownloadUrl(item);
            console.log("Signed URL", url);

            return url;
          }
          return item;
        })
      );
    }
    return value;
  };
  if (Array.isArray(data)) {
    await Promise.all(
      data.map((e) => traverseAndModifyDataWithSignedUrls(e, locale))
    );
  } else if (typeof data === "object" && data !== null) {
    if (data.data && data.type) {
      if (data.title) {
        data.title = data.title[locale] ?? data.title["en"];
      }
      data.content = data.data[locale] ?? data.data["en"];
      data.value = data._id;
      delete data.data;
    }

    for (const key in data) {
      data[key] = await processImageUrl(data[key]);
      if (typeof data[key] === "object" && data[key] !== null) {
        await traverseAndModifyDataWithSignedUrls(data[key], locale);
      }
    }
  }
}
