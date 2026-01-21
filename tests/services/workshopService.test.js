import { jest } from '@jest/globals';
import { Workshop } from '../../src/models/Workshop.js';
import * as workshopService from '../../src/services/workshopService.js';

jest.unstable_mockModule('../../src/models/Workshop.js', () => ({
  Workshop: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn()
  }
}));

describe('WorkshopService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWorkshop', () => {
    it('should create a workshop successfully', async () => {
      const mockWorkshop = {
        id: '1',
        name: 'Docker Workshop',
        notions: ['notion1'],
        populate: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Docker Workshop',
          notions: [{ id: 'notion1', name: 'Containers' }]
        })
      };
      Workshop.create.mockResolvedValue(mockWorkshop);

      const result = await workshopService.createWorkshop({
        name: 'Docker Workshop',
        notions: ['notion1']
      });

      expect(result.name).toBe('Docker Workshop');
      expect(Workshop.create).toHaveBeenCalled();
    });

    it('should throw error when creation fails', async () => {
      Workshop.create.mockRejectedValue(new Error('Database error'));

      await expect(
        workshopService.createWorkshop({ name: 'Test' })
      ).rejects.toThrow('Failed to create workshop');
    });
  });

  describe('getAllWorkshops', () => {
    it('should return all workshops with limit', async () => {
      const mockWorkshops = [
        { id: '1', name: 'Docker Workshop', notions: [] },
        { id: '2', name: 'CI/CD Workshop', notions: [] }
      ];
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockWorkshops)
      };
      Workshop.find.mockReturnValue(mockQuery);

      const result = await workshopService.getAllWorkshops(10);

      expect(result).toEqual(mockWorkshops);
      expect(Workshop.find).toHaveBeenCalled();
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });
  });

  describe('getWorkshopById', () => {
    it('should return a workshop by id', async () => {
      const mockWorkshop = { id: '1', name: 'Docker Workshop', notions: [] };
      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockWorkshop)
      };
      Workshop.findById.mockReturnValue(mockQuery);

      const result = await workshopService.getWorkshopById('1');

      expect(result).toEqual(mockWorkshop);
      expect(Workshop.findById).toHaveBeenCalledWith('1');
    });

    it('should return null if workshop not found', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue(null)
      };
      Workshop.findById.mockReturnValue(mockQuery);

      const result = await workshopService.getWorkshopById('999');

      expect(result).toBeNull();
    });
  });
});
