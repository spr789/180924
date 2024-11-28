// Function to set the page title dynamically
export function setPageTitle(title: string): void {
  document.title = title;
}

// Function to set dynamic meta tags
export function setMetaTags({ title, description, keywords, image }: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}): void {
  // Set meta title
  setMetaTag('og:title', title);
  setMetaTag('twitter:title', title);

  // Set description meta tag
  setMetaTag('description', description);
  setMetaTag('og:description', description);
  setMetaTag('twitter:description', description);

  // Set keywords meta tag if provided
  if (keywords) {
    setMetaTag('keywords', keywords);
  }

  // Set image meta tag if provided
  if (image) {
    setMetaTag('og:image', image);
    setMetaTag('twitter:image', image);
  }
}

// Helper function to set individual meta tags
function setMetaTag(name: string, content: string): void {
  let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
