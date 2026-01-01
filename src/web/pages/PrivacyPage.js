import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';

export default function PrivacyPage() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>

            <View style={styles.content}>
                <Text style={styles.lastUpdated}>Last updated: December 31, 2025</Text>

                <Text style={styles.paragraph}>
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </Text>

                <Text style={styles.paragraph}>
                    We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator and supplemented to reflect our use of third-party advertising services.
                </Text>

                <Text style={styles.heading}>Interpretation and Definitions</Text>

                <Text style={styles.subheading}>Interpretation</Text>
                <Text style={styles.paragraph}>
                    The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                </Text>

                <Text style={styles.subheading}>Definitions</Text>
                <Text style={styles.paragraph}>For the purposes of this Privacy Policy:</Text>

                <Text style={styles.listItem}>• <Text style={styles.bold}>Account</Text> means a unique account created for You to access our Service or parts of our Service.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Affiliate</Text> means an entity that controls, is controlled by, or is under common control with a party.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Company</Text> (referred to as "We", "Us", or "Our") refers to Gematria Calculator.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Cookies</Text> are small files placed on Your device.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Country</Text> refers to: Ontario, Canada.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Device</Text> means any device that can access the Service such as a smartphone, tablet, or computer.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Personal Data</Text> is any information that relates to an identified or identifiable individual.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Service</Text> refers to the Gematria Calculator mobile application and associated website.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Service Provider</Text> means any third party that processes data on behalf of the Company.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Usage Data</Text> refers to data collected automatically when using the Service.</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>Website</Text> refers to Gematria Calculator, accessible from https://gematriacalculator.xyz/</Text>
                <Text style={styles.listItem}>• <Text style={styles.bold}>You</Text> means the individual accessing or using the Service.</Text>

                <Text style={styles.heading}>Collecting and Using Your Personal Data</Text>

                <Text style={styles.subheading}>Types of Data Collected</Text>

                <Text style={styles.subItemHeading}>Personal Data</Text>
                <Text style={styles.paragraph}>
                    While using Our Service, We do not require You to provide personally identifiable information such as your name or email address.
                </Text>

                <Text style={styles.subItemHeading}>Usage Data</Text>
                <Text style={styles.paragraph}>
                    Usage Data is collected automatically when using the Service. It may include:
                </Text>
                <Text style={styles.listItem}>• Device type</Text>
                <Text style={styles.listItem}>• Operating system</Text>
                <Text style={styles.listItem}>• App usage interactions</Text>
                <Text style={styles.listItem}>• Approximate location (derived from IP address)</Text>
                <Text style={styles.listItem}>• Diagnostic data</Text>

                <Text style={styles.subItemHeading}>Tracking Technologies and Cookies</Text>
                <Text style={styles.paragraph}>
                    Our mobile application does not use browser cookies but may rely on device-level identifiers for analytics and advertising purposes.
                </Text>

                <Text style={styles.subheading}>Advertising</Text>
                <Text style={styles.paragraph}>
                    Our application uses third-party advertising services to display advertisements.
                </Text>
                <Text style={styles.paragraph}>
                    We use Google AdMob to serve ads to users. Google AdMob may use device identifiers, usually the IDFA on iOS or Advertising ID on Android, to provide personalized or non-personalized ads, depending on your device settings and consent choices.
                </Text>
                <Text style={styles.paragraph}>
                    Users can control ad personalization through their device settings. On iOS, users are presented with an App Tracking Transparency (ATT) prompt and may choose whether to allow tracking.
                </Text>
                <Text style={styles.link} onPress={() => Linking.openURL('https://policies.google.com/technologies/ads')}>
                    For more information on how Google uses data from sites or apps that use its services, please click here.
                </Text>

                <Text style={styles.subheading}>Use of Your Personal Data</Text>
                <Text style={styles.paragraph}>The Company may use data for the following purposes:</Text>
                <Text style={styles.listItem}>• To provide and maintain the Service</Text>
                <Text style={styles.listItem}>• To monitor usage and performance</Text>
                <Text style={styles.listItem}>• To improve functionality and user experience</Text>
                <Text style={styles.listItem}>• To comply with legal obligations</Text>

                <Text style={styles.subheading}>Sharing of Your Personal Data</Text>
                <Text style={styles.paragraph}>We may share information in the following situations:</Text>
                <Text style={styles.listItem}>• With Service Providers (such as advertising partners)</Text>
                <Text style={styles.listItem}>• For legal obligations</Text>
                <Text style={styles.listItem}>• With your consent</Text>
                <Text style={styles.paragraph}>We do not sell personal data.</Text>

                <Text style={styles.subheading}>Retention of Your Personal Data</Text>
                <Text style={styles.paragraph}>We retain Usage Data only for as long as necessary for analytical and operational purposes.</Text>

                <Text style={styles.subheading}>Transfer of Your Personal Data</Text>
                <Text style={styles.paragraph}>Your information may be processed outside your country of residence.</Text>

                <Text style={styles.subheading}>Delete Your Personal Data</Text>
                <Text style={styles.paragraph}>You may request deletion of data by contacting us. Note that some data may be retained to comply with legal obligations.</Text>

                <Text style={styles.subheading}>Disclosure of Your Personal Data</Text>
                <Text style={styles.paragraph}>We may disclose data if required to: Comply with legal obligations, Protect the Company’s rights, Prevent misuse or fraud.</Text>

                <Text style={styles.subheading}>Children's Privacy</Text>
                <Text style={styles.paragraph}>
                    Our Service is not intended for children under the age of 13. We do not knowingly collect data from children.
                </Text>

                <Text style={styles.subheading}>Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date.
                </Text>

                <Text style={styles.heading}>Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, you can contact us:
                </Text>
                <Text style={styles.link} onPress={() => Linking.openURL('https://gematriacalculator.xyz/')}>
                    https://gematriacalculator.xyz/
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
        textAlign: 'center',
    },
    lastUpdated: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    content: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
        paddingBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 30,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 20,
        marginBottom: 10,
    },
    subItemHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
        marginTop: 15,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
        marginBottom: 15,
    },
    listItem: {
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
        marginBottom: 8,
        paddingLeft: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    link: {
        color: '#3498db',
        fontSize: 16,
        marginBottom: 15,
        textDecorationLine: 'underline',
    },
});
