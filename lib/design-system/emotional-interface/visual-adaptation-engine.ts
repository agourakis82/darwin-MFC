/**
 * Engine de Adaptação Visual Dinâmica
 * Darwin-MFC Interface Emocional SOTA
 * 
 * Adapta visualmente a interface baseado no estado emocional do médico
 * para reduzir estresse, fadiga e prevenir burnout em tempo real.
 */

import { EmotionalState, BurnoutRisk } from './emotional-monitor';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { animations } from '../tokens/animations';

export interface VisualAdaptation {
  colorPalette: string;
  typographyScale: number;
  animationIntensity: number;
  layoutDensity: 'sparse' | 'comfortable' | 'dense';
  contrastLevel: 'low' | 'medium' | 'high';
  focusMode: boolean;
  calmMode: boolean;
  energyBoostMode: boolean;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  muted: string;
}

export interface TypographyConfig {
  fontSize: Record<string, string>;
  lineHeight: Record<string, number>;
  fontWeight: Record<string, number | string>;
}

export interface AnimationConfig {
  duration: Record<string, string>;
  easing: string;
  transitions: Record<string, string>;
}

export class VisualAdaptationEngine {
  private currentAdaptation: VisualAdaptation;
  private previousAdaptation: VisualAdaptation | null = null;
  private adaptationHistory: VisualAdaptation[] = [];
  private readonly MAX_HISTORY = 10;

  // Paletas de cores baseadas em pesquisa sobre cores que reduzem estresse
  private readonly COLOR_PALETTES = {
    calm: {
      primary: '#4A90A4', // Azul calmo
      secondary: '#A4C8D8', // Azul claro
      accent: '#7BA3B8', // Azul médio
      background: '#F8FAFB', // Branco azulado
      surface: '#FFFFFF',
      text: '#2C3E50', // Cinza escuro suave
      textSecondary: '#5D6D7E', // Cinza médio
      success: '#27AE60', // Verde suave
      warning: '#F39C12', // Laranja suave
      error: '#E74C3C', // Vermelho suave
      muted: '#BDC3C7' // Cinza claro
    },
    energizing: {
      primary: '#3498DB', // Azul vibrante
      secondary: '#5DADE2', // Azul claro vibrante
      accent: '#48C9B0', // Turquesa energizante
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#2C3E50',
      textSecondary: '#5D6D7E',
      success: '#2ECC71',
      warning: '#F1C40F',
      error: '#E74C3C',
      muted: '#95A5A6'
    },
    focused: {
      primary: '#2C3E50', // Azul escuro profissional
      secondary: '#34495E', // Cinza azulado
      accent: '#3498DB', // Azul direto
      background: '#FFFFFF',
      surface: '#ECF0F1',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      success: '#27AE60',
      warning: '#F39C12',
      error: '#C0392B',
      muted: '#BDC3C7'
    },
    soothing: {
      primary: '#16A085', // Verde água relaxante
      secondary: '#1ABC9C', // Turquesa suave
      accent: '#48C9B0', // Verde água claro
      background: '#FEFEFE', // Branco suave
      surface: '#FFFFFF',
      text: '#2C3E50',
      textSecondary: '#5D6D7E',
      success: '#27AE60',
      warning: '#F4D03F', // Amarelo suave
      error: '#EC7063', // Vermelho suave
      muted: '#D5DBDB'
    },
    highContrast: {
      primary: '#000000', // Preto
      secondary: '#333333', // Cinza escuro
      accent: '#0066CC', // Azul forte
      background: '#FFFFFF', // Branco
      surface: '#F5F5F5', // Cinza muito claro
      text: '#000000', // Preto
      textSecondary: '#333333', // Cinza escuro
      success: '#008000', // Verde escuro
      warning: '#CC6600', // Laranja escuro
      error: '#CC0000', // Vermelho escuro
      muted: '#666666' // Cinza médio
    }
  };

  constructor() {
    this.currentAdaptation = {
      colorPalette: 'focused',
      typographyScale: 1.0,
      animationIntensity: 0.5,
      layoutDensity: 'comfortable',
      contrastLevel: 'medium',
      focusMode: false,
      calmMode: false,
      energyBoostMode: false
    };
  }

  /**
   * Analisa o estado emocional e determina as adaptações visuais necessárias
   */
  public analyzeAndAdapt(emotionalState: EmotionalState, burnoutRisk: BurnoutRisk): VisualAdaptation {
    const newAdaptation = this.determineAdaptation(emotionalState, burnoutRisk);
    
    // Aplicar transições suaves entre adaptações
    this.currentAdaptation = this.applySmoothTransition(
      this.currentAdaptation, 
      newAdaptation
    );

    // Armazenar no histórico
    this.addToHistory(this.currentAdaptation);

    return this.currentAdaptation;
  }

  /**
   * Determina a adaptação ideal baseada no estado emocional
   */
  private determineAdaptation(emotionalState: EmotionalState, burnoutRisk: BurnoutRisk): VisualAdaptation {
    let adaptation: VisualAdaptation = {
      colorPalette: 'focused',
      typographyScale: 1.0,
      animationIntensity: 0.5,
      layoutDensity: 'comfortable',
      contrastLevel: 'medium',
      focusMode: false,
      calmMode: false,
      energyBoostMode: false
    };

    // ANÁLISE DE ESTRESSE ALTO
    if (emotionalState.stressLevel > 75) {
      adaptation = this.applyAntiStressSettings(adaptation);
    }

    // ANÁLISE DE FADIGA ALTA
    if (emotionalState.fatigueLevel > 80) {
      adaptation = this.applyFatigueReductionSettings(adaptation);
    }

    // ANÁLISE DE BAIXO FOCO
    if (emotionalState.focusLevel < 30) {
      adaptation = this.applyFocusEnhancementSettings(adaptation);
    }

    // ANÁLISE DE BAIXA ENERGIA
    if (emotionalState.energyLevel < 25) {
      adaptation = this.applyEnergyBoostSettings(adaptation);
    }

    // ANÁLISE DE ALTO RISCO DE BURNOUT
    if (burnoutRisk.current > 70) {
      // Combinar múltiplas adaptações para burnout crítico
      adaptation = this.applyBurnoutPreventionSettings(adaptation);
    }

    // ANÁLISE DE FOCO ALTO (ESTADO IDEAL)
    if (emotionalState.focusLevel > 80 && 
        emotionalState.stressLevel < 40 && 
        emotionalState.energyLevel > 60) {
      adaptation.colorPalette = 'focused';
      adaptation.layoutDensity = 'dense'; // Interface rica quando o médico está focado
      adaptation.animationIntensity = 0.6;
      adaptation.contrastLevel = 'medium';
    }

    return adaptation;
  }

  /**
   * Aplica configurações específicas para reduzir estresse
   */
  private applyAntiStressSettings(adaptation: VisualAdaptation): VisualAdaptation {
    // Usar cores que reduzem cortisol (azuis e verdes suaves)
    adaptation.colorPalette = 'calm';
    
    // Aumentar espaçamento para reduzir sobrecarga visual
    adaptation.layoutDensity = 'sparse';
    
    // Reduzir animações que podem causar ansiedade
    adaptation.animationIntensity = Math.min(adaptation.animationIntensity, 0.3);
    
    return adaptation;
  }

  /**
   * Aplica configurações para reduzir fadiga
   */
  private applyFatigueReductionSettings(adaptation: VisualAdaptation): VisualAdaptation {
    // Cores que reduzem cansaço visual
    adaptation.colorPalette = 'soothing';
    
    // Texto maior para reduzir esforço de leitura
    adaptation.typographyScale = Math.max(adaptation.typographyScale, 1.15);
    
    // Alto contraste para facilitar leitura
    adaptation.contrastLevel = 'high';
    
    // Layout simplificado
    adaptation.layoutDensity = 'sparse';
    
    return adaptation;
  }

  /**
   * Aplica configurações para melhorar foco
   */
  private applyFocusEnhancementSettings(adaptation: VisualAdaptation): VisualAdaptation {
    // Reduzir cores distractions
    adaptation.colorPalette = 'focused';
    
    // Modo foco: interface minimalista
    adaptation.layoutDensity = 'sparse';
    
    // Alto contraste para clareza
    adaptation.contrastLevel = 'high';
    
    // Remover animações desnecessárias
    adaptation.animationIntensity = Math.min(adaptation.animationIntensity, 0.4);
    
    return adaptation;
  }

  /**
   * Aplica configurações para energizar
   */
  private applyEnergyBoostSettings(adaptation: VisualAdaptation): VisualAdaptation {
    // Cores energizantes (tons de azul e turquesa)
    adaptation.colorPalette = 'energizing';
    
    // Animações mais dinâmicas
    adaptation.animationIntensity = Math.max(adaptation.animationIntensity, 0.6);
    
    // Layout ativo
    adaptation.layoutDensity = 'comfortable';
    
    return adaptation;
  }

  /**
   * Aplica configurações para prevenir burnout
   */
  private applyBurnoutPreventionSettings(adaptation: VisualAdaptation): VisualAdaptation {
    // Combinar múltiplas estratégias anti-burnout
    adaptation.calmMode = true;
    adaptation.colorPalette = 'calm';
    
    // Interface extremamente simplificada
    adaptation.layoutDensity = 'sparse';
    adaptation.typographyScale = Math.max(adaptation.typographyScale, 1.2);
    
    // Animações mínimas
    adaptation.animationIntensity = Math.min(adaptation.animationIntensity, 0.2);
    
    // Alto contraste para facilitar leitura
    adaptation.contrastLevel = 'high';
    
    return adaptation;
  }

  /**
   * Aplica transições suaves entre adaptações para evitar choque visual
   */
  private applySmoothTransition(
    current: VisualAdaptation, 
    target: VisualAdaptation
  ): VisualAdaptation {
    // Se a mudança for muito drástica, aplicar gradualmente
    const shouldGradualTransition = this.shouldUseGradualTransition(current, target);
    
    if (shouldGradualTransition) {
      return this.calculateGradualTransition(current, target);
    }
    
    return target;
  }

  /**
   * Determina se deve usar transição gradual
   */
  private shouldUseGradualTransition(current: VisualAdaptation, target: VisualAdaptation): boolean {
    const differences = [
      current.colorPalette !== target.colorPalette,
      Math.abs(current.typographyScale - target.typographyScale) > 0.3,
      Math.abs(current.animationIntensity - target.animationIntensity) > 0.4,
      current.layoutDensity !== target.layoutDensity,
      current.contrastLevel !== target.contrastLevel
    ];
    
    const significantChanges = differences.filter(Boolean).length;
    return significantChanges >= 3;
  }

  /**
   * Calcula transição gradual entre adaptações
   */
  private calculateGradualTransition(current: VisualAdaptation, target: VisualAdaptation): VisualAdaptation {
    const transitionSpeed = 0.3; // 30% da diferença por vez
    
    return {
      colorPalette: current.colorPalette, // Manter cor atual até transição completa
      typographyScale: current.typographyScale + (target.typographyScale - current.typographyScale) * transitionSpeed,
      animationIntensity: current.animationIntensity + (target.animationIntensity - current.animationIntensity) * transitionSpeed,
      layoutDensity: current.layoutDensity, // Mudar densidade de uma vez
      contrastLevel: current.contrastLevel, // Manter contraste atual
      focusMode: target.focusMode,
      calmMode: target.calmMode,
      energyBoostMode: target.energyBoostMode
    };
  }

  /**
   * Adiciona adaptação ao histórico
   */
  private addToHistory(adaptation: VisualAdaptation): void {
    this.adaptationHistory.push({ ...adaptation });
    
    // Manter apenas as últimas adaptações
    if (this.adaptationHistory.length > this.MAX_HISTORY) {
      this.adaptationHistory = this.adaptationHistory.slice(-this.MAX_HISTORY);
    }
  }

  /**
   * Obtém paleta de cores baseada na adaptação atual
   */
  public getColorPalette(): ColorPalette {
    const paletteName = this.currentAdaptation.colorPalette;
    return this.COLOR_PALETTES[paletteName as keyof typeof this.COLOR_PALETTES] || this.COLOR_PALETTES.focused;
  }

  /**
   * Obtém configuração de tipografia baseada na adaptação
   */
  public getTypographyConfig(): TypographyConfig {
    const scale = this.currentAdaptation.typographyScale;
    
    return {
      fontSize: {
        xs: `${12 * scale}px`,
        sm: `${14 * scale}px`,
        base: `${16 * scale}px`,
        lg: `${18 * scale}px`,
        xl: `${20 * scale}px`,
        '2xl': `${24 * scale}px`,
        '3xl': `${30 * scale}px`,
        '4xl': `${36 * scale}px`
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    };
  }

  /**
   * Obtém configuração de animações baseada na adaptação
   */
  public getAnimationConfig(): AnimationConfig {
    const intensity = this.currentAdaptation.animationIntensity;
    
    return {
      duration: {
        fast: `${200 * intensity}ms`,
        normal: `${300 * intensity}ms`,
        slow: `${500 * intensity}ms`
      },
      easing: this.currentAdaptation.calmMode ? 'ease-out' : 'ease-in-out',
      transitions: {
        color: `${300 * intensity}ms`,
        transform: `${250 * intensity}ms`,
        opacity: `${200 * intensity}ms`
      }
    };
  }

  /**
   * Obtém configuração de layout baseada na adaptação
   */
  public getLayoutConfig(): any {
    const density = this.currentAdaptation.layoutDensity;
    const contrast = this.currentAdaptation.contrastLevel;
    
    const densityConfigs = {
      sparse: {
        spacing: '1.5rem',
        padding: '1.5rem',
        borderRadius: '8px',
        gap: '1rem'
      },
      comfortable: {
        spacing: '1rem',
        padding: '1rem',
        borderRadius: '6px',
        gap: '0.75rem'
      },
      dense: {
        spacing: '0.75rem',
        padding: '0.75rem',
        borderRadius: '4px',
        gap: '0.5rem'
      }
    };
    
    const contrastConfigs = {
      low: {
        borderWidth: '1px',
        shadowBlur: '2px',
        opacity: 0.8
      },
      medium: {
        borderWidth: '1px',
        shadowBlur: '4px',
        opacity: 1.0
      },
      high: {
        borderWidth: '2px',
        shadowBlur: '8px',
        opacity: 1.0
      }
    };
    
    return {
      ...densityConfigs[density],
      ...contrastConfigs[contrast]
    };
  }

  /**
   * Obtém a adaptação atual
   */
  public getCurrentAdaptation(): VisualAdaptation {
    return { ...this.currentAdaptation };
  }

  /**
   * Obtém histórico de adaptações
   */
  public getAdaptationHistory(): VisualAdaptation[] {
    return [...this.adaptationHistory];
  }

  /**
   * Verifica se um modo específico está ativo
   */
  public isModeActive(mode: 'calm' | 'focus' | 'energy'): boolean {
    switch (mode) {
      case 'calm':
        return this.currentAdaptation.calmMode;
      case 'focus':
        return this.currentAdaptation.focusMode;
      case 'energy':
        return this.currentAdaptation.energyBoostMode;
      default:
        return false;
    }
  }

  /**
   * Força uma adaptação específica (para testes ou emergências)
   */
  public forceAdaptation(adaptation: Partial<VisualAdaptation>): void {
    this.currentAdaptation = { ...this.currentAdaptation, ...adaptation };
    this.addToHistory(this.currentAdaptation);
  }

  /**
   * Reseta para configuração padrão
   */
  public resetToDefault(): void {
    this.currentAdaptation = {
      colorPalette: 'focused',
      typographyScale: 1.0,
      animationIntensity: 0.5,
      layoutDensity: 'comfortable',
      contrastLevel: 'medium',
      focusMode: false,
      calmMode: false,
      energyBoostMode: false
    };
  }
}