import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    socket = io(`${API_URL}/ws`, {
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(token?: string): Socket {
  const socket = getSocket();
  
  if (token) {
    socket.auth = { token };
  }
  
  if (!socket.connected) {
    socket.connect();
  }
  
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
} 