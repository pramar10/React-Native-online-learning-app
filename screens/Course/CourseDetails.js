import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  SIZES,
  icons,
  dummyData,
  constants,
  FONTS,
} from '../../constants';
import {IconButton, LineDivider} from '../../components';
import CourseChapters from './CourseTabs/CourseChapters';
import CourseFiles from './CourseTabs/CourseFiles';
import CourseDiscussion from './CourseTabs/CourseDiscussion';
// import Video from 'react-native-video';
const course_details_tabs = constants.course_details_tabs.map(
  course_details_tab => ({
    ...course_details_tab,
    ref: React.createRef(),
  }),
);
const TabIndicator = ({measureLayout, scrollX}) => {
  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);
  const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        height: 4,
        width: 100,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX,
          },
        ],
      }}></Animated.View>
  );
};
const Tabs = ({scrollX, onTabPress}) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    let ml = [];
    course_details_tabs.forEach(course_details_tab => {
      course_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === course_details_tabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {/*  Tabs*/}
      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              Keyboard.dismiss()
              onTabPress(index);
            }}>
            <Text
              style={{
                fontSize: SIZES.height > 800 ? 18 : 17,
                ...FONTS.h3,
                color: COLORS.black,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CourseDetails = ({navigation, route}) => {
  const [playVideo, setPlayVideo] = React.useState(false);
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {selectedCourse} = route.params;

  const onTabPress = React.useCallback(tabIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  });
  const renderVideoSection = () => {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.gray90,
        }}>
        {/* Thumbnail */}
        <ImageBackground
          source={selectedCourse?.thumbnail}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* PlayButton */}
          <IconButton
            icon={icons.play}
            iconStyle={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
            containerStyle={{
              width: 55,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.padding,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>
        {/* 
        {playVideo && 
        <Video source={{uri:'https://www.youtube.com/watch?v=twdyUANQ2jY' }}
        controls={true}
        style={{
            position: 'absolute',
            top:0,
            left:0,
            bottom:0,
            right:0,
            backgroundColor:COLORS.white
        }}
        />} */}
      </View>
    );
  };
  const renderHeaderComponent = () => {
    return (
      <>
        {/* Back */}

        <View
          style={{
            flex: 1,
          }}>
          <IconButton
            iconStyle={{width: 25, height: 25, tintColor: COLORS.black}}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            icon={icons.back}
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Share and favourite */}

        <View
          style={{
            flexDirection: 'row',
          }}>
          <IconButton
            iconStyle={{tintColor: COLORS.white}}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={icons.media}
          />
          <IconButton
            iconStyle={{tintColor: COLORS.white}}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={icons.favourite_outline}
          />
        </View>
      </>
    );
  };

  const renderHeader = () => {
    if (playVideo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.base,
            height: 85,
            backgroundColor: COLORS.black,
            alignItems: 'flex-end',
          }}>
          {renderHeaderComponent()}
        </View>
      );
    } else {
      return (
        <View
          style={{
            position: 'absolute',
            top: SIZES.height > 800 ? 40 : 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            zIndex: 1,
          }}>
          {renderHeaderComponent()}
        </View>
      );
    }
  };
  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        {/* Tabs */}
        <View style={{height: 60}}>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>
        {/* Line Divider */}
        <LineDivider lineStyle={{backgroundColor: COLORS.gray20}} />
        {/* Content */}
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment={'center'}
          decelerationRate="fast"
          keyboardDismissMode={'on-drag'}
          showsHorizontalScrollIndicator={false}
          data={constants.course_details_tabs}
          keyExtractor={item => `CourseDetailsTabs-${item.id}`}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return (
              <View style={{width: SIZES.width}}>
                {index == 0 && <CourseChapters/> }
                {index == 1 && <CourseFiles/> }
                {index == 2 && <CourseDiscussion/> }
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Header */}
      {renderHeader()}
      {/* Video */}
      {renderVideoSection()}

      {/* content section */}
      {renderContent()}
    </View>
  );
};

export default CourseDetails;
