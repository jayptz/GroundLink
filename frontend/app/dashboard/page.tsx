import { requireSession } from '@/lib/auth';
import { get } from '@/lib/api';
import Map from '@/components/Map';
import JobsRealtime from '@/components/JobsRealtime';
import { cookies } from 'next/headers';

interface Job {
  id: string | number;
  title: string;
  latitude: number;
  longitude: number;
  status: string;
}

async function getJobs(): Promise<Job[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    return await get<Job[]>('/jobs', token);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await requireSession();
  const jobs = await getJobs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session.email}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Job Map</h2>
            <Map jobs={jobs} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Job Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Jobs:</span>
                <span className="font-semibold">{jobs.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Jobs:</span>
                <span className="font-semibold text-green-600">
                  {jobs.filter(job => job.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Completed Jobs:</span>
                <span className="font-semibold text-blue-600">
                  {jobs.filter(job => job.status === 'completed').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Jobs</h2>
            <div className="space-y-2">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.status}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    job.status === 'active' ? 'bg-green-100 text-green-800' :
                    job.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <JobsRealtime onJobUpdate={() => {
        // This will trigger a re-render when jobs are updated
        window.location.reload();
      }} />
    </div>
  );
} 