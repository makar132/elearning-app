import { format as deliveryFormat, quality } from '@cloudinary/url-gen/actions/delivery';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { cld } from './cloudinaryClient';

export const makeImageThumb = (publicId, { w = 1024, h = 576 } = {}) =>
    cld
        .image(publicId)
        .resize(fill().width(w).height(h))
        .delivery(quality('auto'))
        .delivery(deliveryFormat('auto'))
        .toURL();

export const makeVideoThumb = (publicId, { w = 640, h = 360 } = {}) =>
    cld
        .video(publicId)
        .resize(fill().width(w).height(h))
        .delivery(deliveryFormat('jpg'))
        .toURL();

export const thumbFor = (resourceType, publicId) =>
    resourceType === 'video' ? makeVideoThumb(publicId) : makeImageThumb(publicId);
