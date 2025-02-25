import { truncateText, formatCurrency, formatRating } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('truncateText', () => {
    it('should return the original text if shorter than max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe(text);
    });

    it('should truncate text and add ellipsis if longer than max length', () => {
      const text = 'This is a very long text that should be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('should handle empty strings', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('should format a number as USD currency', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
      expect(formatCurrency(1000)).toBe('$1,000.00');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('formatRating', () => {
    it('should format rating with one decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(3)).toBe('3.0');
    });

    it('should handle zero rating', () => {
      expect(formatRating(0)).toBe('0.0');
    });
  });
});