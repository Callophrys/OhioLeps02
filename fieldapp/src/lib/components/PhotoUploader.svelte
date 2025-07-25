<!-- src/lib/components/PhotoUploader.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  import { Filesystem, Directory } from '@capacitor/filesystem';
  import { Preferences } from '@capacitor/preferences';

  interface Photo {
    fileName: string;
    webviewPath: string;
  }

  let photos: Photo[] = $state([]);
  let metadata = $state({});
  $inspect('md:', metadata);

  // 📌 Load persisted photo metadata on app start
  onMount(() => {
    loadPhotosMetadata();
    loadMetadataFromLocal();
  });

  $effect(() => {
    saveMetadataToLocal();
  });

  async function takePhoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    await savePhoto(image, 'camera');
  }

  async function pickPhoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    await savePhoto(image, 'photos');
  }

  async function savePhoto(image: { webPath?: string }, source: string) {
    if (!image.webPath) return;

    // Get the photo data as Blob
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob) as string;

    const timestamp = new Date().getTime();
    const fileName = `${timestamp}.jpeg`;

    // Save the photo to Filesystem (base64)
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
    });

    photos = [
      ...photos,
      {
        fileName,
        webviewPath: image.webPath,
      }
    ];

    let md = getMetadata(fileName, source, timestamp);
    updatePhotoMetadata(fileName, md);

    await savePhotosMetadata();
  }

  async function removePhoto(fileName: string) {
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data,
    });

    photos = photos.filter(p => p.fileName !== fileName);
    await savePhotosMetadata();
    updatePhotoMetadata(fileName, null);
  }

  async function uploadAll() {
    for (const photo of photos) {
      // Read the saved file as base64
      const file = await Filesystem.readFile({
        path: photo.fileName,
        directory: Directory.Data,
      });

      // Convert base64 to Blob for FormData
      const blob = base64ToBlob(file.data.toString());

      const formData = new FormData();
      formData.append('file', blob, photo.fileName);

      const md = metadata[photo.fileName];
      if (md) {
        console.log('_____md_____', md);
        formData.append('fileName', md.fileName);
        formData.append('subject', md.subject);
        formData.append('user', md.userid);
        formData.append('source', md.source);
        formData.append('timestamp', md.timestamp);
        formData.append('timeseconds', md.timeseconds);
      }

      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response:', await response.text());

      // Delete the local file after upload
      await Filesystem.deleteFile({
        path: photo.fileName,
        directory: Directory.Data,
      });
    }

    photos = [];
    metadata = {};
    await savePhotosMetadata();
  }

  function getMetadata(fileName: string, source: string, seconds: number) {
    return {
      'fileName': fileName,
      'subject': subject(),
      'user': userid(),
      'source': source,
      'timestamp': new Date(seconds).toISOString(),
      'timeseconds': seconds,
    };
  }

  function sanitizeFilename(filename: string) {
    // Remove leading/trailing periods, then whitespace, and then replace illegal characters with an underscore.
    return filename.replace(/^\.|\.$/g, '').trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
  }

  async function savePhotosMetadata() {
    await Preferences.set({
      key: 'photos',
      value: JSON.stringify(photos),
    });
  }

  async function loadPhotosMetadata() {
    const result = await Preferences.get({ key: 'photos' });
    photos = result.value ? JSON.parse(result.value) : [];
  }

  function loadMetadataFromLocal() {
    metadata = JSON.parse(localStorage.getItem('photometa') ?? '{}');
  }

  function saveMetadataToLocal() {
    localStorage.setItem('photometa', JSON.stringify(metadata));
  }

  function updatePhotoMetadata(key: string, value: any | null) {
    if (value) {
      metadata[key] = value; // value;
    } else {
      delete metadata[key];
    }
  }

  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1];
        resolve(base64 || '');
      };
      reader.readAsDataURL(blob);
    });
  }

  function base64ToBlob(base64: string): Blob {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: 'image/jpeg' });
  }

  const subject = () => {
    const candidates = ['American Copper', 'Baltimore Checkerspot', 'Checkered White', 'Eastern Tailed Blue', 'Fiery Skipper', 'Great Spangled Frittilary', 'Hobomok Skipper', 'Indian Skipper', "Juvenal's Skipper"];
    let idx = Math.floor(Math.random() * candidates.length);
    return candidates[idx];
  };

  const userid = () => {
    const userids = [
      'd1c19ed7-7b5b-4ec8-b884-918a16dd8a5c',
      '91acadb1-1225-4b14-ade7-dafe5855779b',
      '50acbae5-5f22-47a6-822c-2d530fc12d72',
      '738ef8c7-73a0-4e9c-860b-8c7fd496d954',
    ];
    let idx = Math.floor(Math.random() * userids.length);
    return userids[idx];
  }

</script>

<div class="space-y-4">
  <button onclick={takePhoto}>📷 Take Photo</button>
  <button onclick={pickPhoto}>🖼️ Pick From Gallery</button>

  {#if photos.length > 0}
    <h3>Pending Photos:</h3>
    <div class="grid grid-cols-3 gap-4">
      {#each photos as photo (photo.fileName)}
        <div class="border p-2">
          <img src={photo.webviewPath} alt="preview" style="max-width: 100%;" />
          <p class="break-all text-xs">{photo.fileName}</p>
          <button onclick={() => removePhoto(photo.fileName)}>❌ Remove</button>
        </div>
      {/each}
    </div>

    <button onclick={uploadAll} class="mt-4 bg-green-500 text-white p-2">
      Upload All
    </button>
  {/if}
</div>
