import React, { useState } from "react";
import { motion } from "framer-motion";

type Mode = "sus" | "soc" | "combined";

const LIFECYCLE_POINTS = [
  "RN",
  "Infância",
  "Adolescência",
  "Adulto jovem",
  "Adulto meia-idade",
  "Idoso",
  "Gestação",
] as const;

type LifePoint = (typeof LIFECYCLE_POINTS)[number];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ================= HERO ================= */
export function HeroSection() {
  return (
    <motion.section
      id="hero"
      className="min-h-[70vh] flex flex-col justify-center gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div variants={fadeInUp} className="space-y-6">
        <p className="uppercase tracking-[0.2em] text-xs text-neutral-500">
          Aula interativa • Medicina de Família e Comunidade • 5º ano
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
          Rastreamentos no SUS x&nbsp;
          <span className="text-neutral-500">Sociedades médicas</span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl">
          Uma jornada do teste do pezinho ao PSA, passando pelos rastreios de
          DCNT, câncer, infecções, gestação e saúde mental — sempre na
          intersecção entre a lógica populacional do SUS e a lógica
          individualizante das sociedades de especialidade.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="grid md:grid-cols-3 gap-4 md:gap-6"
      >
        <HeroCard
          title="Tese central"
          text="Rastreio bom não é 'mais exame', é exame certo, para a pessoa certa, na frequência certa. SUS e sociedades partem da mesma evidência, mas priorizam pontos diferentes da curva risco–benefício."
        />
        <HeroCard
          title="Ponto de vista"
          text="Você está na Atenção Primária — no lugar onde diretrizes populacionais, guidelines de especialidade e preferências da pessoa se encontram (e às vezes colidem)."
        />
        <HeroCard
          title="Objetivo"
          text="Sair da aula capaz de montar um plano de rastreio coerente para um paciente real, justificando por que você segue (ou não) SUS e sociedades em cada ponto."
        />
      </motion.div>
    </motion.section>
  );
}

function HeroCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
    </article>
  );
}

/* ================= CONCEITOS ================= */
export function ConceptSection() {
  return (
    <section id="concepts" className="section-spacing space-y-8">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          O que estamos chamando de rastreio?
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Antes de falar de colo, mama ou PSA, é preciso limpar a semântica:
          rastreamento populacional não é sinônimo de check-up, nem qualquer
          exame feito em pessoa saudável. Tem critérios, limites e um custo
          ético.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <ConceptCard
          title="Rastreio"
          bullets={[
            "Exame em pessoas assintomáticas de um grupo definido.",
            "Baseado em evidência de redução de mortalidade/morbidade.",
            "Pressupõe linha de cuidado organizada: teste → confirmação → tratamento → seguimento.",
          ]}
        />
        <ConceptCard
          title="O que não é"
          bullets={[
            "Check-up aleatório com lista de exames 'porque sim'.",
            "Investigar sintoma (isso é diagnóstico precoce).",
            "Pedido de exame motivado só por ansiedade ou demanda leiga.",
          ]}
        />
        <ConceptCard
          title="Prevenção quaternária"
          bullets={[
            "Proteger o paciente do excesso de prevenção.",
            "Evitar sobrediagnóstico e iatrogenia (PSA em massa, mamografia sem critério, colonoscopia em todo mundo).",
            "Na APS, muitas vezes o ato mais responsável é dizer 'não agora' e explicar por quê.",
          ]}
        />
      </div>
    </section>
  );
}

function ConceptCard({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <ul className="text-sm text-neutral-600 space-y-1.5">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-neutral-900 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ================= CICLO DE VIDA ================= */
export function LifeCycleSection() {
  const [active, setActive] = useState<LifePoint>("RN");

  return (
    <section id="lifecycle" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Linha do tempo dos rastreamentos no SUS
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Em vez de decorar rastreios soltos, é mais útil enxergar uma linha de
          vida: o que acontece no RN, o que aparece na infância, quando entram
          DCNT, câncer e as janelas de oportunidade que não voltam.
        </p>
      </header>

      {/* Timeline horizontal */}
      <div className="relative">
        <div className="h-px bg-neutral-300 w-full mb-6" />
        <div className="flex justify-between text-xs md:text-sm font-medium text-neutral-500">
          {LIFECYCLE_POINTS.map((p) => {
            const isActive = p === active;
            return (
              <button
                key={p}
                onClick={() => setActive(p)}
                className="relative flex flex-col items-center gap-2 group"
              >
                <span
                  className={`h-3 w-3 rounded-full border-2 transition ${
                    isActive
                      ? "border-neutral-900 bg-neutral-900"
                      : "border-neutral-400 bg-neutral-50 group-hover:border-neutral-700"
                  }`}
                />
                <span
                  className={`transition ${
                    isActive ? "text-neutral-900" : "group-hover:text-neutral-700"
                  }`}
                >
                  {p}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <LifeCyclePanel point={active} />
    </section>
  );
}

function LifeCyclePanel({ point }: { point: LifePoint }) {
  const content = getLifeCycleContent(point);
  
  return (
    <motion.div
      key={point}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base p-6 md:p-8 space-y-4"
    >
      <h3 className="text-lg md:text-xl font-semibold">{content.title}</h3>
      <div className="text-sm md:text-base text-neutral-700 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {content.body}
      </div>
    </motion.div>
  );
}

function getLifeCycleContent(point: LifePoint) {
  const contents = {
    RN: {
      title: "Recém-nascido (primeiros dias)",
      body: (
        <>
          <p>
            Aqui o SUS entrega o que há de mais clássico em saúde pública:
            triagens neonatais que mudam radicalmente o destino de uma vida.
          </p>
          <ul>
            <li>
              <strong>Teste do pezinho:</strong> 6–7 doenças graves e tratáveis
              (PKU, hipotireoidismo congênito, hemoglobinopatias, fibrose
              cística, HAC, deficiência de biotinidase, toxoplasmose congênita).
            </li>
            <li>
              <strong>
                Teste da orelhinha, olhinho, coraçãozinho e linguinha:
              </strong>{" "}
              surdez, catarata/retinoblastoma, cardiopatia congênita crítica,
              anquiloglossia.
            </li>
          </ul>
        </>
      ),
    },
    Infância: {
      title: "Infância",
      body: (
        <>
          <p>
            A lógica deixa de ser apenas metabólica/genética e passa a ser
            desenvolvimento, neurodiversidade e nutrição.
          </p>
          <ul>
            <li>
              <strong>Desenvolvimento neuropsicomotor:</strong> marcos em todas
              as consultas de puericultura.
            </li>
            <li>
              <strong>TEA (M-CHAT 16–30 meses):</strong> novo rastreio formal no
              SUS, alinhado com sociedades de pediatria/psiquiatria.
            </li>
            <li>
              <strong>Anemia ferropriva:</strong> SBP defende hemoglobina aos 12
              meses; SUS historicamente focou em suplementação universal.
            </li>
            <li>
              <strong>Visão:</strong> triagens escolares para
              ambliopia/estrabismo quando possível.
            </li>
          </ul>
        </>
      ),
    },
    Adolescência: {
      title: "Adolescência",
      body: (
        <>
          <p>
            Aqui, rastreio é menos "exame" e mais conversa estruturada sobre
            risco.
          </p>
          <ul>
            <li>
              Uso de álcool, tabaco e outras drogas (AUDIT, CRAFFT).
            </li>
            <li>
              Sexualidade e IST: oferta de testagem rápida dirigida, orientação
              sobre PrEP.
            </li>
            <li>
              Saúde mental: sinais de depressão, ansiedade social, ideação
              suicida.
            </li>
          </ul>
        </>
      ),
    },
    "Adulto jovem": {
      title: "Adulto jovem (18–39 anos)",
      body: (
        <>
          <p>
            A base da prevenção de DCNT é construída aqui: o que você perder
            agora vai cobrar juros aos 50.
          </p>
          <ul>
            <li>PA em toda consulta; IMC e circunferência abdominal.</li>
            <li>Tabagismo, álcool, droga – sempre rastreados.</li>
            <li>
              Glicemia e lipídios em subgrupos de risco (HAS, obesidade,
              história familiar).
            </li>
          </ul>
        </>
      ),
    },
    "Adulto meia-idade": {
      title: "Adulto meia-idade (40–74 anos)",
      body: (
        <>
          <p>
            É aqui que entram pesado DCNT e câncer: mama, colo, colorretal,
            hepatites, HCV, rastreios de alto impacto na morbimortalidade.
          </p>
          <ul>
            <li>Consolidação do rastreio de HAS, DM2, dislipidemia.</li>
            <li>
              Câncer de mama: mamografia a partir de 40 (sociedades) e 50 (SUS
              como programa organizado).
            </li>
            <li>
              Colo do útero: rastreio com HPV/citologia 25–64 anos (já ativo).
            </li>
            <li>
              Câncer colorretal: idealmente 50–75 anos (CCR em diretriz em
              construção no SUS).
            </li>
            <li>HCV: teste pelo menos uma vez ≥40 anos.</li>
          </ul>
        </>
      ),
    },
    Idoso: {
      title: "Idoso (≥75 anos)",
      body: (
        <>
          <p>
            Nem todo rastreio faz sentido para sempre. A questão passa a ser:
            expectativa de vida, fragilidade e o que ainda traz benefício
            líquido.
          </p>
          <ul>
            <li>
              Reavaliar necessidade de mamografia e rastreio de colo de útero
              após 74/64 anos com histórico adequado.
            </li>
            <li>
              Foco em prevenção de queda, fragilidade e imunizações.
            </li>
            <li>
              Evitar rastrear cânceres se o tempo até benefício ultrapassa a
              expectativa de vida.
            </li>
          </ul>
        </>
      ),
    },
    Gestação: {
      title: "Gestação (overlay do ciclo de vida)",
      body: (
        <>
          <p>
            A gravidez é uma janela de rastreamento intenso: pela mãe e pelo
            feto.
          </p>
          <ul>
            <li>
              HIV, sífilis, HBV: rastreio universal no pré-natal (com
              repetições).
            </li>
            <li>DM gestacional: TOTG 24–28 semanas.</li>
            <li>Urocultura, anemia, tipagem e Coombs indireto.</li>
            <li>
              Pontos de tensão: cultura universal para Streptococcus B, triagem
              de aneuploidias, HCV universal – recomendados por sociedades,
              ainda não plenamente incorporados pelo SUS.
            </li>
          </ul>
        </>
      ),
    },
  };

  return contents[point];
}

/* ================= DCNT ================= */
export function DCNTSection() {
  const [mode, setMode] = useState<Mode>("combined");

  return (
    <section id="dcnt" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          DCNT: SUS faz o mínimo suficiente, sociedades querem apertar a malha
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Hipertensão, diabetes 2, dislipidemias, obesidade, tabagismo e álcool
          são a base da carga de doença. Aqui, SUS e sociedades quase sempre
          concordam no "o que", mas nem sempre no "quando" e "quão amplo".
        </p>
        <div className="inline-flex rounded-full bg-neutral-200 p-1">
          {(["sus", "soc", "combined"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1 text-xs md:text-sm rounded-full transition ${
                mode === m
                  ? "bg-white shadow-sm text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              {m === "sus" && "Ver SUS"}
              {m === "soc" && "Ver Sociedades"}
              {m === "combined" && "Ver comparação"}
            </button>
          ))}
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <DCNTCard title="Hipertensão" mode={mode} />
        <DCNTCard title="Diabetes tipo 2" mode={mode} />
        <DCNTCard title="Dislipidemias" mode={mode} />
      </div>
    </section>
  );
}

function DCNTCard({ title, mode }: { title: string; mode: Mode }) {
  const isDM2 = title === "Diabetes tipo 2";

  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      {mode === "sus" && (
        <p className="text-sm text-neutral-600 leading-relaxed">
          {title === "Hipertensão" &&
            "SUS recomenda aferir PA em todos os adultos a partir dos 18 anos, idealmente em toda consulta de APS. Rastreamento universal, grau de evidência máximo."}
          {isDM2 &&
            "O foco clássico é rastrear DM2 em adultos com PA elevada (≥135/80), integrando triagem de glicemia à linha de cuidado do hipertenso."}
          {title === "Dislipidemias" &&
            "Rastrear homens ≥35 anos e mulheres ≥45, ou mais jovens se alto risco cardiovascular, com perfil lipídico periódico."}
        </p>
      )}
      {mode === "soc" && (
        <p className="text-sm text-neutral-600 leading-relaxed">
          {title === "Hipertensão" &&
            "Sociedades de cardiologia convergem com o SUS na aferição ampla, reforçando repetição em diferentes dias antes de fechar diagnóstico e uso de medida residencial quando possível."}
          {isDM2 &&
            "SBD/SBEM propõem triagem de todos ≥45 anos a cada 3 anos, além de qualquer adulto com IMC ≥25 e ao menos um fator de risco — mesmo sem hipertensão."}
          {title === "Dislipidemias" &&
            "SBC e Endocrinologia sugerem intensificar rastreio em jovens, especialmente para detectar hipercolesterolemia familiar, e a SBP recomenda dosagem ainda na infância/adolescência em pontos estratégicos."}
        </p>
      )}
      {mode === "combined" && (
        <div className="space-y-2 text-sm text-neutral-600 leading-relaxed">
          <p className="font-medium text-blue-600">SUS:</p>
          <p>
            {title === "Hipertensão" &&
              "Foca em rastreio universal de PA, aproveitando cada contato com o sistema para identificar hipertensos ocultos."}
            {isDM2 &&
              "Usa a hipertensão como 'porta de entrada' para triagem de DM2, concentrando recursos onde o risco de doença é maior."}
            {title === "Dislipidemias" &&
              "Define idades de corte (H≥35, M≥45) e prioriza grupos com maior risco global para manter o rastreio custo-efetivo."}
          </p>
          <p className="font-medium text-purple-600 mt-3">Sociedades:</p>
          <p>
            {isDM2 &&
              "Ampliam a malha: não querem perder obesos jovens e pessoas com história familiar importante, mesmo sem hipertensão."}
            {title === "Dislipidemias" &&
              "Empurram o rastreio para idades mais precoces e defendem capturar hipercolesterolemia familiar antes dos 30 anos."}
            {title === "Hipertensão" &&
              "Refinam a forma de medir e confirmar diagnóstico, mas concordam amplamente com a estratégia populacional do SUS."}
          </p>
        </div>
      )}
    </article>
  );
}

/* ================= CÂNCER ================= */
export function CancerSection() {
  return (
    <section
      id="cancer"
      className="section-spacing space-y-10 bg-neutral-950 text-neutral-100 rounded-3xl md:rounded-[2.5rem] px-4 md:px-8 mt-10"
    >
      <header className="space-y-3 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Câncer: colo, mama, colorretal e próstata
        </h2>
        <p className="text-neutral-400">
          Aqui o jogo fica mais tenso: são os rastreios que disputam recursos,
          geram manchetes e, muitas vezes, colocam SUS e sociedades médicas em
          lados diferentes do cabo de guerra.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <CancerCard
          title="Colo do útero"
          sus="Rastreio organizado em mulheres 25–64 anos, migrando de citologia para teste de DNA-HPV a cada 5 anos. Exemplo de alinhamento forte com evidência e com FEBRASGO/INCA."
          soc="FEBRASGO e sociedades oncológicas apoiam o HPV como exame primário e a faixa 25–64, discutindo apenas detalhes de fluxo (coleta, triagem de positivas, etc.)."
          comment="Aqui a tensão não é SUS vs sociedades, e sim organizar de fato o rastreio: deixar de ser oportunístico e passar a ser programa com convite ativo, indicadores e busca de faltosas."
          evidence="A"
        />
        <CancerCard
          title="Mama"
          sus="Rastreia mulheres 50–74 anos com mamografia bienal; garante acesso a partir dos 40 em decisão compartilhada, mas sem chamar todas nessa faixa."
          soc="SBM, FEBRASGO e CBR defendem iniciar aos 40 anos para todas, preferencialmente com periodicidade anual até 74, aceitando mais exames em troca de mais diagnósticos precoces."
          comment="É o grande 'campo de batalha': saúde pública calibrando sobrediagnóstico e custo-efetividade vs mastologia pensando no caso individual. A APS precisa ser boa em decisão compartilhada aqui."
          evidence="B"
        />
        <CancerCard
          title="Colorretal"
          sus="Em 2025, diretriz em construção: modelo provável com FIT anual/bienal 50–75 anos e colonoscopia para positivos. Ainda sem programa organizado, mas reconhecido como prioridade."
          soc="Coloproctologia e oncologia defendem rastreio formal desde já, idealmente iniciando aos 45 anos com colonoscopia a cada 10 anos, em linha com diretrizes americanas."
          comment="Todos concordam no mérito, o desacordo é 'quando' e 'como' implementar. Até lá, diagnóstico precoce via atenção a sintomas tem peso ainda maior."
          evidence="A"
        />
        <CancerCard
          title="Próstata"
          sus="INCA/OMS: não recomenda rastreio populacional de rotina com PSA/toque em homens assintomáticos. Orienta decisão compartilhada na faixa 55–69 anos."
          soc="SBU e outras sociedades sugerem PSA + toque anual a partir dos 50 (ou 45 se alto risco), apostando em diagnóstico precoce para reduzir mortalidade."
          comment="É a maior divergência explícita. Para a APS, isso vira caso clássico de prevenção quaternária: explicar que 'não fazer' também é decisão ativa baseada em evidência, não negligência."
          evidence="C"
        />
      </div>
    </section>
  );
}

function CancerCard({
  title,
  sus,
  soc,
  comment,
  evidence,
}: {
  title: string;
  sus: string;
  soc: string;
  comment: string;
  evidence: "A" | "B" | "C";
}) {
  const evidenceColors = {
    A: "bg-emerald-600",
    B: "bg-blue-500",
    C: "bg-neutral-500",
  };

  return (
    <article className="bg-neutral-900 rounded-3xl border border-neutral-800 p-5 md:p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-50">{title}</h3>
        <span
          className={`${evidenceColors[evidence]} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}
        >
          Evidência {evidence}
        </span>
      </div>
      <div className="space-y-2 text-xs md:text-sm text-neutral-300 leading-relaxed">
        <p>
          <span className="font-semibold text-blue-400">SUS: </span>
          {sus}
        </p>
        <p>
          <span className="font-semibold text-purple-400">Sociedades: </span>
          {soc}
        </p>
        <p className="border-t border-neutral-800 pt-2 text-neutral-400">
          {comment}
        </p>
      </div>
    </article>
  );
}

/* ================= INFECÇÕES ================= */
export function InfectiousSection() {
  return (
    <section id="infectious" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Infecções e IST: onde quase todo mundo rema na mesma direção
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Em HIV, sífilis e hepatites, SUS e sociedades médicas são, em geral,
          aliados explícitos. O foco é ampliar testagem, tratar imediatamente e
          caminhar para eliminação como problema de saúde pública.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <InfectionCard
          title="HIV"
          sus="Recomenda que toda pessoa de 15–65 anos faça pelo menos um teste na vida, com repetição conforme risco. Testes rápidos disponíveis em UBS e campanhas."
          soc="Infectologia e ONGs reforçam testagem ampla, defendendo estratégia 'opt-out' em diversos contextos clínicos."
        />
        <InfectionCard
          title="Sífilis"
          sus="Triagem obrigatória em todas as gestantes (1º tri, 3º tri e parto) e oferta a parceiros e populações-chave. Resposta rápida para sífilis congênita."
          soc="FEBRASGO, infectologia e dermatologia convergem: amplificar testagem e garantir penicilina para todos os casos."
        />
        <InfectionCard
          title="Hepatites B e C"
          sus="Hep B: testar e vacinar não imunes, com ênfase em gestantes e grupos de risco. Hep C: testar pelo menos uma vez ≥40 anos, mais frequentemente se risco."
          soc="Sociedades tendem a sugerir testagem ainda mais ampla (por ex., HCV uma vez para todos ≥18 anos), mas concordam com a estratégia progressiva implementada pelo SUS."
        />
        <InfectionCard
          title="IST em populações-chave"
          sus="Testagem periódica de HIV, sífilis e hepatites em HSH, profissionais do sexo, pessoas privadas de liberdade e usuários de drogas, integrada a estratégias como PrEP/PEP."
          soc="Diretrizes de infectologia e de HIV reforçam exatamente esse modelo e pressionam para reduzir barreiras de acesso a autoteste, PrEP e tratamento."
        />
      </div>
    </section>
  );
}

function InfectionCard({
  title,
  sus,
  soc,
}: {
  title: string;
  sus: string;
  soc: string;
}) {
  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">
        <span className="font-semibold text-blue-600">SUS: </span>
        {sus}
      </p>
      <p className="text-sm text-neutral-600 leading-relaxed">
        <span className="font-semibold text-purple-600">Sociedades: </span>
        {soc}
      </p>
    </article>
  );
}

/* ================= GESTAÇÃO ================= */
export function PregnancySection() {
  return (
    <section id="pregnancy" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Gestação: o pacote de rastreios mais denso do SUS
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          O pré-natal concentra alguns dos rastreamentos mais clássicos de saúde
          pública. É também onde as diferenças SUS vs sociedades são mais
          tecnológicas: cultura de GBS, triagem de aneuploidias, HCV universal.
        </p>
      </header>

      <div className="card-base p-6 md:p-8 space-y-6">
        <h3 className="text-sm font-semibold text-neutral-900">
          Linha do tempo do pré-natal
        </h3>

        <div className="grid md:grid-cols-4 gap-6 text-sm text-neutral-700">
          <div>
            <h4 className="font-semibold mb-2 text-blue-600">1º trimestre</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>HIV, sífilis, hepatite B.</li>
              <li>Tipagem sanguínea e Coombs, hemograma.</li>
              <li>Urocultura para bacteriúria assintomática.</li>
              <li>Avaliação de risco para DM prévio.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-purple-600">2º trimestre</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Teste oral de tolerância à glicose (24–28s).</li>
              <li>Ultrassom morfológico de 2º trimestre.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-green-600">3º trimestre</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Repetir HIV e sífilis.</li>
              <li>
                Idealmente: cultura para Streptococcus do grupo B (ainda não
                universal no SUS).
              </li>
              <li>Seguimento de PA e proteinúria (pré-eclâmpsia).</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-amber-600">
              Parto e puerpério
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Nova oportunidade de testagem para IST.</li>
              <li>Triagem de depressão pós-parto (EPDS).</li>
              <li>Atualização vacinal da puérpera.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-700 space-y-1.5">
          <p>
            <span className="font-semibold text-blue-600">SUS: </span>
            entrega um pacote robusto baseado em sífilis, HIV, HBV, DMG,
            bacteriúria, tipagem, PA e US morfológico.
          </p>
          <p>
            <span className="font-semibold text-purple-600">
              Sociedades (FEBRASGO, SBP, etc.):{" "}
            </span>
            empurram para inclusão universal de cultura GBS, triagem de
            aneuploidias no 1º trimestre e testagem de HCV em todas as
            gestantes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= SAÚDE MENTAL ================= */
export function MentalHealthSection() {
  return (
    <section id="mental" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Saúde mental: o rastreio invisível que acontece na consulta
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Depressão, depressão pós-parto e TEA são hoje as três grandes frentes
          em que rastreio estruturado em saúde mental faz sentido na APS. O
          resto continua a depender muito da sensibilidade clínica.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <MentalCard
          title="Depressão em adultos (PHQ-9)"
          text="Linha de cuidado do MS recomenda o uso do PHQ-9 como instrumento de triagem e monitorização em adultos com suspeita de episódio depressivo — especialmente em contexto de DCNT, dor crônica e demandas vagas."
        />
        <MentalCard
          title="Depressão pós-parto (EPDS)"
          text="FEBRASGO e SBP defendem rastrear sistematicamente depressão pós-parto com EPDS em todas as puérperas. Na prática do SUS, isso depende de organização da visita puerperal e da articulação APS–maternidade."
        />
        <MentalCard
          title="TEA (M-CHAT)"
          text="Rastrear risco de autismo entre 16–30 meses com M-CHAT tornou-se recomendação oficial. É um dos poucos rastreios de saúde mental com janela e instrumento bem definidos em políticas públicas."
        />
      </div>
    </section>
  );
}

function MentalCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
    </article>
  );
}

/* ================= CASO CLÍNICO ================= */
export function CaseSection() {
  return (
    <section id="case" className="section-spacing space-y-8">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Caso clínico: onde tudo isso cai na vida de uma pessoa
        </h2>
        <p className="text-neutral-600 max-w-2xl">
          Aqui entra o paciente que você vai levar da UBS para a aula. A lógica
          é usar uma única pessoa como fio condutor: o que o SUS recomenda para
          ela, o que as sociedades sugeririam a mais, e o que de fato foi feito
          (ou perdido) na linha do tempo.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* Lado esquerdo: narrativa do caso (placeholder) */}
        <article className="card-base p-5 md:p-6 space-y-3 text-sm text-neutral-700">
          <h3 className="text-sm font-semibold text-neutral-900">
            Linha do tempo do paciente
          </h3>
          <p className="text-neutral-500 text-xs italic">
            (Substitua este texto pelo seu paciente real)
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>Idade, sexo, contexto familiar e laboral.</li>
            <li>
              Principais fatores de risco (HAS, DM, tabaco, obesidade, etc.).
            </li>
            <li>
              Histórico de rastreios já realizados: Papanicolau, mamografia ou
              PSA, exames de sangue, testes para HIV/sífilis/hepatites.
            </li>
            <li>
              Pontos em que houve lacunas: rastreamentos atrasados ou nunca
              realizados.
            </li>
          </ul>
          <p className="text-neutral-600">
            A ideia é mostrar a trajetória real, não o caso perfeito. Isso dá
            muito mais força didática à discussão.
          </p>
        </article>

        {/* Lado direito: checklist SUS vs Sociedades */}
        <article className="bg-neutral-900 text-neutral-100 rounded-3xl border border-neutral-800 p-5 md:p-6 space-y-4 text-sm">
          <h3 className="text-sm font-semibold">Plano de rastreio comparado</h3>
          <p className="text-neutral-400 text-xs italic">
            Use esta tabela como roteiro para discussão em sala.
          </p>

          <table className="w-full text-xs md:text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-neutral-400">
                <th className="text-left font-normal pb-1">Condição</th>
                <th className="text-left font-normal pb-1">SUS</th>
                <th className="text-left font-normal pb-1">Sociedades</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-top pr-2">DCNT</td>
                <td className="align-top pr-2 text-neutral-300">
                  PA em toda consulta; glicemia se HAS; lipídios conforme idade.
                </td>
                <td className="align-top text-neutral-300">
                  Inclui glicemia mais ampla (≥45 anos) e rastreio lipídico mais
                  precoce em obesos/familiares.
                </td>
              </tr>
              <tr>
                <td className="align-top pr-2">Câncer</td>
                <td className="align-top pr-2 text-neutral-300">
                  Colo (25–64); mama (50–74 bienal; 40–49 conforme decisão);
                  colorretal (se/quando diretriz local existir).
                </td>
                <td className="align-top text-neutral-300">
                  Mama desde os 40, anual; CCR a partir de 45; PSA + toque
                  conforme especialidade.
                </td>
              </tr>
              <tr>
                <td className="align-top pr-2">Infecções</td>
                <td className="align-top pr-2 text-neutral-300">
                  Pelo menos um teste de HIV/HCV ao longo da vida; IST em
                  gestação e populações-chave.
                </td>
                <td className="align-top text-neutral-300">
                  Puxa para testagem ainda mais ampla e frequente em grupos de
                  risco.
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-neutral-400">
            No fim, você mostra para o seu paciente o que é mínimo (SUS), o que
            é desejável (Sociedades) e decide com ele onde vale a pena expandir.
          </p>
        </article>
      </div>
    </section>
  );
}

/* ================= RESUMO & QUIZ ================= */
export function SummarySection() {
  return (
    <section id="summary" className="section-spacing space-y-10">
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Três frases para sair da aula lembrando
        </h2>
      </header>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <SummaryCard
          title="1. Rastreio é estratégia populacional"
          text="Ele nasce de critérios epidemiológicos e custo-efetivos. Não é 'uma lista de exames saudáveis', mas uma política pública que precisa de linha de cuidado e indicador."
        />
        <SummaryCard
          title="2. SUS e sociedades não são inimigos"
          text="Quase sempre trabalham com a mesma evidência. O SUS calibra equidade e recursos; as sociedades empurram a régua para mais sensibilidade individual. A tensão é produtiva, se for explicitada."
        />
        <SummaryCard
          title="3. A APS é o lugar da síntese"
          text="É na consulta de MFC que o algoritmo vira história, que guideline vira decisão compartilhada. A pergunta final nunca é 'SUS ou sociedade?', mas 'O que faz sentido para esta pessoa, aqui, agora?'."
        />
      </div>

      {/* Mini quiz conceitual simples */}
      <div className="card-base p-6 md:p-8 space-y-4 mt-10">
        <h3 className="text-sm font-semibold text-neutral-900">
          Mini quiz de fixação (para discussão em grupo)
        </h3>
        <ol className="list-decimal pl-5 text-sm text-neutral-700 space-y-2">
          <li>
            Em quais das seguintes situações o SUS{" "}
            <span className="font-semibold">não</span> recomenda um rastreio
            populacional organizado?
          </li>
          <li>
            Em uma mulher de 42 anos, sem fatores de risco, qual é a diferença
            de abordagem entre SUS e SBM quanto à mamografia?
          </li>
          <li>
            Para um homem de 58 anos, assintomático, como você explicaria de
            forma honesta as posições de SUS/INCA e SBU em relação ao PSA?
          </li>
        </ol>
        <p className="text-xs text-neutral-500 mt-2">
          (Você pode usar essas perguntas para conduzir a discussão ao final da
          apresentação.)
        </p>
      </div>
    </section>
  );
}

function SummaryCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="card-base p-5 md:p-6 flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
    </article>
  );
}