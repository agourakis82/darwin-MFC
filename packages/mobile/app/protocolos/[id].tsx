/**
 * Darwin MFC Mobile - Guided Protocol Runner
 * Step-by-step decision track with session-local persistence (MMKV).
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MMKV } from 'react-native-mmkv';
import { getProtocoloById, type Protocolo } from '@darwin-mfc/protocol-data';
import {
  canGoBack,
  chooseOption,
  getEdgeById,
  getNextOptions,
  getNodeById,
  jumpToNode,
  resetRunner,
  sanitizeRunnerState,
  goBack as goBackState,
  type ProtocolRunnerState,
} from '@darwin-mfc/protocol-runner';
import { useTheme } from '../../contexts/ThemeContext';
import { Button, Card, Text } from '../../src/ui';

const storage = new MMKV();

function keyFor(id: string) {
  return `darwin:protocol-runner:${id}`;
}

export default function ProtocolRunnerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const protocolId = String(id ?? '');

  const { colors, theme, reduceTransparency } = useTheme();
  const isDark = theme === 'dark';

  const protocol: Protocolo | undefined = useMemo(() => {
    if (!protocolId) return undefined;
    return getProtocoloById(protocolId);
  }, [protocolId]);

  const [state, setState] = useState<ProtocolRunnerState | null>(null);
  const [trackOpen, setTrackOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

  useEffect(() => {
    if (!protocol) return;
    let raw: any = null;
    try {
      const s = storage.getString(keyFor(protocol.id));
      raw = s ? JSON.parse(s) : null;
    } catch {
      raw = null;
    }
    setState(sanitizeRunnerState(protocol as any, raw));
  }, [protocol]);

  useEffect(() => {
    if (!protocol || !state) return;
    try {
      storage.set(keyFor(protocol.id), JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [protocol, state]);

  const activeNode = useMemo(() => {
    if (!protocol || !state) return null;
    return getNodeById(protocol as any, state.activeNodeId) as any;
  }, [protocol, state]);

  const options = useMemo(() => {
    if (!protocol || !state) return [];
    return getNextOptions(protocol as any, state.activeNodeId);
  }, [protocol, state]);

  const canBack = useMemo(() => (state ? canGoBack(state) : false), [state]);

  if (!protocol) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={{ padding: 16 }}>
          <Text variant="headlineSmall" style={{ color: colors.text, fontWeight: '900' }}>
            Protocolo não encontrado
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7, marginTop: 8 }}>
            ID: {protocolId || '(vazio)'}
          </Text>
          <View style={{ marginTop: 14 }}>
            <Button title="Voltar" variant="outline" onPress={() => router.back()} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!state || !activeNode) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={{ padding: 16 }}>
          <Text variant="titleLarge" style={{ color: colors.text, fontWeight: '800' }}>
            Carregando...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const nodeData: any = activeNode.data ?? {};
  const title = String(nodeData.label ?? '').trim() || 'Etapa';
  const desc = String(nodeData.description ?? '').trim();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header glass */}
      <View style={{ paddingTop: Math.max(insets.top, 10) }}>
        {reduceTransparency ? (
          <View style={[styles.header, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <HeaderContent
              title={protocol.titulo}
              onBack={() => router.back()}
              onTrack={() => setTrackOpen(true)}
              onLearn={() => setLearnOpen(true)}
              colors={colors}
            />
          </View>
        ) : (
          <BlurView
            tint={isDark ? 'dark' : 'light'}
            intensity={80}
            style={[styles.header, { borderColor: colors.border }]}
          >
            <HeaderContent
              title={protocol.titulo}
              onBack={() => router.back()}
              onTrack={() => setTrackOpen(true)}
              onLearn={() => setLearnOpen(true)}
              colors={colors}
            />
          </BlurView>
        )}

        {Array.isArray(protocol.sinaisAlerta) && protocol.sinaisAlerta.length > 0 ? (
          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <Card
              padding={14}
              style={{
                borderRadius: 18,
                borderColor: colors.error + '55',
                backgroundColor: isDark ? 'rgba(220,38,38,0.10)' : 'rgba(220,38,38,0.06)',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.error} />
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }}>
                  Sinais de alerta
                </Text>
              </View>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.8, marginTop: 8 }}>
                {protocol.sinaisAlerta.join(' · ')}
              </Text>
            </Card>
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card variant="elevated" padding={18} style={styles.stepCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={[styles.pill, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
              <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '900', fontSize: 12 }}>
                {String(nodeData.nodeType ?? 'etapa').toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={[styles.pill, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
              <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '900', fontSize: 12 }}>
                {state.history.length} passos
              </Text>
            </View>
          </View>

          <Text variant="headlineSmall" style={{ color: colors.text, fontWeight: '900', marginTop: 12 }}>
            {title}
          </Text>
          {desc ? (
            <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.75, marginTop: 8 }}>
              {desc}
            </Text>
          ) : null}

          <View style={{ marginTop: 14, flexDirection: 'row', gap: 10 }}>
            <Button
              title="Detalhes"
              variant="outline"
              size="sm"
              icon={<MaterialCommunityIcons name="information-outline" size={18} color={colors.text} />}
              onPress={() => {
                Haptics.selectionAsync().catch(() => undefined);
                setLearnOpen(true);
              }}
              containerStyle={{ flex: 1 }}
            />
            <Button
              title="Track"
              variant="outline"
              size="sm"
              icon={<MaterialCommunityIcons name="format-list-bulleted" size={18} color={colors.text} />}
              onPress={() => {
                Haptics.selectionAsync().catch(() => undefined);
                setTrackOpen(true);
              }}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </Card>

        <View style={{ marginTop: 14, gap: 10 }}>
          {options.length === 0 ? (
            <Card padding={16} style={{ borderRadius: 18 }}>
              <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }}>
                Fim do protocolo
              </Text>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
                Você chegou ao final deste fluxo. Você pode voltar passos ou reiniciar.
              </Text>
              <View style={{ marginTop: 12, flexDirection: 'row', gap: 10 }}>
                <Button
                  title="Voltar"
                  variant="outline"
                  disabled={!canBack}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => undefined);
                    setState(goBackState(state));
                  }}
                  containerStyle={{ flex: 1 }}
                />
                <Button
                  title="Reset"
                  variant="primary"
                  onPress={() => {
                    Alert.alert('Reiniciar protocolo?', 'Isso apaga seu track atual.', [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Reiniciar',
                        style: 'destructive',
                        onPress: () => {
                          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
                          setState(resetRunner(protocol as any));
                        },
                      },
                    ]);
                  }}
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </Card>
          ) : (
            options.map((o, idx) => (
              <Button
                key={o.edgeId}
                title={o.label || o.targetLabel || 'Continuar'}
                variant={options.length === 1 ? 'primary' : (idx === 0 ? 'primary' : 'outline')}
                fullWidth
                onPress={() => {
                  Haptics.selectionAsync().catch(() => undefined);
                  setState((prev) => (prev ? chooseOption(protocol as any, prev, o) : prev));
                }}
              />
            ))
          )}
        </View>

        <View style={{ marginTop: 18, flexDirection: 'row', gap: 10 }}>
          <Button
            title="Voltar"
            variant="outline"
            disabled={!canBack}
            onPress={() => {
              Haptics.selectionAsync().catch(() => undefined);
              setState(goBackState(state));
            }}
            containerStyle={{ flex: 1 }}
          />
          <Button
            title="Reset"
            variant="outline"
            onPress={() => {
              Alert.alert('Reiniciar protocolo?', 'Isso apaga seu track atual.', [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Reiniciar',
                  style: 'destructive',
                  onPress: () => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
                    setState(resetRunner(protocol as any));
                  },
                },
              ]);
            }}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Track modal */}
      <Modal visible={trackOpen} animationType="slide" onRequestClose={() => setTrackOpen(false)}>
        <SafeAreaView style={[styles.modalRoot, { backgroundColor: colors.background }]}>
          <ModalHeader title="Decision Track" onClose={() => setTrackOpen(false)} colors={colors} />
          <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
            {state.history.map((h: any, idx: number) => {
              const node = getNodeById(protocol as any, h.nodeId) as any;
              const nodeLabel = String(node?.data?.label ?? h.nodeId);
              const edge = h.viaEdgeId ? (getEdgeById(protocol as any, h.viaEdgeId) as any) : null;
              const edgeLabel = edge && typeof edge.label === 'string' ? String(edge.label) : '';
              const isActive = h.nodeId === state.activeNodeId;

              return (
                <Pressable
                  key={`${h.nodeId}:${idx}`}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => undefined);
                    setState((prev) => (prev ? jumpToNode(prev, h.nodeId) : prev));
                    setTrackOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.trackRow,
                    {
                      borderColor: isActive ? colors.primary : colors.border,
                      backgroundColor: isActive ? colors.primary + '14' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                    <View style={[styles.trackIndex, { backgroundColor: isActive ? colors.primary : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') }]}>
                      <Text variant="bodySmall" style={{ color: isActive ? '#fff' : colors.text, fontWeight: '900' }}>
                        {idx + 1}
                      </Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }} numberOfLines={2}>
                        {nodeLabel}
                      </Text>
                      {idx > 0 ? (
                        <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 3 }} numberOfLines={2}>
                          via: {edgeLabel || 'opção'}
                        </Text>
                      ) : (
                        <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.6, marginTop: 3 }}>
                          início
                        </Text>
                      )}
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text + '88'} />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Learn modal */}
      <Modal visible={learnOpen} animationType="slide" onRequestClose={() => setLearnOpen(false)}>
        <SafeAreaView style={[styles.modalRoot, { backgroundColor: colors.background }]}>
          <ModalHeader title="Detalhes" onClose={() => setLearnOpen(false)} colors={colors} />
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Card padding={16} style={{ borderRadius: 18 }}>
              <Text variant="titleLarge" style={{ color: colors.text, fontWeight: '900' }}>
                {title}
              </Text>
              {desc ? (
                <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.75, marginTop: 8 }}>
                  {desc}
                </Text>
              ) : null}
            </Card>

            <DetailsSection title="Detalhes" items={Array.isArray(nodeData.details) ? nodeData.details : []} colors={colors} />
            <DetailsSection title="Critérios" items={Array.isArray(nodeData.criteria) ? nodeData.criteria : []} colors={colors} />
            <DetailsSection title="Exames" items={Array.isArray(nodeData.exams) ? nodeData.exams : []} colors={colors} colorsAccent={colors.accent} />
            <DetailsSection title="Medicações" items={Array.isArray(nodeData.medications) ? nodeData.medications : []} colors={colors} colorsAccent={colors.primary} />

            {typeof nodeData.referTo === 'string' && nodeData.referTo.trim() ? (
              <Card padding={16} style={{ borderRadius: 18 }}>
                <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900' }}>
                  Encaminhar para
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.75, marginTop: 6 }}>
                  {nodeData.referTo}
                </Text>
              </Card>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function HeaderContent(props: {
  title: string;
  onBack: () => void;
  onTrack: () => void;
  onLearn: () => void;
  colors: any;
}) {
  return (
    <View style={styles.headerInner}>
      <Pressable onPress={props.onBack} style={styles.iconBtn} hitSlop={10}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={props.colors.text} />
      </Pressable>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text variant="titleMedium" style={{ color: props.colors.text, fontWeight: '900' }} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <Pressable onPress={props.onLearn} style={styles.iconBtn} hitSlop={10}>
        <MaterialCommunityIcons name="information-outline" size={22} color={props.colors.text} />
      </Pressable>
      <Pressable onPress={props.onTrack} style={styles.iconBtn} hitSlop={10}>
        <MaterialCommunityIcons name="format-list-bulleted" size={22} color={props.colors.text} />
      </Pressable>
    </View>
  );
}

function ModalHeader(props: { title: string; onClose: () => void; colors: any }) {
  return (
    <View style={[styles.modalHeader, { borderColor: props.colors.border }]}>
      <Text variant="titleLarge" style={{ color: props.colors.text, fontWeight: '900' }}>
        {props.title}
      </Text>
      <Pressable onPress={props.onClose} style={styles.iconBtn} hitSlop={10}>
        <MaterialCommunityIcons name="close" size={22} color={props.colors.text} />
      </Pressable>
    </View>
  );
}

function DetailsSection(props: {
  title: string;
  items: string[];
  colors: any;
  colorsAccent?: string;
}) {
  const items = Array.isArray(props.items) ? props.items.filter(Boolean) : [];
  if (items.length === 0) return null;
  return (
    <Card padding={16} style={{ borderRadius: 18 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={[styles.dot, { backgroundColor: props.colorsAccent ?? props.colors.primary }]} />
        <Text variant="titleMedium" style={{ color: props.colors.text, fontWeight: '900' }}>
          {props.title}
        </Text>
      </View>
      <View style={{ marginTop: 10, gap: 6 }}>
        {items.map((it, idx) => (
          <Text key={`${props.title}:${idx}`} variant="bodyMedium" style={{ color: props.colors.text, opacity: 0.78 }}>
            • {it}
          </Text>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    borderBottomWidth: 1,
  },
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
  stepCard: {
    borderRadius: 20,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  modalRoot: { flex: 1 },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackRow: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  trackIndex: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
