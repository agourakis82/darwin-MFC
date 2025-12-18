# Darwin-MFC Mobile App

Aplicativo móvel React Native para Darwin-MFC com sincronização offline.

## Estrutura

Este diretório contém a estrutura preparatória para o aplicativo móvel React Native que compartilhará código e lógica com o aplicativo web Next.js.

## Arquitetura

### Compartilhamento de Código

- **Shared Types**: Tipos TypeScript compartilhados (`../lib/types/`)
- **Shared Utils**: Utilitários compartilhados (`../lib/utils/`)
- **Shared Data**: Dados compartilhados (`../lib/data/`)
- **Shared API**: Lógica de API compartilhada (`../lib/api/`)

### Estrutura do App Mobile

```
mobile/
├── src/
│   ├── components/      # Componentes React Native específicos
│   ├── screens/         # Telas do aplicativo
│   ├── navigation/      # Navegação (React Navigation)
│   ├── services/        # Serviços (sync, storage, etc.)
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utilitários específicos do mobile
├── assets/              # Imagens, fontes, etc.
├── android/             # Código nativo Android
├── ios/                 # Código nativo iOS
└── package.json         # Dependências do mobile app
```

## Funcionalidades Planejadas

### Sincronização Offline

- Cache local de dados (doenças, medicamentos, protocolos)
- Sincronização bidirecional quando online
- Resolução de conflitos
- Indicadores de status de sincronização

### Funcionalidades Principais

- Consulta rápida de doenças e medicamentos
- SOAP notes offline
- Genograma/Ecomapa mobile
- Modo estudo (flashcards, quiz)
- Dashboard epidemiológico
- Visualizações interativas
- Biblioteca de vídeos (download para offline)

## Setup (Futuro)

```bash
# Instalar dependências
cd mobile
npm install

# iOS
cd ios && pod install && cd ..

# Executar
npm run android  # ou npm run ios
```

## Dependências Principais

- `react-native`: Framework base
- `@react-navigation/native`: Navegação
- `@react-native-async-storage/async-storage`: Armazenamento local
- `react-native-reanimated`: Animações
- `react-native-gesture-handler`: Gestos
- `@react-native-community/netinfo`: Status de rede
- `react-query`: Gerenciamento de estado e cache

## Nota

Este é um esqueleto preparatório. O desenvolvimento completo do app mobile será feito em uma fase posterior, quando a estrutura base estiver consolidada.

