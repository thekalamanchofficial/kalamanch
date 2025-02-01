import { NextResponse } from "next/server";
import { ImageAnnotatorClient } from "@google-cloud/vision";

// Initialize Google Cloud Vision Client
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const serviceKey = JSON.parse(process.env.GOOGLE_VISION_API_KEY ?? "");

const response = await fetch(
  "https://rsqvms2696ek9hhl.public.blob.vercel-storage.com/kalamanch-google-vision-ocr-key-OFkFVY5b2f799On7e9kvp6SI1S2EOd.json",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const credentials = await response.json();

const client = new ImageAnnotatorClient({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  credentials,
});

// Define the expected request body type
interface VisionRequestBody {
  imageBase64: string;
}

// Define the response type
interface VisionResponse {
  text?: string | null;
  error?: string;
}

// API Route Handler
export async function POST(
  req: Request,
): Promise<NextResponse<VisionResponse>> {
  try {
    const { imageBase64 }: VisionRequestBody =
      (await req.json()) as VisionRequestBody;

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Perform OCR using Base64 image
    const [result] = await client.textDetection({
      image: { content: imageBase64 },
    });
    const detections = result.textAnnotations;

    return NextResponse.json({
      text: detections?.length ? detections?.[0]?.description : "No text found",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
