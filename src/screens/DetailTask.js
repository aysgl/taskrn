/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {status} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailTask(props) {
  const {data, setTasks} = props.route.params;

  const updateStatus = async newStatus => {
    console.log('status', newStatus);
    const test = props.navigation.setOptions({status: newStatus});
    console.log('test', test);
    try {
      let tasks = await AsyncStorage.getItem('tasks');
      tasks = tasks ? JSON.parse(tasks) : [];
      console.log('tasks', tasks);
      const updatedTasks = tasks.map(task => {
        if (task.id === data.id) {
          return {...task, status: newStatus};
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);

      console.log('Status updated successfully', updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [data?.status]);

  return (
    <View className="p-3">
      <View className="p-1">
        <View className="flex flex-row justify-between">
          <View className="w-4/6 flex flex-row justify-between items-center mb-2">
            <Text className="text-3xl font-light tracking-tight text-gray-900">
              {data.title}
            </Text>
          </View>
          <View className="items-center justify-center border border-gray-400 h-9 rounded-full">
            <Text className="text-gray-700 px-3 text-sm">{data.tags}</Text>
          </View>
        </View>
        <Text className="mb-3 font-normal text-gray-700">
          {data.description}
        </Text>
        <View className="flex flex-row justify-between">
          <Text className="mb-3 font-normal text-gray-700">
            {data.startdate}
          </Text>
          <Text className="mb-3 font-normal text-gray-700">{data.enddate}</Text>
        </View>
      </View>
      <FlatList
        data={status}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity
            className="flex-1"
            onPress={() => updateStatus(item.title)}>
            <View className="p-1">
              <View className={`${item.color} rounded-lg w-100 p-4`}>
                <View className="flex items-end">
                  <Text>{item.icon}</Text>
                </View>
                <Text className="text-white font-bold mt-4 mb-2">
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
