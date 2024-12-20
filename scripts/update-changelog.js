import fs from 'fs';
import { execSync } from 'child_process';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;
const date = new Date().toISOString().split('T')[0];

const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
const lines = changelog.split('\n');

const unreleasedIndex = lines.findIndex((line) =>
  line.startsWith('## [Unreleased]')
);
const nextVersionIndex = lines.findIndex(
  (line, index) => index > unreleasedIndex && line.startsWith('## [')
);

const unreleasedContent = lines
  .slice(unreleasedIndex + 1, nextVersionIndex)
  .join('\n');

const newVersionContent = `
## [${version}] - ${date}

${unreleasedContent.trim()}
`;

lines.splice(nextVersionIndex, 0, newVersionContent);

// Clear the Unreleased section
lines[unreleasedIndex + 1] = '';

fs.writeFileSync('CHANGELOG.md', lines.join('\n'));

console.log(`Updated CHANGELOG.md for version ${version}`);

// Commit the changes
execSync('git add CHANGELOG.md');
execSync(`git commit -m "Update CHANGELOG for version ${version}"`);
execSync(`git tag v${version}`);

console.log(`Created git tag v${version}`);
