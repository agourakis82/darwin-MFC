"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, FileText, HelpCircle, Download, Maximize, 
  ChevronRight, Play, Pause, RotateCcw 
} from "lucide-react";
import {
  HeroSection,
  ConceptSection,
  LifeCycleSection,
  DCNTSection,
  CancerSection,
  InfectiousSection,
  PregnancySection,
  MentalHealthSection,
  CaseSection,
  SummarySection,
} from "@/components/sections";
import { QuizModal } from "@/components/quiz";
import { PresenterNotes } from "@/components/presenter-notes";

type Mode = "sus" | "soc" | "combined";

const SECTIONS = [
  { id: "hero", label: "Início", timeEstimate: "0-5 min" },
  { id: "concepts", label: "Conceitos", timeEstimate: "5-12 min" },
  { id: "lifecycle", label: "Ciclo de vida", timeEstimate: "12-20 min" },
  { id: "dcnt", label: "DCNT", timeEstimate: "20-25 min" },
  { id: "cancer", label: "Câncer", timeEstimate: "25-30 min" },
  { id: "infectious", label: "Infecções & IST", timeEstimate: "30-33 min" },
  { id: "pregnancy", label: "Gestação", timeEstimate: "33-35 min" },
  { id: "mental", label: "Saúde mental", timeEstimate: "35-37 min" },
  { id: "case", label: "Caso clínico", timeEstimate: "37-39 min" },
  { id: "summary", label: "Resumo & Quiz", timeEstimate: "39-40 min" },
];

const TOTAL_CLASS_TIME = 40 * 60; // 40 minutes in seconds

export default function RastreamentoSUSPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [showNotes, setShowNotes] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(TOTAL_CLASS_TIME);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Update active section based on scroll
      const sections = SECTIONS.map((s) => s.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
        if (currentIndex < SECTIONS.length - 1) {
          const nextSection = SECTIONS[currentIndex + 1].id;
          document.getElementById(nextSection)?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
        if (currentIndex > 0) {
          const prevSection = SECTIONS[currentIndex - 1].id;
          document.getElementById(prevSection)?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        setShowQuiz(true);
      } else if (e.key === "t" || e.key === "T") {
        setTimerRunning((prev) => !prev);
      } else if (e.key === "n" || e.key === "N") {
        setShowNotes((prev) => !prev);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeSection]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-emerald-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      {/* Presenter Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50 print:hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition"
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timerSeconds)}</span>
            </button>
            <button
              onClick={() => setTimerSeconds(TOTAL_CLASS_TIME)}
              className="p-1.5 rounded-lg hover:bg-neutral-100 transition"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${
                showNotes ? "bg-blue-600 text-white" : "bg-neutral-100 hover:bg-neutral-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Notas</span>
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-sm transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Quiz</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-sm transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-neutral-100 transition"
              title="Fullscreen (F)"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Header with Progress */}
      <header className="fixed top-14 left-0 right-0 z-40 glass border-b border-neutral-200/50 print:static print:bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-xs font-semibold">
              3
            </span>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">
                Grupo 3 – Rastreamentos orientados pelo SUS
              </h1>
              <p className="text-xs text-neutral-500">
                SUS x Sociedades médicas • Aula interativa padrão Q1
              </p>
            </div>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Scroll para navegar pela aula
          </span>
        </div>
        <div className="h-1 bg-neutral-200/50">
          <div
            className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 transition-all shadow-lg"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      <main className="pt-32 print:pt-0 max-w-6xl mx-auto flex">
        {/* Side Navigation */}
        <nav className="hidden lg:block w-56 pr-6 py-8 sticky top-32 h-[calc(100vh-8rem)] print:hidden">
          <ul className="space-y-1 text-sm">
            {SECTIONS.map((sec, idx) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    activeSection === sec.id
                      ? "bg-neutral-900 dark:bg-neutral-700 text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      activeSection === sec.id ? "bg-white" : "bg-neutral-300"
                    }`} />
                    {sec.label}
                  </span>
                  <span className="text-xs opacity-60">{sec.timeEstimate.split(" ")[0]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div ref={contentRef} className="flex-1 px-4 lg:px-0 pb-20">
          <HeroSection />
          <ConceptSection />
          <LifeCycleSection />
          <DCNTSection />
          <CancerSection />
          <InfectiousSection />
          <PregnancySection />
          <MentalHealthSection />
          <CaseSection />
          <SummarySection />
        </div>
      </main>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>

      {/* Presenter Notes Panel */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-28 bottom-0 w-80 bg-white border-l border-neutral-200 shadow-2xl z-40 overflow-y-auto print:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Notas do Apresentador</h3>
                <button
                  onClick={() => setShowNotes(false)}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  ✕
                </button>
              </div>
              <PresenterNotes section={activeSection} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}