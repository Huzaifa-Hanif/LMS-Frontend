import fs from "fs";
import path from "path";

export async function createUploadFolder(folderPath: string) {
  // Clean the folder path to remove trailing slashes
  const cleanedFolderPath = folderPath.replace(/\/+$/, '');
  const fullPath = path.join(process.cwd(), "public", cleanedFolderPath);
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

export async function saveFile(file: File, folderPath: string): Promise<string> {
  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Ensure the file name is unique and doesn't have any leading slashes
  const fileName = `${Date.now()}-${file.name}`;
  
  // Clean folder path and file name
  const cleanedFolderPath = folderPath.replace(/\/+$/, ''); // Clean folder path
  const cleanedFileName = fileName.replace(/^\/+/, ''); // Clean file name
  
  // Join the folder path and file name
  const filePath = path.join(cleanedFolderPath, cleanedFileName); // Use path.join for better handling
  
  // Full path to write the file
  const fullPath = path.join(process.cwd(), "public", filePath);
  
  // Write the file to the disk
  fs.writeFileSync(fullPath, buffer);
  
  return filePath; // Return the relative file path
}