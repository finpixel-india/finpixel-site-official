import { Zap, Smartphone, CheckCircle } from "lucide-react"

const features = [
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: "Lightning Fast Speed",
        description: "We don't use heavy builders. We hand-code for 100/100 Google Speed Scores.",
    },
    {
        icon: <Smartphone className="w-8 h-8 text-blue-400" />,
        title: "Mobile Optimized",
        description: "Your site will look perfect on every device, from iPhone to Android.",
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-green-400" />,
        title: "Pay After Approval",
        description: "We build your demo first. You only pay when you love it.",
    },
]

export function Features() {
    return (
        <section className="py-24 bg-black relative">
            <div className="container px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <div className="relative z-10">
                            <div className="mb-4 p-3 bg-white/10 rounded-lg w-fit">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
