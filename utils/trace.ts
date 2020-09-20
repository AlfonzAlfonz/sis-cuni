export const trace = <T>(t: T, ...args: any[]) => {
  console.log(t, ...args);
  return t;
};
