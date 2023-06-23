export const validateUserInputAddress = (address: string) => {
  const pattern = /^[0-9a-fA-F]{130}$/;
  return pattern.test(address);
};
