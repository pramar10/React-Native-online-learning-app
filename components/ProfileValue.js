import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {connect} from 'react-redux';

const ProfileValue = ({icon, label, value, onPress,appTheme}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 20,
          backgroundColor:appTheme?.backgroundColor3 ,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            tintColor: COLORS.primary,
            top:5 
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {label && (
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body3,
            }}>
            {label}
          </Text>
        )}
        <Text style={{...FONTS.h3, color:appTheme?.textColor }}>{value}</Text>
      </View>
      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
          tintColor:appTheme?.tintColor
        }}
      />
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileValue);
