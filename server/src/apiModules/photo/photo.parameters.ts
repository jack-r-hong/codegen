
export type ReadOnePhotoRequest = {
    pathId: number
}

export const ReadOnePhotoRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
    pathId: parseInt(path.id),
  };
};
