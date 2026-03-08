'use client'

import CountUp from "react-countup";

const stats = [
    {
        num: 2,
        text: "Years of custom web development experience"
    },
    {
        num: 8,
        text: "Professional projects I’ve worked on in my jobs" // broad work experience
    },
    {
        num: 50,
        text: "WordPress projects I’ve worked on" // WordPress-specific
    },
    {
        num: 1200,
        text: "Code commits"
    },
];

const Stats = () => {
    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vh] mx-auto xl:max-w-none justify-center">
                    {stats.map((item, index) => (
                        <div
                            className="flex-1 flex flex-col items-center gap-2" // column layout
                            key={index}
                        >
                            <CountUp
                                end={item.num}
                                delay={0.5}
                                duration={2}
                                decimals={item.num % 1 !== 0 ? 1 : 0}
                                suffix="+"
                                className="text-4xl xl:text-6xl font-extrabold"
                            />
                            <p className="text-center max-w-[180px] leading-snug text-white/80">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
