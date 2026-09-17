// Print star pyramid patterns in console

// ============================================
// 1. Centered pyramid (most common interview ask)
// ============================================
// n = 5
//     *
//    ***
//   *****
//  *******
// *********

function printStarPyramid(n) {
  for (let i = 1; i <= n; i++) {
    const spaces = " ".repeat(n - i); // repeat the space n - i times (4, 3, 2, 1, 0)
    const stars = "*".repeat(2 * i - 1); // repeat the star 2 * i - 1 times (1, 3, 5, 7, 9)
    console.log(spaces + stars);
  }
}

printStarPyramid(5);

// ============================================
// 2. Left-aligned triangle
// ============================================
// *
// **
// ***
// ****
// *****

function printLeftTriangle(n) {
  for (let i = 1; i <= n; i++) {
    console.log("*".repeat(i));
  }
}

console.log("--- Left triangle ---");
printLeftTriangle(5);

// ============================================
// 3. Right-aligned triangle
// ============================================
//     *
//    **
//   ***
//  ****
// *****

function printRightTriangle(n) {
  for (let i = 1; i <= n; i++) {
    console.log(" ".repeat(n - i) + "*".repeat(i));
  }
}

console.log("--- Right triangle ---");
printRightTriangle(5);

// ============================================
// 4. Inverted pyramid
// ============================================
// *********
//  *******
//   *****
//    ***
//     *

function printInvertedPyramid(n) {
  for (let i = n; i >= 1; i--) {
    const spaces = " ".repeat(n - i);
    const stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
  }
}

console.log("--- Inverted pyramid ---");
printInvertedPyramid(5);

// ============================================
// How centered pyramid works (n = 5)
// ============================================
// row 1: spaces = 4, stars = 1  -> "    *"
// row 2: spaces = 3, stars = 3  -> "   ***"
// row 3: spaces = 2, stars = 5  -> "  *****"
// row 4: spaces = 1, stars = 7  -> " *******"
// row 5: spaces = 0, stars = 9  -> "*********"
//
// Formula:
// spaces = n - i
// stars  = 2 * i - 1
