/**
 * Darwin MFC Mobile - Study Screen
 * Quiz, flashcards, and study tools
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

interface StudyModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalItems: number;
  completedItems: number;
}

const STUDY_MODULES: StudyModule[] = [
  { id: '1', title: 'Cardiologia', description: 'Doenças cardiovasculares', progress: 0.75, totalItems: 50, completedItems: 38 },
  { id: '2', title: 'Antibióticos', description: 'Farmacologia antimicrobiana', progress: 0.45, totalItems: 40, completedItems: 18 },
  { id: '3', title: 'Endocrinologia', description: 'Diabetes e tireoide', progress: 0.90, totalItems: 30, completedItems: 27 },
  { id: '4', title: 'Pediatria', description: 'Puericultura e vacinas', progress: 0.20, totalItems: 35, completedItems: 7 },
];

export default function EstudoScreen() {
  const { colors } = useTheme();

  const renderModule = (module: StudyModule) => (
    <Card
      key={module.id}
      style={[styles.moduleCard, { backgroundColor: colors.surface }]}
      mode="elevated"
    >
      <Card.Content>
        <Text variant="titleMedium" style={[styles.moduleTitle, { color: colors.text }]}>
          {module.title}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginBottom: 12 }}>
          {module.description}
        </Text>
        <ProgressBar
          progress={module.progress}
          color={colors.primary}
          style={styles.progressBar}
        />
        <Text variant="bodySmall" style={{ color: colors.text, marginTop: 8 }}>
          {module.completedItems}/{module.totalItems} itens ({Math.round(module.progress * 100)}%)
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" textColor={colors.primary}>
          Flashcards
        </Button>
        <Button mode="contained" buttonColor={colors.primary}>
          Quiz
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
          Estudo
        </Text>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium" style={styles.statValue}>7</Text>
              <Text variant="bodySmall" style={styles.statLabel}>Dias seguidos</Text>
            </Card.Content>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: colors.accent }]}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium" style={styles.statValue}>92%</Text>
              <Text variant="bodySmall" style={styles.statLabel}>Média Quiz</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Study Modules */}
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
          Módulos de Estudo
        </Text>
        {STUDY_MODULES.map(renderModule)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    opacity: 0.9,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  moduleCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  moduleTitle: {
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});
