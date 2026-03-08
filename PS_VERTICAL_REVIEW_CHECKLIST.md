# PS Vertical Review Checklist

## Clinical workflow

- `PCR`, `sepse` e `IOT/RSI` abrem sem perda de contexto
- passo ativo, pendências e timeline refletem o caso atual
- `stop points` aparecem no momento clínico esperado
- `debrief` resume corretamente confirmado, revisado, concluído e pendente

## Medication safety

- `drug sheet` mostra base de cálculo, peso e pressupostos
- `review` e `confirm` continuam distintos
- handoff não confunde consulta com administração real
- import de handoff incompatível é rejeitado

## Team coordination

- `PCR role board` permite atribuir e limpar nomes
- nomes recentes reaparecem no `role assignment`
- atualização de papel entra na timeline do caso

## Handoff / import / export

- `handoff` clínico continua escaneável
- export estruturado mantém schema e envelope válidos
- import mostra preview antes de substituir o caso
- confirmação em dois passos impede overwrite acidental
- draft de import reaparece na mesma sessão

## UX / interaction

- `handoff`, `debrief` e `role assignment` são legíveis em mobile
- ações principais continuam visíveis sem caça de UI
- estados de erro e confirmação ficam claros sem poluir a tela
- a hierarquia visual do runner permanece consistente

## Technical review

- controllers de import/export não duplicam regras do runner
- `ProtocolFlowClient` não voltou a concentrar lógica demais
- contratos da vertical PS continuam coerentes
- smoke cobre os caminhos críticos
