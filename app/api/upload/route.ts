import { makeid } from "@/lib/utils";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ message: "No Image found!", success: false });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const randoId = makeid(5);
  const sanitizedFileName = file.name.replace(/\s/g, "");
  const nameOfImage = randoId + "-" + sanitizedFileName;
  const path = `./public/upload/${nameOfImage}`;
  await writeFile(path, buffer);
  return NextResponse.json({
    message: "File uploaded sucessfully!",
    success: true,
    src: nameOfImage,
  });
}
