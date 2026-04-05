export const metadata = {
  title: 'About | FidelAI',
  description: 'Learn about the Amharic AI Data Marketplace platform.',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">About FidelAI</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-center">
        FidelAI is an AI-powered data marketplace and crowdsourcing platform for Amharic dataset
        collection, annotation, quality control, and selling.
      </p>
    </main>
  );
}
