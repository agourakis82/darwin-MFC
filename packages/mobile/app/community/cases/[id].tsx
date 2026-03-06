/**
 * Darwin MFC Mobile - Community Case Detail
 * Read public; write (vote/comment) requires auth.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MMKV } from 'react-native-mmkv';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  addCaseComment,
  getCaseById,
  getMyCaseVote,
  incrementCaseView,
  listCaseComments,
  voteCase,
} from '../../../lib/community';
import { Button, Card, Divider, Text } from '../../../src/ui';

type ClinicalCaseDataLike = {
  ageRange?: string;
  sex?: string;
  occupation?: string;
  type?: string;
  difficulty?: string;
  presentation?: string;
  history?: string;
  physicalExam?: string;
  labResults?: string;
  imaging?: string;
  diagnosisCodes?: string[];
  [key: string]: unknown;
};

const CASE_TYPE_LABELS: Record<string, string> = {
  diagnostic_challenge: 'Desafio Diagnóstico',
  treatment_decision: 'Decisão Terapêutica',
  management_dilemma: 'Dilema de Manejo',
  ethical_question: 'Questão Ética',
  educational: 'Educacional',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  straightforward: 'Simples',
  moderate: 'Moderado',
  complex: 'Complexo',
};

  const storage = new MMKV();

function cacheKeyCase(id: string) {
  return `darwin:community:cases:detail:${id}:v1`;
}
function cacheKeyComments(id: string) {
  return `darwin:community:cases:comments:${id}:v1`;
}

export default function CommunityCaseDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const caseId = String(id ?? '');

  const { user } = useAuth();
  const { colors, theme, reduceTransparency } = useTheme();
  const isDark = theme === 'dark';

  const [row, setRow] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [myVote, setMyVote] = useState<-1 | 0 | 1>(0);

  const didIncrementView = useRef(false);

  useEffect(() => {
    // Fast path cache
    try {
      const cached = storage.getString(cacheKeyCase(caseId));
      if (cached) setRow(JSON.parse(cached));
    } catch {
      // ignore
    }
    try {
      const cached = storage.getString(cacheKeyComments(caseId));
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setComments(parsed);
      }
    } catch {
      // ignore
    }
  }, [caseId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!caseId) return;
      setLoading(true);
      setError(null);

      const [c, cmts] = await Promise.all([
        getCaseById(caseId),
        listCaseComments(caseId),
      ]);

      if (!mounted) return;

      if (c.error) setError(c.error);
      if (cmts.error) setError(cmts.error);
      if (c.data) {
        setRow(c.data);
        try { storage.set(cacheKeyCase(caseId), JSON.stringify(c.data)); } catch { /* ignore */ }
      }
      if (cmts.data) {
        setComments(cmts.data);
        try { storage.set(cacheKeyComments(caseId), JSON.stringify(cmts.data)); } catch { /* ignore */ }
      }

      setLoading(false);
    })();

    return () => { mounted = false; };
  }, [caseId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!caseId) return;
      if (!user) {
        setMyVote(0);
        return;
      }
      const res = await getMyCaseVote(caseId);
      if (!mounted) return;
      setMyVote(res.vote);
    })();
    return () => { mounted = false; };
  }, [caseId, user]);

  useEffect(() => {
    if (!caseId) return;
    if (didIncrementView.current) return;
    didIncrementView.current = true;
    incrementCaseView(caseId).catch(() => undefined);
  }, [caseId]);

  const title = useMemo(() => String(row?.title ?? 'Caso clínico'), [row]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header glass */}
      <View style={{ paddingTop: Math.max(insets.top, 10) }}>
        {reduceTransparency ? (
          <View style={[styles.header, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Header onBack={() => router.back()} title="Caso clínico" colors={colors} />
          </View>
        ) : (
          <BlurView tint={isDark ? 'dark' : 'light'} intensity={80} style={[styles.header, { borderColor: colors.border }]}>
            <Header onBack={() => router.back()} title="Caso clínico" colors={colors} />
          </BlurView>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {loading && !row ? (
          <Card padding={16} style={{ borderRadius: 18 }}>
            <Text variant="bodyMedium" style={{ color: colors.text, opacity: 0.7 }}>
              Carregando...
            </Text>
          </Card>
        ) : error ? (
          <Card padding={16} style={{ borderRadius: 18, borderColor: colors.error + '55' }}>
            <Text variant="titleMedium" style={{ color: colors.error, fontWeight: '900' }}>
              Erro
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              {error}
            </Text>
          </Card>
        ) : null}

        {row ? (
          <Card variant="elevated" padding={16} style={{ borderRadius: 18 }}>
            <Text variant="headlineSmall" style={{ color: colors.text, fontWeight: '900' }}>
              {title}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 6 }}>
              {String(row.specialty ?? 'Discussão clínica')}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '900', fontSize: 12 }}>
                  {String(row.difficulty ?? '—')}
                </Text>
              </View>
              <View style={[styles.chip, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '900', fontSize: 12 }}>
                  👁 {Number(row.views ?? 0)}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 14, flexDirection: 'row', gap: 10 }}>
              <Button
                title={`👍 ${Number(row.upvotes ?? 0)}`}
                variant={myVote === 1 ? 'primary' : 'outline'}
                disabled={!user}
                onPress={async () => {
                  if (!user) return;
                  const next = myVote === 1 ? 0 : 1;
                  setMyVote(next);
                  setRow((prev: any) => prev ? { ...prev, upvotes: Math.max(0, Number(prev.upvotes ?? 0) + (next === 1 ? 1 : -1)) } : prev);
                  Haptics.selectionAsync().catch(() => undefined);
                  const res = await voteCase(caseId, next);
                  if (res.error) {
                    setError(res.error);
                    // soft refresh
                    const fresh = await getCaseById(caseId);
                    if (fresh.data) setRow(fresh.data);
                    return;
                  }
                  const fresh = await getCaseById(caseId);
                  if (fresh.data) setRow(fresh.data);
                }}
                containerStyle={{ flex: 1 }}
              />
              <Button
                title="Comentários"
                variant="outline"
                icon={<MaterialCommunityIcons name="message-outline" size={18} color={colors.text} />}
                onPress={() => {}}
                containerStyle={{ flex: 1 }}
              />
            </View>

            <Divider style={{ marginTop: 14 }} />

            <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '900', marginTop: 14 }}>
              Dados do caso
            </Text>
            <View style={{ marginTop: 8 }}>
              {renderCaseData(row.case_data)}
            </View>
          </Card>
        ) : null}

        <View style={{ marginTop: 16 }}>
          <Text variant="titleLarge" style={{ color: colors.text, fontWeight: '900' }}>
            Comentários ({comments.length})
          </Text>

          {comments.length === 0 ? (
            <Card padding={16} style={{ borderRadius: 18, marginTop: 10 }}>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
                Nenhum comentário ainda.
              </Text>
            </Card>
          ) : (
            <View style={{ marginTop: 10, gap: 10 }}>
              {comments.map((c) => (
                <Card key={String(c.id)} padding={14} style={{ borderRadius: 18 }}>
                  <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.65 }}>
                    {c.created_at ? new Date(String(c.created_at)).toLocaleString() : ''}
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text, marginTop: 8 }}>
                    {String(c.content ?? '')}
                  </Text>
                </Card>
              ))}
            </View>
          )}
        </View>

        <View style={{ marginTop: 16 }}>
          <Text variant="titleLarge" style={{ color: colors.text, fontWeight: '900' }}>
            Escrever comentário
          </Text>

          {!user ? (
            <Card padding={16} style={{ borderRadius: 18, marginTop: 10 }}>
              <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
                Faça login na aba Perfil para comentar e votar.
              </Text>
            </Card>
          ) : (
            <Card padding={14} style={{ borderRadius: 18, marginTop: 10 }}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Escreva um comentário respeitoso e baseado em evidências..."
                placeholderTextColor={colors.text + '66'}
                multiline
                style={[
                  styles.textarea,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  },
                ]}
              />
              <View style={{ marginTop: 12 }}>
                <Button
                  title={submitting ? 'Enviando...' : 'Enviar'}
                  variant="primary"
                  disabled={submitting || !draft.trim()}
                  onPress={async () => {
                    if (!draft.trim()) return;
                    setSubmitting(true);
                    setError(null);
                    Haptics.selectionAsync().catch(() => undefined);
                    const res = await addCaseComment({ caseId, content: draft.trim() });
                    if (res.error) {
                      setError(res.error);
                      setSubmitting(false);
                      return;
                    }
                    setDraft('');
                    const cmts = await listCaseComments(caseId);
                    if (cmts.data) {
                      setComments(cmts.data);
                      try { storage.set(cacheKeyComments(caseId), JSON.stringify(cmts.data)); } catch { /* ignore */ }
                    }
                    setSubmitting(false);
                  }}
                />
              </View>
            </Card>
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function renderCaseData(caseData: unknown) {
  const data = (caseData ?? null) as ClinicalCaseDataLike | null;

  if (!data || Object.keys(data).length === 0) {
    return (
      <View>
        <Text variant="bodySmall" style={{ color: '#6b7280', opacity: 0.8 }}>
          Sem dados estruturados disponíveis. Use os comentários para complementar discussão.
        </Text>
      </View>
    );
  }

  const fallbackEntries = Object.entries(data).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== false,
  );
  const knownKeys = new Set([
    'ageRange',
    'sex',
    'occupation',
    'type',
    'difficulty',
    'presentation',
    'history',
    'physicalExam',
    'labResults',
    'imaging',
    'diagnosisCodes',
  ]);

  const diagnosisCodes = Array.isArray(data.diagnosisCodes) ? data.diagnosisCodes : [];
  const chips: Array<[string, string]> = [];
  if (data.ageRange) chips.push(['Faixa etária', data.ageRange]);
  if (data.sex) chips.push(['Sexo', String(data.sex)]);
  if (data.type) chips.push(['Tipo', CASE_TYPE_LABELS[String(data.type)] ?? String(data.type)]);
  if (data.difficulty)
    chips.push([
      'Dificuldade',
      DIFFICULTY_LABELS[String(data.difficulty)] ?? String(data.difficulty),
    ]);

  const unknownRows = fallbackEntries
    .filter(([key]) => !knownKeys.has(key))
    .map(([key, value]) => [key, formatValue(value)] as [string, string]);

  return (
    <View style={{ gap: 10, marginTop: 12 }}>
      {chips.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {chips.map(([label, value]) => (
            <View
              key={label}
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#3b82f680',
                backgroundColor: '#dbeafe55',
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            >
              <Text variant="bodySmall" style={{ color: '#1f2937', fontWeight: '700' }}>
                {label}: <Text style={{ fontWeight: '900' }}>{value}</Text>
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {renderCaseTextBlock('Ocupação', 'briefcase', data.occupation)}
      {renderCaseTextBlock('Apresentação', 'clipboard', data.presentation)}
      {renderCaseTextBlock('História clínica', 'message', data.history)}
      {renderCaseTextBlock('Exame físico', 'stethoscope', data.physicalExam)}
      {renderCaseTextBlock('Exames laboratoriais', 'flask', data.labResults)}
      {renderCaseTextBlock('Imagem', 'image', data.imaging)}

      {diagnosisCodes.length > 0 ? (
        <View>
          <Text variant="titleMedium" style={{ fontWeight: '900', marginTop: 8, color: '#374151' }}>
            Códigos diagnósticos
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {diagnosisCodes.map((code) => (
              <View
                key={String(code)}
                style={{
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: '#60a5fa80',
                  backgroundColor: '#dbeafe88',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                }}
              >
                <Text variant="bodySmall" style={{ color: '#1d4ed8', fontWeight: '700' }}>
                  {String(code)}
                </Text>
              </View>
              ))}
          </View>
        </View>
      ) : null}

      {unknownRows.length > 0 ? (
        <View style={{ marginTop: 8, gap: 8 }}>
          <Text variant="titleMedium" style={{ fontWeight: '900', marginBottom: 2, color: '#374151' }}>
            Dados adicionais
          </Text>
          {unknownRows.map(([k, v]) => (
            <View key={k} style={{ gap: 2 }}>
              <Text variant="bodySmall" style={{ color: '#6b7280', fontWeight: '700' }}>
                {k}
              </Text>
              <Text variant="bodySmall" style={{ color: '#1f2937' }}>
                {v}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function renderCaseTextBlock(title: string, iconName: keyof typeof iconMap, content?: unknown) {
  if (typeof content !== 'string' || !content.trim()) return null;
  return (
    <Card padding={12} style={{ borderRadius: 14, marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 }}>
        {iconMap[iconName]}
        <Text variant="titleMedium" style={{ color: '#1f2937', fontWeight: '900' }}>
          {title}
        </Text>
      </View>
      <Text variant="bodySmall" style={{ color: '#111827', opacity: 0.95 }}>
        {content.trim()}
      </Text>
    </Card>
  );
}

function formatValue(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(String).join(', ');
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

const iconMap = {
  briefcase: <MaterialCommunityIcons name="briefcase-outline" size={16} color="#475569" />,
  clipboard: <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#475569" />,
  message: <MaterialCommunityIcons name="chat-outline" size={16} color="#475569" />,
  stethoscope: <MaterialCommunityIcons name="stethoscope" size={16} color="#475569" />,
  flask: <MaterialCommunityIcons name="flask-outline" size={16} color="#475569" />,
  image: <MaterialCommunityIcons name="image-outline" size={16} color="#475569" />,
} as const;

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
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  textarea: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    textAlignVertical: 'top',
  },
});
