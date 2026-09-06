"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const possibilities = [
  {
    icon: "🎓",
    title: "Student",
    description:
      "Turn complex material into clear, memorable learning resources.",
    output: "→ Study Notes + Quiz",
  },
  {
    icon: "💼",
    title: "Professional",
    description:
      "Convert lengthy reports into concise, decision-ready information.",
    output: "→ Executive Brief",
  },
  {
    icon: "🏛️",
    title: "Department Head",
    description:
      "Transform complex information into clear briefings and decision-ready communication.",
    output: "→ Executive Summary",
  },
  {
    icon: "🌏",
    title: "Public Communication",
    description:
      "Adapt information for citizens, local communities and general audiences.",
    output: "→ Public Advisory",
  },
];

const fieldOptions = {
  "Target Audience": [
    "School Student",
    "College Student",
    "Professional",
    "Department Head",
    "General Public",
    "Security Organisation",
    "Local Organisation",
    "Government Official",
    "Researcher",
    "Media / Journalist",
    "Creator",
    "Teacher / Educator",
    "Policy Maker",
    "NGO / Civil Society",
  ],

  "Communication Objective": [
    "Educate",
    "Briefing",
    "Awareness",
    "Reporting",
    "Public Communication",
    "Persuasion",
    "Instruction",
    "Information Sharing",
    "Policy Communication",
    "Decision Support",
    "Announcement",
    "Emergency Communication",
  ],

  Tone: [
    "Formal",
    "Professional",
    "Simple",
    "Technical",
    "Friendly",
    "Authoritative",
    "Neutral",
    "Persuasive",
    "Urgent",
    "Informative",
    "Conversational",
  ],

  Language: [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Odia",
    "Assamese",
    "Urdu",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Nepali",
    "Sanskrit",
    "Sindhi",
    "French",
    "German",
    "Spanish",
    "Arabic",
    "Chinese",
    "Japanese",
  ],

  "Level of Detail": [
    "Concise",
    "Moderate",
    "Detailed",
    "Comprehensive",
  ],

  "Content Style": [
    "Informative",
    "Educational",
    "Executive",
    "Public Information",
    "Technical",
    "Policy",
    "News / Media",
    "Conversational",
    "Instructional",
    "Analytical",
  ],

  "Output Type": [
    "Executive Summary",
    "Press Release",
    "Advisory",
    "Social Media Post",
    "Presentation",
    "Study Notes",
    "Briefing Note",
    "Report",
    "Email",
    "Speech",
    "Public Notice",
    "FAQ",
    "Infographic Content",
    "Policy Summary",
    "Meeting Minutes",
    "Newsletter",
    "Article",
  ],
};

const initialParameters = {
  "Target Audience": "General Public",
  "Communication Objective": "Public Communication",
  Tone: "Professional",
  Language: "English",
  "Level of Detail": "Concise",
  "Content Style": "Informative",
  "Output Type": "Executive Summary",
};

type ParameterName = keyof typeof fieldOptions;

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedTheme = localStorage.getItem("transforma-theme");

  const isDark = savedTheme === "dark";

  setDarkMode(isDark);

  document.documentElement.classList.toggle("dark", isDark);
}, []);

const toggleTheme = () => {
  setDarkMode((current) => {
    const next = !current;

    localStorage.setItem(
      "transforma-theme",
      next ? "dark" : "light"
    );

    document.documentElement.classList.toggle("dark", next);

    return next;
  });
};



  const [selected, setSelected] =
    useState<Record<ParameterName, string>>(initialParameters);

  const updateParameter = (name: ParameterName, value: string) => {
    setSelected((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const theme = darkMode
    ? {
        page: "bg-[#0b0d14] text-slate-100",
        nav: "border-slate-800/80 bg-[#10131d]/85",
        card: "border-slate-800 bg-[#121621]",
        soft: "bg-[#171b27]",
        input: "border-slate-700 bg-[#171b27] text-slate-200",
        muted: "text-slate-400",
        border: "border-slate-800",
        heading: "text-white",
        preview: "bg-[#111520]",
        footer: "bg-[#0d1018]",
      }
    : {
        page: "bg-[#f7f8fc] text-[#15182b]",
        nav: "border-slate-200/70 bg-white/75",
        card: "border-slate-200 bg-white",
        soft: "bg-slate-50",
        input: "border-slate-200 bg-slate-50 text-slate-700",
        muted: "text-slate-500",
        border: "border-slate-200",
        heading: "text-[#15182b]",
        preview: "bg-white",
        footer: "bg-white",
      };

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${theme.page}`}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className={`absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full blur-[130px] ${
            darkMode ? "bg-violet-700/20" : "bg-violet-300/30"
          }`}
        />

        <div
          className={`absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full blur-[130px] ${
            darkMode ? "bg-cyan-700/15" : "bg-cyan-200/30"
          }`}
        />

        <div
          className={`absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full blur-[130px] ${
            darkMode ? "bg-purple-700/15" : "bg-purple-200/20"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            darkMode ? "opacity-20" : "opacity-40"
          }`}
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)"
              : "linear-gradient(rgba(80,70,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(80,70,150,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${theme.nav}`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-extrabold tracking-tight"
          >
            <div className="grid h-9 w-9 place-items-center rounded-[11px] bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-violet-300/40">
              ✦
            </div>

            TransForma <span className="text-violet-600">AI</span>
          </Link>

          <div
            className={`hidden items-center gap-8 text-sm md:flex ${theme.muted}`}
          >
            <a
              href="/transform"
              className="transition hover:text-violet-600"
            >
              Transform
            </a>

            <a
              href="#possibilities"
              className="transition hover:text-violet-600"
            >
              Possibilities
            </a>

            <a href="#how" className="transition hover:text-violet-600">
              How It Works
            </a>

            <a
              href="#features"
              className="transition hover:text-violet-600"
            >
              Features
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme} 
              aria-label="Toggle dark mode"
              className={`relative flex h-10 w-[72px] items-center rounded-full border p-1 transition ${
                darkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              <span
                className={`absolute grid h-8 w-8 place-items-center rounded-full shadow-sm transition-all duration-300 ${
                  darkMode
                    ? "translate-x-7 bg-slate-700"
                    : "translate-x-0 bg-white"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </span>

              <span className="ml-auto mr-1 text-[9px] font-bold text-slate-400">
                {darkMode ? "DARK" : "LIGHT"}
              </span>
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <button
                className={`px-4 py-2 text-sm font-medium transition hover:text-violet-600 ${theme.muted}`}
              >
                Log in
              </button> 
            </div>

            <button
              className={`text-2xl sm:hidden ${theme.muted}`}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[850px] items-center pb-20 pt-36">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-16 px-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="z-10 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
              AI-Powered Content Transformation
            </div>

            <h1
              className={`text-5xl font-extrabold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-[78px] ${theme.heading}`}
            >
              Transform Content.
              <span className="block bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                Amplify Impact.
              </span>
            </h1>

            <p
              className={`mx-auto mt-7 max-w-[590px] text-lg leading-8 lg:mx-0 ${theme.muted}`}
            >
              One piece of content. Tailored for every audience, purpose,
              tone, language, style and format — powered by intelligent AI
              transformation.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#transform"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1"
              >
                ✦ Start Transforming
              </a>

              <a
                href="#how"
                className={`rounded-xl border px-6 py-4 text-sm font-semibold shadow-sm transition hover:border-violet-200 hover:bg-violet-50 ${theme.card}`}
              >
                See How It Works →
              </a>
            </div>

            <div
              className={`mt-9 flex items-center justify-center gap-4 text-xs lg:justify-start ${theme.muted}`}
            >
              <div className="flex">
                {["A", "R", "S", "K"].map((letter, index) => (
                  <div
                    key={letter}
                    className={`-ml-2 grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white first:ml-0 ${
                      [
                        "bg-violet-500",
                        "bg-cyan-500",
                        "bg-pink-500",
                        "bg-orange-400",
                      ][index]
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <span>Built for students, professionals, organisations & public communication</span>
            </div>
          </div>

          {/* Hero Preview */}
          <div className="relative flex min-h-[540px] items-center justify-center">
            <div className="absolute h-[430px] w-[430px] rounded-full bg-violet-300/30 blur-3xl" />

            <div
              className={`relative w-full max-w-[510px] rotate-1 rounded-[23px] border p-5 shadow-2xl backdrop-blur-xl ${theme.card}`}
            >
              <div
                className={`mb-5 flex items-center justify-between border-b pb-4 ${theme.border}`}
              >
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-300" />
                  <span className="h-2 w-2 rounded-full bg-yellow-300" />
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                </div>

                <span className={`text-[10px] uppercase tracking-widest ${theme.muted}`}>
                  Transformation Workspace
                </span>
              </div>

              <div
                className={`mb-3 rounded-2xl border p-4 ${theme.border} ${theme.soft}`}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Source Content
                </p>

                <p className={`text-sm font-bold ${theme.heading}`}>
                  Introduction to Artificial Intelligence
                </p>

                <p className={`mt-1 text-[11px] leading-5 ${theme.muted}`}>
                  Artificial Intelligence is transforming the way humans
                  interact with technology...
                </p>
              </div>

              <div className="my-3 flex items-center gap-3 text-[11px] font-bold text-violet-500">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-200" />
                ✦ AI TRANSFORMATION
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-200" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(selected) as ParameterName[])
                  .slice(0, 6)
                  .map((name) => (
                    <div
                      key={name}
                      className={`rounded-xl border p-3 ${theme.border} ${theme.soft}`}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {name}
                      </p>

                      <p className={`mt-1 text-[11px] font-semibold ${theme.heading}`}>
                        {selected[name]}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="mt-3 rounded-xl border border-cyan-100 bg-gradient-to-br from-violet-50 to-cyan-50 p-4">
                <div className="mb-2 flex justify-between text-[11px] font-bold text-slate-700">
                  <span>Generated Output</span>
                  <span className="text-cyan-600">
                    {selected["Output Type"]}
                  </span>
                </div>

                <p className="text-[11px] leading-5 text-slate-500">
                  Content transformed for a{" "}
                  <strong>{selected["Target Audience"].toLowerCase()}</strong>{" "}
                  using a{" "}
                  <strong>{selected.Tone.toLowerCase()}</strong> tone,
                  optimized for{" "}
                  <strong>{selected["Communication Objective"].toLowerCase()}</strong>{" "}
                  in <strong>{selected.Language}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform */}
      <section
        id="transform"
        className={`border-y py-28 ${theme.border} ${
          darkMode ? "bg-[#0e1119]" : "bg-white/50"
        }`}
      >
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mb-14 max-w-[800px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Your Transformation
            </div>

            <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${theme.heading}`}>
              Transform it{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                your way.
              </span>
            </h2>

            <p className={`mt-5 text-base leading-7 ${theme.muted}`}>
              Define exactly who you are communicating with, why you are
              communicating, how the message should sound, which language to
              use and the format you need.
            </p>
          </div>

          <div
            className={`grid overflow-hidden rounded-[26px] border shadow-xl lg:grid-cols-[0.95fr_1.05fr] ${theme.card} ${theme.border}`}
          >
            {/* Builder */}
            <div className={`border-b p-7 lg:border-b-0 lg:border-r ${theme.border}`}>
              <h3 className={`text-lg font-bold ${theme.heading}`}>
                Create your transformation profile
              </h3>

              <p className={`mt-1 text-sm ${theme.muted}`}>
                Customize every aspect of your output.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {(Object.keys(fieldOptions) as ParameterName[]).map((name) => (
                  <div
                    key={name}
                    className={name === "Output Type" ? "sm:col-span-2" : ""}
                  >
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {name}
                    </label>

                    <select
                      value={selected[name]}
                      onChange={(event) =>
                        updateParameter(name, event.target.value)
                      }
                      className={`w-full appearance-none rounded-xl border px-3 py-3 text-xs font-medium outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 ${theme.input}`}
                    >
                      {fieldOptions[name].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem(
                    "transforma-settings",
                    JSON.stringify(selected)
                    );

                    window.location.href = "/transform";
                  }}
                  className="mt-6 block w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-4 text-center text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
                >
                 ✦ Continue to Transformation
              </button>

            </div>

            {/* Preview */}
            <div className="bg-gradient-to-br from-violet-50/70 to-cyan-50/40 p-7 dark:from-violet-950/20 dark:to-cyan-950/10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Live Transformation Preview
                </span>

                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  AI READY
                </span>
              </div>

              <div
                className={`min-h-[365px] rounded-2xl border p-6 shadow-sm ${theme.preview} ${theme.border}`}
              >
                <div className={`flex items-center justify-between border-b pb-4 ${theme.border}`}>
                  <h3 className={`text-base font-bold ${theme.heading}`}>
                    Your transformed content
                  </h3>

                  <span className="rounded-md bg-violet-50 px-2 py-1 text-[9px] font-bold text-violet-600">
                    {selected["Output Type"]}
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className={`text-sm font-bold ${theme.heading}`}>
                    AI-Powered {selected["Output Type"]}
                  </h4>

                  <p className={`mt-3 text-xs leading-7 ${theme.muted}`}>
                    This content is being prepared for{" "}
                    <strong>{selected["Target Audience"]}</strong> with the
                    objective of{" "}
                    <strong>{selected["Communication Objective"].toLowerCase()}</strong>.
                    The message will use a{" "}
                    <strong>{selected.Tone.toLowerCase()}</strong> tone,
                    written in <strong>{selected.Language}</strong>, with a{" "}
                    <strong>{selected["Level of Detail"].toLowerCase()}</strong>{" "}
                    level of detail.
                  </p>

                  <div className="mt-5 grid gap-3">
                    {[
                      `Audience adapted for ${selected["Target Audience"]}.`,
                      `Communication optimized for ${selected["Communication Objective"]}.`,
                      `${selected.Tone} tone and ${selected.Language} language applied.`,
                      `${selected["Level of Detail"]} level of detail selected.`,
                      `Structured as a ${selected["Output Type"]}.`,
                    ].map((text) => (
                      <div
                        key={text}
                        className={`flex gap-2 text-[11px] ${theme.muted}`}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Possibilities */}
      <section id="possibilities" className="py-28">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mb-14 max-w-[800px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              One Source. Many Possibilities.
            </div>

            <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${theme.heading}`}>
              Same content.{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                Completely different impact.
              </span>
            </h2>

            <p className={`mt-5 text-base ${theme.muted}`}>
              Adapt one source into exactly what your audience needs — without
              starting from scratch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {possibilities.map((item) => (
              <div
                key={item.title}
                className={`group min-h-[260px] rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100 ${theme.card} ${theme.border}`}
              >
                <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-violet-100 bg-violet-50 text-xl">
                  {item.icon}
                </div>

                <h3 className={`text-base font-bold ${theme.heading}`}>
                  {item.title}
                </h3>

                <p className={`mt-2 text-xs leading-6 ${theme.muted}`}>
                  {item.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4 text-[10px] font-bold text-violet-600">
                  {item.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className={`mx-auto grid max-w-[1180px] grid-cols-1 border-y sm:grid-cols-2 lg:grid-cols-4 ${theme.border}`}>
          {[
            ["🎯 Audience-Aware", "Content adapts to who will read it."],
            ["🌐 Multilingual", "Indian and international language support."],
            ["✦ AI-Powered", "Intelligent transformation, not simple rewriting."],
            ["⚡ Multi-Format", "Create briefs, reports, advisories, posts and more."],
          ].map(([title, description]) => (
            <div
              key={title}
              className={`border-b px-6 py-8 last:border-0 sm:[&:nth-child(even)]:border-l lg:border-b-0 lg:border-r lg:[&:nth-child(even)]:border-l-0 lg:last:border-r-0 ${theme.border}`}
            >
              <strong className={`block text-sm font-bold ${theme.heading}`}>
                {title}
              </strong>

              <span className={`mt-1 block text-[11px] ${theme.muted}`}>
                {description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-28">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mb-14 max-w-[700px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Simple Workflow
            </div>

            <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${theme.heading}`}>
              From source to{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                impact.
              </span>
            </h2>

            <p className={`mt-5 text-base ${theme.muted}`}>
              Three simple steps. Endless possibilities.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              [
                "01",
                "Upload",
                "Add your document, text or source content to TransForma AI.",
              ],
              [
                "02",
                "Customize",
                "Select your audience, objective, tone, language, detail, style and output.",
              ],
              [
                "03",
                "Transform",
                "Let AI generate content designed specifically for your chosen communication goal.",
              ],
            ].map(([number, title, description]) => (
              <div key={number} className="text-center">
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-violet-200 bg-white font-extrabold text-violet-600 shadow-lg shadow-violet-100">
                  {number}
                </div>

                <h3 className={`text-lg font-bold ${theme.heading}`}>
                  {title}
                </h3>

                <p className={`mx-auto mt-2 max-w-[280px] text-xs leading-6 ${theme.muted}`}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className={`border-t ${theme.border} ${theme.footer}`}>
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-5 py-8 text-[11px] sm:flex-row">
          <div className={`font-bold ${theme.heading}`}>✦ TransForma AI</div>

          <div className={theme.muted}>
            AI-Powered Content Transformation Platform
          </div>

          <div className={`flex gap-5 ${theme.muted}`}>
            <a href="#" className="hover:text-violet-600">
              Privacy
            </a>
            <a href="#" className="hover:text-violet-600">
              Terms
            </a>
            <a href="#" className="hover:text-violet-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
