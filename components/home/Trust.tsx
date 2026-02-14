import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Trust() {
    return (
        <section className="py-24 bg-black relative">
            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                            Pay After Satisfaction.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            We are so confident in our quality, we build your demo first. You only pay when you love it. No risk. No upfront fees.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-2xl">🚀</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
                                    <p className="text-gray-400">We don't use heavy builders. Hand-coded for 100/100 Google Speed Scores.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-2xl">🛠️</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">All-in-One</h3>
                                    <p className="text-gray-400">Domain + Hosting + Maintenance. We handle the tech headache.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link href="/contact">
                                <Button variant="glow" size="lg">Start Your Project</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
                        <div className="relative z-10 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>
                            <div className="space-y-4 font-mono text-sm text-gray-300">
                                <p><span className="text-blue-400">const</span> <span className="text-yellow-400">finpixel</span> = <span className="text-purple-400">new</span> Agency();</p>
                                <p>finpixel.<span className="text-blue-400">guarantee</span> = <span className="text-green-400">true</span>;</p>
                                <p>finpixel.<span className="text-blue-400">buildDemo</span>().<span className="text-blue-400">then</span>(() ={">"} {"{"}</p>
                                <p className="pl-4"><span className="text-purple-400">if</span> (client.<span className="text-blue-400">lovesIt</span>) {"{"}</p>
                                <p className="pl-8">client.<span className="text-blue-400">pay</span>();</p>
                                <p className="pl-4">{"}"}</p>
                                <p>{"}"});</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
