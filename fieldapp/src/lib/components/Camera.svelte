<script lang="ts">
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  import { Filesystem, Directory } from '@capacitor/filesystem';
  import { Network } from '@capacitor/network';

  let photoPath: string | null;

  async function takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    const fileName = `${new Date().getTime()}.jpeg`;

    await Filesystem.writeFile({
      path: fileName,
      data: image.base64String!,
      directory: Directory.Data
    });

    photoPath = fileName;
    console.log('Saved photo to', photoPath);
  }

  async function uploadPhoto() {
    if (!photoPath) return;

    // Read file
    const file = await Filesystem.readFile({
      path: photoPath,
      directory: Directory.Data
    });

    // Example: Upload to your server
    // const response = await fetch('https://your-server/upload', {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: photoPath,
        data: file.data
      })
    });

    console.log('Upload response', await response.text());
  }

  async function monitorConnection() {
    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        console.log('Device online — you could upload now.');
        uploadPhoto();
      }
    });
  }

  monitorConnection();
</script>

<button onclick={takePhoto}>Take Photo</button>
<button onclick={uploadPhoto}>Upload Now</button>

