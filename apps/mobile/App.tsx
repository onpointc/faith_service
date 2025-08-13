import { NewsFeed } from './NewsFeed';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { AuthScreen } from './AuthScreen';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8787';
export default function App() {
  const [session, setSession] = useState<any>(null);
  useEffect(()=>{ supabase.auth.getSession().then(({data})=>setSession(data.session)); const { data: sub } = supabase.auth.onAuthStateChange((_e, s)=>setSession(s?.session ?? null)); if(!session) return <AuthScreen onDone={()=>{}}/>;
  return ()=>{ sub.subscription.unsubscribe(); }; },[]);
  if(!session) return <AuthScreen onDone={()=>{}}/>;
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f8fafc'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Student Dashboard</Text>
        <Text style={styles.sub}>Bronze • 120 pts • Next: Silver (200)</Text>
        <View style={styles.card}><Text>Recommended Activities</Text></View>
        <View style={styles.card}><Text style={{fontWeight:'600', marginBottom:8}}>News / Blog</Text><NewsFeed base={base}/></View>
        <View style={styles.card}><Text>Upcoming</Text></View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ padding:16, gap:12 },
  title:{ fontSize:24, fontWeight:'600' },
  sub:{ color:'#475569' },
  card:{ backgroundColor:'#fff', padding:16, borderRadius:16, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8 }
});
