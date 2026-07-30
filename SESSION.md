# Sessao atual

## Estado

- Branch: `codex/aps-design-refactor`.
- Preview local verificado: `http://127.0.0.1:3011/pt/prontuario/` servido a partir de `out/`.
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
- O recibo clinico v3 permanece `experimental`: o compilador foi reconciliado, mas ainda nao existem calibracao retrospectiva aprovada, referencia populacional nem assinatura de producao.
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
- Workspace Sounio oficial recuperado sem reiniciar a sessao ativa: `/workspace/sounio` permaneceu intacto e o estado Zellij/processos foi preservado em `/workspace/.recovery/source-fresh-20260730T003523Z`.
- Branch cientifica fixada em `integration/sounio-dev-ready-base`, commit `8d203709e1c171d5fb017909f87000eea54a238e`, tree `7a130685743fdafc6751bb083866e943cc4d7fbb`; divergencia registrada contra `origin/main` em 1484 commits apenas no main e 2741 apenas na branch.
- Compilador reconstruido em worktree limpo e diretorio temporario, sem sobrescrever o artefato versionado. Bootstrap forcado por fonte, stage2 e stage3 produziram o mesmo SHA-256 `4511a6ed2055524df877de0a8fd140993904e44cf65ebe43c70d827b3edc2dfc`.
- Recibo `darwin.sounio.compiler-source-receipt.v1` validado com SHA-256 `f071869e8c8070f169fd0086df3b8e3501e0504d4f04485cba614e07a678907c` e `compilerReconciled=true`.
- Build Darwin aceita `SOUNIO_COMPILER_PATH` e `SOUNIO_COMPILER_RECEIPT_PATH`; snapshots sem Git continuam testaveis, mas jamais podem produzir reconciliacao positiva.
- Recibo clinico evoluido para v3 e recibo do firewall para v2; ambos vinculam o recibo source-fresh do compilador e recusam schema, hash, branch, commit, tree, seed ou identidade incompativeis.
- Pacote multicentrico executavel fechado com intended use, SAP congelado, dicionario de 12 observacoes e nove condicoes, template/schema de mapeamento e checklist de extracao/desidentificacao. Nenhum prontuario ou identificador de paciente foi incluido no repositorio.
- Site mapping evoluido para v2: separa centro clinico de fixture sintetica, referencia revisao etica, autorizacao do controlador do banco, acordo local, autorizacao multicentrica comum, avaliacao de base legal, RIPD, ambiente seguro, retencao, incidentes e responsabilidades locais.
- `lock:multicenter-site` deriva `siteHash`, bloqueia o contrato e calcula SHA-256 canonico. Mapeamentos clinicos reais sao recusados dentro do repositorio; documentos, nomes, chaves HMAC e dados continuam fora do Git.
- O calibrador exige que os dois ou mais mapeamentos tenham o mesmo protocolo, centro coordenador e autorizacao multicentrica, e que o conjunto exato de `siteHash` coincida com a coorte.
- O recibo de onboarding distingue `mappingGateReady` de verificacao humana: `governanceDocumentsVerified=false` e `calibrationAuthorized=false` permanecem invariantes do software.

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
- Gates source-fresh: fixed-point bit a bit, self-hosting/release gates e verificador canonico de marcadores passaram no worktree Sounio limpo.
- `pnpm validate:compiler-source-receipt`: passou com `compilerReconciled=true`.
- `pnpm validate:multicenter-package`: passou com 12 observacoes, nove condicoes e zero registros de pacientes.
- Fixture source-fresh: 45 pacientes sinteticos, split 27/9/9, Brier Sounio 0,348525, comparador 0,739351, melhora relativa 0,528607 e ECE 0,026786; os gates de precisao/governanca permaneceram vermelhos, como previsto.
- Tentativa `--fixture --promote`: recusada com exit code diferente de zero, como previsto.
- `pnpm verify`: 22 passaram, 0 falharam, 0 avisos, incluindo recusa de fonte suja, commit divergente, seed trocada, recibo ausente e adulteracao de hashes.
- `pnpm build:clinical-kernel`: passou com os paths source-fresh; WASM de 29.195 bytes e cinco vetores dentro de `1e-6` (erro maximo posterior 4,96e-7; EIG 1,96e-7).
- `pnpm type-check`, `pnpm build:vercel` e `pnpm build`: passaram; o build estatico materializou 16.545 paginas.
- Navegador em origem limpa: 4 anos + tosse -> `REFUSE / calibration-invalid`, integridade verificada, autorizacao clinica bloqueada, zero probabilidades/posteriores Sounio expostos e zero erros de console.
- A data SOAP foi tornada deterministica entre SSR e cliente; o erro de hidratacao React observado no fuso de Sao Paulo foi eliminado.
- `pnpm test:multicenter-onboarding`: dois centros exclusivamente sinteticos foram bloqueados e vinculados a uma coorte de engenharia; a fixture permaneceu sem autorizacao de calibracao.
- Dez cenarios negativos foram recusados: hash adulterado, site duplicado, revisao vencida, aprovacao etica vencida, protocolo divergente, site de coorte desconhecido, autorizacao multicentrica nao vinculada, coorte ausente, tentativa de gravar mapping real no Git e uso de mapping sintetico no calibrador.
- `pnpm verify`: 23 passaram, 0 falharam, 0 avisos apos o onboarding v2.
- `pnpm type-check`: passou apos o onboarding v2.
- Fixture source-fresh foi reexecutada com o compilador reconciliado; permaneceu `fixture-only`, inelegivel para revisao independente ou promocao.

## Proximo passo

- Obter e analisar uma coorte retrospectiva real, desidentificada, adjudicada e aprovada; probabilidades e EIG continuam bloqueados ate os gates completos.
- Submeter o plano amostral completo a estatistico independente: slope/intercept de calibracao, discriminacao, incerteza pareada do Brier skill, net benefit, prevalencia, sites e subgrupos.
- Obter as aprovacoes institucionais reais e preencher, revisar e bloquear externamente os mapeamentos de pelo menos dois servicos de APS antes de iniciar qualquer calibracao real.
- Completar claim charts de `US12542216B2`, `US20260121859A1` e `WO2023057516A1`, expandir familias/CPC/IPC e obter segunda revisao independente.
- Implementar referencia de distribuicao, monitor de drift com rotulos tardios e estudo prospectivo silencioso antes de produzir qualquer certificado real.
- Assinar e publicar somente quando solicitado e depois dos gates cientificos completos; ate la, manter o Epistemic Firewall em `REFUSE`.
