/**
 * Darwin MFC Mobile - Protocols Screen
 * Apple-native list of clinical flowchart protocols (offline, local dataset)
 */
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MMKV } from 'react-native-mmkv';
import { todosProtocolosFlowchart, type Protocolo } from '@darwin-mfc/protocol-data';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, Input, Text } from '../../src/ui';

const storage = new MMKV();

function runnerKey(protocolId: string) {
  return `darwin:protocol-runner:${protocolId}`;
}

function hasSavedSession(protocolId: string) {
  try {
    return Boolean(storage.getString(runnerKey(protocolId)));
  } catch {
    return false;
  }
}

function categoryLabel(category: string) {
  switch (category) {
    case 'cardiovascular': return 'Cardiovascular';
    case 'endocrino': return 'Endócrino';
    case 'respiratorio': return 'Respiratório';
    case 'saude_mental': return 'Saúde mental';
    case 'infectologia':
    case 'infeccioso': return 'Infectologia';
    case 'materno_infantil': return 'Materno-infantil';
    case 'urgencia': return 'Urgência';
    case 'musculoesqueletico': return 'Músculo-esquelético';
    case 'neurologico': return 'Neurológico';
    case 'gastro': return 'Gastro';
    default: return category;
  }
}

export default function ProtocolosScreen() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of todosProtocolosFlowchart) set.add(String(p.categoria));
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todosProtocolosFlowchart.filter((p) => {
      if (category !== 'all' && String(p.categoria) !== category) return false;
      if (!q) return true;
      return (
        String(p.titulo).toLowerCase().includes(q) ||
        String(p.descricao).toLowerCase().includes(q) ||
        (p.tags || []).some((t) => String(t).toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const renderItem = ({ item }: { item: Protocolo }) => {
    const canContinue = hasSavedSession(item.id);
    return (
      <Pressable
        onPress={() => router.push(`/protocolos/${encodeURIComponent(item.id)}` as any)}
        style={({ pressed }) => [
          styles.itemPress,
          pressed ? { transform: [{ scale: 0.99 }], opacity: 0.92 } : null,
        ]}
      >
        <Card variant="elevated" padding={16} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '800' }} numberOfLines={2}>
                {item.titulo}
              </Text>
              {item.subtitulo ? (
                <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 4 }} numberOfLines={2}>
                  {item.subtitulo}
                </Text>
              ) : null}
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={isDark ? 'rgba(244,244,242,0.55)' : 'rgba(26,26,24,0.5)'}
            />
          </View>

          <View style={styles.metaRow}>
            <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
              <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>
                {categoryLabel(String(item.categoria))}
              </Text>
            </View>
            <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
              <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>
                {item.nodes?.length ?? 0} etapas
              </Text>
            </View>
            {canContinue ? (
              <View style={[styles.chip, { borderColor: colors.primary, backgroundColor: colors.primary + '18' }]}>
                <Text variant="bodySmall" style={{ color: colors.primary, fontWeight: '800', fontSize: 12 }}>
                  Continuar
                </Text>
              </View>
            ) : null}
          </View>

          <Text
            variant="bodySmall"
            style={{ color: colors.text, opacity: 0.7, marginTop: 10 }}
            numberOfLines={2}
          >
            {item.descricao}
          </Text>
        </Card>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ color: colors.text, fontWeight: '900' }}>
          Protocolos
        </Text>
        <Input
          placeholder="Buscar protocolo..."
          value={query}
          onChangeText={setQuery}
          left={<MaterialCommunityIcons name="magnify" size={18} color={isDark ? 'rgba(244,244,242,0.7)' : 'rgba(26,26,24,0.55)'} />}
        />

        <FlatList
          data={categories}
          keyExtractor={(c) => c}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          renderItem={({ item: c }) => {
            const selected = c === category;
            return (
              <Pressable
                onPress={() => setCategory(c)}
                style={({ pressed }) => [
                  styles.filterChip,
                  {
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary + '1A' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text variant="bodySmall" style={{ color: selected ? colors.primary : colors.text, fontWeight: '800' }}>
                  {c === 'all' ? 'Todos' : categoryLabel(c)}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, gap: 12 },
  chipsRow: { gap: 10, paddingVertical: 2 },
  filterChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  list: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 120,
    gap: 12,
  },
  itemPress: { marginBottom: 12 },
  card: { borderRadius: 18 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

