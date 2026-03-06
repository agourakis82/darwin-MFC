/**
 * Darwin MFC Mobile - Medications Screen
 * Browse and search medications
 */
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, Input, Text } from '../../src/ui';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  atcCode: string;
}

// Sample data - in production, fetch from API
const MEDICATIONS: Medication[] = [
  { id: '1', name: 'Metformina', genericName: 'Metformina', category: 'Antidiabético', atcCode: 'A10BA02' },
  { id: '2', name: 'Losartana', genericName: 'Losartana', category: 'Anti-hipertensivo', atcCode: 'C09CA01' },
  { id: '3', name: 'Omeprazol', genericName: 'Omeprazol', category: 'IBP', atcCode: 'A02BC01' },
  { id: '4', name: 'Atorvastatina', genericName: 'Atorvastatina', category: 'Estatina', atcCode: 'C10AA05' },
  { id: '5', name: 'Amoxicilina', genericName: 'Amoxicilina', category: 'Antibiótico', atcCode: 'J01CA04' },
];

export default function MedicamentosScreen() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeds = MEDICATIONS.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMedication = ({ item }: { item: Medication }) => (
    <Card variant="elevated" padding={16} style={styles.card}>
      <Text variant="titleMedium" style={[styles.medName, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
        {item.genericName}
      </Text>
      <View style={styles.chipRow}>
        <View style={[styles.chip, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', borderColor: colors.border }]}>
          <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '600' }}>
            {item.category}
          </Text>
        </View>
        <View style={[styles.chip, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', borderColor: colors.border }]}>
          <Text variant="bodySmall" style={{ color: colors.text, fontWeight: '600', fontSize: 11 }}>
            {item.atcCode}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
          Medicamentos
        </Text>
        <Input
          placeholder="Buscar medicamento…"
          value={searchQuery}
          onChangeText={setSearchQuery}
          left={<MaterialCommunityIcons name="magnify" size={18} color={isDark ? 'rgba(244,244,242,0.7)' : 'rgba(26,26,24,0.55)'} />}
        />
      </View>
      <FlatList
        data={filteredMeds}
        renderItem={renderMedication}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 120,
  },
  card: {
    marginBottom: 12,
  },
  medName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
});
