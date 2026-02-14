
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProcessTimeline } from "@/components/pricing/ProcessTimeline"
import type { Metadata } from 'next'

import { GlowBackground } from "@/components/ui/GlowBackground";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: 'Pricing | Finpixel India',
    description: 'Transparent pricing for custom web development. Choose from Startup, Business, or Enterprise plans.',
}

const tiers = [
    {
        name: "Starter",
        price: "₹4,500",
        description: "Perfect for small businesses and personal portfolios.",
        features: [
            "5 Page Website",
            "Mobile Responsive Design",
            "Free SSL Security",
            "1 Year Hosting Included",
            "Contact Form",
            "Basic SEO",
        ],
    },
    {
        name: "Growth",
        price: "₹8,900",
        description: "Ideal for growing businesses and schools.",
        popular: true,
        features: [
            "Up to 10 Pages",
            "Advanced SEO Optimization",
            "Google Maps Integration",
            "Social Media Integration",
            "WhatsApp Chat Button",
            "Gallery & Testimonials",
            "6 Month Free Maintenance",
        ],
    },
    {
        name: "Pro",
        price: "₹14,900",
        description: "For businesses that need scale and heavy customization.",
        features: [
            "Unlimited Pages",
            "CMS / Admin Panel",
            "Advanced Animations",
            "E-commerce Functionality",
            "Priority 24/7 Support",
            "Google Analytics Setup",
            "12 Months Free Maintenance",
        ],
    },
]

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <div className="container px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Simple, Transparent Pricing.
                    </h1>
                    <p className="text-gray-400">
                        No hidden fees. Pay only when you are satisfied.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative p-8 rounded-3xl border ${tier.popular
                                ? "border-blue-500 bg-blue-500/5"
                                : "border-white/10 bg-white/5"
                                } flex flex-col`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-white">
                                        {tier.price}
                                    </span>
                                    <span className="text-gray-500">/project</span>
                                </div>
                                <p className="text-gray-400 text-sm">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-gray-300">
                                        <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.popular ? "glow" : "outline"}
                                className="w-full"
                            >
                                Get Started
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <ProcessTimeline />
        </div>
    )
}
