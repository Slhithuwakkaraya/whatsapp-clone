import { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialMessages = [
  { id: '1', text: 'හායි මචං! මේක වැඩ කරනවා', isMe: false, time: '11:15 AM' },
  { id: '2', text: 'පට්ට App එකක් නේ 😎', isMe: true, time: '11:16 AM' },
  { id: '3', text: 'උඹම හැදුවා කියලා කියපන්', isMe: false, time: '11:17 AM' },
];

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        text: input,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
      setInput('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.msgRow, item.isMe ? styles.msgRowRight : styles.msgRowLeft]}>
      <View style={[styles.bubble, item.isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={styles.msgText}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
        <View style={styles.headerProfile}>
          <View style={styles.avatar}><Text style={styles.avatarText}>S</Text></View>
          <View>
            <Text style={styles.headerName}>Sihithuwakkaraya</Text>
            <Text style={styles.headerStatus}>online</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="videocam" size={22} color="#FFF" style={{marginRight: 20}} />
          <Ionicons name="call" size={20} color="#FFF" style={{marginRight: 20}} />
          <Ionicons name="ellipsis-vertical" size={22} color="#FFF" />
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.chatList}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Ionicons name="happy-outline" size={24} color="#8696A0" style={{marginHorizontal: 5}} />
            <TextInput
              style={styles.input}
              placeholder="Message"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <Ionicons name="attach" size={22} color="#8696A0" style={{marginHorizontal: 10}} />
            <Ionicons name="camera" size={22} color="#8696A0" style={{marginRight: 5}} />
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name={input.trim() ? "send" : "mic"} size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5DDD5' },
  header: { height: 60, backgroundColor: '#075E54', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  headerProfile: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#DFDFDF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#075E54' },
  headerName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  headerStatus: { color: '#FFF', fontSize: 12 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  chatList: { flex: 1 },
  msgRow: { marginVertical: 2, paddingHorizontal: 10, maxWidth: '80%' },
  msgRowLeft: { alignSelf: 'flex-start' },
  msgRowRight: { alignSelf: 'flex-end' },
  bubble: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  bubbleMe: { backgroundColor: '#DCF8C6' },
  bubbleOther: { backgroundColor: '#FFF' },
  msgText: { fontSize: 16, color: '#000' },
  time: { fontSize: 11, color: '#667781', alignSelf: 'flex-end', marginTop: 4 },
  inputContainer: { flexDirection: 'row', padding: 8, alignItems: 'flex-end', backgroundColor: '#F0F2F5' },
  inputBox: { flex: 1, flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 25, alignItems: 'flex-end', marginRight: 8, paddingVertical: 8, paddingHorizontal: 5 },
  input: { flex: 1, fontSize: 16, maxHeight: 100, marginHorizontal: 5 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#075E54', justifyContent: 'center', alignItems: 'center' },
});
