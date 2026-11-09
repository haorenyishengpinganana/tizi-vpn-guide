/** 拼接带 base 的站内路径：url('blog/x/') → '/tizi-vpn-guide/blog/x/' */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
}
