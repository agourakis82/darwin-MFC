/**
 * Darwin MFC Mobile - Community (Cases)
 * Premium read experience, progressive enhancement: works without login.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MMKV } from 'react-native-mmkv';
import { useTheme } from '../../contexts/ThemeContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { listPublishedCases } from '../../lib/community';
import { Card, Input, Text } from '../../src/ui';

const storage = new MMKV();
const CACHE_KEY = 'darwin:community:cases:list:v1';

export default function CommunityCasesScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fast path: show cached content immediately (offline-friendly).
    try {
      const cached = storage.getString(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setRows(parsed);
      }
    } catch {
      // ignore
    }

    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      const res = await listPublishedCases({ limit: 50 });
      if (!mounted) return;
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      setRows(res.data ?? []);
      try {
        storage.set(CACHE_KEY, JSON.stringify(res.data ?? []));
      } catch {
        // ignore
      }
      setLoading(false);
    })();

    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      String(r.title ?? '').toLowerCase().includes(q) ||
      String(r.specialty ?? '').toLowerCase().includes(q) ||
      (Array.isArray(r.tags) && r.tags.some((t: any) => String(t).toLowerCase().includes(q)))
    );
  }, [query, rows]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed ? { opacity: 0.85 } : null]}
          hitSlop={10}
        >
          <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text variant="headlineMedium" style={{ color: colors.text, fontWeight: '900' }}>
            Comunidade
          </Text>
          <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 2 }}>
            Casos clínicos publicados
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <Input
          placeholder="Buscar casos..."
          value={query}
          onChangeText={setQuery}
          left={<MaterialCommunityIcons name="magnify" size={18} color={isDark ? 'rgba(244,244,242,0.7)' : 'rgba(26,26,24,0.55)'} />}
        />
      </View>

      {!isSupabaseConfigured ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Card padding={16} style={{ borderRadius: 18 }}>
            <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }}>
              Supabase não configurado
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              Configure `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` para habilitar o social no mobile.
            </Text>
          </Card>
        </View>
      ) : null}

      {loading && rows.length === 0 ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Card padding={16} style={{ borderRadius: 18 }}>
            <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7 }}>
              Carregando...
            </Text>
          </Card>
        </View>
      ) : error ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Card padding={16} style={{ borderRadius: 18, borderColor: colors.error + '55' }}>
            <Text variant="titleMedium" style={{ color: colors.error, fontWeight: '900' }}>
              Erro
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              {error}
            </Text>
          </Card>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/community/cases/${encodeURIComponent(String(item.id))}` as any)}
              style={({ pressed }) => [pressed ? { opacity: 0.92 } : null]}
            >
              <Card variant="elevated" padding={16} style={styles.caseCard}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }} numberOfLines={2}>
                      {String(item.title ?? 'Caso clínico')}
                    </Text>
                    <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }} numberOfLines={2}>
                      {String(item.specialty ?? 'Discussão clínica')}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                        <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '800', fontSize: 12 }}>
                          {String(item.difficulty ?? '—')}
                        </Text>
                      </View>
                      <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                        <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '800', fontSize: 12 }}>
                          👍 {Number(item.upvotes ?? 0)}
                        </Text>
                      </View>
                      <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                        <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '800', fontSize: 12 }}>
                          👁 {Number(item.views ?? 0)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={22} color={colors.text + '88'} />
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  caseCard: {
    borderRadius: 18,
    marginBottom: 12,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

