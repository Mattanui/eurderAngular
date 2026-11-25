import { filterStartingWith } from './starts-with-filter';

describe('filterStartingWith', () => {
  const items = [{ name: 'MacBuk Air' }, { name: 'iPhony' }, { name: 'MacBuk Pro 13-inch' }];
  const byName = (item: { name: string }) => item.name;

  it('should return all the elements when the search text is empty', () => {
    expect(filterStartingWith(items, '', byName)).toEqual(items);
  });

  it('should only keep the elements whose field starts with the search text', () => {
    expect(filterStartingWith(items, 'MacBuk', byName)).toEqual([
      { name: 'MacBuk Air' },
      { name: 'MacBuk Pro 13-inch' },
    ]);
  });

  it('should not be case-sensitive', () => {
    expect(filterStartingWith(items, 'macbuk', byName)).toHaveLength(2);
    expect(filterStartingWith(items, 'IPHO', byName)).toEqual([{ name: 'iPhony' }]);
  });

  it('should not keep an element that only contains the search text', () => {
    expect(filterStartingWith(items, 'Air', byName)).toEqual([]);
  });

  it('should work on any field of any type of element', () => {
    const customers = [{ lastname: 'Arizonia' }, { lastname: 'Bravius' }];
    expect(filterStartingWith(customers, 'bra', (customer) => customer.lastname)).toEqual([
      { lastname: 'Bravius' },
    ]);
  });
});
