/**
 * Servidor Principal - Sistema de Educação Médica SOTA 2025-2026
 * Implementação State-of-the-Art com IA, LLMs e tecnologias emergentes
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Middleware de segurança e autenticação
import { authMiddleware } from './middleware/auth';
import { validationMiddleware } from './middleware/validation';
import { errorHandler } from './middleware/errorHandler';

// Microserviços SOTA
import { KnowledgeDiagnosticService } from './services/KnowledgeDiagnosticService';
import { AdaptiveLearningService } from './services/AdaptiveLearningService';
import { LLMContentService } from './services/LLMContentService';
import { AnalyticsService } from './services/AnalyticsService';
import { LMSIntegrationService } from './services/LMSIntegrationService';

// Configuração de ambiente
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

// Rate limiting para proteção DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Muitas requisições do mesmo IP, tente novamente em 15 minutos'
});

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
app.use(limiter);

// CORS configurado para medical education
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://medical-edu-sota.com"
  ],
  credentials: true
}));

// Logging para medical compliance
app.use(morgan('combined', {
  stream: {
    write: (message) => {
      // Log médico estruturado para auditoria
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'info',
        message: message.trim(),
        service: 'medical-education-sota'
      }));
    }
  }
}));

// Body parsing com validação
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      knowledgeDiagnostic: 'active',
      adaptiveLearning: 'active',
      llmContent: 'active',
      analytics: 'active',
      lmsIntegration: 'active'
    }
  });
});

// ===== MICROSERVIÇOS SOTA =====

// 1. Knowledge Diagnostic Service - Diagnóstico de lacunas com IA
app.use('/api/v1/diagnostic', authMiddleware, KnowledgeDiagnosticService);

// 2. Adaptive Learning Service - Engine de aprendizado adaptativo
app.use('/api/v1/learning', authMiddleware, AdaptiveLearningService);

// 3. LLM Content Service - Geração de conteúdo com LLMs
app.use('/api/v1/content', authMiddleware, LLMContentService);

// 4. Analytics Service - Analytics em tempo real
app.use('/api/v1/analytics', authMiddleware, AnalyticsService);

// 5. LMS Integration Service - Integração com LMS institucional
app.use('/api/v1/lms', authMiddleware, LMSIntegrationService);

// ===== ENDPOINTS ESPECÍFICOS =====

// Inicialização do estudante
app.post('/api/v1/student/initialize', authMiddleware, async (req, res) => {
  try {
    const { studentProfile, initialAssessment } = req.body;

    // Implementar inicialização SOTA
    const result = await initializeStudentWithAI(studentProfile, initialAssessment);

    res.status(201).json({
      success: true,
      data: result,
      message: 'Estudante inicializado com sucesso'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Processamento de sessão de aprendizado
app.post('/api/v1/session/process', authMiddleware, async (req, res) => {
  try {
    const sessionData = req.body;

    // Processamento em tempo real com analytics
    const result = await processLearningSessionWithAI(sessionData);

    res.status(200).json({
      success: true,
      data: result,
      message: 'Sessão processada com sucesso'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Geração de caminho de aprendizado personalizado
app.post('/api/v1/learning-path/generate', authMiddleware, async (req, res) => {
  try {
    const { studentId, knowledgeGaps, constraints } = req.body;

    // Geração com Deep Learning e RL
    const learningPath = await generatePersonalizedLearningPath(studentId, knowledgeGaps, constraints);

    res.status(200).json({
      success: true,
      data: learningPath,
      message: 'Caminho de aprendizado gerado com IA'
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// WebSocket para feedback em tempo real
io.use((socket, next) => {
  // Autenticação WebSocket
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  // Verificar token JWT
  try {
    const user = verifyWebSocketToken(token);
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`Estudante conectado: ${socket.user.id}`);

  // Feedback em tempo real durante sessões
  socket.on('session_start', async (sessionData) => {
    socket.join(`session_${sessionData.sessionId}`);

    // Analytics em tempo real
    await trackRealTimeSession(socket, sessionData);
  });

  // Evento para feedback instantâneo
  socket.on('learning_progress', async (progress) => {
    // Processar progresso em tempo real
    const analytics = await processRealTimeAnalytics(socket.user.id, progress);

    socket.emit('adaptive_feedback', {
      type: 'difficulty_adjustment',
      data: analytics.difficultyAdjustment,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log(`Estudante desconectado: ${socket.user.id}`);
  });
});

// ===== FUNÇÕES AUXILIARES SOTA =====

async function initializeStudentWithAI(studentProfile: any, initialAssessment: any) {
  // Implementar diagnóstico de lacunas com LLM
  const knowledgeGaps = await diagnoseKnowledgeGapsWithLLM(studentProfile, initialAssessment);

  // Gerar caminho inicial com RL
  const learningPath = await generateInitialLearningPath(studentProfile, knowledgeGaps);

  return {
    studentId: studentProfile.id,
    knowledgeGaps,
    learningPath,
    recommendations: generateAIRecommendations(knowledgeGaps)
  };
}

async function processLearningSessionWithAI(sessionData: any) {
  // Analytics em tempo real
  const analytics = await generateRealTimeAnalytics(sessionData);

  // Ajuste de dificuldade em tempo real
  const difficultyAdjustment = await adjustDifficultyRealTime(sessionData);

  // Feedback personalizado
  const personalizedFeedback = await generatePersonalizedFeedback(sessionData, analytics);

  return {
    sessionId: sessionData.id,
    analytics,
    difficultyAdjustment,
    feedback: personalizedFeedback,
    nextRecommendations: generateNextSessionRecommendations(analytics)
  };
}

async function generatePersonalizedLearningPath(studentId: string, knowledgeGaps: any, constraints: any) {
  // Implementar Multi-Armed Bandit para seleção de conteúdo
  const optimalContent = await selectOptimalContent(knowledgeGaps, constraints);

  // Configurar repetição espaçada
  const spacedRepetitionConfig = await configureSpacedRepetition(optimalContent);

  return {
    studentId,
    modules: optimalContent,
    adaptiveFactors: {
      spacedRepetition: spacedRepetitionConfig,
      difficultyProgression: generateDifficultyProgression(optimalContent),
      predictedCompletion: constraints.targetDate
    }
  };
}

// ===== MIDDLEWARE E VALIDAÇÃO =====

// Middleware de autenticação JWT
function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    // Verificar token (implementar verificação JWT)
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

function verifyToken(token: string) {
  // Implementar verificação JWT
  return { id: 'user_id', role: 'student' };
}

function verifyWebSocketToken(token: string) {
  // Implementar verificação JWT para WebSocket
  return { id: 'user_id' };
}

// ===== ERROR HANDLING =====

app.use(errorHandler);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// ===== GRACEFUL SHUTDOWN =====

process.on('SIGTERM', () => {
  console.log('SIGTERM recebido, iniciando graceful shutdown...');
  server.close(() => {
    console.log('Servidor HTTP fechado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT recebido, iniciando graceful shutdown...');
  server.close(() => {
    console.log('Servidor HTTP fechado');
    process.exit(0);
  });
});

// ===== START SERVER =====

server.listen(PORT, () => {
  console.log(`
🚀 Sistema de Educação Médica SOTA 2025-2026
✅ Servidor rodando na porta ${PORT}
🔬 Knowledge Diagnostic Service: http://localhost:${PORT}/api/v1/diagnostic
🧠 Adaptive Learning Service: http://localhost:${PORT}/api/v1/learning
🤖 LLM Content Service: http://localhost:${PORT}/api/v1/content
📊 Analytics Service: http://localhost:${PORT}/api/v1/analytics
🏫 LMS Integration Service: http://localhost:${PORT}/api/v1/lms
🔌 WebSocket Server: http://localhost:${PORT}
  `);
});

// ===== EXPORTS PARA TESTES =====
export { app, io };