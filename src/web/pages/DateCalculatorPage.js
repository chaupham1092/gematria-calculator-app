import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { calculateDateNumerology, getDayOfYear, getDaysLeftInYear, calculateDuration } from '../../utils/dateNumerology';

export default function DateCalculatorPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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
    let totalDays = results.duration.totalDays;
    const parts = [];
    if (showYear) {
      const years = Math.floor(totalDays / 365);
      if (years > 0) { parts.push(years + ' Year' + (years !== 1 ? 's' : '')); totalDays = totalDays % 365; }
    }
    if (showMonth) {
      const months = Math.floor(totalDays / 30);
      if (months > 0 || parts.length > 0) { parts.push(months + ' Month' + (months !== 1 ? 's' : '')); totalDays = totalDays % 30; }
    }
    if (showWeek) {
      const weeks = Math.floor(totalDays / 7);
      if (weeks > 0 || parts.length > 0) { parts.push(weeks + ' Week' + (weeks !== 1 ? 's' : '')); totalDays = totalDays % 7; }
    }
    if (showDay) { parts.push(totalDays + ' Day' + (totalDays !== 1 ? 's' : '')); }
    return parts.join(', ');
  };

  const Checkbox = ({ checked, onPress, label }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  // Mobile Layout - matches the mobile app exactly
  if (isMobile) {
    return (
      <ScrollView style={styles.mobileContainer} contentContainerStyle={styles.mobileScrollContent}>
        <Text style={styles.mobileTitle}>Date Calculator</Text>
        
        <View style={styles.mobileDateCard}>
          <Text style={styles.mobileDateLabel}>Start Date</Text>
          <View style={styles.mobileDateInputRow}>
            <TextInput style={styles.mobileDateInput} value={startMonth} onChangeText={setStartMonth} maxLength={2} placeholder="MM" />
            <Text style={styles.mobileSeparator}>/</Text>
            <TextInput style={styles.mobileDateInput} value={startDay} onChangeText={setStartDay} maxLength={2} placeholder="DD" />
            <Text style={styles.mobileSeparator}>/</Text>
            <TextInput style={[styles.mobileDateInput, styles.mobileYearInput]} value={startYear} onChangeText={setStartYear} maxLength={4} placeholder="YYYY" />
          </View>
          <Text style={styles.mobileDatePreview}>{formatDate(startMonth, startDay, startYear)}</Text>
        </View>

        <View style={styles.mobileDateCard}>
          <Text style={styles.mobileDateLabel}>End Date</Text>
          <View style={styles.mobileDateInputRow}>
            <TextInput style={styles.mobileDateInput} value={endMonth} onChangeText={setEndMonth} maxLength={2} placeholder="MM" />
            <Text style={styles.mobileSeparator}>/</Text>
            <TextInput style={styles.mobileDateInput} value={endDay} onChangeText={setEndDay} maxLength={2} placeholder="DD" />
            <Text style={styles.mobileSeparator}>/</Text>
            <TextInput style={[styles.mobileDateInput, styles.mobileYearInput]} value={endYear} onChangeText={setEndYear} maxLength={4} placeholder="YYYY" />
          </View>
          <Text style={styles.mobileDatePreview}>{formatDate(endMonth, endDay, endYear)}</Text>
        </View>

        <TouchableOpacity style={styles.mobileToggleRow} onPress={() => setIncludeEndDate(!includeEndDate)}>
          <View style={[styles.mobileCheckbox, includeEndDate && styles.mobileCheckboxChecked]}>
            {includeEndDate && <Text style={styles.mobileCheckmark}>✓</Text>}
          </View>
          <Text style={styles.mobileToggleText}>Include end date in calculation</Text>
        </TouchableOpacity>

        <View style={styles.mobileDurationOptions}>
          <Text style={styles.mobileDurationTitle}>Select Durations to View:</Text>
          <View style={styles.mobileDurationRow}>
            <Checkbox checked={showYear} onPress={() => setShowYear(!showYear)} label="Year" />
            <Checkbox checked={showMonth} onPress={() => setShowMonth(!showMonth)} label="Month" />
            <Checkbox checked={showWeek} onPress={() => setShowWeek(!showWeek)} label="Week" />
            <Checkbox checked={showDay} onPress={() => setShowDay(!showDay)} label="Day" />
          </View>
        </View>

        {results && (
          <>
            <View style={styles.mobileDurationCard}>
              <Text style={styles.mobileDurationText}>{getDurationDisplay()}</Text>
              <Text style={styles.mobileTotalDays}>{results.duration.totalDays.toLocaleString()} Total Days</Text>
            </View>

            <View style={styles.mobileTwoColumn}>
              <View style={styles.mobileColumn}>
                <Text style={styles.mobileColumnTitle}>Start ({getMonthName(startMonth)}-{startDay}-{startYear})</Text>
                <View style={styles.mobileHighlightRow}>
                  <Text style={styles.mobileHighlightLabel}>Day of Year:</Text>
                  <Text style={styles.mobileHighlightValue}>{results.startDayOfYear}</Text>
                </View>
                <View style={styles.mobileHighlightRow}>
                  <Text style={styles.mobileHighlightLabel}>Days Left:</Text>
                  <Text style={styles.mobileHighlightValue}>{results.startDaysLeft}</Text>
                </View>
                {results.startNumerology.map((item, index) => (
                  <View key={index} style={styles.mobileNumRow}>
                    <Text style={styles.mobileNumLabel}>{item.label}</Text>
                    <Text style={styles.mobileNumValue}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.mobileColumn}>
                <Text style={styles.mobileColumnTitle}>End ({getMonthName(endMonth)}-{endDay}-{endYear})</Text>
                <View style={styles.mobileHighlightRow}>
                  <Text style={styles.mobileHighlightLabel}>Day of Year:</Text>
                  <Text style={styles.mobileHighlightValue}>{results.endDayOfYear}</Text>
                </View>
                <View style={styles.mobileHighlightRow}>
                  <Text style={styles.mobileHighlightLabel}>Days Left:</Text>
                  <Text style={styles.mobileHighlightValue}>{results.endDaysLeft}</Text>
                </View>
                {results.endNumerology.map((item, index) => (
                  <View key={index} style={styles.mobileNumRow}>
                    <Text style={styles.mobileNumLabel}>{item.label}</Text>
                    <Text style={styles.mobileNumValue}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    );
  }

  // Desktop Layout
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Date Calculator</Text>
          <Text style={styles.pageSubtitle}>Calculate the time between two dates with numerology analysis</Text>
        </View>

        <View style={styles.mainLayout}>
          <View style={styles.leftColumn}>
            <View style={styles.optionsCard}>
              <Text style={styles.sectionTitle}>Options</Text>
              <Checkbox checked={includeEndDate} onPress={() => setIncludeEndDate(!includeEndDate)} label="Include end date" />
              <View style={styles.divider} />
              <Text style={styles.optionSubtitle}>Duration Units</Text>
              <Checkbox checked={showYear} onPress={() => setShowYear(!showYear)} label="Years" />
              <Checkbox checked={showMonth} onPress={() => setShowMonth(!showMonth)} label="Months" />
              <Checkbox checked={showWeek} onPress={() => setShowWeek(!showWeek)} label="Weeks" />
              <Checkbox checked={showDay} onPress={() => setShowDay(!showDay)} label="Days" />
            </View>
          </View>

          <View style={styles.centerColumn}>
            <View style={styles.dateInputsRow}>
              <View style={styles.dateCard}>
                <Text style={styles.dateCardLabel}>Start Date</Text>
                <View style={styles.dateInputContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Month</Text>
                    <TextInput style={styles.dateInput} value={startMonth} onChangeText={setStartMonth} maxLength={2} placeholder="MM" />
                  </View>
                  <Text style={styles.dateDivider}>/</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Day</Text>
                    <TextInput style={styles.dateInput} value={startDay} onChangeText={setStartDay} maxLength={2} placeholder="DD" />
                  </View>
                  <Text style={styles.dateDivider}>/</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Year</Text>
                    <TextInput style={[styles.dateInput, styles.yearInput]} value={startYear} onChangeText={setStartYear} maxLength={4} placeholder="YYYY" />
                  </View>
                </View>
                <Text style={styles.datePreview}>{formatDate(startMonth, startDay, startYear)}</Text>
              </View>
              <View style={styles.arrowContainer}><Text style={styles.arrow}>→</Text></View>
              <View style={styles.dateCard}>
                <Text style={styles.dateCardLabel}>End Date</Text>
                <View style={styles.dateInputContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Month</Text>
                    <TextInput style={styles.dateInput} value={endMonth} onChangeText={setEndMonth} maxLength={2} placeholder="MM" />
                  </View>
                  <Text style={styles.dateDivider}>/</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Day</Text>
                    <TextInput style={styles.dateInput} value={endDay} onChangeText={setEndDay} maxLength={2} placeholder="DD" />
                  </View>
                  <Text style={styles.dateDivider}>/</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Year</Text>
                    <TextInput style={[styles.dateInput, styles.yearInput]} value={endYear} onChangeText={setEndYear} maxLength={4} placeholder="YYYY" />
                  </View>
                </View>
                <Text style={styles.datePreview}>{formatDate(endMonth, endDay, endYear)}</Text>
              </View>
            </View>

            {results && (
              <View style={styles.durationCard}>
                <Text style={styles.durationLabel}>Time Between Dates</Text>
                <Text style={styles.durationText}>{getDurationDisplay()}</Text>
                <Text style={styles.totalDaysText}>{results.duration.totalDays.toLocaleString()} total days</Text>
              </View>
            )}
          </View>

          {results && (
            <View style={styles.rightColumn}>
              <View style={styles.variationsCard}>
                <Text style={styles.sectionTitle}>Duration Variations</Text>
                <View style={styles.variationRow}>
                  <Text style={styles.variationValue}>{Math.floor(results.duration.totalDays / 365)}</Text>
                  <Text style={styles.variationLabel}>Years,</Text>
                  <Text style={styles.variationValue}>{results.duration.totalDays % 365}</Text>
                  <Text style={styles.variationLabel}>Days</Text>
                </View>
                <View style={styles.variationRow}>
                  <Text style={styles.variationValue}>{Math.floor(results.duration.totalDays / 30)}</Text>
                  <Text style={styles.variationLabel}>Months,</Text>
                  <Text style={styles.variationValue}>{results.duration.totalDays % 30}</Text>
                  <Text style={styles.variationLabel}>Days</Text>
                </View>
                <View style={styles.variationRow}>
                  <Text style={styles.variationValue}>{Math.floor(results.duration.totalDays / 7)}</Text>
                  <Text style={styles.variationLabel}>Weeks,</Text>
                  <Text style={styles.variationValue}>{results.duration.totalDays % 7}</Text>
                  <Text style={styles.variationLabel}>Days</Text>
                </View>
                <View style={[styles.variationRow, styles.variationRowHighlight]}>
                  <Text style={styles.variationValueLarge}>{results.duration.totalDays.toLocaleString()}</Text>
                  <Text style={styles.variationLabelLarge}>Days</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {results && (
          <View style={styles.numerologySection}>
            <Text style={styles.sectionTitleLarge}>Date Numerology</Text>
            <View style={styles.numerologyGrid}>
              <View style={styles.numerologyColumn}>
                <View style={styles.numerologyHeader}>
                  <Text style={styles.numerologyTitle}>Start Date</Text>
                  <Text style={styles.numerologyDate}>{getMonthName(startMonth)} {startDay}, {startYear}</Text>
                </View>
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Day of Year</Text>
                  <Text style={styles.highlightValue}>{results.startDayOfYear}</Text>
                </View>
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Days Left in Year</Text>
                  <Text style={styles.highlightValue}>{results.startDaysLeft}</Text>
                </View>
                <View style={styles.numerologyDivider} />
                {results.startNumerology.map((item, index) => (
                  <View key={index} style={styles.numRow}>
                    <Text style={styles.numFormula}>{item.label}</Text>
                    <Text style={styles.numResult}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.numerologyColumn}>
                <View style={styles.numerologyHeader}>
                  <Text style={styles.numerologyTitle}>End Date</Text>
                  <Text style={styles.numerologyDate}>{getMonthName(endMonth)} {endDay}, {endYear}</Text>
                </View>
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Day of Year</Text>
                  <Text style={styles.highlightValue}>{results.endDayOfYear}</Text>
                </View>
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Days Left in Year</Text>
                  <Text style={styles.highlightValue}>{results.endDaysLeft}</Text>
                </View>
                <View style={styles.numerologyDivider} />
                {results.endNumerology.map((item, index) => (
                  <View key={index} style={styles.numRow}>
                    <Text style={styles.numFormula}>{item.label}</Text>
                    <Text style={styles.numResult}>{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Mobile styles - matching the mobile app exactly
  mobileContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  mobileScrollContent: { padding: 16, paddingBottom: 100 },
  mobileTitle: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 8 },
  mobileDateCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  mobileDateLabel: { fontSize: 16, fontWeight: '600', color: '#2c3e50', marginBottom: 12 },
  mobileDateInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  mobileDateInput: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 16, color: '#2c3e50', textAlign: 'center', width: 50 },
  mobileYearInput: { width: 70 },
  mobileSeparator: { fontSize: 20, color: '#7f8c8d', marginHorizontal: 6 },
  mobileDatePreview: { fontSize: 14, color: '#7f8c8d', textAlign: 'center', marginTop: 10 },
  mobileToggleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 },
  mobileCheckbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#3498db', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  mobileCheckboxChecked: { backgroundColor: '#3498db' },
  mobileCheckmark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  mobileToggleText: { fontSize: 15, color: '#2c3e50' },
  mobileDurationOptions: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  mobileDurationTitle: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 10 },
  mobileDurationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  mobileDurationCard: { backgroundColor: '#3498db', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
  mobileDurationText: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  mobileTotalDays: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  mobileTwoColumn: { flexDirection: 'row', gap: 10 },
  mobileColumn: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  mobileColumnTitle: { fontSize: 13, fontWeight: 'bold', color: '#3498db', marginBottom: 10, textAlign: 'center' },
  mobileHighlightRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e8f4fc', padding: 8, borderRadius: 6, marginBottom: 6 },
  mobileHighlightLabel: { fontSize: 12, color: '#3498db', fontWeight: '500' },
  mobileHighlightValue: { fontSize: 12, fontWeight: 'bold', color: '#2c3e50' },
  mobileNumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  mobileNumLabel: { fontSize: 11, color: '#7f8c8d', flex: 1 },
  mobileNumValue: { fontSize: 12, fontWeight: '600', color: '#2c3e50' },

  // Shared checkbox styles
  checkboxRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  checkbox: { width: 18, height: 18, borderWidth: 2, borderColor: '#3498db', borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  checkboxChecked: { backgroundColor: '#3498db' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 14, color: '#2c3e50' },

  // Desktop styles
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { maxWidth: 1200, alignSelf: 'center', width: '100%', padding: 24 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 4 },
  pageSubtitle: { fontSize: 16, color: '#7f8c8d' },
  mainLayout: { flexDirection: 'row', gap: 20, marginBottom: 24 },
  leftColumn: { width: 180 },
  centerColumn: { flex: 1 },
  rightColumn: { width: 200 },
  optionsCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  optionSubtitle: { fontSize: 13, color: '#7f8c8d', marginBottom: 8 },
  dateInputsRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  dateCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  dateCardLabel: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 12, textAlign: 'center' },
  dateInputContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 4 },
  inputGroup: { alignItems: 'center' },
  inputLabel: { fontSize: 11, color: '#7f8c8d', marginBottom: 4 },
  dateInput: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, fontSize: 16, color: '#2c3e50', textAlign: 'center', width: 50 },
  yearInput: { width: 70 },
  dateDivider: { fontSize: 18, color: '#7f8c8d', paddingBottom: 8 },
  datePreview: { fontSize: 13, color: '#7f8c8d', textAlign: 'center', marginTop: 10 },
  arrowContainer: { paddingBottom: 20 },
  arrow: { fontSize: 24, color: '#3498db' },
  durationCard: { backgroundColor: '#3498db', borderRadius: 12, padding: 16, alignItems: 'center' },
  durationLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  durationText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  totalDaysText: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  variationsCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  variationRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, paddingVertical: 4 },
  variationValue: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  variationLabel: { fontSize: 13, color: '#7f8c8d' },
  variationRowHighlight: { backgroundColor: '#e8f4fc', borderRadius: 6, padding: 8, marginTop: 8 },
  variationValueLarge: { fontSize: 20, fontWeight: 'bold', color: '#3498db' },
  variationLabelLarge: { fontSize: 14, color: '#3498db' },
  numerologySection: { marginTop: 8 },
  sectionTitleLarge: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 16 },
  numerologyGrid: { flexDirection: 'row', gap: 20 },
  numerologyColumn: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  numerologyHeader: { marginBottom: 12 },
  numerologyTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  numerologyDate: { fontSize: 13, color: '#7f8c8d' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e8f4fc', padding: 10, borderRadius: 6, marginBottom: 6 },
  highlightLabel: { fontSize: 13, color: '#3498db', fontWeight: '500' },
  highlightValue: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50' },
  numerologyDivider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  numRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  numFormula: { fontSize: 13, color: '#7f8c8d', flex: 1 },
  numResult: { fontSize: 14, fontWeight: '600', color: '#2c3e50' },
});
