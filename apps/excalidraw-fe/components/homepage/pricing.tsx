'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect to get started',
    features: [
      'Unlimited boards',
      'Basic shapes & tools',
      '5 shared boards',
      'Community support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For individuals & small teams',
    features: [
      'Everything in Free',
      'Advanced templates',
      'Unlimited shared boards',
      'Real-time collaboration',
      'Priority support',
      'Keyboard shortcuts',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'SSO & team management',
      'Advanced security',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-slate-900 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto text-balance">
            Choose the perfect plan for your needs. Always free to start.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 lg:scale-105'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400 ml-2">{plan.period}</span>}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 ${
                  plan.highlight
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border border-slate-600 hover:border-slate-500 text-white hover:bg-slate-700/50'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Note */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            All plans include a 14-day free trial.{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Compare plans in detail
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
