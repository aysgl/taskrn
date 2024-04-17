import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Add} from 'iconsax-react-native';

export default function AddButton({onPress}) {
  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={onPress}
        className="bg-green-400 absolute bottom-10 right-10 rounded-full h-16 w-16 flex items-center justify-center">
        <Add size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
