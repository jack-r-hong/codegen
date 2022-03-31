
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
export type ReadManyPhotoRequest = {
}

export const ReadManyPhotoRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
  };
};
export type UploadManyPhotoRequest = {
}

export const UploadManyPhotoRequestConvert = (
    body: any,
    query: any,
    path: any,
) => {
  return {
  };
};
