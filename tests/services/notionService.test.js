import { jest } from '@jest/globals';
import { Notion } from '../../src/models/Notion.js';
import * as notionService from '../../src/services/notionService.js';

jest.unstable_mockModule('../../src/models/Notion.js', () => ({
  Notion: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn()
  }
}));

describe('NotionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNotion', () => {
    it('should create a notion successfully', async () => {
      const mockNotion = { id: '1', name: 'JavaScript' };
      Notion.create.mockResolvedValue(mockNotion);

      const result = await notionService.createNotion({ name: 'JavaScript' });

      expect(result).toEqual(mockNotion);
      expect(Notion.create).toHaveBeenCalledWith({ name: 'JavaScript' });
    });

    it('should throw error when creation fails', async () => {
      Notion.create.mockRejectedValue(new Error('Database error'));

      await expect(
        notionService.createNotion({ name: 'JavaScript' })
      ).rejects.toThrow('Failed to create notion');
    });
  });

  describe('getAllNotions', () => {
    it('should return all notions', async () => {
      const mockNotions = [
        { id: '1', name: 'JavaScript' },
        { id: '2', name: 'Node.js' }
      ];
      Notion.find.mockResolvedValue(mockNotions);

      const result = await notionService.getAllNotions();

      expect(result).toEqual(mockNotions);
      expect(Notion.find).toHaveBeenCalled();
    });
  });

  describe('getNotionById', () => {
    it('should return a notion by id', async () => {
      const mockNotion = { id: '1', name: 'JavaScript' };
      Notion.findById.mockResolvedValue(mockNotion);

      const result = await notionService.getNotionById('1');

      expect(result).toEqual(mockNotion);
      expect(Notion.findById).toHaveBeenCalledWith('1');
    });

    it('should return null if notion not found', async () => {
      Notion.findById.mockResolvedValue(null);

      const result = await notionService.getNotionById('999');

      expect(result).toBeNull();
    });
  });
});
