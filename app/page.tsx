export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard App</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl mb-4">
          This application demonstrates Auth0 authentication with Next.js.
        </p>
        
        <a 
          href="/dashboard" 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </a>
        
        <p className="text-sm text-gray-500 mt-4">
          You'll be redirected to Auth0 for authentication if you're not logged in.
        </p>
      </div>
    </main>
  );
}
