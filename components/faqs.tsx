'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock, CreditCard, Truck, Globe, Package } from 'lucide-react'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: React.ReactNode
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: <Clock className="size-4" />,
            question: 'Will my windows be too dark or look "aftermarket"?',
            answer: 'We help you choose the right shade for comfort, visibility, and legal compliance. Our computer-cut patterns ensure a factory‑level fit with clean edges that look intentional, not aftermarket.',
        },
        {
            id: 'item-2',
            icon: <CreditCard className="size-4" />,
            question: 'How long does installation take?',
            answer: 'Most vehicles are completed in 2–3 hours. We never rush quality—each vehicle receives the time needed for perfect results. Relax in our lounge with Wi‑Fi or drop off and return later.',
        },
        {
            id: 'item-3',
            icon: <Truck className="size-4" />,
            question: 'Will tint interfere with electronics or cell signal?',
            answer: 'No. We use premium ceramic films that do not interfere with electronics or signals. You get heat rejection and UV protection without compromise.',
        },
        {
            id: 'item-4',
            icon: <Globe className="size-4" />,
            question: 'What if I notice an issue after installation?',
            answer: 'Your satisfaction is guaranteed. Any concern within 30 days is addressed immediately at no charge. Our lifetime warranty covers materials and workmanship—if tint bubbles, peels, or fades, we replace it free.',
        },
        {
            id: 'item-5',
            icon: <Package className="size-4" />,
            question: 'How far in advance should I book?',
            answer: 'We recommend booking 1–2 weeks ahead, especially during peak summer. Premium appointment slots fill quickly.',
        },
    ]

    return (
        <section className="relative isolate py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20 pl-10">
                            <h2 className="mt-4 text-3xl font-bold text-white">Frequently Asked Questions</h2>
                            <p className="text-light-grey mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    href="/contact"
                                    className="text-gold-accent font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3 px-10">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-obsidian/30 shadow-xs rounded-lg border border-white/10 px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6 text-gold-accent">
                                                {item.icon}
                                            </div>
                                            <span className="text-base text-white text-left">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base text-light-grey">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}