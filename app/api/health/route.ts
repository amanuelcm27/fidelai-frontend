import { NextResponse } from 'next/server';

/**
 * API Route Handler Placeholder
 * This file demonstrates the structure for App Router API routes.
 * Add route handlers here for BFF (Backend-For-Frontend) patterns.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'FidelAI API is running',
    version: '0.1.0',
  });
}
