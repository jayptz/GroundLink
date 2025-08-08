'use client';

import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import useSWR from 'swr';

interface JobsRealtimeProps {
  onJobUpdate: () => void;
}

export default function JobsRealtime({ onJobUpdate }: JobsRealtimeProps) {
  const { data: session } = useSWR('/api/session', fetcher);

  useEffect(() => {
    if (!session?.authenticated) return;

    const socket = connectSocket();

    socket.on('job:created', () => {
      console.log('Job created event received');
      onJobUpdate();
    });

    socket.on('job:updated', () => {
      console.log('Job updated event received');
      onJobUpdate();
    });

    return () => {
      disconnectSocket();
    };
  }, [session, onJobUpdate]);

  return null; // This component doesn't render anything
}

async function fetcher(url: string) {
  const response = await fetch(url);
  return response.json();
} 