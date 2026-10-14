Write a function that takes a sentence and returns true if any word contains a duplicate letter, otherwise false.

Ignore letter case (Apple has duplicate p)
Ignore spaces and punctuation
Letters in different words do not count as duplicates
You may assume the input is a non-empty string of words separated by spaces

Examples

"An apple a day"   → true    // apple has two p's
"An mango a day"   → false   // every word has unique letters
"The hello cat"    → true    // hello has two l's
"a quick brown"    → false




const findWordWithDuplicateLetters = (sentence) => {
  const words = sentence.split(" ");

  for (const word of words) {
    const seen = new Set();

    for (const l of word.toLowerCase()) {
      if (l < "a" || l > "z") continue;
      if (seen.has(l)) return true;
      seen.add(l);
    }
  }

  return false;
};

console.log(findWordWithDuplicateLetters("An apple a day")); // true  (apple)
console.log(findWordWithDuplicateLetters("An mango a day")); // false

2nd Solution:

const findWordWithDuplicateLetters = (sentence) => {
  let found = false;
  const words = sentence.split(" ");

  words.forEach((word) => {
    if (found) return; // skip remaining words

    const seen = new Set();

    word.toLowerCase().split("").forEach((l) => {
      if (found) return;
      if (l < "a" || l > "z") return;
      if (seen.has(l)) {
        found = true;
        return;
      }
      seen.add(l);
    });
  });

  return found;
};

console.log(findWordWithDuplicateLetters("An apple a day")); // true
console.log(findWordWithDuplicateLetters("An mango a day")); // false

COMPLEXITY IS O(N)
Nested loops become n² only when the inner loop also depends on full n:

for i in 0..n
  for j in 0..n     → n * n

Yours is:

for each word
  for each letter in THIS word   → sum of lengths = n

  [ An ] [ mango ] [ a ] [ day ]
  2       5       1      3     → add, don't multiply

  The two loops are just “walk word by word”. They still walk the sentence about once.
  