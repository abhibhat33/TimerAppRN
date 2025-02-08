import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const HistoryScreen = () => {
  const { isDarkMode } = useTheme();
  const [completedTimersLog, setCompletedTimersLog] = useState([]);

  const fetchCompletedTimersLog = async () => {
    try {
      const storedLog = await AsyncStorage.getItem('completedTimersLog');
      const parsedLog = storedLog ? JSON.parse(storedLog) : [];
      setCompletedTimersLog(parsedLog);
    } catch (error) {
      console.error('Failed to fetch completed timers log', error);
    }
  };

  useEffect(() => {
    fetchCompletedTimersLog();
  }, []);

  const renderLogItem = ({ item }) => (
    <View style={[styles.logItem, isDarkMode && styles.darkLogItem]}>
      <Text style={[styles.logText, isDarkMode && styles.darkText]}>{item.name}</Text>
      <Text style={[styles.logText, isDarkMode && styles.darkText]}>{item.completionTime}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Completed Timers</Text>
      <FlatList
        data={completedTimersLog}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLogItem}
        ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.darkText]}>No completed timers yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  logItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  darkLogItem: { backgroundColor: '#333' },
  logText: { fontSize: 16 },
  darkText: { color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default HistoryScreen;
