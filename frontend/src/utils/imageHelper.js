// Utility function to convert image file to base64
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Validate image file
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Formato inválido. Use JPG, PNG, GIF ou WEBP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Imagem muito grande. Máximo 5MB.' };
  }

  return { valid: true };
};
