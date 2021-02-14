export function createScrambledArray<T>(arr: Array<T>): Array<T> {
  // Implementation of fisher-yates shuffle --> O(n)
  // bost.ocks.org/mike/shuffle

  let m = arr.length,
    t,
    i;

  // While there remains elements to shuffle...
  while (m) {
    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}
