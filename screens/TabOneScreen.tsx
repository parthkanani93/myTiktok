import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Dimensions } from "react-native";
// import Video from "react-native-video";
import { Asset, useAssets } from "expo-asset";

import { Video, AVPlaybackStatus } from "expo-av";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const DATA = [
  {
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    sources: ["https://www.youtube.com/watch?v=FoMlSB6ftQg&list=PLIbLfYSA8ACNYCOaDWmj6EA1F1uS-pyVL&index=1&ab_channel=UnderseaStockFootage"],
    subtitle: "By Blender Foundation",
    thumb: "images/BigBuckBunny.jpg",
    title: "Big Buck Bunny",
  },
  {
    description: "The first Blender Open Movie from 2006",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
    subtitle: "By Blender Foundation",
    thumb: "images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
    subtitle: "By Google",
    thumb: "images/ForBiggerBlazes.jpg",
    title: "For Bigger Blazes",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"],
    subtitle: "By Google",
    thumb: "images/ForBiggerEscapes.jpg",
    title: "For Bigger Escape",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"],
    subtitle: "By Google",
    thumb: "images/ForBiggerFun.jpg",
    title: "For Bigger Fun",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"],
    subtitle: "By Google",
    thumb: "images/ForBiggerJoyrides.jpg",
    title: "For Bigger Joyrides",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"],
    subtitle: "By Google",
    thumb: "images/ForBiggerMeltdowns.jpg",
    title: "For Bigger Meltdowns",
  },
  {
    description:
      "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"],
    subtitle: "By Blender Foundation",
    thumb: "images/Sintel.jpg",
    title: "Sintel",
  },
  {
    description:
      "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"],
    subtitle: "By Garage419",
    thumb: "images/SubaruOutbackOnStreetAndDirt.jpg",
    title: "Subaru Outback On Street And Dirt",
  },
  {
    description:
      "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"],
    subtitle: "By Blender Foundation",
    thumb: "images/TearsOfSteel.jpg",
    title: "Tears of Steel",
  },
  {
    description:
      "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"],
    subtitle: "By Garage419",
    thumb: "images/VolkswagenGTIReview.jpg",
    title: "Volkswagen GTI Review",
  },
  {
    description:
      "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"],
    subtitle: "By Garage419",
    thumb: "images/WeAreGoingOnBullrun.jpg",
    title: "We Are Going On Bullrun",
  },
  {
    description:
      "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
    sources: ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"],
    subtitle: "By Garage419",
    thumb: "images/WhatCarCanYouGetForAGrand.jpg",
    title: "What care can you get for a grand?",
  },
];

const { height } = Dimensions.get("window");

const Item = (props: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [assets] = useAssets([require("../assets/videos/video2.mp4")]);
  return (
    <View
      style={[
        styles.item,
        {
          height: height - tabBarHeight,
        },
      ]}
    >
      <Video
        ref={video}
        style={{
          ...styles.video,
          height: "100%",
        }}
        source={{
          uri: assets?.[0]?.uri ?? "",
        }}
        useNativeControls
        resizeMode="stretch"
      />
    </View>
  );
};

const TabOneScreen = () => {
  const renderItem = ({ item, index }) => <Item item={item.item} index={index} />;

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        pagingEnabled
        decelerationRate={"fast"}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    position: "relative",
    margin: 0,
  },
  title: {
    fontSize: 32,
  },
  video: {},
});

export default TabOneScreen;
