import { useState, useEffect } from 'react';
import { ToastAndroid, Modal, Alert, View, Text, Image, TextInput, Button, TouchableOpacity, Picker, FlatList, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { storeObject, getObjectFromDB, removeFromDB } from './utils/local_storage';
import { convertStringToDate } from './utils/converters';
import { Calendar } from 'react-native-calendars';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [date, setDate] = useState('');
  const [showError, setError] = useState(false);
  const [list, setList] = useState([]);
  // const [selectedDate, setCalender] = useState('');
  const [showCalendar, setCalendarVisible] = useState(false);

  // 
  useEffect(() => {
    const getList = async () => {
      // await removeFromDB('challenges');
      try {
        const res = await getObjectFromDB('challenges')
        if (res) setList(res);
      } catch (e) {
        console.error(`Error while loading from storage: ${e}`);
      }
    }

    getList();
  }, []);
  // 
  const updateChallenge = (value) => {
    storeObject('challenges', value ?? list);
  }
  // 
  const deleteChallenge = (index) => {
    const arr = list.splice(index, 1)
    setList(arr);
    updateChallenge(arr);

    ToastAndroid.showWithGravity(
      'Challenge deleted successfully.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }
  // 
  const handleCalendarSelect = (date) => {
    console.log('pressed');
    setCalendarVisible(false);
    const arr = list.map((item) =>
      (new Date(item.date).getTime() === new Date(date.dateString).getTime())
        ? { ...item, state: true }
        : item
    );
    setList(arr);
    // store list
    updateChallenge(arr);
  }
  // 
  const handleValidate = () => {
    if (challenge) {
      const now = new Date();
      const currentDate = !date
        ? `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
        : date;
      if (convertStringToDate(currentDate) === null || convertStringToDate(currentDate) === undefined) {
        setError(true);
      } else {
        // close modal
        setModalVisible(false);
        // update list
        list.push({ title: challenge, date: convertStringToDate(currentDate), state: false });
        setList(list);
        // store list
        updateChallenge();
        // clear form
        setChallenge('');
        setDate('')
      }

    } else {
      console.log('Error.');
    }
  };
  // console.log(list);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: list.length === 0 ? 'center' : undefined, }}>
      {list.length === 0 ? (
        <Text style={{ fontWeight: '700' }}>No challenges found.</Text>
      ) : (
        <View style={{ flex: 1, padding: 15 }}>
          <FlatList
            data={list}
            keyExtractor={(_item, i) => i.toString()}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => { setCalendarVisible(true) }}>
                <View style={{ alignContent: 'space-between', justifyContent: 'space-between', borderBottomColor: '#673AB7', borderBottomWidth: .5, alignItems: 'center', flexDirection: 'row', }}>

                  <View style={{ flexDirection: 'column', alignContent: 'space-around', alignItemsjustifyContent: 'flex-start', padding: 10, }}>
                    <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                    <Text>{new Date(item.date).toDateString()}</Text>
                    <Text>State: {item.state ? 'Done' : 'Pending'}</Text>
                  </View>

                  <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => deleteChallenge(i)}>
                    <Icon name='remove-circle-outline' style={{ alignContent: 'center' }} size={24} color='red' />
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#673AB7', borderCurve: 'circular', borderRadius: 15, alignContent: 'center', alignSelf: 'flex-end', position: 'absolute', elevation: 3, zIndex: 5, padding: 24, bottom: 10, right: 10, }}>
        <Icon name='add-outline' size={24} color='#fff' />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'stretch', }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderColor: '#673AB7', borderWidth: .7, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>NEW CHALLENGE</Text>

            <TextInput style={{ height: 50, borderColor: '#673AB7', borderWidth: .7, borderRadius: 5, marginTop: 12, marginBottom: 9, paddingHorizontal: 5, }}
              placeholder='Challenge *'
              value={challenge} maxLength={255}
              onChangeText={(text) => setChallenge(text)}
            />

            <TextInput style={{ height: 50, borderColor: '#673AB7', borderWidth: .7, borderRadius: 5, marginBottom: 3, paddingHorizontal: 5, }}
              placeholder='Dead line (DD-MM-YYYY)'
              value={date}
              onChangeText={(text) => setDate(text)}
            />
            <Text style={{ color: showError ? 'red' : '#fff', marginBottom: 25, }}>Invalid date</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity title='Cancel' color='#673AB7' style={{ backgroundColor: '#673AB7', borderRadius: 5, width: 90, alignItems: 'center', /* borderColor: '#fff', borderWidth: .5, */ elevation: 3 }} onPress={() => setModalVisible(false)} >
                <Text style={{ fontWeight: '500', padding: 10, fontSize: 14, color: '#fff', }}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity color='#673AB7' style={{ backgroundColor: '#673AB7', borderRadius: 5, width: 90, alignItems: 'center', elevation: 3 }} onPress={handleValidate} >
                <Text style={{ fontWeight: '500', padding: 10, fontSize: 14, color: '#fff', }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showCalendar &&
        <Calendar allowSelectionOutOfRange={false} maxDate={`${new Date().toDateString()}`} accessibilityLabel={'Select a day where your goal was achieved'} onDayPress={handleCalendarSelect} showWeekNumbers={true} firstDay={1} style={{ padding: 12 }} /* displayLoadingIndicator={true} */ />
      }
    </View>
  );
};

export default HomeScreen;