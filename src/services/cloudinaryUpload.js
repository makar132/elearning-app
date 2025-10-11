import Constants from 'expo-constants';
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } = Constants.expoConfig.extra;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

export async function uploadToCloudinary(fileUri, folderPath, onProgress) {
    // Convert to blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // Build form data
    const form = new FormData();
    form.append('file', blob);
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    form.append('folder', folderPath);

    // Perform fetch with progress tracking
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', UPLOAD_URL);
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
                const pct = Math.round((e.loaded / e.total) * 100);
                onProgress(pct);
            }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.onload = () => {
            const result = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                    publicId: result.public_id,
                    url: result.secure_url,
                    bytes: result.bytes,
                    format: result.format,
                    resourceType: result.resource_type
                });
            } else {
                reject(new Error(result.error?.message || 'Upload error'));
            }
        };
        xhr.send(form);
    });
}
