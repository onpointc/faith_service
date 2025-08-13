import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export function NewsFeed({ base }: { base: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(()=>{ fetch(`${base}/news?schoolId=school-id-demo`).then(r=>r.json()).then(setPosts).catch(()=>{}); },[]);
  return (
    <View style={{ gap: 8 }}>
      {posts.map((p)=> (
        <View key={p.id} style={{ backgroundColor:'#fff', borderWidth:1, borderColor:'#e5e7eb', borderRadius:12, overflow:'hidden' }}>
          {p.coverUrl ? <Image source={{ uri: p.coverUrl }} style={{ width:'100%', height:120 }} /> : null}
          <View style={{ padding:12 }}>
            <Text style={{ fontWeight:'600' }}>{p.title}</Text>
            <Text style={{ color:'#475569', marginTop:4, fontSize:12 }}>{new Date(p.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
