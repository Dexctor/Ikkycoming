/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzqkDK2BXaQmhJSEQR3wkfrvzdk4IMsphh_zEWk7KrOxUTt0-CITj7viNMPNMxqZvI3qQ/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Apps Script');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
} 