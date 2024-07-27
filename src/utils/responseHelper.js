// sendResponse.js
import { NextResponse } from 'next/server';

export function sendResponse(res, statusCode, data) {
  return NextResponse.json(
    { ...data }, 
    { status: statusCode }
  );
}

