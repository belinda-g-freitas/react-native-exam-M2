import { useState } from 'react';
import { ScrollView, View, FlatList, Text, Image, TextInput, Button, TouchableOpacity, Picker } from 'react-native';

var data = Array.from({ length: 7 }, (_, i) => ({ id: i, title: `Item ${i + 1}` }));

const NotificationScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { }}>
            <View style={{ padding: 10, borderBottomWidth: .5, borderBottomColor: '#673AB7' }}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NotificationScreen;