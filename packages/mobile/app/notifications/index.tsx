/**
 * Darwin MFC Mobile - Notifications Inbox (MVP)
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { listNotifications, markAllRead, markNotificationRead } from '../../lib/notifications';
import { Button, Card, Text } from '../../src/ui';

type NotificationVM = {
  id: string;
  createdAt: string;
  readAt: string | null;
  title: string;
  subtitle: string;
  href: string | null;
};

function buildVM(n: any): NotificationVM {
  const type = String(n.type ?? '');
  const payload = (n.payload ?? {}) as any;
  const createdAt = String(n.created_at ?? '');
  const readAt = (n.read_at ?? null) as string | null;

  if (type === 'case_comment' || type === 'comment_reply') {
    const caseId = String(payload.case_id ?? '');
    return {
      id: String(n.id),
      createdAt,
      readAt,
      title: type === 'case_comment' ? 'Novo comentário' : 'Nova resposta',
      subtitle: 'Abrir discussão do caso.',
      href: caseId ? `/community/cases/${encodeURIComponent(caseId)}` : null,
    };
  }
  if (type === 'forum_reply' || type === 'forum_reply_reply') {
    return {
      id: String(n.id),
      createdAt,
      readAt,
      title: 'Nova resposta no fórum',
      subtitle: 'Abrir discussão.',
      href: null,
    };
  }

  return {
    id: String(n.id),
    createdAt,
    readAt,
    title: type ? `Notificação: ${type}` : 'Notificação',
    subtitle: 'Abrir detalhes.',
    href: null,
  };
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { colors, theme, reduceTransparency } = useTheme();
  const isDark = theme === 'dark';

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);

  async function refresh() {
    setLoading(true);
    setError(null);
    const res = await listNotifications({ limit: 50 });
    setRows(res.data ?? []);
    setError(res.error);
    setLoading(false);
  }

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const items = useMemo(() => rows.map(buildVM), [rows]);
  const unread = useMemo(() => items.filter((i) => !i.readAt).length, [items]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ paddingTop: Math.max(insets.top, 10) }}>
        {reduceTransparency ? (
          <View style={[styles.header, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Header title="Notificações" onBack={() => router.back()} colors={colors} />
          </View>
        ) : (
          <BlurView tint={isDark ? 'dark' : 'light'} intensity={80} style={[styles.header, { borderColor: colors.border }]}>
            <Header title="Notificações" onBack={() => router.back()} colors={colors} />
          </BlurView>
        )}
      </View>

      {!user ? (
        <View style={{ padding: 16 }}>
          <Card padding={16} style={{ borderRadius: 18 }}>
            <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }}>
              Login necessário
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              Faça login na aba Perfil para ver suas notificações.
            </Text>
          </Card>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
              {unread > 0 ? `${unread} não lidas` : 'Tudo em dia.'}
            </Text>
            <Button
              title="Marcar tudo"
              variant="outline"
              size="sm"
              disabled={markingAll || unread === 0}
              onPress={async () => {
                setMarkingAll(true);
                setError(null);
                setRows((prev) => prev.map((r) => ({ ...r, read_at: r.read_at ?? new Date().toISOString() })));
                Haptics.selectionAsync().catch(() => undefined);
                const res = await markAllRead();
                if (res.error) {
                  setError(res.error);
                  await refresh();
                }
                setMarkingAll(false);
              }}
            />
          </View>

          {loading ? (
            <Card padding={16} style={{ borderRadius: 18, marginTop: 12 }}>
              <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7 }}>
                Carregando...
              </Text>
            </Card>
          ) : error ? (
            <Card padding={16} style={{ borderRadius: 18, marginTop: 12, borderColor: colors.error + '55' }}>
              <Text variant="titleMedium" style={{ color: colors.error, fontWeight: '900' }}>
                Erro
              </Text>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
                {error}
              </Text>
            </Card>
          ) : items.length === 0 ? (
            <Card padding={16} style={{ borderRadius: 18, marginTop: 12 }}>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
                Nenhuma notificação ainda.
              </Text>
            </Card>
          ) : (
            <View style={{ marginTop: 12, gap: 10 }}>
              {items.map((n) => {
                const unreadItem = !n.readAt;
                return (
                  <Pressable
                    key={n.id}
                    onPress={async () => {
                      if (unreadItem) {
                        setRows((prev) => prev.map((r) => (String(r.id) === n.id ? { ...r, read_at: new Date().toISOString() } : r)));
                        markNotificationRead(n.id).catch(() => undefined);
                      }
                      if (n.href) router.push(n.href as any);
                    }}
                    style={({ pressed }) => [pressed ? { opacity: 0.92 } : null]}
                  >
                    <Card variant="elevated" padding={16} style={{ borderRadius: 18 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                        <View style={[styles.dot, { backgroundColor: unreadItem ? colors.primary : colors.border }]} />
                        <View style={{ flex: 1, minWidth: 0 }}>
                          <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }} numberOfLines={2}>
                            {n.title}
                          </Text>
                          <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }} numberOfLines={2}>
                            {n.subtitle}
                          </Text>
                          <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.55, marginTop: 8 }}>
                            {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                          </Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.text + '88'} />
                      </View>
                    </Card>
                  </Pressable>
                );
              })}
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Header(props: { title: string; onBack: () => void; colors: any }) {
  return (
    <View style={styles.headerInner}>
      <Pressable onPress={props.onBack} style={styles.iconBtn} hitSlop={10}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={props.colors.text} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium" style={{ color: props.colors.text, fontWeight: '900' }} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerInner: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    paddingTop: 14,
    paddingBottom: 120,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
});
