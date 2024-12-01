import fs from 'node:fs';
import * as prettier from 'prettier';

// Get current date day
const now = new Date();
const day = now.getDate();

if (fs.existsSync(`./days/${day}`)) {
  console.log(`\n"days/${day}" already exists\n`);
  process.exit(1);
}

// Create new day folder
const dir = `./days/${day}`;
fs.mkdirSync(dir);

const prettierConfig = await import('../prettier.config.mjs').then((m) => m.default);

console.log(`Fetching input from adventofcode.com/${process.env.YEAR}...`);
const response = await fetch(`https://adventofcode.com/${process.env.YEAR}/day/${day}/input`, {
  headers: {
    cookie: `session=${process.env.SESSION}`,
  },
});
if (response.status !== 200) {
  throw new Error(`(${response.status}) ${response.statusText}`);
}
const input = await response.text();
await Bun.write(`${dir}/input`, input);

for await (const part of [1, 2]) {
  const file = `${dir}/${part}.ts`;
  fs.closeSync(fs.openSync(file, 'w'));

  const partAnchor = part == 2 ? '#part2' : '';
  const content = `
  /**
   * https://adventofcode.com/${process.env.YEAR}/day/${day}${partAnchor}
   */
    import "services/array";
    import "services/math";
    import "services/input-file";
    
    const data = inputFile(${day});
  `;

  const formatted = await prettier.format(content, {
    parser: 'babel',
    ...prettierConfig,
  });
  await Bun.write(file, formatted);
}

console.log(`\nCreated files for "days/${day}"!\n`);

process.exit(0);
