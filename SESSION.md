# Sessao atual

## Estado

- Branch: `codex/aps-design-refactor`.
- Preview local: `http://localhost:3011/pt/prontuario/` servido a partir de `out/`.
- Redesign APS/SUS/pt-BR e correcoes clinicas consolidados no checkpoint da branch.
- Assistente clinico promovido ao topo da consulta: sintomas, diferenciais, exames e sinais de alarme.
- Hipotese selecionada agora abre medicamentos relacionados, dose de referencia, disponibilidade SUS/RENAME e bula.
- Inclusao na prescricao exige confirmacao explicita do profissional.
- IDs legados do banco de sintomas sao resolvidos para as doencas atuais; PAC lidera o caso tosse + febre + dispneia.
- Idade do paciente agora aceita dias, meses ou anos e participa da ordenacao dos diagnosticos diferenciais.
- Peso em kg sincroniza com a nota SOAP e libera apenas as sugestoes pediatricas calculaveis por peso.
- Posologia pediatrica ausente permanece bloqueada; nenhuma sugestao entra automaticamente na prescricao.
- Kernel clinico respiratorio pediatrico implementado em Sounio com gerador WASM, oraculo nativo e ABI numerica fixa.
- O prontuario executa o kernel em modo silencioso, verifica SHA-256 de evidencia/modelo/WASM e recusa incompatibilidades sem fallback probabilistico em TypeScript.
- O recibo permanece `experimental`: sem calibracao retrospectiva, sem assinatura de producao e sem reconciliacao do compilador local com o workspace remoto.
- Probabilidades Sounio nao alteram ranking, tratamento ou prescricao visiveis enquanto os gates cientificos nao forem cumpridos.
- ABI v2 calcula entropia de Shannon e ganho esperado de informacao no Sounio/WASM e devolve a proxima pergunta como indice numerico.
- O contrato verificavel registra o import `env.log: (f64)->f64`; TypeScript apenas fornece o primitivo e interpreta indice/EIG, sem recalcular probabilidades.
- Epistemic Firewall v0.1 implementado: uma politica Sounio gera uma tabela completa de 256 estados `REFUSE / ASK / DEFER / ACT` durante o build.
- O navegador verifica certificado de calibracao, politica, evidencia, modelo, WASM, compilador e dois recibos com vinculos SHA-256 cruzados.
- Sem calibracao, assinatura, validade temporal e distribuicao de referencia, o firewall retorna `REFUSE` antes de instanciar o WASM probabilistico e nao devolve hipoteses Sounio.
- Alterar apenas `status` para `calibrated` agora quebra o build: a promocao exige cobertura por classe e subgrupo, utilidade clinica, validade, fingerprint de distribuicao e hashes de coortes/analises completos.
- Busca formal de anterioridade aberta em `docs/research/epistemic-firewall/`, com protocolo, log reproduzivel Crossref/Europe PMC, matriz inicial e registro patentario.
- A busca encontrou anterioridade forte para conformal prediction diagnostica, verificacao formal de CDS e proveniencia/gates criptograficos; a hipotese de novidade foi estreitada para o vinculo conjunto com certificado de cobertura, politica Sounio, WASM e identidade do compilador.
- Pipeline retrospectivo v0.1 implementado: contrato JSON estrito de coorte desidentificada, split temporal 60/20/20 pela data indice do paciente e bloqueio de vazamento entre particoes.
- `conformal-calibration.sio` e a unica autoridade para posterior, nao-conformidade, limiar conformal por classe, cobertura, Brier, ECE, top-3 de pneumonia, sensibilidade dos sinais de alarme, decision curve e limite inferior de Wilson.
- A fixture deterministica de 45 pacientes e somente de engenharia: gera relatorio `fixture-only` em `.clinical-kernel-build/calibration/`, nao altera o certificado ativo e falha imediatamente com `PROMOTION_REFUSED` se houver tentativa de promocao.
- O gate de melhora de Brier usa agora o comparador APS congelado; distribuicao de referencia, revisao independente e assinatura continuam ausentes.
- Comparador APS atual congelado em `current-aps-comparator.json` com schema, versao, prioridade de sintomas e aliases de doencas. O adaptador TypeScript emite somente scores brutos; normalizacao probabilistica, Brier e Brier skill permanecem sob autoridade Sounio.
- O gate Brier agora compara o kernel ao score APS atual. Na fixture, Brier Sounio foi 0,348525 versus 0,739351 do comparador, skill de 0,528607; o resultado e apenas de engenharia.
- Os minimos fixos de 1.000 pacientes e 200 casos de avaliacao foram removidos. O Sounio calcula precisao de cobertura: 203 pacientes de avaliacao por condicao e 1.827 no mix balanceado da fixture, alem do limite conformal de 19 casos de calibracao por condicao.
- Coorte v1 agora exige um unico encontro indice por paciente; episodios repetidos ficam recusados ate existir analise cluster-aware.

## Verificacao

- `pnpm exec tsc --noEmit`: passou.
- `pnpm build:clinical-kernel`: passou; WASM de 29.195 bytes, cinco vetores, erro maximo posterior de 4,96e-7 e erro maximo EIG de 1,96e-7.
- `pnpm verify`: 19 passaram, 0 falharam, 0 avisos, incluindo integridade, ABI e deteccao de adulteracao do kernel.
- `pnpm build`: passou, 16.545 paginas estaticas.
- Artefatos servidos em `/clinical-kernel/`; prontuario e recibo responderam HTTP 200 no preview local.
- Teste ABI v2 real: 3 anos + tosse + coriza + estridor -> crupe, alarme estridor e proxima pergunta sobre hipoxemia; integridade valida.
- Fluxo real no navegador: sintomas -> PAC -> amoxicilina/azitromicina -> bula -> adicionar ao plano -> preview SOAP.
- Fluxo pediatrico real: 4 anos + tosse + febre + dor de garganta + coriza -> IVAS em primeiro -> PAC pediatrica antes da adulta.
- Dose real validada: PAC pediatrica com 18 kg -> amoxicilina 900-1620 mg/dia -> confirmacao -> plano e preview SOAP.
- Mobile de 313 px sem overflow horizontal; titulo terapeutico quebra em duas linhas.
- `pnpm research:epistemic-firewall`: passou e gravou o primeiro log auditavel em 2026-07-29.
- Epistemic Firewall: 256/256 mascaras Sounio, estado atual `refused`, hash cruzado dos recibos valido.
- Teste real do loader: 4 anos + tosse + febre + coriza -> `REFUSE / calibration-invalid`, mascara 137, integridade valida e zero hipoteses Sounio expostas.
- `pnpm exec tsc --noEmit`: passou apos o firewall.
- `pnpm verify`: 19 passaram, 0 falharam, 0 avisos apos o firewall.
- `pnpm build`: passou novamente, 16.545 paginas estaticas.
- Preview real: quatro novos artefatos responderam HTTP 200; UI mostrou autorizacao clinica bloqueada e o console ficou sem erros.
- `pnpm calibrate:epistemic-firewall:validate`: 45 pacientes, split 27/9/9, nove condicoes em calibracao e avaliacao e zero vazamento.
- `pnpm calibrate:epistemic-firewall:fixture`: compilou e executou o oraculo Sounio; cobertura marginal 1,00, Brier 0,348525, ECE 0,026786 e limite inferior de Wilson 0,700855. Estes numeros sao apenas da fixture e nao possuem validade clinica.
- `node scripts/calibrate-epistemic-firewall.mjs --fixture --promote`: recusado antes da compilacao, como previsto.
- `pnpm verify`: 20 passaram, 0 falharam, 0 avisos, incluindo contrato de coorte e bloqueio de promocao sintetica.
- `pnpm build:clinical-kernel`, `pnpm exec tsc --noEmit` e `pnpm build`: passaram novamente; 16.545 paginas estaticas.
- `pnpm calibrate:epistemic-firewall:fixture`: passou com comparador APS v1, Brier skill e plano de precisao executados no Sounio; promocao permaneceu bloqueada.
- `pnpm verify`: 21 passaram, 0 falharam, 0 avisos, incluindo o contrato do comparador APS.

## Proximo passo

- Obter e analisar uma coorte retrospectiva real, desidentificada, adjudicada e aprovada; probabilidades e EIG continuam bloqueados ate os gates completos.
- Submeter o plano amostral completo a estatistico independente: slope/intercept de calibracao, discriminacao, incerteza pareada do Brier skill, net benefit, prevalencia, sites e subgrupos.
- Reconciliar e reconstruir o compilador Sounio padrao; assinar o recibo somente depois dos gates.
- Completar claim charts de `US12542216B2`, `US20260121859A1` e `WO2023057516A1`, expandir familias/CPC/IPC e obter segunda revisao independente.
- Implementar referencia de distribuicao, monitor de drift com rotulos tardios e estudo prospectivo silencioso antes de produzir qualquer certificado real.
- Publicar no Vercel quando solicitado, mantendo o Epistemic Firewall em `REFUSE` ate os gates cientificos completos.
