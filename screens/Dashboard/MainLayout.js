import React from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import {Home, Profile, Search} from '../../screens';
import {COLORS, SIZES, FONTS, constants} from '../../constants';
import {Shadow} from 'react-native-shadow-2';
import { connect } from 'react-redux';

const bottom_tabs = constants.bottom_tabs.map(bottom_tab => ({
  ...bottom_tab,
  ref: React.createRef(),
}));

const TabIndicator = ({measureLayout, scrollX }) =>{
 const inputRange = bottom_tabs.map((_,i) => i*SIZES.width)

 const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width)

 })

 const translateX =  scrollX.interpolate({
    inputRange,
    outputRange:measureLayout.map(measure =>measure.x)
 })
    return(
        <Animated.View
        style={{
            position: 'absolute',
            left: 0,
            height:'100%',
            width: TabIndicatorWidth, 
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.primary,
            transform: [{
                translateX
            }]
        }}
        >

        </Animated.View>
    )
}

const Tabs = ({scrollX,onBottomTabPress }) => {

  const containerRef = React.useRef()
  const [measureLayout,setMeasurLayout] = React.useState([])

  React.useEffect(()=>{
  let ml = [] 
  bottom_tabs.forEach(bottom_tab=>{
    bottom_tab?.ref?.current?.measureLayout(
        containerRef.current,(x,y,width,height) => {
            ml.push({
                x,y,width,height
            })
             if(ml.length === bottom_tabs.length){
                setMeasurLayout(ml)
             }
        }
    )
  })
  },[containerRef.current])
  
  return (
    <View style={{flex: 1, flexDirection: 'row'}}
    ref={containerRef}
    >
        {/* Tab indicator */}
       {measureLayout.length >0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX}/> }    


        
        {/* Tabs */}

      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress ={()=>onBottomTabPress(index)}
            >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text
              style={{
                marginTop: 3,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const MainLayout = ({appTheme}) => {
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

   const onBottomTabPress = React.useCallback((bottomTabIndex) =>{
    flatListRef?.current?.scrollToOffset({
        offset:bottomTabIndex * SIZES.width
    })
   } )
  const renderBottomTab = () => {
    return (
      <View
        style={{
          paddingBottom:SIZES.height > 800 ? 20 :5,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor:appTheme?.backgroundColor1
        }}>
        <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
          <View
            style={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor:appTheme?.backgroundColor2,
            }}>
            <Tabs scrollX={scrollX} 
            onBottomTabPress ={onBottomTabPress} />
          </View>
        </Shadow>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment={'center'}
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          scrollEnabled={false}
          keyExtractor={item => `Main-${item.id}`}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return (
              <View style={{height: SIZES.height, width: SIZES.width}}>
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* CONTENT */}
      {renderContent()}

      {/* BOTTOM TAB */}
      {renderBottomTab()}
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
