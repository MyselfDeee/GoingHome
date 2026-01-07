import React from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { generateAIResponse } from '../utils/aiService';

const darkPalette = {
  background: '#0f172a',
  card: '#1e293b',
  border: '#334155',
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  success: '#10b981',
  danger: '#ef4444',
  muted: '#94a3b8',
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
};

const lightPalette = {
  background: '#f8fafc',
  card: '#ffffff',
  border: '#e2e8f0',
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  success: '#059669',
  danger: '#dc2626',
  muted: '#64748b',
  text: '#0f172a',
  textSecondary: '#475569',
};

export default function AIAssistant() {
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const palette = isDarkTheme ? darkPalette : lightPalette;
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Hello! I\'m your AI Assistant. How can I help you today?', sender: 'ai' },
  ]);
  const [input, setInput] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const dynamicStyles = createStyles(palette);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  const handleLogout = () => {
    router.push('/(tabs)' as never);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: prev.length + 1, text: userMessage, sender: 'user' }]);
    setLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage, messages);
      setMessages(prev => [...prev, { id: prev.length + 1, text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while processing your request.';
      setMessages(prev => [...prev, { id: prev.length + 1, text: `Error: ${errorMessage}`, sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[dynamicStyles.safeArea, { backgroundColor: palette.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={dynamicStyles.flexContainer}>
        {/* Top Bar */}
        <View style={dynamicStyles.topBar}>
        <Pressable style={dynamicStyles.hamburgerBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={dynamicStyles.hamburgerIcon}>☰</Text>
        </Pressable>
        <View style={dynamicStyles.logoRow}>
          <View style={dynamicStyles.logoBox}>
            <Text style={dynamicStyles.logoLetter}>P</Text>
          </View>
          <View>
            <Text style={dynamicStyles.brandTitle}>Knit Edu</Text>
            <Text style={dynamicStyles.brandSubtitle}>AI Assistant</Text>
          </View>
        </View>
        <Pressable style={dynamicStyles.themeBtn} onPress={() => setIsDarkTheme(!isDarkTheme)}>
          <Text style={dynamicStyles.themeBtnIcon}>{isDarkTheme ? '☀️' : '🌙'}</Text>
        </Pressable>
        <Pressable style={dynamicStyles.logoutBtn} onPress={handleLogout}>
          <Text style={dynamicStyles.logoutIcon}>⏻</Text>
          <Text style={dynamicStyles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      {/* Dropdown Menu - Slide from left */}
      {menuOpen && <Pressable style={dynamicStyles.menuOverlay} onPress={() => setMenuOpen(false)} />}
      <Animated.View style={[dynamicStyles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={dynamicStyles.menuHeader}>
          <Text style={dynamicStyles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setMenuOpen(false)}>
            <Text style={dynamicStyles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <View style={dynamicStyles.menuDivider} />

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/parent-dashboard' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>🏠</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Parent Dashboard</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Overview & payments</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/re-registration' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>📝</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Re-registration</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Register learners</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/fee-forecasting' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>📊</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Fee Forecasting</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Budget planning</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/ai-assistant' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>🤖</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>AI Assistant</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Get smart help</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/request-statement' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>📋</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Request Statement</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Download records</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/admissions' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>🎓</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Admissions</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Track applications</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/announcements' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>📢</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Announcements</Text>
            <Text style={dynamicStyles.dropdownSubtext}>School news & updates</Text>
          </View>
        </Pressable>

        <Pressable
          style={dynamicStyles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/profile' as never);
          }}>
          <Text style={dynamicStyles.dropdownIcon}>👤</Text>
          <View style={dynamicStyles.itemContent}>
            <Text style={dynamicStyles.dropdownText}>Profile</Text>
            <Text style={dynamicStyles.dropdownSubtext}>Manage your information</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={dynamicStyles.messagesContainer} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={dynamicStyles.pageHeader}>
          <Text style={dynamicStyles.pageTitle}>🤖 AI Assistant</Text>
          <Text style={dynamicStyles.pageSubtitle}>Get smart help with your school queries</Text>
        </View>

        {/* Messages */}
        {messages.map(msg => (
          <View key={msg.id} style={[dynamicStyles.messageRow, msg.sender === 'user' && dynamicStyles.userMessageRow]}>
            <View style={[dynamicStyles.messageBubble, msg.sender === 'user' && dynamicStyles.userMessageBubble]}>
              <Text style={[dynamicStyles.messageText, msg.sender === 'user' && dynamicStyles.userMessageText]}>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={dynamicStyles.inputContainer}>
        <TextInput
          style={dynamicStyles.input}
          placeholder="Ask me anything..."
          placeholderTextColor={palette.muted}
          value={input}
          onChangeText={setInput}
          multiline
          maxHeight={100}
          editable={!loading}
        />
        <Pressable style={[dynamicStyles.sendBtn, loading && dynamicStyles.sendBtnDisabled]} onPress={handleSendMessage} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={dynamicStyles.sendBtnText}>Send</Text>
          )}
        </Pressable>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (palette: typeof darkPalette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  flexContainer: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 40,
    backgroundColor: palette.card,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  hamburgerBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: { fontSize: 24, color: palette.text },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logoLetter: { color: '#fff', fontWeight: '700', fontSize: 16 },
  brandTitle: { color: palette.text, fontSize: 15, fontWeight: '700' },
  brandSubtitle: { color: palette.muted, fontSize: 11 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: palette.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.danger,
  },
  logoutIcon: { fontSize: 18, color: palette.danger },
  logoutText: { color: palette.danger, fontWeight: '600', fontSize: 12 },
  themeBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: palette.card,
  },
  themeBtnIcon: { fontSize: 18 },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: palette.card,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 0 },
    paddingTop: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.text,
  },
  closeIcon: {
    fontSize: 24,
    color: palette.muted,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: palette.background,
    gap: 14,
  },
  dropdownIcon: { fontSize: 28 },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownText: { fontSize: 15, fontWeight: '700', color: palette.text },
  dropdownSubtext: { fontSize: 12, color: palette.muted, marginTop: 2 },
  messagesContainer: { padding: 18, gap: 14, paddingBottom: 20 },
  pageHeader: { marginBottom: 16 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: palette.text, marginBottom: 4 },
  pageSubtitle: { color: palette.textSecondary, fontSize: 13, marginTop: 2 },
  messageRow: { alignItems: 'flex-start' },
  userMessageRow: { alignItems: 'flex-end' },
  messageBubble: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 14,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  userMessageBubble: { 
    backgroundColor: palette.primary,
    borderColor: palette.primaryDark,
  },
  messageText: { fontSize: 14, color: palette.text, lineHeight: 20 },
  userMessageText: { color: '#fff' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
    padding: 16,
    paddingBottom: 20,
    backgroundColor: palette.card,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: palette.text,
    backgroundColor: palette.card,
  },
  sendBtn: {
    backgroundColor: palette.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 70,
    shadowColor: palette.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  sendBtnDisabled: {
    backgroundColor: palette.muted,
    opacity: 0.5,
  },
  sendBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});