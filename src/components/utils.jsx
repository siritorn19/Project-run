export const extractFileIdFromUrl = (url) => {
    const regex = /\/d\/(.+?)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  
  export const getGoogleDriveImageUrl = (fileId) => {
    return fileId ? `https://drive.google.com/uc?id=${fileId}` : null;
  };
  