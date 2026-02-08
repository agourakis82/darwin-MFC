'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { fadeInUp, listContainer } from '@/lib/design-system/animations/presets';
import { ScrollReveal } from '@/lib/design-system/animations/scroll';
import {
  ArrowRight,
  BookOpen,
  Pill,
  FileText,
  Calculator,
  Stethoscope,
  Shield,
  Brain,
  Sparkles,
  CheckCircle2,
  Users,
  Award,
  Zap,
  Heart,
  Baby,
  Activity,
  GraduationCap
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DarwinLogo } from '@/app/components/Brand';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';
import { PageContainer, ContentContainer, SectionContainer } from '@/app/components/Layout/Containers';

// Dynamic statistics
const stats = {
  doencas: doencasConsolidadas.length,
  medicamentos: medicamentosConsolidados.length,
  protocolos: todosProtocolosFlowchart.length,
};

// Animation variants imported from design system (fadeInUp, listContainer)

export default function HomeContent() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-phosphate dark:bg-carbon-900">
      {/* ============================================ */}
      {/* HERO SECTION - Clinical Premium             */}
      {/* ============================================ */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 gradient-darwin-mesh" />
        <div className="absolute inset-0 bg-helix-pattern opacity-30 dark:opacity-20" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-adenine-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-guanine-green/15 rounded-full blur-3xl" />
        
        <div className="relative">
          <ContentContainer className="py-20 lg:py-32">
            {/* Badge */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-adenine-teal/10 dark:bg-adenine-teal/20 border border-adenine-teal/20 dark:border-adenine-teal/30">
                <Sparkles className="w-4 h-4 text-adenine-teal dark:text-cytosine-cyan" />
                <span className="text-sm font-medium text-adenine-teal dark:text-cytosine-cyan">
                  Clinical Intelligence, Evolved
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight text-helix-navy dark:text-white mb-6">
                <span className="block">Your Clinical</span>
                <span className="block bg-gradient-to-r from-adenine-teal via-guanine-green to-cytosine-cyan bg-clip-text text-transparent">
                  Command Center
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-carbon-600 dark:text-carbon-300 max-w-2xl mx-auto font-body leading-relaxed">
                Evidence-based protocols, intelligent drug references, and clinical calculators —
                all in one premium platform built for Family Medicine.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/doencas"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-helix-navy to-adenine-teal text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore the Evidence
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-adenine-teal to-guanine-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/medicamentos"
                className="btn-darwin-secondary"
              >
                View Medications
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 text-sm text-carbon-500 dark:text-carbon-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-guanine-green" />
                <span>Q1 Journal Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-guanine-green" />
                <span>RENAME Indexed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-guanine-green" />
                <span>CIAP-2 / CID-10 Coded</span>
              </div>
            </motion.div>
          </ContentContainer>
        </div>

        {/* Curved section divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 lg:h-20">
            <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" className="fill-phosphate dark:fill-carbon-900" />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BENTO GRID                            */}
      {/* ============================================ */}
      <section>
        <PageContainer className="py-16 lg:py-24">
        <motion.div 
          className="bento-grid"
          variants={listContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Diseases Card - 1x1 */}
          <motion.div 
            className="bento-item-1x1 card-darwin p-6 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 rounded-xl bg-adenine-teal/10 dark:bg-adenine-teal/20 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-adenine-teal" />
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-helix-navy dark:text-white">{stats.doencas}+</div>
              <div className="text-sm text-carbon-500 dark:text-carbon-400 font-ui">Conditions Covered</div>
            </div>
          </motion.div>

          {/* Medications Card - 1x1 */}
          <motion.div 
            className="bento-item-1x1 card-darwin p-6 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 rounded-xl bg-guanine-green/10 dark:bg-guanine-green/20 flex items-center justify-center mb-4">
              <Pill className="w-6 h-6 text-guanine-green" />
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-helix-navy dark:text-white">{stats.medicamentos}+</div>
              <div className="text-sm text-carbon-500 dark:text-carbon-400 font-ui">Medications Indexed</div>
            </div>
          </motion.div>

          {/* Featured Card - 2x1 */}
          <motion.div 
            className="bento-item-2x1 card-darwin p-6 bg-gradient-to-br from-helix-navy to-adenine-teal text-white relative overflow-hidden"
            variants={fadeInUp}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-cytosine-cyan" />
                <span className="text-sm font-medium text-cytosine-cyan uppercase tracking-wide">AI-Enhanced</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Clinical Intelligence</h3>
              <p className="text-white/80 text-sm font-body">
                Smart recommendations, differential diagnosis assistant, and drug interaction checker powered by evidence.
              </p>
            </div>
          </motion.div>

          {/* Protocols Card - 1x1 */}
          <motion.div 
            className="bento-item-1x1 card-darwin p-6 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 rounded-xl bg-cytosine-cyan/10 dark:bg-cytosine-cyan/20 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-cytosine-cyan" />
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-helix-navy dark:text-white">{stats.protocolos}+</div>
              <div className="text-sm text-carbon-500 dark:text-carbon-400 font-ui">Clinical Protocols</div>
            </div>
          </motion.div>

          {/* Learning Card - 2x1 */}
          <motion.div 
            className="bento-item-2x1 card-darwin p-6"
            variants={fadeInUp}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-thymine-gold/10 dark:bg-thymine-gold/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-thymine-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-helix-navy dark:text-white mb-1">
                  Gamified Learning
                </h3>
                <p className="text-sm text-carbon-500 dark:text-carbon-400 font-body mb-3">
                  Spaced repetition, flashcards, and XP-based progression to master clinical knowledge.
                </p>
                <Link 
                  href="/learn"
                  className="inline-flex items-center gap-1 text-sm font-medium text-adenine-teal dark:text-cytosine-cyan hover:underline"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Calculators Card - 1x1 */}
          <motion.div 
            className="bento-item-1x1 card-darwin p-6 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <div className="text-lg font-display font-semibold text-helix-navy dark:text-white">Calculators</div>
              <div className="text-sm text-carbon-500 dark:text-carbon-400 font-ui">Clinical scoring tools</div>
            </div>
          </motion.div>

          {/* Quick Access - 1x1 */}
          <motion.div 
            className="bento-item-1x1 card-darwin p-6 flex flex-col justify-between"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 rounded-xl bg-critical-red-500/10 dark:bg-critical-red-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-critical-red-500" />
            </div>
            <div>
              <div className="text-lg font-display font-semibold text-helix-navy dark:text-white">Quick Consult</div>
              <div className="text-sm text-carbon-500 dark:text-carbon-400 font-ui">Point-of-care reference</div>
            </div>
          </motion.div>
        </motion.div>
        </PageContainer>
      </section>

      {/* ============================================ */}
      {/* QUICK ACCESS SECTION                        */}
      {/* ============================================ */}
      <section>
        <PageContainer className="py-16">
        <ScrollReveal animation="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-helix-navy dark:text-white mb-4">
            Clinical Tools at Your Fingertips
          </h2>
          <p className="text-carbon-500 dark:text-carbon-400 font-body max-w-2xl mx-auto">
            Everything you need for evidence-based practice, organized for rapid access during consultations.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={listContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { icon: Stethoscope, title: 'Quick Consultation', desc: 'Rapid clinical reference', href: '/consulta-rapida', color: 'adenine-teal' },
            { icon: Shield, title: 'Drug Interactions', desc: 'Safety checker', href: '/medicamentos/interacoes', color: 'critical-red-500' },
            { icon: FileText, title: 'Protocols', desc: 'Flowchart guidelines', href: '/protocolos', color: 'guanine-green' },
            { icon: Calculator, title: 'Calculators', desc: 'Clinical scoring', href: '/calculadoras', color: 'cytosine-cyan' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link
                href={item.href}
                className="group block card-darwin p-6 h-full"
              >
                <item.icon className={`w-8 h-8 text-${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-display font-semibold text-helix-navy dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-carbon-500 dark:text-carbon-400 font-body">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        </PageContainer>
      </section>

      {/* ============================================ */}
      {/* SCREENING CATEGORIES                        */}
      {/* ============================================ */}
      <section>
        <PageContainer className="py-16">
        <ScrollReveal animation="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-helix-navy dark:text-white mb-4">
            SUS Screening Programs
          </h2>
          <p className="text-carbon-500 dark:text-carbon-400 font-body max-w-2xl mx-auto">
            Complete coverage of Brazilian public health screening protocols, organized by life stage.
          </p>
        </ScrollReveal>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
          variants={listContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { icon: Baby, title: 'Neonatal', href: '/neonatal', gradient: 'from-amber-400 to-orange-500' },
            { icon: Users, title: 'Children', href: '/infantil', gradient: 'from-green-400 to-emerald-500' },
            { icon: Activity, title: 'Adults', href: '/adultos', gradient: 'from-blue-400 to-cyan-500' },
            { icon: Heart, title: 'Cancer', href: '/cancer', gradient: 'from-purple-400 to-pink-500' },
            { icon: Heart, title: 'Pregnancy', href: '/gestacao', gradient: 'from-pink-400 to-rose-500' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link
                href={item.href}
                className="group flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-carbon-800/50 border border-carbon-200 dark:border-carbon-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-helix-navy dark:text-white">{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        </PageContainer>
      </section>

      {/* ============================================ */}
      {/* TRUST SECTION                               */}
      {/* ============================================ */}
      <section>
        <PageContainer className="py-16 lg:py-24">
        <motion.div 
          className="card-darwin p-8 lg:p-12 bg-gradient-to-br from-helix-navy via-helix-navy to-adenine-teal text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-adenine-teal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-guanine-green/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Award className="w-12 h-12 text-cytosine-cyan" />
            </div>
            <h2 className="text-2xl lg:text-4xl font-display font-bold mb-4">
              Built for Healthcare Professionals
            </h2>
            <p className="text-lg text-white/80 font-body max-w-2xl mx-auto mb-8">
              DARWIN MEDICAL HUB combines rigorous evidence-based medicine with beautiful, intuitive design — 
              because clinical tools should be as precise as the care you provide.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-guanine-green" />
                <span>Evidence-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-guanine-green" />
                <span>Continuously Updated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-guanine-green" />
                <span>Offline Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-guanine-green" />
                <span>WCAG 2.2 AAA</span>
              </div>
            </div>
          </div>
        </motion.div>
        </PageContainer>
      </section>
    </div>
  );
}
