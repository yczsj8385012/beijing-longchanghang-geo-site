export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://beijing-longchanghang.lchzsj8385.chatgpt.site'
  ).replace(/\/$/, '');
}
