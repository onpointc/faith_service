import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';

export function AuthScreen({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Sign in failed', error.message);
    else onDone();
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Sign up failed', error.message);
    else Alert.alert('Check your email to confirm');
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={signIn}><Text style={styles.btnTxt}>Sign in</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btnOutline} onPress={signUp}><Text>Create account</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ padding:16 },
  title:{ fontSize:22, fontWeight:'600', marginBottom:12 },
  input:{ backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1, borderRadius:12, padding:12, marginBottom:8 },
  btn:{ backgroundColor:'#0d9488', padding:12, borderRadius:12, alignItems:'center', marginTop:8 },
  btnTxt:{ color:'#fff', fontWeight:'600' },
  btnOutline:{ padding:12, borderRadius:12, alignItems:'center', marginTop:8, borderWidth:1, borderColor:'#e5e7eb' }
});
