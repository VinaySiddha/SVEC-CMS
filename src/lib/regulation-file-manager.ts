import path from 'path';
import fs from 'fs/promises';

export class RegulationFileManager {
  private readonly basePath: string;

  constructor() {
    this.basePath = path.join(process.cwd(), 'public', 'regulations', 'Academic');
  }

  /**
   * Save a regulation document with proper naming and directory structure
   */
  async saveDocument(file: any, type: string, year: string): Promise<string> {
    const fileExt = path.extname(file.originalFilename);
    const fileName = `regulation_${type}_${year}${fileExt}`;
    const typePath = path.join(this.basePath, type);
    const filePath = path.join(typePath, fileName);

    // Ensure type directory exists
    await fs.mkdir(typePath, { recursive: true });

    // Save file
    await fs.writeFile(filePath, await fs.readFile(file.filepath));

    // Return public URL
    return `/regulations/Academic/${type}/${fileName}`;
  }

  /**
   * Delete a regulation document
   */
  async deleteDocument(documentUrl: string): Promise<void> {
    const relativePath = documentUrl.replace(/^\//, '');
    const filePath = path.join(process.cwd(), 'public', relativePath);
    
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (error) {
      // File doesn't exist, ignore
    }
  }

  /**
   * Check if a regulation document exists
   */
  async documentExists(type: string, year: string): Promise<boolean> {
    const typePath = path.join(this.basePath, type);
    const pattern = `regulation_${type}_${year}`;

    try {
      const files = await fs.readdir(typePath);
      return files.some(file => file.startsWith(pattern));
    } catch {
      return false;
    }
  }
}

export const regulationFileManager = new RegulationFileManager();