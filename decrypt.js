const crypto = require('crypto');
const fs = require('fs');

const encryptedBase64 = process.argv[2];

if (!encryptedBase64) {
  console.error('Usage: node decrypt.js <encrypted_base64_string>');
  process.exit(1);
}

try {
  const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');

  const privateKey = fs.readFileSync('lohit-private.pem', 'utf8');

  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    encryptedBuffer
  );

  console.log('Decrypted message:', decryptedBuffer.toString('utf8'));
} catch (error) {
  console.error('Error decrypting message:', error.message);
}
