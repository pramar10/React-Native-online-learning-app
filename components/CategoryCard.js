import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {SharedElement} from 'react-navigation-shared-element';
const CategoryCard = ({
  category,
  containerStyle,
  onPress,
  sharedElementPrefix,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 150,
        ...containerStyle,
      }}
      onPress={onPress}>
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            height: 150,
            width: 200,
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>
      <View style={{position: 'absolute', bottom: 50, left: 5}}>
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Text
            style={{color: COLORS.white, ...FONTS.h2, position: 'absolute'}}>
            {category?.title}
          </Text>
        </SharedElement>
        
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

{
  /* <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        imageStyle ={{
          borderRadius:SIZES.radius
        }}
        style={{
          height: 150,
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'flex-end',
          ...containerStyle,
        }}>
           <Text style={{color:COLORS.white,...FONTS.h2}} >
           {category?.title}
           </Text>
        </ImageBackground> */
}
