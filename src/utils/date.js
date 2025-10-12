export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return dateObj.toLocaleDateString();
};
