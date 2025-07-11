export function getCookieValue(cookieString: string, name: string): string {
  const nameEQ = name + "=";
  const cookies = cookieString.split(';');

  for(let cookie of cookies)
  {
    while(cookie.charAt(0) === ' ')
    {
      cookie = cookie.substring(1);
    }
    if(cookie.indexOf(nameEQ) === 0)
    {
      return cookie.substring(nameEQ.length);
    }
  }
  return "";
 }