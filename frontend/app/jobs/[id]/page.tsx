import { requireSession } from '@/lib/auth';
import { get } from '@/lib/api';
import { cookies } from 'next/headers';
import PhotoUpload from '@/components/PhotoUpload';
import Link from 'next/link';

interface Job {
  id: string | number;
  title: string;
  latitude: number;
  longitude: number;
  status: string;
  assignee?: string;
  description?: string;
}

interface Photo {
  id: string | number;
  filename: string;
  url: string;
  uploaded_at: string;
}

async function getJob(id: string): Promise<Job> {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;
  return await get<Job>(`/jobs/${id}`, token);
}

async function getJobPhotos(jobId: string): Promise<Photo[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;
  return await get<Photo[]>(`/jobs/${jobId}/photos`, token);
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  
  const { id } = await params;
  const job = await getJob(id);
  const photos = await getJobPhotos(id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600">Job Details</p>
        </div>
        <Link
          href="/jobs"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Job Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  job.status === 'active' ? 'bg-green-100 text-green-800' :
                  job.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Location:</span>
                <span className="ml-2 text-gray-600">
                  {job.latitude.toFixed(4)}, {job.longitude.toFixed(4)}
                </span>
              </div>
              {job.assignee && (
                <div>
                  <span className="font-medium">Assignee:</span>
                  <span className="ml-2 text-gray-600">{job.assignee}</span>
                </div>
              )}
              {job.description && (
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="mt-1 text-gray-600">{job.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Photos</h2>
            <PhotoUpload jobId={job.id} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Job Photos</h2>
          {photos.length === 0 ? (
            <p className="text-gray-500">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="space-y-2">
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-sm text-gray-600">{photo.filename}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(photo.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 