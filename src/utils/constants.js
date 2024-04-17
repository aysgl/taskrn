/* eslint-disable react/react-in-jsx-scope */
import {RulerPen, Send2, Trash} from 'iconsax-react-native';
import {Dimensions} from 'react-native';

export const screenHeight = Dimensions.get('screen').height;

export const status = [
  {
    id: 1,
    title: 'Todo',
    icon: <Send2 size="32" color="#fff" />,
    icon_small: <Send2 size="22" className="text-blue-400" />,
    color: 'bg-blue-400',
  },
  {
    id: 2,
    title: 'Doing',
    icon: <RulerPen size="32" color="#fff" />,
    icon_small: <RulerPen size="22" color="#fff" />,
    color: 'bg-emerald-400',
  },
  {
    id: 3,
    title: 'Done',
    icon: <Trash size="32" color="#fff" />,
    icon_small: <Trash size="20" color="#fff" />,
    color: 'bg-red-400',
  },
];
