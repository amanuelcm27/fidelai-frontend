export const metadata = {
  title: 'Documentation | FidelAI',
  description: 'API documentation and dataset usage guides.',
};

export default function DocumentationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Documentation</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Explore API references, integration guides, and dataset documentation.
      </p>
    </main>
  );
}
