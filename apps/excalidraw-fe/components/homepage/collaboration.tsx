'use client';

export function Collaboration() {
  return (
    <section
      id="collaboration"
      className="py-24 bg-slate-950 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
              Collaborate in Real-Time
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Bring your teams together, no matter where they are. See changes as they happen,
              communicate seamlessly, and build amazing things together.
            </p>

            <div className="space-y-4">
              {['Team Chat Built-in', 'Presence Awareness', 'Comments & Threads'].map(
                (item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                )
              )}
            </div>

            <button className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
              Start Collaborating
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 flex items-center justify-center relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Cards Representation */}
              <div className="relative z-10 w-full space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 transform hover:scale-105 transition-transform">
                  <div className="h-2 bg-blue-400 rounded w-3/4 mb-3" />
                  <div className="h-2 bg-slate-600 rounded w-full" />
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 transform hover:scale-105 transition-transform delay-100">
                  <div className="h-2 bg-emerald-400 rounded w-2/3 mb-3" />
                  <div className="h-2 bg-slate-600 rounded w-full" />
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 transform hover:scale-105 transition-transform delay-200">
                  <div className="h-2 bg-purple-400 rounded w-4/5 mb-3" />
                  <div className="h-2 bg-slate-600 rounded w-full" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
