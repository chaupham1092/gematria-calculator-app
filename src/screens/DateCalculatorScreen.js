import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';
import { calculateDateNumerology, getDayOfYear, getDaysLeftInYear, calculateDuration } from '../utils/dateNumerology';

const DateCalculatorScreen = () => {
  const [startMonth, setStartMonth] = useState('9');
  const [startDay, setStartDay] = useState('1');
  const [startYear, setStartYear] = useState('1990');
  const [endMonth, setEndMonth] = useState('1');
  const [endDay, setEndDay] = useState('11');
  const [endYear, setEndYear] = useState('2026');
  const [includeEndDate, setIncludeEndDate] = useState(true);
  const [showYear, setShowYear] = useState(true);
  const [showMonth, setShowMonth] = useState(true);
  const [showWeek, setShowWeek] = useState(true);
  const [showDay, setShowDay] = useState(true);
  const [results, setResults] = useState(null);

  const parseDate = (month, day, year) => {
    const m = parseInt(month) || 1;
    const d = parseInt(day) || 1;
    const y = parseInt(year) || 2024;
    return new Date(y, m - 1, d);
  };

  useEffect(() => {
    try {
      const start = parseDate(startMonth, startDay, startYear);
      const end = parseDate(endMonth, endDay, endYear);
      
      const duration = calculateDuration(start, end, includeEndDate);
      const startNumerology = calculateDateNumerology(startMonth, startDay, startYear);
      const endNumerology = calculateDateNumerology(endMonth, endDay, endYear);
      
      setResults({
        duration,
        startNumerology,
        endNumerology,
        startDayOfYear: getDayOfYear(start),
        startDaysLeft: getDaysLeftInYear(start),
        endDayOfYear: getDayOfYear(end),
        endDaysLeft: getDaysLeftInYear(end),
      });
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [startMonth, startDay, startYear, endMonth, endDay, endYear, includeEndDate]);

  const formatDate = (month, day, year) => {
    try {
      const date = parseDate(month, day, year);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[(parseInt(month) || 1) - 1] || 'Jan';
  };

  const getDurationDisplay = () => {
    if (!results) return '';
    const d = results.duration;
    let totalDays = d.totalDays;
    const parts = [];
    
    if (showYear) {
      const years = Math.floor(totalDays / 365);
      if (years > 0) {
        parts.push(years + ' Year' + (years !== 1 ? 's' : ''));
        totalDays = totalDays % 365;
      }
    }
    
    if (showMonth) {
      const months = Math.floor(totalDays / 30);
      if (months > 0 || (showYear && parts.length > 0)) {
        parts.push(months + ' Month' + (months !== 1 ? 's' : ''));
        totalDays = totalDays % 30;
      }
    }
    
    if (showWeek) {
      const weeks = Math.floor(totalDays / 7);
      if (weeks > 0 || parts.length > 0) {
        parts.push(weeks + ' Week' + (weeks !== 1 ? 's' : ''));
        totalDays = totalDays % 7;
      }
    }
    
    if (showDay) {
      parts.push(totalDays + ' Day' + (totalDays !== 1 ? 's' : ''));
    }
    
    return parts.join(', ');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Date Calculator</Text>
        
        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <View style={styles.dateInputRow}>
            <TextInput style={[styles.dateInput, styles.monthInput]} placeholder="MM" value={startMonth} onChangeText={setStartMonth} keyboardType="numeric" maxLength={2} selectTextOnFocus={true} />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput style={[styles.dateInput, styles.dayInput]} placeholder="DD" value={startDay} onChangeText={setStartDay} keyboardType="numeric" maxLength={2} selectTextOnFocus={true} />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput style={[styles.dateInput, styles.yearInput]} placeholder="YYYY" value={startYear} onChangeText={setStartYear} keyboardType="numeric" maxLength={4} selectTextOnFocus={true} />
          </View>
          <Text style={styles.datePreview}>{formatDate(startMonth, startDay, startYear)}</Text>
        </View>

        <View style={styles.dateSection}>
          <Text style={styles.dateLabel}>End Date</Text>
          <View style={styles.dateInputRow}>
            <TextInput style={[styles.dateInput, styles.monthInput]} placeholder="MM" value={endMonth} onChangeText={setEndMonth} keyboardType="numeric" maxLength={2} selectTextOnFocus={true} />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput style={[styles.dateInput, styles.dayInput]} placeholder="DD" value={endDay} onChangeText={setEndDay} keyboardType="numeric" maxLength={2} selectTextOnFocus={true} />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput style={[styles.dateInput, styles.yearInput]} placeholder="YYYY" value={endYear} onChangeText={setEndYear} keyboardType="numeric" maxLength={4} selectTextOnFocus={true} />
          </View>
          <Text style={styles.datePreview}>{formatDate(endMonth, endDay, endYear)}</Text>
        </View>

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.toggleRow} onPress={() => setIncludeEndDate(!includeEndDate)}>
            <Ionicons name={includeEndDate ? 'checkbox' : 'square-outline'} size={20} color={colors.primary} />
            <Text style={styles.toggleText}>Include End Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.durationOptionsCard}>
          <Text style={styles.durationOptionsTitle}>Select Durations to View:</Text>
          <View style={styles.durationOptionsRow}>
            <TouchableOpacity style={styles.durationOption} onPress={() => setShowYear(!showYear)}>
              <Ionicons name={showYear ? 'checkbox' : 'square-outline'} size={18} color={colors.primary} />
              <Text style={styles.durationOptionText}>Year</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.durationOption} onPress={() => setShowMonth(!showMonth)}>
              <Ionicons name={showMonth ? 'checkbox' : 'square-outline'} size={18} color={colors.primary} />
              <Text style={styles.durationOptionText}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.durationOption} onPress={() => setShowWeek(!showWeek)}>
              <Ionicons name={showWeek ? 'checkbox' : 'square-outline'} size={18} color={colors.primary} />
              <Text style={styles.durationOptionText}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.durationOption} onPress={() => setShowDay(!showDay)}>
              <Ionicons name={showDay ? 'checkbox' : 'square-outline'} size={18} color={colors.primary} />
              <Text style={styles.durationOptionText}>Day</Text>
            </TouchableOpacity>
          </View>
        </View>

        {results && (
          <View style={styles.resultsContainer}>
            <View style={styles.durationCard}>
              <Text style={styles.durationText}>{getDurationDisplay()}</Text>
              <Text style={styles.totalDaysText}>{results.duration.totalDays.toLocaleString()} Total Days</Text>
            </View>

            <View style={styles.twoColumnContainer}>
              <View style={styles.columnCard}>
                <Text style={styles.columnTitle}>Start ({getMonthName(startMonth)}-{startDay}-{startYear})</Text>
                  <View style={styles.numRow}>
                    <Text style={styles.numLabelHighlight}>Day of Year:</Text>
                    <Text style={styles.numValueHighlight}>{results.startDayOfYear}</Text>
                  </View>
                  <View style={styles.numRow}>
                    <Text style={styles.numLabelHighlight}>Days Left:</Text>
                    <Text style={styles.numValueHighlight}>{results.startDaysLeft}</Text>
                  </View>
                {results.startNumerology.map((item, index) => (
                  <View key={index} style={styles.numRow}>
                    <Text style={styles.numLabel}>{item.label}</Text>
                    <Text style={styles.numValue}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.columnCard}>
                <Text style={styles.columnTitle}>End ({getMonthName(endMonth)}-{endDay}-{endYear})</Text>
                  <View style={styles.numRow}>
                    <Text style={styles.numLabelHighlight}>Day of Year:</Text>
                    <Text style={styles.numValueHighlight}>{results.endDayOfYear}</Text>
                  </View>
                  <View style={styles.numRow}>
                    <Text style={styles.numLabelHighlight}>Days Left:</Text>
                    <Text style={styles.numValueHighlight}>{results.endDaysLeft}</Text>
                  </View>
                {results.endNumerology.map((item, index) => (
                  <View key={index} style={styles.numRow}>
                    <Text style={styles.numLabel}>{item.label}</Text>
                    <Text style={styles.numValue}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  scrollContent: { padding: spacing.md, paddingBottom: 100 },
  title: { fontSize: typography.fontSize.xlarge, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  dateSection: { backgroundColor: colors.white, borderRadius: layout.borderRadius.medium, padding: spacing.md, marginBottom: spacing.md },
  dateLabel: { fontSize: typography.fontSize.medium, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  dateInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dateInput: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: layout.borderRadius.small, padding: spacing.sm, fontSize: typography.fontSize.medium, color: colors.text, textAlign: 'center' },
  monthInput: { width: 50 },
  dayInput: { width: 50 },
  yearInput: { width: 80 },
  dateSeparator: { fontSize: typography.fontSize.large, color: colors.lightText, marginHorizontal: spacing.xs },
  datePreview: { fontSize: typography.fontSize.small, color: colors.lightText, textAlign: 'center', marginTop: spacing.sm },
  optionsRow: { marginBottom: spacing.sm },
  toggleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: spacing.sm, borderRadius: layout.borderRadius.medium },
  toggleText: { fontSize: typography.fontSize.small, color: colors.text, marginLeft: spacing.xs },
  durationOptionsCard: { backgroundColor: colors.white, borderRadius: layout.borderRadius.medium, padding: spacing.sm, marginBottom: spacing.md },
  durationOptionsTitle: { fontSize: typography.fontSize.small, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  durationOptionsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  durationOption: { flexDirection: 'row', alignItems: 'center' },
  durationOptionText: { fontSize: typography.fontSize.small, color: colors.text, marginLeft: 4 },
  resultsContainer: { marginTop: spacing.sm },
  durationCard: { backgroundColor: colors.primary, borderRadius: layout.borderRadius.medium, padding: spacing.md, marginBottom: spacing.md, alignItems: 'center' },
  durationText: { fontSize: typography.fontSize.large, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  totalDaysText: { fontSize: typography.fontSize.small, color: '#FFFFFF', marginTop: spacing.xs, opacity: 0.8 },
  twoColumnContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  columnCard: { flex: 1, backgroundColor: colors.white, borderRadius: layout.borderRadius.medium, padding: spacing.sm, marginHorizontal: 2 },
  columnTitle: { fontSize: typography.fontSize.small, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.xs },
  numRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  numLabel: { fontSize: 10, color: colors.lightText, flex: 1 },
  numValue: { fontSize: 12, fontWeight: '600', color: colors.text },
  numLabelHighlight: { fontSize: 10, color: colors.primary, flex: 1 },
  numValueHighlight: { fontSize: 12, fontWeight: 'bold', color: colors.primary },
});

export default DateCalculatorScreen;




