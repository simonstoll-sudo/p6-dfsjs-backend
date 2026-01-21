import * as workshopService from '../services/workshopService.js';

export const createWorkshop = async (req, res, next) => {
  try {
    const workshop = await workshopService.createWorkshop(req.body);
    res.status(201).json(workshop);
  } catch (error) {
    next(error);
  }
};

export const listWorkshops = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const workshops = await workshopService.getAllWorkshops(limit);
    res.status(200).json(workshops);
  } catch (error) {
    next(error);
  }
};

export const getWorkshop = async (req, res, next) => {
  try {
    const workshop = await workshopService.getWorkshopById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    res.status(200).json(workshop);
  } catch (error) {
    next(error);
  }
};
