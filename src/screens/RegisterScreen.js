/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen() {
  const inputFieldsData = [
    {id: 1, label: 'Name', translateY: new Animated.Value(10), name: 'name'},
    {
      id: 2,
      label: 'Surname',
      translateY: new Animated.Value(10),
      name: 'surname',
    },
    {id: 3, label: 'Email', translateY: new Animated.Value(10), name: 'email'},
    {id: 4, label: 'Phone', translateY: new Animated.Value(10), name: 'phone'},
    {
      id: 5,
      label: 'Gender',
      translateY: new Animated.Value(10),
      name: 'gender',
    },
    {
      id: 6,
      label: 'Password',
      translateY: new Animated.Value(10),
      name: 'password',
    },
    {
      id: 7,
      label: 'Password Confirm',
      translateY: new Animated.Value(10),
      name: 'passwordConfirm',
    },
    // {
    //   id: 8,
    //   label: 'Birthday',
    //   translateY: new Animated.Value(10),
    //   name: 'birthday',
    // },
  ];

  const [inputFields, setInputFields] = useState(
    inputFieldsData.map(field => ({
      ...field,
      isFocused: false,
      value: '',
    })),
  );

  const animateText = (translateY, isFocused) => {
    Animated.timing(translateY, {
      toValue: isFocused ? -2 : 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleFocus = (id, translateY) => {
    const updatedFields = inputFields.map(field => {
      if (field.id === id) {
        animateText(translateY, true);
        return {...field, isFocused: true};
      }
      return {...field, isFocused: false};
    });
    setInputFields(updatedFields);
  };

  const handleBlur = (id, translateY) => {
    const updatedFields = inputFields.map(field => {
      if (field.id === id) {
        animateText(translateY, false);
        return {...field, isFocused: false};
      }
      return field;
    });
    setInputFields(updatedFields);
  };

  const genderEnum = {
    MALE: 'male',
    FEMALE: 'female',
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            gender: genderEnum.MALE,
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            agreementConfirm: false,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .matches(
                /^[a-zA-Z]+$/,
                'Name must contain only alphabetic characters',
              )
              .max(15, ({max}) => `Must be ${max} characters or less`)
              .required('Name is required'),
            surname: Yup.string()
              .matches(
                /^[a-zA-Z]+$/,
                'Surname must contain only alphabetic characters',
              )
              .max(20, ({max}) => `Must be ${max} characters or less`)
              .required('Surname is required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            gender: Yup.string()
              .transform(value => value.toLowerCase())
              .oneOf(['male', 'female'], 'Enter Male or Female')
              .required('Gender is required'),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
              .required('Phone number is required'),
            password: Yup.string().min(6).required('Password is required'),
            passwordConfirm: Yup.string().when('password', (password, field) =>
              password ? field.required().oneOf([Yup.ref('password')]) : field,
            ),
            agreementConfirm: Yup.boolean(),
          })}
          onSubmit={values => {
            console.log(values);
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
              {inputFields.map(field => (
                <View key={field.id} className="mb-3">
                  <Animated.Text
                    className={`bg-white mx-4 z-10 ${
                      field.isFocused ? 'text-green-500' : ''
                    }`}
                    style={{
                      transform: [{translateY: field.translateY}],
                      width: field.label.length * 10,
                    }}>
                    {field.label}
                  </Animated.Text>
                  <TextInput
                    className={`border  ${
                      errors[field.name] ? 'border-red-300' : 'border-slate-200'
                    } focus:outline-none rounded-md focus:border-green-500 w-full p-3 h-16`}
                    onChangeText={text => {
                      handleChange(field.name)(text);
                      const updatedFields = inputFields.map(item => {
                        if (item.id === field.id) {
                          return {...item, value: text};
                        }
                        return item;
                      });
                      setInputFields(updatedFields);
                    }}
                    onBlur={() => handleBlur(field.id, field.translateY)}
                    onFocus={() => handleFocus(field.id, field.translateY)}
                    value={field.value}
                    secureTextEntry={
                      field.name === 'password' ||
                      field.name === 'passwordConfirm'
                    }
                    keyboardType={
                      field.name === 'email'
                        ? 'email-address'
                        : field.name === 'phone'
                        ? 'phone-pad'
                        : 'default'
                        ? field.name === 'phone'
                        : 'numeric'
                    }
                  />
                  {touched[field.name] && errors[field.name] ? (
                    <View>
                      <Text className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors[field.name]}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}

              <View className="flex flex-row gap-2 items-center mb-4">
                <Switch
                  onValueChange={newValue => {
                    setFieldValue('agreementConfirm', newValue);
                  }}
                  value={values.agreementConfirm}
                />
                <Text>
                  Checked {values.agreementConfirm ? 'open' : 'close'}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-green-400 p-4 rounded-full flex items-center justify-center"
                onPress={handleSubmit}>
                <Text className="text-xl text-white font-light">Send</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}
