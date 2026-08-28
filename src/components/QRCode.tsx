import { qrSvg } from "@/lib/qr";

interface QRCodeProps {
  /** The URL or text to encode. */
  value: string;
  /** Rendered size in pixels (square). */
  size?: number;
  /** Accessible description of where the code leads. */
  label: string;
  className?: string;
}

/**
 * Server-rendered QR code (inline SVG). Also shows the encoded URL as text so
 * it works when printed or when a camera is not available.
 */
export function QRCode({ value, size = 160, label, className = "" }: QRCodeProps) {
  const svg = qrSvg(value);
  return (
    <figure className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <span
        className="block overflow-hidden rounded-lg border border-border-strong bg-white p-2"
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="max-w-[16rem] text-center text-xs break-all text-ink-subtle">
        <span className="sr-only">{label}: </span>
        {value}
      </figcaption>
    </figure>
  );
}
