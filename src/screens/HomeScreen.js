/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import AddButton from '../components/AddButton';
import {SCREEN} from '../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import CardFooter from '../components/CardFooter';

export default function HomeScreen({navigation}) {
  const [tasks, setTasks] = useState();
  const [todoLength, setTodoLength] = useState(0);
  const [compLength, setCompLength] = useState(0);
  const [cancelLength, setCancelLength] = useState(0);

  const getTasks = async () => {
    try {
      const savedTasksString = await AsyncStorage.getItem('tasks');
      let savedTasks = savedTasksString ? JSON.parse(savedTasksString) : [];
      if (savedTasks) {
        const todoLength = savedTasks.filter(
          task => task.status === 'Todo',
        ).length;
        const compLength = savedTasks.filter(
          task => task.status === 'Doing',
        ).length;
        const cancelLength = savedTasks.filter(
          task => task.status === 'Done',
        ).length;
        setTodoLength(todoLength);
        setCompLength(compLength);
        setCancelLength(cancelLength);
      }
      setTasks(savedTasks);
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  console.log(tasks);
  useEffect(() => {
    getTasks();
  }, []);

  const clearTask = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex-1 h-screen">
      {tasks?.length > 0 ? (
        <View className="p-2">
          <FlatList
            data={tasks}
            ListHeaderComponent={
              <CardHeader
                data={tasks}
                todolength={todoLength}
                compLength={compLength}
                cancelLength={cancelLength}
              />
            }
            ListFooterComponent={<CardFooter onPress={clearTask} />}
            renderItem={({item}) => <Card data={item} setTasks={setTasks} />}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
          />
        </View>
      ) : (
        <View className="flex items-center justify-center h-[90%]">
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/add-tasks-concept-illustration_114360-4905.jpg?w=1380&t=st=1713286755~exp=1713287355~hmac=6753a7079bb2c4ba5b4f539f23089aae6f80cabde3fa7b84c7500c69b684c23b',
            }}
            resizeMode="contain"
            style={{width: 400, height: 350}}
          />
          <Text className="mt-3 text-gray-500 px-10 text-center text-xl">
            <Text className="font-bold">No tasks found.</Text> You can click the
            button below to add a new one.
          </Text>
        </View>
      )}

      <AddButton onPress={() => navigation.navigate(SCREEN.ADD_TASK)} />
    </View>
  );
}
