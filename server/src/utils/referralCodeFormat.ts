export const referralCodeFormat = (code: number) => {
  return code.toString().padStart(10, '0');
};
