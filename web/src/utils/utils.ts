import { CommunityAppearanceState } from "../redux/types/types";

export function compareCommunityAppearance(
  init: CommunityAppearanceState,
  compareTo: CommunityAppearanceState
) {
  const initEntries = Object.entries(init);
  const compareToEntries = Object.entries(compareTo);
  const sortFn = (a: [string, any], b: [string, any]) => (a[0] > b[0] ? 1 : -1);

  initEntries.sort(sortFn);
  compareToEntries.sort(sortFn);
  return JSON.stringify(initEntries) === JSON.stringify(compareToEntries);
}
