// src/lib/voice.ts
// For autosave
//

import type { ObservationRecord } from '$lib/types';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import type { PermissionStatus } from '@capacitor-community/speech-recognition';
import { addRecord, getAll } from '$lib/db';
import { records } from '$lib/store';

export async function ensureVoicePermission(): Promise<void> {
  const permission: PermissionStatus = await SpeechRecognition.checkPermissions();
  if (!permission) {
    await SpeechRecognition.requestPermissions();
  }
}

export async function startListening(onResult: (result: string) => void): Promise<void> {
  await ensureVoicePermission();

  await SpeechRecognition.start({
    language: 'en-US',
    maxResults: 1,
    partialResults: false
  });

  SpeechRecognition.addListener( 'partialResults', async (result: any): Promise<void> => {
    if (result.matches && result.matches.length > 0) {
      const text = result.matches[0];
      console.log("Voice match:", text);
      onResult(text);

      // ✅ Auto-save!
      await addRecord(text, 1);
      const all = await getAll();
      records.set(all);
    }
  });
}

export async function stopListening(): Promise<void> {
  await SpeechRecognition.stop();
}
