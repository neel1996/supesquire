import crypto from 'crypto';

export const getChecksum = (file) => {
  return file.arrayBuffer().then((buffer) => {
    const checksum = crypto
      .createHash('sha256')
      .update(Buffer.from(buffer))
      .digest('hex');
    return checksum;
  });
};
