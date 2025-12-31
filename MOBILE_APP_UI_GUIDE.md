# Mobile App UI/UX Guide

## Screen Layouts

### 1. Calculator Screen (Enhanced)
```
┌─────────────────────────────────┐
│  Gematria Calculator            │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Enter text to calculate...│ │
│  │                           │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 💾 Save to Research List  │ │ ← NEW
│  └───────────────────────────┘ │
│                                 │
│  Filter by Number (optional):   │ ← NEW
│  ┌───────────────────────────┐ │
│  │ e.g., 33                  │ │
│  └───────────────────────────┘ │
│                                 │
│  Results                        │
│  ┌───────────────────────────┐ │
│  │ English Ordinal      46   │ │
│  │ ▼ Word Breakdown...       │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ Full Reduction       19   │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### 2. Research Screen (NEW)
```
┌─────────────────────────────────┐
│  Research List                  │
│  3 of 100 entries (3% full)    │
│                                 │
│  ┌──────────┐  ┌──────────┐   │
│  │📤 Share  │  │🗑️ Delete │   │
│  │   All    │  │   All    │   │
│  └──────────┘  └──────────┘   │
│                                 │
│  ┌───────────────────────────┐ │
│  │ "hello"              ▶    │ │
│  │ 12/30/2025 11:04 PM       │ │
│  ├───────────────────────────┤ │
│  │ English    Full    Reverse│ │
│  │ Ordinal    Reduct  Ordinal│ │
│  │   52         25      109  │ │
│  ├───────────────────────────┤ │
│  │  📥 Load    │  🗑️ Delete  │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ "elon"               ▼    │ │ ← Expanded
│  │ 12/30/2025 10:56 PM       │ │
│  ├───────────────────────────┤ │
│  │ Extended   English  Full  │ │
│  │ English    Ordinal  Reduct│ │
│  │   145        46       19  │ │
│  ├───────────────────────────┤ │
│  │ All Results (4)           │ │
│  │ ┌─────────────────────┐  │ │
│  │ │ Extended English 145│  │ │
│  │ │ English Ordinal   46│  │ │
│  │ │ Full Reduction    19│  │ │
│  │ │ Single Reduction  10│  │ │
│  │ └─────────────────────┘  │ │
│  ├───────────────────────────┤ │
│  │  📥 Load    │  🗑️ Delete  │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### 3. Bottom Navigation (Updated)
```
┌─────────────────────────────────┐
│                                 │
│         [Screen Content]        │
│                                 │
├─────────────────────────────────┤
│  📱      📚      🔢      ℹ️     │
│ Calc  Research Ciphers About   │
│        ← NEW                    │
└─────────────────────────────────┘
```

## Mobile UI/UX Principles Applied

### 1. Touch-Friendly Design
- **Minimum touch target**: 44x44 points (iOS HIG standard)
- **Button padding**: 16px vertical, 20px horizontal
- **Spacing between elements**: 12-16px
- **Card padding**: 16px all around

### 2. Visual Hierarchy
- **Primary actions**: Blue (#3498db) - Save, Share, Load
- **Destructive actions**: Red (#e74c3c) - Delete, Delete All
- **Text hierarchy**: 
  - Title: 24px bold
  - Subtitle: 14px regular
  - Body: 16px regular
  - Small: 12px regular

### 3. Native Feel
- **iOS**: Subtle shadows, rounded corners, native alerts
- **Android**: Material elevation, ripple effects, native dialogs
- **Both**: Platform-specific keyboard handling

### 4. Feedback & Confirmation
- **Immediate feedback**: Native alerts for save/delete
- **Confirmation dialogs**: For destructive actions (delete, delete all)
- **Visual states**: Active/inactive buttons, expanded/collapsed cards
- **Loading states**: Handled by AsyncStorage (instant on device)

### 5. Content Organization
- **Collapsible cards**: Save screen space, show more entries
- **Quick View**: Top 3 results visible without expanding
- **Detailed View**: All results available on tap
- **Scrollable content**: Nested scrolling for long result lists

### 6. Error Handling
- **Empty states**: Friendly messages with icons
- **No matches**: Clear explanation when filter returns nothing
- **Storage limits**: Warning at 80%, error at 100%
- **Validation**: Check text and results before saving

### 7. Navigation Flow
```
Calculator ──Save──> Research
    ↑                   │
    └────Load───────────┘

Calculator ──Filter──> Filtered Results
    ↑                   │
    └────Clear──────────┘

Research ──Share──> Native Share Sheet
Research ──Delete──> Confirmation Dialog
```

### 8. Keyboard Handling
- **KeyboardAvoidingView**: Prevents keyboard from covering input
- **Dismiss on tap**: Tap outside to dismiss keyboard
- **Numeric keyboard**: For number filter input
- **Auto-capitalize off**: For gematria text input

### 9. Performance Optimizations
- **Debounced calculations**: 300ms delay to prevent lag
- **Efficient re-renders**: Only update changed components
- **Nested scrolling**: Smooth scrolling within cards
- **Entry limit**: 100 entries max to prevent memory issues

### 10. Accessibility (Ready for Enhancement)
- **Large touch targets**: Easy to tap
- **Clear labels**: Descriptive button text
- **Visual feedback**: Clear active/inactive states
- **Color contrast**: Meets WCAG standards
- **Future**: Add VoiceOver/TalkBack labels

## Color Palette (From theme.js)
```javascript
colors: {
  primary: '#3498db',      // Blue - Primary actions
  secondary: '#2ecc71',    // Green - Success
  danger: '#e74c3c',       // Red - Destructive
  warning: '#e67e22',      // Orange - Warnings
  text: '#2c3e50',         // Dark gray - Main text
  lightText: '#7f8c8d',    // Light gray - Secondary text
  background: '#f5f5f5',   // Light gray - Background
  white: '#ffffff',        // White - Cards
  border: '#e0e0e0',       // Light gray - Borders
}
```

## Typography (From theme.js)
```javascript
fontSize: {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 18,
  xlarge: 24,
}
```

## Spacing (From theme.js)
```javascript
spacing: {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

## Border Radius (From theme.js)
```javascript
borderRadius: {
  small: 4,
  medium: 8,
  large: 12,
}
```
