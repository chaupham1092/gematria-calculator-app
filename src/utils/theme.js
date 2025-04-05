// Theme colors and styles for the app
export const colors = {
  primary: '#3498db',
  secondary: '#34495e',
  background: '#f5f5f5',
  white: '#ffffff',
  text: '#333333',
  lightText: '#666666',
  border: '#dddddd',
  lightBorder: '#eeeeee',
  highlight: '#f0f7ff',
  error: '#e74c3c',
  success: '#2ecc71',
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const layout = {
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};
