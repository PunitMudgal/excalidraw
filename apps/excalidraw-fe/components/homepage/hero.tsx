'use client';

import { ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full">
          <Zap size={16} className="text-blue-400" />
          <span className="text-sm text-slate-300">
            Fast. Collaborative. Open Source.
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          Draw, Design &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Collaborate
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto text-balance">
          Create beautiful whiteboard designs and diagrams. Work together in real-time with
          your team, anywhere in the world.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group">
            Start Creating Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-lg transition-colors bg-slate-900/50">
            View Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-800">
          <div>
            <div className="text-3xl font-bold text-white">100K+</div>
            <p className="text-slate-400 text-sm mt-2">Active Users</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">50M+</div>
            <p className="text-slate-400 text-sm mt-2">Boards Created</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">99.9%</div>
            <p className="text-slate-400 text-sm mt-2">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
