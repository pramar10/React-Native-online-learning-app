import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';
import {IconButton, TextButton} from '../../../components';

const CourseFiles = () => {
  const renderStudents = () => {
    let students = [];
    if (dummyData?.course_details?.students.length > 3) {
      students = dummyData?.course_details?.students.slice(0, 3);
    } else {
      students = dummyData?.course_details?.students;
    }
    return (
      <View>
        <Text style={{...FONTS.h2, fontSize: 25, color: COLORS.black}}>
          Students
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}>
          {students.map((item, index) => {
            return (
              <View
                key={`Students-${index}`}
                style={{
                  marginLeft: index > 0 ? SIZES.radius : 0,
                }}>
                <Image
                  source={item?.thumbnail}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
            );
          })}
          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h3,
              }}
              label={'View All'}
              contentContainerStyle={{
                backgroundColor: null,
                marginLeft: SIZES.base,
              }}
            />
          )}
        </View>
      </View>
    );
  };
  const renderFiles = () => {
    return (
      <View style={{marginTop: SIZES.padding}}>
        {/* Section Title */}
        <Text style={{...FONTS.h2, fontSize: 25, color: COLORS.black}}>
          Files
        </Text>

        {/* Files */}
        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{
                flexDirection: 'row',
                marginTop: SIZES.radius,
              }}>
              {/* Thumbnail */}
              <Image
                source={item?.thumbnail}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              {/* Name */}
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}>
                <Text style={{...FONTS.h2, color: COLORS.black}}>
                  {item?.name}
                </Text>
                <Text style={{...FONTS.body3}}>{item?.author}</Text>
                <Text style={{...FONTS.body4, color: COLORS.black}}>
                  {item?.upload_date}
                </Text>
              </View>
              <IconButton
                icon={icons.menu}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
                iconStyle={{width: 25, height: 25, tintColor: COLORS.black}}
              />
              {/* Menu */}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}>
      {/* Students */}

      {renderStudents()}

      {/* Files */}

      {renderFiles()}
    </ScrollView>
  );
};

export default CourseFiles;
