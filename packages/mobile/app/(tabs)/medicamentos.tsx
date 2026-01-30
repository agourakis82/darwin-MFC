/**
 * Darwin MFC Mobile - Medications Screen
 * Browse and search medications
 */
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Text, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeds = MEDICATIONS.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMedication = ({ item }: { item: Medication }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={[styles.medName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7 }}>
          {item.genericName}
        </Text>
        <View style={styles.chipRow}>
          <Chip compact style={styles.chip}>
            {item.category}
          </Chip>
          <Chip compact style={styles.chip} textStyle={{ fontSize: 10 }}>
            {item.atcCode}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
          Medicamentos
        </Text>
        <Searchbar
          placeholder="Buscar medicamento..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchbar, { backgroundColor: colors.surface }]}
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
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchbar: {
    borderRadius: 12,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
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
    height: 24,
  },
});
