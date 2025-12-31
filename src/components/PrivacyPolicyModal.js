import React from 'react';
import { Modal, ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';

const PrivacyPolicyModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Privacy Policy</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.lastUpdated}>Last updated: December 31, 2025</Text>

                        <Text style={styles.paragraph}>
                            This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                        </Text>

                        <Text style={styles.paragraph}>
                            We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                        </Text>

                        <Text style={styles.sectionHeader}>Interpretation and Definitions</Text>

                        <Text style={styles.subHeader}>Interpretation</Text>
                        <Text style={styles.paragraph}>
                            The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                        </Text>

                        <Text style={styles.subHeader}>Definitions</Text>
                        <Text style={styles.paragraph}>For the purposes of this Privacy Policy:</Text>

                        <Text style={styles.listItem}>• Account: A unique account created for You to access our Service or parts of our Service.</Text>
                        <Text style={styles.listItem}>• Company: Refers to Gematria Calculator ("We", "Us", or "Our").</Text>
                        <Text style={styles.listItem}>• Country: Ontario, Canada.</Text>
                        <Text style={styles.listItem}>• Device: Any device that can access the Service such as a smartphone, tablet, or computer.</Text>
                        <Text style={styles.listItem}>• Personal Data: Any information that relates to an identified or identifiable individual.</Text>
                        <Text style={styles.listItem}>• Service: Refers to the Gematria Calculator mobile application and associated website.</Text>
                        <Text style={styles.listItem}>• Service Provider: Any third party that processes data on behalf of the Company.</Text>
                        <Text style={styles.listItem}>• Usage Data: Data collected automatically when using the Service.</Text>
                        <Text style={styles.listItem}>• You: The individual accessing or using the Service.</Text>

                        <Text style={styles.sectionHeader}>Collecting and Using Your Personal Data</Text>

                        <Text style={styles.subHeader}>Types of Data Collected</Text>

                        <Text style={styles.subHeaderSmall}>Personal Data</Text>
                        <Text style={styles.paragraph}>
                            While using Our Service, We do not require You to provide personally identifiable information such as your name or email address.
                        </Text>

                        <Text style={styles.subHeaderSmall}>Usage Data</Text>
                        <Text style={styles.paragraph}>
                            Usage Data is collected automatically when using the Service. It may include:
                        </Text>
                        <Text style={styles.listItem}>• Device type</Text>
                        <Text style={styles.listItem}>• Operating system</Text>
                        <Text style={styles.listItem}>• App usage interactions</Text>
                        <Text style={styles.listItem}>• Approximate location</Text>
                        <Text style={styles.listItem}>• Diagnostic data</Text>

                        <Text style={styles.subHeaderSmall}>Tracking Technologies and Cookies</Text>
                        <Text style={styles.paragraph}>
                            Our mobile application does not use browser cookies but may rely on device-level identifiers for analytics and advertising purposes.
                        </Text>

                        <Text style={styles.subHeader}>Advertising</Text>
                        <Text style={styles.paragraph}>
                            We use Google AdMob to serve ads to users. Google AdMob may use device identifiers, usually the IDFA on iOS or Advertising ID on Android, to provide personalized or non-personalized ads.
                        </Text>
                        <Text style={styles.paragraph}>
                            Users can control ad personalization through their device settings.
                        </Text>

                        <Text style={styles.subHeader}>Use of Your Personal Data</Text>
                        <Text style={styles.paragraph}>The Company may use data to:</Text>
                        <Text style={styles.listItem}>• Provide and maintain the Service</Text>
                        <Text style={styles.listItem}>• Monitor usage and performance</Text>
                        <Text style={styles.listItem}>• Improve functionality</Text>
                        <Text style={styles.listItem}>• Comply with legal obligations</Text>

                        <Text style={styles.subHeader}>Sharing of Your Personal Data</Text>
                        <Text style={styles.paragraph}>We may share information with Service Providers (like advertising partners), for legal obligations, or with your consent. We do not sell personal data.</Text>

                        <Text style={styles.subHeader}>Retention of Your Personal Data</Text>
                        <Text style={styles.paragraph}>We retain Usage Data only for as long as necessary for analytical and operational purposes.</Text>

                        <Text style={styles.subHeader}>Transfer of Your Personal Data</Text>
                        <Text style={styles.paragraph}>Your information may be processed outside your country of residence.</Text>

                        <Text style={styles.subHeader}>Disclosure of Your Personal Data</Text>
                        <Text style={styles.paragraph}>We may disclose data if required to comply with legal obligations.</Text>

                        <Text style={styles.sectionHeader}>Contact Us</Text>
                        <Text style={styles.paragraph}>
                            If you have any questions about this Privacy Policy, you can contact us at: https://gematriacalculator.xyz/
                        </Text>

                        <View style={styles.spacer} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.white,
    },
    headerTitle: {
        fontSize: typography.fontSize.xlarge,
        fontWeight: 'bold',
        color: colors.text,
    },
    closeButton: {
        padding: spacing.sm,
    },
    scrollView: {
        flex: 1,
        padding: spacing.md,
    },
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    lastUpdated: {
        fontSize: typography.fontSize.small,
        color: colors.lightText,
        marginBottom: spacing.md,
        fontStyle: 'italic',
    },
    sectionHeader: {
        fontSize: typography.fontSize.large,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    subHeader: {
        fontSize: typography.fontSize.medium,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    subHeaderSmall: {
        fontSize: typography.fontSize.regular,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    paragraph: {
        fontSize: typography.fontSize.regular,
        color: colors.text,
        lineHeight: 24,
        marginBottom: spacing.sm,
    },
    listItem: {
        fontSize: typography.fontSize.regular,
        color: colors.text,
        lineHeight: 24,
        marginLeft: spacing.sm,
        marginBottom: spacing.xs,
    },
    spacer: {
        height: 50,
    }
});

export default PrivacyPolicyModal;
