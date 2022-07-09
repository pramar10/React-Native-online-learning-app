import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import IconLabel from './IconLabel';

const VerticalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity
      style={{
        width: 270,
        ...containerStyle,
      }}>
      {/* Thumbnail */}
      <Image
        source={course.thumbnail}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Detail */}
      <View style={{flexDirection: 'row'}}>
        {/* play */}
        <View
        style={{
            width: 45,
            height: 45,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:25,
            backgroundColor:COLORS.primary
        }}>
            <Image
            source={icons.play}
            resizeMode='contain'
            style={{
                width: 20,
                height: 20,
            }}
            
            />
        </View>
        <View style={{
                flexShrink:1,
                paddingHorizontal:SIZES.radius
            }} >
                <Text style ={{
                    flex: 1,
                    ...FONTS.h3,
                    fontSize:18,
                    color: COLORS.black
                }} >{course.title}</Text>
                <IconLabel icon={icons.time}
                label= {course.duration} 
                containerStyle={{
                    marginTop:SIZES.base
                }}
                />

            </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;
