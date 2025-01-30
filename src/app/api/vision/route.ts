import { NextResponse } from "next/server";
import { ImageAnnotatorClient } from "@google-cloud/vision";

// Initialize Google Cloud Vision Client
const client = new ImageAnnotatorClient({
  keyFilename:
    "C:/Users/rj900/Desktop/RoshanWS/kalamanch/src/app/api/vision/kalamanch-ocr-key.json", // Replace with actual path
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
