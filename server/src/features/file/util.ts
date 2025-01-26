import { Readable } from "stream";

export async function fileToReadableStream(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);
  return stream;
}
