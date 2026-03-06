/**
 * Darwin MFC Mobile - Profile Screen
 * User profile, settings, and preferences
 */
import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Avatar, Button, Card, Divider, Input, ListRow, Text } from '../../src/ui';

export default function PerfilScreen() {
  const router = useRouter();
  const { user, signOut, signIn, register, isLoading, error } = useAuth();
  const {
    colors,
    theme,
    themeMode,
    setThemeMode,
    reduceTransparency,
    setReduceTransparency,
  } = useTheme();

  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const displayName = useMemo(() => {
    const metaName = (user?.user_metadata as any)?.name;
    if (typeof metaName === 'string' && metaName.trim()) return metaName.trim();
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [user]);

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

        {!user ? (
          <Card variant="elevated" padding={16} style={styles.userCard}>
            <Text variant="titleLarge" style={[styles.userName, { color: colors.text }]}>
              Entrar
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              {isSupabaseConfigured
                ? 'Use sua conta para comentar, votar e participar da comunidade.'
                : 'Supabase não está configurado no app (EXPO_PUBLIC_SUPABASE_URL/ANON_KEY).'}
            </Text>

            <View style={{ marginTop: 14, gap: 10 }}>
              {authMode === 'register' ? (
                <Input
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
              ) : null}
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
              <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />

              {error ? (
                <Text variant="bodySmall" style={{ color: colors.error }}>
                  {error}
                </Text>
              ) : null}

              <Button
                title={authMode === 'register' ? 'Criar conta' : 'Entrar'}
                variant="primary"
                fullWidth
                disabled={!isSupabaseConfigured || isLoading}
                onPress={async () => {
                  if (authMode === 'register') {
                    await register(email.trim(), password, name.trim() || 'Usuário');
                  } else {
                    await signIn(email.trim(), password);
                  }
                  setPassword('');
                }}
              />

              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                <Button
                  title="Entrar"
                  variant={authMode === 'signin' ? 'secondary' : 'ghost'}
                  size="sm"
                  disabled={isLoading}
                  onPress={() => setAuthMode('signin')}
                />
                <Button
                  title="Criar conta"
                  variant={authMode === 'register' ? 'secondary' : 'ghost'}
                  size="sm"
                  disabled={isLoading}
                  onPress={() => setAuthMode('register')}
                />
              </View>
            </View>
          </Card>
        ) : null}

        {/* User Card */}
        {user ? (
          <Card variant="elevated" padding={16} style={styles.userCard}>
            <View style={styles.userContent}>
              <Avatar label={displayName} size={80} />
              <View style={styles.userInfo}>
                <Text variant="titleLarge" style={[styles.userName, { color: colors.text }]}>
                  {displayName}
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7 }}>
                  {user.email ?? ''}
                </Text>
              </View>
            </View>
          </Card>
        ) : null}

        {/* Stats */}
        <Card variant="elevated" padding={16} style={styles.statsCard}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
            Estatísticas
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: '800' }}>
                145
              </Text>
              <Text variant="bodySmall" style={{ color: colors.text }}>Flashcards</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: '800' }}>
                32
              </Text>
              <Text variant="bodySmall" style={{ color: colors.text }}>Quizzes</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={{ color: colors.primary, fontWeight: '800' }}>
                7
              </Text>
              <Text variant="bodySmall" style={{ color: colors.text }}>Sequência</Text>
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Card variant="elevated" padding={12} style={styles.settingsCard}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 6 }]}>
            Configurações
          </Text>

          <ListRow
            title="Seguir sistema"
            left={<MaterialCommunityIcons name="cellphone-cog" size={18} color={colors.text} />}
            right={(
              <Switch
                value={themeMode === 'system'}
                onValueChange={(v) => setThemeMode(v ? 'system' : theme)}
                trackColor={{ false: 'rgba(0,0,0,0.15)', true: colors.primary }}
                thumbColor="#fff"
              />
            )}
          />
          <Divider style={{ marginHorizontal: 12 }} />
          <ListRow
            title="Modo escuro"
            left={<MaterialCommunityIcons name="theme-light-dark" size={18} color={colors.text} />}
            right={(
              <Switch
                value={theme === 'dark'}
                onValueChange={(v) => setThemeMode(v ? 'dark' : 'light')}
                trackColor={{ false: 'rgba(0,0,0,0.15)', true: colors.primary }}
                thumbColor="#fff"
              />
            )}
          />
          <Divider style={{ marginHorizontal: 12 }} />
          <ListRow
            title="Reduzir transparência"
            description="Desliga blur e efeitos de vidro"
            left={<MaterialCommunityIcons name="blur" size={18} color={colors.text} />}
            right={(
              <Switch
                value={reduceTransparency}
                onValueChange={setReduceTransparency}
                trackColor={{ false: 'rgba(0,0,0,0.15)', true: colors.primary }}
                thumbColor="#fff"
              />
            )}
          />
          <Divider style={{ marginHorizontal: 12 }} />
          <ListRow
            title="Notificações"
            left={<MaterialCommunityIcons name="bell-outline" size={18} color={colors.text} />}
            description="Inbox do app"
            right={<MaterialCommunityIcons name="chevron-right" size={20} color={colors.text} />}
            onPress={() => router.push('/notifications' as any)}
          />
          <Divider style={{ marginHorizontal: 12 }} />
          <ListRow
            title="Idioma"
            description="Português (BR)"
            left={<MaterialCommunityIcons name="translate" size={18} color={colors.text} />}
            right={<MaterialCommunityIcons name="chevron-right" size={20} color={colors.text} />}
            onPress={() => {}}
          />
        </Card>

        {/* Sign Out */}
        {user ? (
          <Button
            title="Sair da conta"
            variant="outline"
            onPress={handleSignOut}
            containerStyle={[styles.signOutButton, { borderColor: colors.error }]}
            textStyle={{ color: colors.error }}
          />
        ) : null}

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
    paddingBottom: 120,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userCard: {
    marginBottom: 16,
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
  },
  signOutButton: {
    marginTop: 8,
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
  },
});
