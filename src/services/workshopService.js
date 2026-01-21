import { Workshop } from '../models/Workshop.js';

export const createWorkshop = async (workshopData) => {
  try {
    const workshop = await Workshop.create(workshopData);
    return await workshop.populate('notions');
  } catch (error) {
    throw new Error(`Failed to create workshop: ${error.message}`);
  }
};

export const getAllWorkshops = async (limit = 100) => {
  try {
    const workshops = await Workshop.find()
      .populate('notions')
      .limit(parseInt(limit));
    return workshops;
  } catch (error) {
    throw new Error(`Failed to fetch workshops: ${error.message}`);
  }
};

export const getWorkshopById = async (id) => {
  try {
    const workshop = await Workshop.findById(id).populate('notions');
    return workshop;
  } catch (error) {
    throw new Error(`Failed to fetch workshop: ${error.message}`);
  }
};
