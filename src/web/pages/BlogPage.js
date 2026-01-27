import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Helmet } from 'react-helmet-async';

const blogPosts = [
  {
    id: 'alphanumeric-qabbala',
    title: 'Alphanumeric Qabbala Cipher: Unveiling the Mystical Base-36 System',
    date: 'May 15, 2025',
    author: 'Dr. Jonathan Mercer',
    excerpt: 'In the vast landscape of esoteric knowledge and mystical traditions, numerical systems have long served as bridges between the mundane and the divine. Alphanumeric Qabbala represents a unique intersection of modern computational concepts and ancient mystical traditions.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/alphanumeric-qabbala-cipher.html'
  },
  {
    id: 'unlocking-mysteries',
    title: 'Unlocking the Mysteries of Gematria: The Ancient Art of Hebrew Numerical Wisdom',
    date: 'March 5, 2025',
    author: 'David Rosenberg',
    excerpt: 'Have you ever wondered if there\'s more to sacred texts than meets the eye? Gematria is a Kabbalistic method of interpreting Hebrew scriptures by computing the numerical value of words based on the values of their constituent letters.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/unlocking-the-mysteries-of-gematria.html'
  },
  {
    id: 'numerical-mystical-systems',
    title: 'Related Numerical Mystical Systems: A Comparative Study',
    date: 'December 13, 2017',
    author: 'Rebekah Galindo',
    excerpt: 'Throughout history, cultures across the world have developed sophisticated systems for understanding the universe through numbers. This exploration focuses on Pythagorean numerology, Islamic Abjad numerology, Christian Cabala, and Hermetic Qabalah.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/numerical-mystical-systems.html'
  },
  {
    id: 'kabbalah-numerology',
    title: 'Kabbalah Numerology: The Divine Mathematics of Jewish Mysticism',
    date: 'August 29, 2002',
    author: 'Dr. Arturo Contreras',
    excerpt: 'Have you ever wondered if the universe speaks in numbers? In the ancient tradition of Kabbalah, numbers aren\'t just quantities—they\'re gateways to understanding the divine architecture of creation itself.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/kabbalah-numerology.html'
  },
  {
    id: 'mathematical-mysticism',
    title: 'The Mathematical Mysticism of Hebrew Letters',
    date: 'July 22, 2013',
    author: 'Dr. Raphael McFarland',
    excerpt: 'What continues to amaze me about gematria is how it embodies a worldview where mathematics and spirituality are not separate domains but interconnected aspects of a unified reality.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/mathematical-mysticism.html'
  },
  {
    id: 'hidden-connections',
    title: 'The Hidden Connections: How Gematria Reveals Patterns in Sacred Texts',
    date: 'May 15, 2021',
    author: 'Michael Cohen',
    excerpt: 'For thousands of years, scholars and mystics have used gematria to uncover hidden connections within sacred texts. These numerical relationships often reveal surprising patterns that aren\'t apparent from the text alone.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/hidden-connections.html'
  },
  {
    id: 'gematria-across-cultures',
    title: 'Gematria Across Cultures: From Hebrew to Greek and Beyond',
    date: 'February 28, 2025',
    author: 'Sarah Johnson',
    excerpt: 'While gematria is most commonly associated with Hebrew texts and Jewish mysticism, similar numerological systems have appeared in cultures around the world. This cross-cultural phenomenon raises fascinating questions.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/gematria-across-cultures.html'
  },
  {
    id: 'practical-applications',
    title: 'Practical Applications of Gematria in Modern Life',
    date: 'February 10, 2025',
    author: 'David Goldstein',
    excerpt: 'Is gematria merely an ancient curiosity, or can it offer practical value in our modern lives? While skeptics might dismiss numerological practices as superstition, many people today find genuine meaning and insight through gematria.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/practical-applications.html'
  },
  {
    id: 'mathematics-behind-gematria',
    title: 'The Mathematics Behind Gematria: Number Theory and Sacred Geometry',
    date: 'January 25, 2025',
    author: 'Robert Chen',
    excerpt: 'Beyond its spiritual and mystical applications, gematria represents a fascinating intersection of mathematics, language, and philosophy. This article delves into the mathematical principles underlying gematria.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/mathematics-behind-gematria.html'
  },
  {
    id: 'debunking-myths',
    title: 'Debunking Myths: What Gematria Is and Isn\'t',
    date: 'January 12, 2025',
    author: 'Rachel Levy',
    excerpt: 'With the growing popularity of gematria in mainstream culture, misconceptions and misrepresentations have become increasingly common. This article aims to clarify what gematria truly is—and what it isn\'t.',
    url: 'https://gematriacalculator.xyz/pages/blog-posts/debunking-myths.html'
  }
];

export default function BlogPage() {
  const openBlogPost = (url) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Gematria Blog - Articles, Insights, and Discoveries | Gematria Calculator</title>
        <meta name="description" content="Explore our comprehensive collection of gematria articles covering Hebrew numerology, Kabbalah, cipher systems, and the mathematical mysticism of sacred texts." />
        <meta name="keywords" content="gematria blog, hebrew numerology, kabbalah articles, gematria insights, cipher systems, sacred texts, numerology articles" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gematriacalculator.xyz/blog" />
        <meta property="og:title" content="Gematria Blog - Articles, Insights, and Discoveries" />
        <meta property="og:description" content="Explore our comprehensive collection of gematria articles covering Hebrew numerology, Kabbalah, cipher systems, and the mathematical mysticism of sacred texts." />
        <meta property="og:image" content="https://gematriacalculator.xyz/images/gematria-og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gematriacalculator.xyz/blog" />
        <meta property="twitter:title" content="Gematria Blog - Articles, Insights, and Discoveries" />
        <meta property="twitter:description" content="Explore our comprehensive collection of gematria articles covering Hebrew numerology, Kabbalah, cipher systems, and the mathematical mysticism of sacred texts." />
        <meta property="twitter:image" content="https://gematriacalculator.xyz/images/gematria-og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://gematriacalculator.xyz/blog" />
      </Helmet>

      <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Gematria Blog</Text>
        <Text style={styles.subtitle}>Articles, Insights, and Discoveries</Text>

        {blogPosts.map((post) => (
          <View key={post.id} style={styles.blogPost}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postMeta}>{post.date} | By {post.author}</Text>
            <Text style={styles.postExcerpt}>{post.excerpt}</Text>
            <TouchableOpacity 
              style={styles.readMoreButton}
              onPress={() => openBlogPost(post.url)}
            >
              <Text style={styles.readMoreText}>Read More →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  blogPost: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  postMeta: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  postExcerpt: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 15,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
});
