import { get, post, put } from './api';
import { cookies } from 'next/headers';

// Types
export interface Job {
  id: string | number;
  title: string;
  latitude: number;
  longitude: number;
  status: string;
  assignee_id?: string | number;
  assignee?: string;
}

export interface CreateJobRequest {
  title: string;
  latitude: number;
  longitude: number;
  assignee_id?: string | number;
}

export interface UpdateJobStatusRequest {
  status: string;
}

// Helper function to get authentication token
async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('jwt')?.value;
}

// Job-related data operations
export async function fetchJobs(): Promise<Job[]> {
  try {
    const token = await getAuthToken();
    return await get<Job[]>('/jobs', token);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export async function fetchJobById(jobId: string | number): Promise<Job | null> {
  try {
    const token = await getAuthToken();
    return await get<Job>(`/jobs/${jobId}`, token);
  } catch (error) {
    console.error(`Failed to fetch job ${jobId}:`, error);
    return null;
  }
}

export async function createJob(jobData: CreateJobRequest): Promise<Job | null> {
  try {
    const token = await getAuthToken();
    return await post<Job>('/jobs', jobData, token);
  } catch (error) {
    console.error('Failed to create job:', error);
    return null;
  }
}

export async function updateJobStatus(jobId: string | number, status: string): Promise<boolean> {
  try {
    const token = await getAuthToken();
    await put(`/jobs/${jobId}/status`, { status }, token);
    return true;
  } catch (error) {
    console.error(`Failed to update job ${jobId} status:`, error);
    return false;
  }
}

// User-related data operations
export interface User {
  id: string;
  email: string;
  role: string;
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const token = await getAuthToken();
    return await get<User>('/auth/me', token);
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    return null;
  }
}

// Photo-related data operations
export interface Photo {
  id: string;
  job_id: string | number;
  url: string;
  uploaded_at: string;
}

export async function fetchJobPhotos(jobId: string | number): Promise<Photo[]> {
  try {
    const token = await getAuthToken();
    return await get<Photo[]>(`/jobs/${jobId}/photos`, token);
  } catch (error) {
    console.error(`Failed to fetch photos for job ${jobId}:`, error);
    return [];
  }
}

export async function uploadJobPhoto(jobId: string | number, file: File): Promise<Photo | null> {
  try {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    
    // This would need to be implemented in the API client
    // For now, we'll return null as a placeholder
    console.warn('Photo upload not yet implemented in API client');
    return null;
  } catch (error) {
    console.error(`Failed to upload photo for job ${jobId}:`, error);
    return null;
  }
} 