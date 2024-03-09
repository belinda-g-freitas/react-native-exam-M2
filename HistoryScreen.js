import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { getObjectFromDB } from './utils/local_storage';

const HistoryScreen = ({ navigation }) => {
  const [list, setData] = useState([]);
  // 
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getObjectFromDB('challenges')
        if (res) {
          const arr = res.filter((item) => item.state)
          setData(arr);
        }
      } catch (e) {
        console.error(`Error while loading from storage: ${e}`);
      }
    }

    getList();
  }, []);
  // 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: list.length === 0 ? 'center' : undefined, }}>
      <Text style={{ fontWeight: '900', paddingHorizontal: 10, paddingTop: 5, }}>ACHIEVED GOALS</Text>

      {list.length === 0 ? (
        <Text style={{ fontWeight: '700' }}>No accomplished challenges found.</Text>
      ) : (
        <View style={{ flex: 1, padding: 15 }}>
          <FlatList
            data={list}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { }}>
                <View style={{ padding: 10, borderBottomWidth: .5, borderBottomColor: '#673AB7' }}>
                  <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                  <Text>{new Date(item.date).toDateString()}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;