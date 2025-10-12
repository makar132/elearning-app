import Constants from 'expo-constants';
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } = Constants.expoConfig.extra;


export async function uploadToCloudinary(fileUri, folderPath, onProgress) {
    // Convert the file to a blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const fileType = blob.type;
    const resourceType = fileType === 'application/pdf' || fileType.startsWith('application/') ? 'raw' : 'auto';

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

    const form = new FormData();
    form.append('file', blob);
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    form.append('folder', folderPath);

    // Perform the upload request with progress tracking
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);
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
                    url: result.secure_url,
                    publicId: result.public_id,
                    bytes: result.bytes,
                    format: result.format,
                    resourceType: result.resource_type,
                    width: result.width,
                    height: result.height,
                    duration: result.duration,
                    originalFilename: result.original_filename
                });
            } else {
                reject(new Error(result.error?.message || 'Upload error'));
            }
        };
        xhr.send(form);
    });
}
