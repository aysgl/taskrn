/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {SCREEN} from '../utils/routes';

export default function AddTask({navigation}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const animatedValueTitle = new Animated.Value(10);
  const animatedValueDescription = new Animated.Value(10);
  const animatedValueDatepicker = new Animated.Value(10);

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Frontend Developer',
        value: 'frontend',
      },
      {
        id: '2',
        label: 'Backend Developer',
        value: 'backend',
      },
      {
        id: '3',
        label: 'Full Stack Developer',
        value: 'fullstack',
      },
      {
        id: '4',
        label: 'Mobile Developer',
        value: 'mobile',
      },
    ],
    [],
  );

  const handleFocus = fieldName => {
    animateText(fieldName, true);
  };

  const handleBlur = fieldName => {
    animateText(fieldName, false);
  };

  const animateText = (fieldName, isFocused) => {
    let translateY;
    if (fieldName === 'title') {
      translateY = animatedValueTitle;
    } else if (fieldName === 'description') {
      translateY = animatedValueDescription;
    } else {
      return;
    }

    Animated.timing(translateY, {
      toValue: isFocused ? -2 : 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const setTask = async task => {
    try {
      const savedTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify([...savedTasks, task]),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          initialValues={{
            id: uuid.v4(),
            title: '',
            description: '',
            startdate: startDate.toDateString(),
            enddate: endDate.toDateString(),
            tags: '',
            status: 'Todo',
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .matches(
                /^[a-zA-Z\s.,?!]+$/,
                'Title must contain only alphabetic characters and spaces',
              )
              .max(60, ({max}) => `Must be ${max} characters or less`)
              .required('Title is required'),
            description: Yup.string()
              .max(300, ({max}) => `Must be ${max} characters or less`)
              .required('Description is required'),
          })}
          onSubmit={async (values, {resetForm}) => {
            try {
              setTask(values);
              resetForm();
              navigation.navigate(SCREEN.HOME);
            } catch (error) {
              console.error(error);
            }
          }}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View className="p-6">
              <View className="mb-3">
                <Animated.Text
                  className={`bg-white mx-4 z-10 ${
                    touched.title ? 'text-green-500' : ''
                  }`}
                  style={{
                    transform: [{translateY: animatedValueTitle}],
                    width: 40,
                  }}>
                  Title
                </Animated.Text>

                <TextInput
                  className={`border  ${
                    errors.title ? 'border-red-300' : 'border-slate-200'
                  } focus:outline-none rounded-md focus:border-green-500 w-full p-3 h-16`}
                  onChangeText={text => handleChange('title')(text)}
                  onBlur={() => handleBlur('title')}
                  onFocus={() => handleFocus('title')}
                  value={values.title}
                />
                {touched.title && errors.title ? (
                  <View>
                    <Text className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.title}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View className="mb-3">
                <Animated.Text
                  className={`bg-white mx-4 z-10 ${
                    touched.description ? 'text-green-500' : ''
                  }`}
                  style={{
                    transform: [{translateY: animatedValueDescription}],
                    width: 90,
                  }}>
                  Description
                </Animated.Text>

                <TextInput
                  multiline
                  className={`border  ${
                    errors.description ? 'border-red-300' : 'border-slate-200'
                  } focus:outline-none rounded-md focus:border-green-500 w-full p-3 h-36`}
                  onChangeText={text => handleChange('description')(text)}
                  onBlur={() => handleBlur('description')}
                  onFocus={() => handleFocus('description')}
                  value={values.description}
                />
                {touched.description && errors.description ? (
                  <View>
                    <Text className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.description}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View className="mb-3">
                <Animated.Text
                  className={`bg-white mx-4 z-10 ${
                    touched.startdate ? 'text-green-500' : ''
                  }`}
                  style={{
                    transform: [{translateY: animatedValueDatepicker}],
                    width: 130,
                  }}>
                  Start Datepicker
                </Animated.Text>

                <TouchableOpacity
                  onPress={() => setStartOpen(true)}
                  className={`border  ${
                    errors.startdate ? 'border-red-300' : 'border-slate-200'
                  } focus:outline-none rounded-md focus:border-green-500 w-full p-3 h-16`}>
                  <Text className="my-2">
                    {values.startdate || startDate.toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mb-3">
                <Animated.Text
                  className={`bg-white mx-4 z-10 ${
                    touched.enddate ? 'text-green-500' : ''
                  }`}
                  style={{
                    transform: [{translateY: animatedValueDatepicker}],
                    width: 120,
                  }}>
                  End Datepicker
                </Animated.Text>

                <TouchableOpacity
                  onPress={() => setEndOpen(true)}
                  className={`border  ${
                    errors.enddate ? 'border-red-300' : 'border-slate-200'
                  } focus:outline-none rounded-md focus:border-green-500 w-full p-3 h-16`}>
                  <Text className="my-2">
                    {values.enddate || endDate.toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mb-3">
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={radio => {
                    const selectedRadioButton = radioButtons.find(
                      button => button.id === radio,
                    );
                    setSelectedId(selectedRadioButton.id);
                    setFieldValue('tags', selectedRadioButton.value);
                  }}
                  selectedId={selectedId}
                  containerStyle={{
                    alignItems: 'flex-start',
                  }}
                />
              </View>

              {touched.datepicker && errors.datepicker ? (
                <View>
                  <Text className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.datepicker}
                  </Text>
                </View>
              ) : null}

              {/* Start Datepicker modal */}
              <DatePicker
                modal
                open={startOpen}
                date={startDate}
                mode={'date'}
                minimumDate={new Date()}
                onConfirm={selectedDate => {
                  setStartOpen(false);
                  setStartDate(selectedDate);
                  setFieldValue('startdate', selectedDate.toDateString());
                }}
                onCancel={() => {
                  setStartOpen(false);
                }}
              />

              {/* End Datepicker modal */}
              <DatePicker
                modal
                open={endOpen}
                date={endDate}
                mode={'date'}
                minimumDate={
                  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                }
                onConfirm={selectedDate => {
                  setEndOpen(false);
                  setEndDate(selectedDate);
                  setFieldValue('enddate', selectedDate.toDateString());
                }}
                onCancel={() => {
                  setEndOpen(false);
                }}
              />

              <TouchableOpacity
                className="bg-green-400 p-4 rounded-full flex items-center justify-center"
                onPress={handleSubmit}>
                <Text className="text-xl text-white font-light">Create</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}
