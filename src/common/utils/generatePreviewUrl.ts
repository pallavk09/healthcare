export const GeneratePrevieUrl = (document_id: string) => {
  return `${process.env.REACT_APP_APPWRITE_ENDPOINT}/storage/buckets/${process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID}/files/${document_id}/preview?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}`;
};
