import {View, Text} from 'react-native';
import React from 'react';
import {status} from '../utils/constants';

export default function DetailTask({route}) {
  const data = route.params;

  return (
    <View className="p-3">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-3xl font-light tracking-tight text-gray-900">
            {data.title}
          </Text>
        </View>
        <View className="items-center justify-center border border-gray-400 h-9 rounded-full">
          <Text className="text-gray-700 px-3 text-sm">{data.tags}</Text>
        </View>
      </View>
      <Text className="mb-3 font-normal text-gray-700">{data.description}</Text>
      <View className="flex flex-row justify-between">
        <Text className="mb-3 font-normal text-gray-700">{data.startdate}</Text>
        <Text className="mb-3 font-normal text-gray-700">{data.enddate}</Text>
      </View>
    </View>
  );
}
