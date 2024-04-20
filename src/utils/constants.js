/* eslint-disable react/react-in-jsx-scope */
import {RulerPen, Send2, Trash} from 'iconsax-react-native';
import {Dimensions} from 'react-native';

export const screenHeight = Dimensions.get('screen').height;

export const status = [
  {
    id: 1,
    title: 'Todo',
    icon: <Send2 size="32" color="#fff" />,
    icon_small: <Send2 size="22" color="rgb(96 165 250)" />,
    color: 'bg-blue-400',
  },
  {
    id: 2,
    title: 'Doing',
    icon: <RulerPen size="32" color="#fff" />,
    icon_small: <RulerPen size="22" color="rgb(52 211 153)" />,
    color: 'bg-emerald-400',
  },
  {
    id: 3,
    title: 'Done',
    icon: <Trash size="32" color="#fff" />,
    icon_small: <Trash size="22" color="rgb(248 113 113)" />,
    color: 'bg-red-400',
  },
];
