import { post, put, uploadFile } from './api';

// Types (re-exported from server data module for consistency)
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

export interface Photo {
  id: string;
  job_id: string | number;
  url: string;
  uploaded_at: string;
}

export interface PresignResponse {
  url: string;
}

// Client-side data operations
export async function createJobClient(jobData: CreateJobRequest): Promise<Job | null> {
  try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create job:', error);
    return null;
  }
}

export async function updateJobStatusClient(jobId: string | number, status: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/jobs/${jobId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return response.ok;
  } catch (error) {
    console.error(`Failed to update job ${jobId} status:`, error);
    return false;
  }
}

export async function uploadJobPhotoClient(jobId: string | number, file: File): Promise<Photo | null> {
  try {
    // Get presigned URL
    const presignResponse = await post<PresignResponse>('/photos/presign', { jobId }, undefined);
    
    // Upload to S3
    await uploadFile(presignResponse.url, file);
    
    // Complete upload
    const completeResponse = await post<Photo>('/photos/complete', {
      jobId,
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }, undefined);

    return completeResponse;
  } catch (error) {
    console.error(`Failed to upload photo for job ${jobId}:`, error);
    return null;
  }
}

export async function fetchJobsClient(): Promise<Job[]> {
  try {
    const response = await fetch('/api/jobs');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export async function fetchJobByIdClient(jobId: string | number): Promise<Job | null> {
  try {
    const response = await fetch(`/api/jobs/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch job ${jobId}:`, error);
    return null;
  }
} 