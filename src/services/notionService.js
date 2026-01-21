import { Notion } from '../models/Notion.js';

export const createNotion = async (notionData) => {
  try {
    const notion = await Notion.create(notionData);
    return notion;
  } catch (error) {
    throw new Error(`Failed to create notion: ${error.message}`);
  }
};

export const getAllNotions = async () => {
  try {
    const notions = await Notion.find();
    return notions;
  } catch (error) {
    throw new Error(`Failed to fetch notions: ${error.message}`);
  }
};

export const getNotionById = async (id) => {
  try {
    const notion = await Notion.findById(id);
    return notion;
  } catch (error) {
    throw new Error(`Failed to fetch notion: ${error.message}`);
  }
};
