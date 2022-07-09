import React from 'react';
import {View, Text, Image, ImageBackground, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  CategoryCard,
  HorizontalCourseCard,
  IconButton,
  LineDivider,
  TextButton,
  VerticalCourseCard,
} from '../../components';
import {COLORS, FONTS, SIZES, icons, images, dummyData} from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation()
  const renderStartLearing = () => {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'flex-start',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{borderRadius: SIZES.radius}}>
        {/* info */}
        <View>
          <Text style={{color: COLORS.white, ...FONTS.body2}}>HOW TO</Text>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.body4,
            }}>
            By Scott Harris{' '}
          </Text>
        </View>
        {/* image */}
        <Image
          source={images.start_learning}
          style={{
            width: '100%',
            height: 110,
            marginTop: SIZES.padding,
          }}
        />
        {/* Button */}
        <TextButton
          label={'Start Learning'}
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{color: COLORS.black}}
        />
      </ImageBackground>
    );
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        {/* Greetings */}
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h2, color: COLORS.black}}>
            Hello,ByProgrammers!
          </Text>
          <Text style={{color: COLORS.gray50, ...FONTS.body3}}>
            Thursday , 9th Sept 2021
          </Text>
        </View>
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  };
  const renderCourses = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Courses"
        keyExtractor={item => `Courses-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({item, index}) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.courses_list_1 - 1 ? SIZES.padding : 0,
            }}
            course={item}
          />
        )}
      />
    );
  };
  const Section = ({containerStyle, title, onPress, children}) => {
    return (
      <View style={{...containerStyle}}>
        <View style={{flexDirection: 'row', paddingHorizontal: SIZES.padding}}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h2,
            }}>
            {title}
          </Text>
          <TextButton
            contentContainerStyle={{
              width: 80,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            label="See All"
            onPress={onPress}
          />
        </View>
        {children}
      </View>
    );
  };
  const renderCategories = () => {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={item => `Categories-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <CategoryCard
             sharedElementPrefix ='Home'
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
              onPress={()=>navigation.navigate('CourseListing',{category:item,sharedElementPrefix:'Home'})}
            />
          )}
        />
      </Section>
    );
  };

  const renderPopularCourses =() =>{
    return(
       <Section
       title={'Popular Couses'}
       containerStyle={{
        marginTop:30
       }}
       >
        <FlatList 
        data ={dummyData.courses_list_2}
        listKey="PopularCourses"
        scrollEnabled={false}
        keyExtractor  = {item =>`PopularCourses-${item.id}`}
        contentContainerStyle ={{
          marginTop:SIZES.radius,
          paddingHorizontal:SIZES.padding
        }}
        renderItem ={({item,index})=>(
          <HorizontalCourseCard
            course={item}
            containerStyle ={{
              marginVertical:SIZES.padding,
              marginTop:index == 0? SIZES.radius : SIZES.padding
            }}
          />
        )}
        ItemSeparatorComponent ={()=>(
          <LineDivider
          lineStyle={{backgroundColor:COLORS.gray20 }}
          />
        )}
        
        />

       </Section>
    )
  }

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Header */}
      {renderHeader()}

      {/* contentSection */}

      <ScrollView
        contentContainerStyle={{flexGrow:1,paddingBottom:150}}
        showsVerticalScrollIndicator={false}>
        {/* Start Learing */}
        {renderStartLearing()}

        {/* Courses */}
        {renderCourses()}
        <LineDivider lineStyle={{marginVertical: SIZES.padding}} />

        {/* categories */}
        {renderCategories()}
        {renderPopularCourses()}
      </ScrollView>
    </View>
  );
};

export default Home;
