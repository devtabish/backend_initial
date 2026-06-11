import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 1. Status Code nikalein
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : null;

    // 2. Error Message ko filter kar ke ek dam saaf (clean) karein
    let cleanMessage = 'Server error';

    if (exceptionResponse) {
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        const msg = (exceptionResponse as any).message;
        // Agar validation errors ka array ho to unhe comma se jor dein, nahi to direct string
        cleanMessage = Array.isArray(msg) ? msg.join(', ') : msg;
      } else if (typeof exceptionResponse === 'string') {
        cleanMessage = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      cleanMessage = exception.message;
    }

    // ✨ 3. Professional & Flat Response Structure
    response.status(status).json({
      success: false,
      statusCode: status,
      message: cleanMessage, // 👈 Ab sirf saaf suthra main message dikhega
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}