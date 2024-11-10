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
export function traverseAndModifyData(data: any, locale: string) {
  if (!data) return;
  if (Array.isArray(data)) {
    data.forEach((e) => traverseAndModifyData(e, locale));
  } else if (typeof data === "object") {
    if (data.data && data.type) {
      if (data.title) {
        data.title = data.title[locale] ?? data.title["en"];
      }

      data.content = data.data[locale] ?? data.data["en"];
      data.value = data._id;
      delete data.data;
    }
    for (const key in data) {
      traverseAndModifyData(data[key], locale);
    }
  }
}
