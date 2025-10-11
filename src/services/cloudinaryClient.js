import { Cloudinary } from '@cloudinary/url-gen';
import Constants from 'expo-constants';

const { CLOUDINARY_CLOUD_NAME } = Constants.expoConfig.extra;
export const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });
