// any = no type checking. 
// unknown = you must check before use. Prefer unknown.

// Difference between any, unknown, void, never (interview cheatsheet)

/*
  ANY
  - "Turn off TypeScript" for that variable
  - Can assign anything TO it, assign it to anything, call any method — no errors
  - Use: last resort (migrating JS → TS, truly dynamic JSON you won't touch)

  UNKNOWN
  - "I don't know the type YET" — safer than any
  - Can assign anything TO it
  - CANNOT use it until you narrow (typeof, if, in, etc.)
  - Use: API responses, user input, JSON.parse — prefer over any

  VOID
  - Function returns nothing useful (undefined)
  - useEffect cleanup, onClick with no return

  NEVER
  - Function never returns (throws, infinite loop, exhaustive switch default)
*/

// --- any: no checks ---

let a: any = 10
a = "hello"
a.foo.bar() // TS allows — runtime may crash

// --- unknown: must narrow first ---

let u: unknown = JSON.parse('{"id": 1}')

// u.id          // ERROR — can't touch unknown
// u.toUpperCase() // ERROR

if (typeof u === "object" && u !== null && "id" in u) {
  console.log((u as { id: number }).id) // OK after check
}

function parseInput(input: unknown): string {
  if (typeof input === "string") return input
  if (typeof input === "number") return String(input)
  throw new Error("Invalid input")
}

// --- void ---

function logMsg(msg: string): void {
  console.log(msg)
  // no return (or return undefined)
}

// --- never ---

function fail(msg: string): never {
  throw new Error(msg)
}

function assertNever(x: never): never {
  throw new Error("Unexpected: " + x)
}

type Shape = { kind: "circle"; r: number } | { kind: "square"; side: number }

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2
    case "square":
      return s.side ** 2
    default:
      return assertNever(s) // if new kind added, TS errors here
  }
}

/*
  Quick compare

  | Type    | Assign to it | Use without check | Typical use        |
  |---------|--------------|-------------------|--------------------|
  | any     | anything     | yes (unsafe)      | legacy / escape    |
  | unknown | anything     | no — narrow first | API, parse, input  |
  | void    | undefined    | N/A (return type) | no useful return   |
  | never   | nothing      | N/A (return type) | throw / exhaustive |

  Interview one-liner:
  "any disables checking; unknown accepts anything but forces you to narrow before use — prefer unknown."
*/
