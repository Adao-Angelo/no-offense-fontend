export function setCookie(
  name: string,
  value: string,
  expirationDays: number = 1
): void {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + expirationDays * 24 * 60 * 60 * 1000
  );
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  const nameEquals = `${name}=`;
  const decodedCookies = decodeURIComponent(document.cookie).split(";");

  for (let cookie of decodedCookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEquals) === 0) {
      return cookie.substring(nameEquals.length, cookie.length);
    }
  }
  return null;
}
