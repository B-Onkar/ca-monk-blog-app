import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogList } from "@/components/BlogList";
import { BlogDetail } from "@/components/BlogDetail";
import { CreateBlog } from "@/components/CreateBlog";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PenSquare, BookOpen } from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function BlogApp() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  CA Monk Blog
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Your daily dose of insights
                </p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <PenSquare className="w-4 h-4 mr-2" />
              New Blog
            </Button>
          </div>
        </div>
      </header>

      {/* Secondary navigation bar - decorative */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-12rem)]">
          {/* Blog list - Left panel */}
          <aside className={`lg:col-span-4 xl:col-span-4 ${selectedBlogId ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-36">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  All Blogs
                </h2>
                <span className="text-sm text-slate-500">
                  Click to read
                </span>
              </div>
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
                <BlogList
                  onSelectBlog={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                />
              </div>
            </div>
          </aside>

          {/* Blog detail - Right panel */}
          <section className={`lg:col-span-8 xl:col-span-8 ${!selectedBlogId ? 'hidden lg:block' : ''}`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 min-h-[calc(100vh-14rem)]">
              <BlogDetail
                blogId={selectedBlogId}
                onBack={() => setSelectedBlogId(null)}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Create blog modal */}
      {showCreateForm && (
        <CreateBlog onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
    </QueryClientProvider>
  );
}

export default App;
