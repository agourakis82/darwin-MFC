'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import { Search, Pill, FileText, Calculator, Stethoscope, ChevronRight, X, Heart, Activity, Syringe, Shield, Clock, ArrowLeft, Home } from 'lucide-react';
import { todosMedicamentos, searchMedicamentos } from '@/lib/data/medicamentos/index';
import { todasDoencas, searchDoencas } from '@/lib/data/doencas/index';
import { Medicamento } from '@/lib/types/medicamento';
import { Doenca } from '@/lib/types/doenca';

type TabType = 'inicio' | 'medicamentos' | 'doencas' | 'calculadoras' | 'favoritos';

interface QuickDose {
  id: string;
  nome: string;
  indicacao: string;
  dose: string;
  via: string;
  frequencia: string;
  observacao?: string;
}

// Doses rápidas mais usadas na APS
const dosesRapidas: QuickDose[] = [
  { id: '1', nome: 'Amoxicilina', indicacao: 'IVAS / Otite', dose: '500mg', via: 'VO', frequencia: '8/8h por 7-10 dias' },
  { id: '2', nome: 'Amoxicilina', indicacao: 'Pneumonia', dose: '1g', via: 'VO', frequencia: '8/8h por 7 dias' },
  { id: '3', nome: 'Azitromicina', indicacao: 'IVAS / PAC atípica', dose: '500mg', via: 'VO', frequencia: '1x/dia por 3-5 dias' },
  { id: '4', nome: 'Cefalexina', indicacao: 'Celulite / ITU', dose: '500mg', via: 'VO', frequencia: '6/6h por 7-10 dias' },
  { id: '5', nome: 'SMZ+TMP', indicacao: 'ITU não complicada', dose: '800/160mg', via: 'VO', frequencia: '12/12h por 3 dias (mulheres)' },
  { id: '6', nome: 'Ciprofloxacino', indicacao: 'ITU complicada', dose: '500mg', via: 'VO', frequencia: '12/12h por 7 dias' },
  { id: '7', nome: 'Ibuprofeno', indicacao: 'Dor / Febre', dose: '400-600mg', via: 'VO', frequencia: '8/8h (máx 2400mg/dia)' },
  { id: '8', nome: 'Dipirona', indicacao: 'Dor / Febre', dose: '500-1000mg', via: 'VO', frequencia: '6/6h (máx 4g/dia)' },
  { id: '9', nome: 'Paracetamol', indicacao: 'Dor / Febre', dose: '500-1000mg', via: 'VO', frequencia: '6/6h (máx 4g/dia)' },
  { id: '10', nome: 'Omeprazol', indicacao: 'DRGE / Gastrite', dose: '20-40mg', via: 'VO', frequencia: '1x/dia (jejum)' },
  { id: '11', nome: 'Metformina', indicacao: 'DM2', dose: '500-850mg', via: 'VO', frequencia: '2-3x/dia com refeições' },
  { id: '12', nome: 'Losartana', indicacao: 'HAS', dose: '50-100mg', via: 'VO', frequencia: '1x/dia' },
  { id: '13', nome: 'Anlodipino', indicacao: 'HAS', dose: '5-10mg', via: 'VO', frequencia: '1x/dia' },
  { id: '14', nome: 'Enalapril', indicacao: 'HAS / IC', dose: '5-20mg', via: 'VO', frequencia: '1-2x/dia' },
  { id: '15', nome: 'Sinvastatina', indicacao: 'Dislipidemia', dose: '20-40mg', via: 'VO', frequencia: '1x/dia à noite' },
  { id: '16', nome: 'AAS', indicacao: 'Prev. CV secundária', dose: '100mg', via: 'VO', frequencia: '1x/dia' },
  { id: '17', nome: 'Prednisona', indicacao: 'Anti-inflamatório', dose: '20-60mg', via: 'VO', frequencia: '1x/dia (manhã), desmame' },
  { id: '18', nome: 'Salbutamol', indicacao: 'Broncoespasmo', dose: '100mcg/jato', via: 'Inalatório', frequencia: '2-4 jatos 4-6h SOS' },
  { id: '19', nome: 'Fluoxetina', indicacao: 'Depressão', dose: '20mg', via: 'VO', frequencia: '1x/dia (manhã)' },
  { id: '20', nome: 'Sertralina', indicacao: 'Depressão / Ansiedade', dose: '50-100mg', via: 'VO', frequencia: '1x/dia' },
];

// Calculadoras rápidas
const calculadorasRapidas = [
  { id: 'imc', nome: 'IMC', icon: '⚖️', path: '/calculadoras' },
  { id: 'ckdepi', nome: 'TFG (CKD-EPI)', icon: '🫘', path: '/calculadoras' },
  { id: 'risco-cv', nome: 'Risco CV', icon: '❤️', path: '/calculadoras' },
  { id: 'wells', nome: 'Wells (TEP/TVP)', icon: '🩸', path: '/calculadoras' },
  { id: 'framingham', nome: 'Framingham', icon: '📊', path: '/calculadoras' },
  { id: 'gestacao', nome: 'Idade Gestacional', icon: '🤰', path: '/calculadoras' },
];

export default function ConsultaRapidaClient() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
  const [selectedDoenca, setSelectedDoenca] = useState<Doenca | null>(null);
  const [doseFilter, setDoseFilter] = useState('');

  // Busca global
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return { meds: [], doencas: [] };
    return {
      meds: searchMedicamentos(searchTerm).slice(0, 5),
      doencas: searchDoencas(searchTerm).slice(0, 5),
    };
  }, [searchTerm]);

  // Doses filtradas
  const filteredDoses = useMemo(() => {
    if (!doseFilter.trim()) return dosesRapidas;
    const term = doseFilter.toLowerCase();
    return dosesRapidas.filter(d => 
      d.nome.toLowerCase().includes(term) ||
      d.indicacao.toLowerCase().includes(term)
    );
  }, [doseFilter]);

  const handleBack = () => {
    if (selectedMed) {
      setSelectedMed(null);
    } else if (selectedDoenca) {
      setSelectedDoenca(null);
    } else {
      setActiveTab('inicio');
    }
  };

  // Tab Navigation
  const TabButton = ({ tab, icon: Icon, label }: { tab: TabType; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setSelectedMed(null);
        setSelectedDoenca(null);
      }}
      className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
        activeTab === tab
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-slate-500 dark:text-slate-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  // Detalhe do Medicamento
  if (selectedMed) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header Mobile */}
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-slate-900 dark:text-white truncate">{selectedMed.nomeGenerico}</h1>
              <p className="text-xs text-slate-500 truncate">{selectedMed.classeTerapeutica}</p>
            </div>
            {selectedMed.rename && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                RENAME
              </span>
            )}
          </div>
        </header>

        <main className="p-4 pb-20 space-y-4">
          {/* Posologia */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-4">
            <h2 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-500" />
              Posologia
            </h2>
            {selectedMed.posologias.map((pos, i) => (
              <div key={i} className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0 last:mb-0">
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">{pos.indicacao}</p>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>Adultos:</strong> {pos.adultos.dose} - {pos.adultos.frequencia}</p>
                  {pos.pediatrico && (
                    <p className="text-xs text-slate-500 mt-1">
                      <strong>Pediátrico:</strong> {pos.pediatrico.dose}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Contraindicações */}
          <section className="bg-red-50 dark:bg-red-950/50 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h2 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <X className="w-5 h-5" />
              Contraindicações
            </h2>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {selectedMed.contraindicacoes.slice(0, 5).map((ci, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  {ci}
                </li>
              ))}
            </ul>
          </section>

          {/* Gestação/Amamentação */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${
              selectedMed.gestacao === 'A' || selectedMed.gestacao === 'B' 
                ? 'bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800'
                : selectedMed.gestacao === 'X'
                ? 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800'
                : 'bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800'
            }`}>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">🤰 Gestação</p>
              <p className="font-bold">Categoria {selectedMed.gestacao}</p>
            </div>
            <div className={`p-3 rounded-xl ${
              selectedMed.amamentacao.compativel
                ? 'bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800'
            }`}>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">🍼 Amamentação</p>
              <p className="font-bold">{selectedMed.amamentacao.compativel ? 'Compatível' : 'Evitar'}</p>
            </div>
          </div>

          {/* Ver Completo */}
          <Link
            href={`/medicamentos/${selectedMed.id}`}
            className="block w-full p-3 bg-blue-500 text-white text-center rounded-xl font-medium"
          >
            Ver Bula Completa →
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header Compacto */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            <h1 className="font-bold text-lg">Consulta Rápida</h1>
          </div>
          <Link href="/" className="p-2 hover:bg-white/20 rounded-lg">
            <Home className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Busca Global */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Buscar medicamento ou doença..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          
          {/* Resultados da Busca */}
          {searchTerm && (searchResults.meds.length > 0 || searchResults.doencas.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto">
              {searchResults.meds.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-medium text-slate-400 px-2 mb-1">💊 Medicamentos</p>
                  {searchResults.meds.map(med => (
                    <button
                      key={med.id}
                      onClick={() => {
                        setSelectedMed(med);
                        setSearchTerm('');
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{med.nomeGenerico}</p>
                      <p className="text-xs text-slate-500">{med.classeTerapeutica}</p>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.doencas.length > 0 && (
                <div className="p-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-400 px-2 mb-1">🩺 Doenças</p>
                  {searchResults.doencas.map(doenca => (
                    <Link
                      key={doenca.id}
                      href={`/doencas/${doenca.id}`}
                      className="block px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{doenca.titulo}</p>
                      <p className="text-xs text-slate-500">{doenca.ciap2} | {doenca.cid10}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 pb-20">
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            {/* Doses Rápidas */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-blue-500" />
                  Doses Rápidas
                </h2>
                <input
                  type="text"
                  placeholder="Filtrar..."
                  value={doseFilter}
                  onChange={e => setDoseFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm w-32"
                />
              </div>
              
              <div className="space-y-2">
                {filteredDoses.slice(0, 10).map(dose => (
                  <div
                    key={dose.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">{dose.nome}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                        {dose.indicacao}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">{dose.dose}</span> {dose.via} - {dose.frequencia}
                    </p>
                  </div>
                ))}
              </div>
              
              {filteredDoses.length > 10 && (
                <p className="text-center text-sm text-slate-400 mt-2">
                  +{filteredDoses.length - 10} mais
                </p>
              )}
            </section>

            {/* Atalhos Rápidos */}
            <section>
              <h2 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Acesso Rápido
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/medicamentos/interacoes"
                  className="p-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl text-white"
                >
                  <Shield className="w-6 h-6 mb-2" />
                  <p className="font-bold">Interações</p>
                  <p className="text-xs opacity-80">Verificar</p>
                </Link>
                <Link
                  href="/prontuario"
                  className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white"
                >
                  <FileText className="w-6 h-6 mb-2" />
                  <p className="font-bold">Nota SOAP</p>
                  <p className="text-xs opacity-80">Gerar</p>
                </Link>
                <Link
                  href="/medicamentos/comparador"
                  className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white"
                >
                  <Pill className="w-6 h-6 mb-2" />
                  <p className="font-bold">Comparador</p>
                  <p className="text-xs opacity-80">Medicamentos</p>
                </Link>
                <Link
                  href="/protocolos"
                  className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl text-white"
                >
                  <Activity className="w-6 h-6 mb-2" />
                  <p className="font-bold">Protocolos</p>
                  <p className="text-xs opacity-80">Fluxogramas</p>
                </Link>
              </div>
            </section>

            {/* Calculadoras */}
            <section>
              <h2 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-500" />
                Calculadoras
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {calculadorasRapidas.map(calc => (
                  <Link
                    key={calc.id}
                    href={calc.path}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:border-green-400 transition-colors"
                  >
                    <span className="text-2xl">{calc.icon}</span>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">{calc.nome}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'medicamentos' && (
          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 dark:text-white mb-3">Medicamentos RENAME</h2>
            {todosMedicamentos.slice(0, 20).map(med => (
              <button
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className="w-full bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{med.nomeGenerico}</p>
                  <p className="text-sm text-slate-500">{med.classeTerapeutica}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'doencas' && (
          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 dark:text-white mb-3">Doenças da APS</h2>
            {todasDoencas.slice(0, 20).map(doenca => (
              <Link
                key={doenca.id}
                href={`/doencas/${doenca.id}`}
                className="block bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{doenca.titulo}</p>
                    <p className="text-sm text-slate-500">{doenca.ciap2} | {doenca.cid10}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'calculadoras' && (
          <div className="space-y-3">
            <h2 className="font-bold text-slate-900 dark:text-white mb-3">Calculadoras Clínicas</h2>
            <Link
              href="/calculadoras"
              className="block bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center"
            >
              <Calculator className="w-12 h-12 mx-auto mb-3" />
              <p className="font-bold text-lg">Abrir Calculadoras</p>
              <p className="text-sm opacity-80">IMC, TFG, Risco CV, e mais</p>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-1 flex justify-around safe-area-inset-bottom">
        <TabButton tab="inicio" icon={Home} label="Início" />
        <TabButton tab="medicamentos" icon={Pill} label="Meds" />
        <TabButton tab="doencas" icon={Stethoscope} label="Doenças" />
        <TabButton tab="calculadoras" icon={Calculator} label="Calc" />
      </nav>
    </div>
  );
}

