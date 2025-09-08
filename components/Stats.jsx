'use client'

import CountUp from "react-countup";

const stats = [
    {
        num: 1.5,
        text: "Years of custom web development experience"
    },
    {
        num: 6,
        text: "Industry standard projects completed"
    },
    {
        num: 50,
        text: "WordPress projects completed"
    },
    {
        num: 900,
        text: "Code commits"
    },
];

const Stats = () => {
    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vh] mx-auto xl:max-w-none">
                    {stats.map((item, index) => (
                        <div
                            className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                            key={index}
                        >
                            <CountUp
                                end={item.num}
                                delay={0.5}
                                duration={2}
                                decimals={item.num % 1 !== 0 ? 1 : 0}
                                className="text-4xl xl:text-6xl font-extrabold"
                            />
                            <p className="max-w-[180px] leading-snug text-white/80">
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
