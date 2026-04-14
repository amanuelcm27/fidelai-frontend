import { AnnotatorWorkspace } from "@/features/annotator";

interface PageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function AnnotatorWorkspacePage({ params }: PageProps) {
  const { taskId } = await params;

  return (
    <div className="w-full h-full flex flex-col">
      <AnnotatorWorkspace taskId={taskId} />
    </div>
  );
}
