import { Code2, Server, ShieldCheck, HeartHandshake, Phone, Globe } from "lucide-react"

const capabilities = [
    {
        title: "Hand-Coded Performance",
        icon: <Code2 className="w-12 h-12 text-blue-500" />,
        items: [
            "Custom HTML5/CSS3/JS",
            "No Bloated Builders",
            "Perfect 100/100 Core Vitals",
        ],
    },
    {
        title: "Hosting & Security",
        icon: <Server className="w-12 h-12 text-purple-500" />,
        items: [
            "99.9% Uptime Guarantee",
            "Free SSL Security",
            "Global CDN Hosting",
        ],
    },
    {
        title: "The Trust Guarantee",
        icon: <HeartHandshake className="w-12 h-12 text-green-500" />,
        items: [
            "24/7 WhatsApp Support",
            "Pay After Satisfaction",
            "No Hidden Fees",
        ],
    },
]

export function Capabilities() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[100px]" />
            </div>

            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
                        Mastery Over Mechanics.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are masters of code, not just drag-and-drop designers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {capabilities.map((cap, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="mb-6 p-4 bg-black/50 rounded-2xl w-fit border border-white/10">
                                {cap.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-6">
                                {cap.title}
                            </h3>
                            <ul className="space-y-4">
                                {cap.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
