import { NextResponse } from "next/server";
import { ImageAnnotatorClient } from "@google-cloud/vision";

type VisionServiceAccountCredentials = {
  type: "service_account";
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string;
}


const GOOGLE_VISION_CREDENTIALS_URL =
  "https://rsqvms2696ek9hhl.public.blob.vercel-storage.com/kalamanch-google-vision-ocr-key-OFkFVY5b2f799On7e9kvp6SI1S2EOd.json";

interface VisionRequestBody {
  imageBase64: string;
}

interface VisionResponse {
  text?: string | null;
  error?: string;
}

// Function to fetch Google Vision API credentials
async function getGoogleVisionCredentials(): Promise<VisionServiceAccountCredentials> {
  try {
    const response = await fetch(GOOGLE_VISION_CREDENTIALS_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch credentials: ${response.statusText}`);
    }

    const credentials = await response.json() as VisionServiceAccountCredentials;
    return credentials;
  } catch (error) {
    console.error("Error fetching credentials:", error);
    throw new Error("Failed to load Google Vision API credentials");
  }
}


// Initialize Google Cloud Vision Client lazily
let client: ImageAnnotatorClient | null = null;

async function getVisionClient(): Promise<ImageAnnotatorClient> {
  if (!client) {
    const credentials = await getGoogleVisionCredentials();
    client = new ImageAnnotatorClient({ credentials });
  }
  return client;
}

// API Route Handler
export async function POST(
  req: Request,
): Promise<NextResponse<VisionResponse>> {
  try {
    const { imageBase64 }: VisionRequestBody = await req.json() as VisionRequestBody;

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const visionClient = await getVisionClient();
    const [result] = await visionClient.textDetection({
      image: { content: imageBase64 },
    });

    const text = result.textAnnotations?.[0]?.description ?? "No text found";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error processing OCR:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
