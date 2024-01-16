export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}
