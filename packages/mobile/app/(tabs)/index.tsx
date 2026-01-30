/**
 * Darwin MFC Mobile - Home Screen
 * Dashboard with stats, quick actions, and recent activity
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Text, Surface, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface StatItem {
  title: string;
  value: string;
  icon: string;
}

interface QuickAction {
  title: string;
  icon: string;
  route: string;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  const stats: StatItem[] = [
    { title: 'Sequência', value: '7 dias', icon: 'calendar' },
    { title: 'Flashcards', value: '145', icon: 'cards' },
    { title: 'Quiz Score', value: '92%', icon: 'trophy' },
  ];

  const quickActions: QuickAction[] = [
    { title: 'Iniciar Quiz', icon: 'play', route: '/estudo' },
    { title: 'Flashcards', icon: 'cards', route: '/estudo' },
    { title: 'Medicamentos', icon: 'pill', route: '/medicamentos' },
  ];

  const recentActivity = [
    'Quiz antibióticos completado - 95%',
    '10 novos flashcards de cardiologia',
    'Revisão de medicamentos para diabetes',
    'Meta diária de estudo alcançada',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome */}
        <Text variant="headlineMedium" style={[styles.welcome, { color: colors.text }]}>
          Olá, {user?.name || 'Estudante'}!
        </Text>

        {/* Stats */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
            Estatísticas
          </Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <Surface
                key={stat.title}
                style={[styles.statCard, { backgroundColor: colors.surface }]}
                elevation={2}
              >
                <Text variant="headlineSmall" style={[styles.statValue, { color: colors.primary }]}>
                  {stat.value}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.text }}>
                  {stat.title}
                </Text>
              </Surface>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
            Ações Rápidas
          </Text>
          <View style={styles.actionsRow}>
            {quickActions.map((action) => (
              <Button
                key={action.title}
                mode="contained"
                icon={action.icon}
                onPress={() => router.push(action.route as any)}
                style={styles.actionButton}
                buttonColor={colors.primary}
              >
                {action.title}
              </Button>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
            Atividade Recente
          </Text>
          <Card style={[styles.activityCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              {recentActivity.map((item, index) => (
                <React.Fragment key={index}>
                  <View style={styles.activityItem}>
                    <Text variant="bodyMedium" style={{ color: colors.text }}>
                      • {item}
                    </Text>
                  </View>
                  {index < recentActivity.length - 1 && <Divider style={styles.divider} />}
                </React.Fragment>
              ))}
            </Card.Content>
          </Card>
        </View>
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
  welcome: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: 100,
  },
  activityCard: {
    borderRadius: 12,
  },
  activityItem: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 4,
  },
});
