export const convertImageLoader = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#ddd" offset="20%" />
        <stop stop-color="#fff" offset="50%" />
        <stop stop-color="#ddd" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#eee" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>
    `;

export const toBase64ImageLoader = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);