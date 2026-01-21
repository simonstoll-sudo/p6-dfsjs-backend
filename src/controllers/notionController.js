import * as notionService from '../services/notionService.js';

export const createNotion = async (req, res, next) => {
  try {
    const notion = await notionService.createNotion(req.body);
    res.status(201).json(notion);
  } catch (error) {
    next(error);
  }
};

export const listNotions = async (req, res, next) => {
  try {
    const notions = await notionService.getAllNotions();
    res.status(200).json(notions);
  } catch (error) {
    next(error);
  }
};
