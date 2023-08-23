import crypto from 'crypto-js';

export const generateChecksum = (file) => {
  return file.arrayBuffer().then((buffer) => {
    const checksum = crypto
      .SHA256(crypto.lib.WordArray.create(buffer))
      .toString();

    return checksum;
  });
};
