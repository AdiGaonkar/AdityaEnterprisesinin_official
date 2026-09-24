import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Collaborate from "@/components/Collaborate";

type JobType = "Full-time" | "Part-time" | "Internship" | "Contract";
type WorkMode = "Remote" | "On-site" | "Hybrid";

type Job = {
    id: string;
    title: string;
    dept: "Design" | "Development" | "Marketing" | "Operations";
    type: JobType;
    mode: WorkMode;
    location: string;
    experience: string;
    salary?: string; // optional
    desc: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave?: string[];
    applyEmail: string;
};

const jobs: Job[] = [
    {
        id: "uiux-designer",
        title: "UI/UX Designer",
        dept: "Design",
        type: "Contract",
        mode: "Remote",
        location: "India",
        experience: "0–2 years",
        desc: "Design clean, conversion-focused interfaces for landing pages, websites, and products.",
        responsibilities: [
            "Create wireframes, UI screens, and basic design systems",
            "Deliver high-quality Figma files with components + variants",
            "Collaborate with dev to ensure pixel-perfect implementation",
        ],
        requirements: [
            "Figma + layout/typography skills",
            "Strong sense of spacing, hierarchy, and UX",
            "Portfolio with 2–3 strong projects",
        ],
        niceToHave: ["Basic knowledge of Tailwind", "Landing page conversion sense"],
        applyEmail: "hello@youragency.com",
    },
    {
        id: "frontend-dev",
        title: "Frontend Developer (React)",
        dept: "Development",
        type: "Contract",
        mode: "Remote",
        location: "India",
        experience: "0–2 years",
        desc: "Build modern, fast, responsive UIs using React + Tailwind with clean component structure.",
        responsibilities: [
            "Implement pages from Figma with strong accuracy",
            "Write reusable components and clean code",
            "Optimize performance and responsiveness",
        ],
        requirements: [
            "React + TypeScript basics",
            "Tailwind CSS experience",
            "Good understanding of responsive design",
        ],
        niceToHave: ["Framer Motion", "React Router", "Basic SEO knowledge"],
        applyEmail: "hello@youragency.com",
    },
    {
        id: "graphic-designer",
        title: "Graphic Designer (Social + Posters)",
        dept: "Design",
        type: "Part-time",
        mode: "Remote",
        location: "India",
        experience: "0–2 years",
        desc: "Create social media creatives, posters, thumbnails & banners that look premium and convert.",
        responsibilities: [
            "Design social posts, stories, and ads",
            "Maintain brand consistency across creatives",
            "Deliver fast iterations based on feedback",
        ],
        requirements: [
            "Strong visual design skills (typography + composition)",
            "Photoshop/Illustrator or Canva (pro level)",
            "A portfolio with real social/poster work",
        ],
        niceToHave: ["Motion design basics", "Understanding of ad creatives"],
        applyEmail: "hello@youragency.com",
    },
];

const perks = [
    {
        title: "Remote-friendly",
        desc: "Work from anywhere and deliver outcomes. We care about quality, not office hours.",
    },
    {
        title: "Real projects",
        desc: "No fake assignments — you’ll work on real client deliverables and build your portfolio.",
    },
    {
        title: "Fast learning",
        desc: "Clear feedback, good systems, and the chance to grow quickly with every project.",
    },
    {
        title: "Quality culture",
        desc: "Clean design, clean code, and high standards — that’s the vibe.",
    },
];

const steps = [
    { title: "Apply", desc: "Send your details + portfolio link." },
    { title: "Short call", desc: "Quick 10–15 min chat to understand fit." },
    { title: "Task", desc: "Small paid task or mini assignment (role-based)." },
    { title: "Onboard", desc: "Start with a project and grow from there." },
];

const faqs = [
    {
        q: "Do you offer internships?",
        a: "Yes — when we have bandwidth. If you’re strong and hungry to learn, apply with your best work.",
    },
    {
        q: "Is this remote?",
        a: "Most roles are remote. Some client projects may need quick sync calls.",
    },
    {
        q: "Do I need a degree?",
        a: "No. Your portfolio and skills matter more than a certificate.",
    },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
        {children}
    </span>
);

const Careers = () => {
    const [dept, setDept] = useState<"All" | Job["dept"]>("All");
    const [openId, setOpenId] = useState<string | null>(jobs[0]?.id ?? null);

    const filteredJobs = useMemo(() => {
        if (dept === "All") return jobs;
        return jobs.filter((j) => j.dept === dept);
    }, [dept]);

    const applyLink = (job: Job) => {
        const subject = encodeURIComponent(`Application: ${job.title} (${job.id})`);
        const body = encodeURIComponent(
            `Hi Team,\n\nI’m applying for the role: ${job.title}.\n\nName:\nLocation:\nPortfolio/LinkedIn:\nYears of experience:\nWhy I’m a good fit (2-3 lines):\n\nThanks!`
        );
        return `mailto:${job.applyEmail}?subject=${subject}&body=${body}`;
    };

    const DeptTab = ({ label }: { label: "All" | Job["dept"] }) => (
        <button
            onClick={() => setDept(label)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${dept === label ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"
                }`}
        >
            {label}
        </button>
    );

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                {/* HERO */}
                <section className="relative bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">
                    <Navbar />

                    <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-32">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-black/70">
                            Careers
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold text-black">
                            Join the team
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm sm:text-base text-black/80">
                            We’re building premium websites & designs for real businesses. If you love quality work,
                            clean execution, and fast learning — this is for you.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <a
                                href="#open-roles"
                                className="rounded-xl bg-black text-white px-6 py-3 font-semibold text-center hover:opacity-90 transition"
                            >
                                View Open Roles
                            </a>
                            <a
                                href="/contact"
                                className="rounded-xl border border-black/25 bg-white/40 text-black px-6 py-3 font-semibold text-center hover:bg-white/55 transition"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
                </section>

                {/* WHY US */}
                <section className="bg-black">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="mb-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-semibold">Why work with us</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <p className="mt-2 text-sm text-white/60 max-w-2xl">
                                Small team, high output. You’ll get ownership, learning, and real portfolio-worthy work.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {perks.map((p, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                                >
                                    <p className="font-semibold">{p.title}</p>
                                    <p className="mt-2 text-sm text-white/70">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* OPEN ROLES */}
                <section id="open-roles" className="bg-black">
                    <div className="mx-auto max-w-7xl px-6 pb-6">
                        <div className="mb-8">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-semibold">Open roles</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <p className="mt-2 text-sm text-white/60 max-w-2xl">
                                Choose a department and apply with your best work.
                            </p>
                        </div>

                        {/* Department filter */}
                        <div className="mb-8 flex flex-wrap gap-3">
                            <DeptTab label="All" />
                            <DeptTab label="Design" />
                            <DeptTab label="Development" />
                            <DeptTab label="Marketing" />
                            <DeptTab label="Operations" />
                        </div>

                        <div className="space-y-4">
                            {filteredJobs.map((job) => {
                                const isOpen = openId === job.id;
                                return (
                                    <div
                                        key={job.id}
                                        className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenId(isOpen ? null : job.id)}
                                            className="w-full px-5 py-4 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition"
                                        >
                                            <div>
                                                <p className="text-lg font-semibold">{job.title}</p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <Badge>{job.dept}</Badge>
                                                    <Badge>{job.type}</Badge>
                                                    <Badge>{job.mode}</Badge>
                                                    <Badge>{job.location}</Badge>
                                                    <Badge>{job.experience}</Badge>
                                                    {job.salary && <Badge>{job.salary}</Badge>}
                                                </div>
                                            </div>

                                            <div className="mt-1 text-white/70">{isOpen ? "−" : "+"}</div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5">
                                                <p className="text-sm text-white/70">{job.desc}</p>

                                                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm font-semibold">Responsibilities</p>
                                                        <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc list-inside">
                                                            {job.responsibilities.map((r, i) => (
                                                                <li key={i}>{r}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">Requirements</p>
                                                        <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc list-inside">
                                                            {job.requirements.map((r, i) => (
                                                                <li key={i}>{r}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">Nice to have</p>
                                                        <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc list-inside">
                                                            {(job.niceToHave ?? ["Strong communication", "Good taste in design/code"]).map((r, i) => (
                                                                <li key={i}>{r}</li>
                                                            ))}
                                                        </ul>

                                                        <div className="mt-4 flex flex-col gap-3">
                                                            <a
                                                                href={`/apply?role=${encodeURIComponent(job.title)}&id=${encodeURIComponent(job.id)}`}
                                                                className="rounded-xl bg-white text-black px-5 py-3 font-semibold text-center hover:opacity-90 transition"
                                                            >
                                                                Apply Now
                                                            </a>

                                                            <a
                                                                href="/contact"
                                                                className="rounded-xl border border-white/15 bg-transparent px-5 py-3 font-semibold text-center hover:bg-white/10 transition"
                                                            >
                                                                Ask a question
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {filteredJobs.length === 0 && (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
                                    No roles in this department right now.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section className="bg-black">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="mb-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-semibold">Hiring process</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <p className="mt-2 text-sm text-white/60 max-w-2xl">
                                Simple and fast. We keep it respectful and transparent.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {steps.map((s, i) => (
                                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                                        Step {i + 1}
                                    </p>
                                    <p className="mt-2 font-semibold">{s.title}</p>
                                    <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-black">
                    <div className="mx-auto max-w-7xl px-6 pb-24">
                        <div className="mb-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-semibold">FAQ</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {faqs.map((f, i) => (
                                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <p className="font-semibold">{f.q}</p>
                                    <p className="mt-2 text-sm text-white/70">{f.a}</p>
                                </div>
                            ))}

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xl font-semibold">Didn’t find your role?</p>
                                        <p className="mt-2 text-sm text-white/70">
                                            Send your portfolio anyway. If we see a fit, we’ll reach out.
                                        </p>
                                    </div>
                                    <a
                                        href={`mailto:adityagaonkar@adityaenterprisesin.com?subject=${encodeURIComponent("General Application")}`}
                                        className="rounded-xl bg-white text-black px-6 py-3 font-semibold text-center hover:opacity-90 transition"
                                    >
                                        Send Portfolio
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Collaborate />
        </>
    );
};

export default Careers;
