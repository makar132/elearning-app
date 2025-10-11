import { Cloudinary } from '@cloudinary/url-gen';
import Constants from 'expo-constants';

const { CLOUDINARY_CLOUD_NAME } = Constants.expoConfig.extra;
console.log("CLOUD_NAME: ", CLOUDINARY_CLOUD_NAME);
export const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });
