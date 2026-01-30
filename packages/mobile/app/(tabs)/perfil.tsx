/**
 * Darwin MFC Mobile - Profile Screen
 * User profile, settings, and preferences
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, Text, Button, List, Switch, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function PerfilScreen() {
  const { user, signOut } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
          Perfil
        </Text>

        {/* User Card */}
        <Card style={[styles.userCard, { backgroundColor: colors.surface }]}>
          <Card.Content style={styles.userContent}>
            <Avatar.Text
              size={80}
              label={user?.name?.slice(0, 2).toUpperCase() || 'US'}
              style={{ backgroundColor: colors.primary }}
            />
            <View style={styles.userInfo}>
              <Text variant="titleLarge" style={[styles.userName, { color: colors.text }]}>
                {user?.name || 'Usuário'}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7 }}>
                {user?.email || 'usuario@email.com'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Stats */}
        <Card style={[styles.statsCard, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
              Estatísticas
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: 'bold' }}>
                  145
                </Text>
                <Text variant="bodySmall" style={{ color: colors.text }}>Flashcards</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: 'bold' }}>
                  32
                </Text>
                <Text variant="bodySmall" style={{ color: colors.text }}>Quizzes</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: 'bold' }}>
                  7
                </Text>
                <Text variant="bodySmall" style={{ color: colors.text }}>Sequência</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={[styles.settingsCard, { backgroundColor: colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
              Configurações
            </Text>
            <List.Item
              title="Modo Escuro"
              titleStyle={{ color: colors.text }}
              left={(props) => <List.Icon {...props} icon="theme-light-dark" color={colors.text} />}
              right={() => (
                <Switch
                  value={theme === 'dark'}
                  onValueChange={toggleTheme}
                  color={colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Notificações"
              titleStyle={{ color: colors.text }}
              left={(props) => <List.Icon {...props} icon="bell-outline" color={colors.text} />}
              right={() => <Switch value={true} color={colors.primary} />}
            />
            <Divider />
            <List.Item
              title="Idioma"
              description="Português (BR)"
              titleStyle={{ color: colors.text }}
              descriptionStyle={{ color: colors.text, opacity: 0.7 }}
              left={(props) => <List.Icon {...props} icon="translate" color={colors.text} />}
              right={(props) => <List.Icon {...props} icon="chevron-right" color={colors.text} />}
            />
          </Card.Content>
        </Card>

        {/* Sign Out */}
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
          textColor={colors.error}
        >
          Sair da Conta
        </Button>

        <Text variant="bodySmall" style={[styles.version, { color: colors.text, opacity: 0.5 }]}>
          Darwin MFC Mobile v1.0.0
        </Text>
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
  userCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontWeight: '600',
  },
  statsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  settingsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  signOutButton: {
    marginTop: 8,
    borderColor: '#ef4444',
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
  },
});
