import fs from 'fs';

/**
 * Reads and extracts specific keys from a JSON file.
 * @param {string} filePath - Relative path to the JSON file
 * @param {...string} keys - Keys to extract (optional). Returns full object if none provided.
 * @returns {Object} - Extracted key-value pairs or entire JSON object
 */
export function readJson(filePath, ...keys) {
  const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (keys.length === 0) return fileData;

  const result = {};
  for (const key of keys) {
    if (key in fileData) {
      result[key] = fileData[key];
    } else {
      console.warn(`Key "${key}" not found in ${filePath}`);
    }
  }

  return result;
}

/**
 * Writes data to a JSON file. Replaces existing content.
 * @param {string} filePath - Path to the JSON file
 * @param {Object} data - Data to write (must be a plain object)
 */
export function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`JSON written to ${filePath}`);
  } catch (err) {
    console.error(`Failed to write JSON to ${filePath}: `, err);
    throw err;
  }
}
