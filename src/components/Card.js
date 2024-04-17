import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {status} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../utils/routes';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {Trash} from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card({data, setTasks}) {
  const navigation = useNavigation();

  const removeTask = async id => {
    try {
      let tasks = await AsyncStorage.getItem('tasks');
      tasks = tasks ? JSON.parse(tasks) : [];
      const updatedTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log('Task removed successfully');
    } catch (error) {
      console.error('Failed to remove task:', error);
    }
  };

  const renderRightActions = () => {
    return (
      <RectButton
        style={styles.leftAction}
        activeOpacity={0}
        android_ripple={{color: 'transparent'}}
        onPress={() => removeTask(data.id)}>
        <View className="flex-1 items-center justify-center">
          <View className="p-3 bg-red-200 rounded-full">
            <Trash size="32" color="#FF8A65" />
          </View>
        </View>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        onPress={() => navigation.navigate(SCREEN.DETAIL_TASK, data)}
        className="w-100 m-2 p-6 bg-white rounded-lg border border-gray-200">
        <View className="flex flex-row justify-between">
          <View className="w-4/6 flex flex-row items-center mb-2">
            <View>
              {status.find(task => task?.title === data?.status)?.icon_small}
            </View>
            <Text className="ms-2 text-2xl font-light tracking-tight text-gray-900">
              {data.title}
            </Text>
          </View>
          <View className="items-center justify-center border border-gray-400 h-8 rounded-full">
            <Text className="text-gray-700 px-3 text-sm">{data.tags}</Text>
          </View>
        </View>
        <Text className="mb-3 font-normal text-gray-700">
          {data.description.slice(0, 90)}...
        </Text>
        <View className="flex flex-row justify-between">
          <Text className="mb-3 font-normal text-gray-700">
            {data.startdate}
          </Text>
          <Text className="mb-3 font-normal text-gray-700">{data.enddate}</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 50,
    borderRadius: 50,
    padding: 6,
    width: 80,
  },
});
