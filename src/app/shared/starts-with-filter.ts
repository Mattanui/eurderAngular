export function filterStartingWith<T>(list: T[], searchText: string, fieldOf: (element: T) => string): T[] {
  const lowerCaseSearchText = searchText.toLowerCase();
  return list.filter((element) => fieldOf(element).toLowerCase().startsWith(lowerCaseSearchText));
}
