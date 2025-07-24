// src/lib/types.ts
//

export type ObservationRecord = {
  id: number; text: string; count: number; synced: boolean
}

export type Photo = {
  /**
   * Name of image
   */
  fileName: string;
  /**
   * Filesystem path
   */
  filePath: string; // Filesystem path
  /**
   * URL for preview
   */
  webviewPath: string; // For preview
};
