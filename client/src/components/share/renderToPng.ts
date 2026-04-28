const toUtf8Base64 = (input: string) => {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};

export const svgToDataUrl = (svg: string) =>
  `data:image/svg+xml;base64,${toUtf8Base64(svg)}`;

export const renderSvgToPngBlob = async (svg: string, size = 1080) => {
  const dataUrl = svgToDataUrl(svg);
  const img = new Image();
  img.decoding = "async";
  img.src = dataUrl;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load SVG image"));
  });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png", 1),
  );
  if (!blob) throw new Error("Failed to export PNG");
  return blob;
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

