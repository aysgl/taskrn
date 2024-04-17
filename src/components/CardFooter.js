import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CardFooter({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} className="p-3">
      <Text>Delete all task</Text>
    </TouchableOpacity>
  );
}
