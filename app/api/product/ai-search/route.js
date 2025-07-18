import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'
import  authAdmin  from '@/lib/authAdmin';
import {db} from '@/lib/prisma';
import formidable from 'formidable';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';


export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

//function to convert file to base64
async function fileToBase64(filepath) {
    const buffer = fs.readFileSync(filepath);
    return buffer.toString('base64');
}

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)
        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        if(!process.env.GEMINI_API_KEY){
            return NextResponse.json({ success: false, message: 'GEMINI_API_KEY is not configured' })

        }

        // Parse form data using Web API
            const formData = await request.formData();
            const file = formData.get('image');
            if (!file) {
            return NextResponse.json({ success: false, message: 'No image file uploaded' });
            }

            // Read file as ArrayBuffer and convert to base64
            const arrayBuffer = await file.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString('base64');


            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'});

        

        const imagePart = {
            inlineData : {
                data: base64Image,
                mimeType: file.type,

            }
        }

      const prompt = `
      Analyze this electronic image and extract the following information:
      1. Name
      2. Model
      3. Year (approximately)
      4. Color
      5. Category (HeadPhone, Camera, Earphone, Watch, Smartphone,Laptop, accessories etc.)
      6. Price (your best guess)
      7. Short Description as to be added to a product listing

      Format your response as a clean JSON object with these fields:
      {
        "brand": "",
        "model": "",
        "year": 0000,
        "color": "",
        "category": "",
        "price": "",
        "description": "",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.
    `;

    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();

     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

     try {
        const productDetails = JSON.parse(cleanedText);
        const requiredFields = [
            "brand", "model", "year", "color", "category", "price", "description", "confidence"
        ]

        const missingFields = requiredFields.filter((field) => !(field in productDetails));

        if(missingFields.length > 0) {
            return NextResponse.json({ success: false, message: `Missing fields in response: ${missingFields.join(', ')}` });
        }

        return NextResponse.json({ success: true, message: 'Product details extracted successfully', data: productDetails });
     } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to parse AI response' });
     }

    } catch (error) {
         throw new Error("Gemini API error:"+error.message);
    }
}