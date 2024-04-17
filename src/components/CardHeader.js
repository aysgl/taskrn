import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {status} from '../utils/constants';

export default function CardHeader({todolength, compLength, cancelLength}) {
  return (
    <View>
      <FlatList
        data={status}
        numColumns={2}
        renderItem={({item}) => (
          <View className="flex-1 gap-4 p-2">
            <View className={`${item.color} rounded-lg w-100 p-6`}>
              <View className="flex items-end">
                <Text>{item.icon}</Text>
              </View>
              <Text className="text-white font-bold mt-4 mb-2">
                {item.title}
              </Text>
              <Text className="text-white">
                {item.title === 'Todo' && todolength}
                {item.title === 'Doing' && compLength}
                {item.title === 'Done' && cancelLength} Task
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
