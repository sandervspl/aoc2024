# aoc2024

https://adventofcode.com/2024

## How to use

### Setup

1. Go to adventofcode.com and sign in
2. Get your session token from the console: Application -> Cookies -> https://adventofcode.com -> session -> copy the `Value`
3. Add session to `SESSION` in `.env`
4. Update the year in `.env` if needed

### Development

1. run `bun run init`
2. run `bun --watch days/<DAY>/<PART>.ts` (e.g. `bun --watch days/1/1.ts`)

### input data

To get the input data in your code you can use the global `inputFile` function

```ts
const data = inputFile(1); // day number
```

## services

All service files are injected globally as the name the function is exported as.
