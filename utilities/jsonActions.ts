import fs from 'fs';

/**
 * Reads and extracts specific keys from a JSON file.
 * @param filePath - Relative path to the JSON file
 * @param keys - Keys to extract (optional). Returns full object if none provided. Can provide any number of keys
 * @returns Extracted key-value pairs or entire JSON object
 */
export function readJson<T extends Record<string, any>>(filePath: string, ...keys: string[]): Partial<T> | T {
  try {
    const fileData: T = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (keys.length === 0) return fileData;

    const result: Partial<T> = {};
    for (const key of keys) {
      if (key in fileData) {
        (result as Record<string, any>)[key] = fileData[key];
      } else {
        console.warn(`Key "${key}" not found in ${filePath}`);
      }
    }

    return result;

  } catch (error: any) {
    console.error(`Error reading/parsing ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Writes data to a JSON file. Replaces existing content.
 * @param filePath - Path to the JSON file
 * @param data - Data to write (must be a plain object)
 */
export function writeJson(filePath: string, data: Record<string, unknown>): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`JSON written to ${filePath}`);
  } catch (err: any) {
    console.error(`Failed to write JSON to ${filePath}: `, err);
    throw err;
  }
}
