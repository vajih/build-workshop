import qrcode from "qrcode-generator";

/**
 * Build an SVG string for a QR code. Pure — safe on the server and in print
 * pages. Uses one `<path>` for all dark modules plus a quiet zone.
 *
 * `size` is the rendered pixel size; the SVG scales with its container via
 * width/height 100% when embedded.
 */
export function qrSvg(text: string, opts: { margin?: number } = {}): string {
  const margin = opts.margin ?? 4;
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();

  const count = qr.getModuleCount();
  const dim = count + margin * 2;

  let path = "";
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        path += `M${col + margin} ${row + margin}h1v1h-1z`;
      }
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" `,
    `shape-rendering="crispEdges" role="img" aria-label="QR code">`,
    `<rect width="${dim}" height="${dim}" fill="#ffffff"/>`,
    `<path d="${path}" fill="#0b1f17"/>`,
    `</svg>`,
  ].join("");
}
