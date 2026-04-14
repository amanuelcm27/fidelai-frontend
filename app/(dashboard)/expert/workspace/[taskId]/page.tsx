import { ExpertWorkspace } from "@/features/expert/components/workspace";

interface PageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function ExpertWorkspacePage({ params }: PageProps) {
  const { taskId } = await params;

  return (
    <div className="h-[calc(100vh-6rem)] relative overflow-hidden -mt-4">
      <ExpertWorkspace taskId={taskId} />
    </div>
  );
}
