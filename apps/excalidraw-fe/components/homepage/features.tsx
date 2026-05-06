'use client';

import { Pencil, Users, Zap, Lock, Share2, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Pencil,
    title: 'Infinite Canvas',
    description: 'Draw, sketch, and design without limits on an infinite whiteboard.',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together with your team instantly with real-time synchronization.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for smooth drawing and instant rendering.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'End-to-end encryption keeps your designs safe and secure.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your work with a single link. No installation needed.',
  },
  {
    icon: BarChart3,
    title: 'Export Options',
    description: 'Save as PNG, SVG, PDF, or export directly to your favorite tools.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-slate-900 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Powerful Features for Creative Work
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto text-balance">
            Everything you need to create, collaborate, and share your ideas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-slate-800 bg-slate-800/30 hover:bg-slate-800/60 transition-all hover:border-slate-700 hover:shadow-lg"
              >
                <div className="mb-4 inline-block p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
