// src/lib/voice.ts
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import type { PermissionStatus } from '@capacitor-community/speech-recognition';

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

  SpeechRecognition.addListener( 'partialResults', (result: any): void => {
    if (result.matches && result.matches.length > 0) {
      console.log("I work!", result.matches);
      onResult(result.matches[0]);
      // Save to local SQLite here - maybe (old way)?
    }
  });
}

export async function stopListening(): Promise<void> {
  await SpeechRecognition.stop();
}
