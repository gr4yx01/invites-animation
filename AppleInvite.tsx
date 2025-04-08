import { View, Text, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Marquee } from '@animatereactnative/marquee'
import Animated, { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated'

const images = [
    'https://i.pinimg.com/236x/55/00/2e/55002ef2eac3ac09a4c9beac87cddf1c.jpg',
    'https://i.pinimg.com/236x/7d/b3/a7/7db3a74a9ce15aa11de725771f1e8f85.jpg',
    'https://i.pinimg.com/236x/9f/b3/c0/9fb3c0473070a686717dc3d9eac01169.jpg',
    'https://i.pinimg.com/474x/51/d4/9e/51d49e71c4d8a6f08f78062c064b2870.jpg',
    'https://i.pinimg.com/474x/db/cf/88/dbcf88d6bd5d333b6cd6db93bfa75aa3.jpg'
]

interface ItemInterface {
    image: string 
    index: number
}

const { width } = Dimensions.get("window")

const _itemWidth = width * .50;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

const Item = ({ image, index }: ItemInterface) => {
    return (
        <View style={{
            width: _itemWidth,
            height: _itemHeight,
            borderRadius: 16
        }}>
            <Image
                source={{ uri: image }}
                style={{ flex: 1, borderRadius: 16 }}
            />
        </View>
    )
}

const AppleInvite = () => {
    const offset = useSharedValue(0)
    const [activeIndex, setActiveIndex] = useState(0)

    useAnimatedReaction(() => {
        const floatIndex = (offset.value / _itemSize) % images.length
        return Math.abs(Math.floor(floatIndex))
    }, (value) => {
        // console.log(value)
        runOnJS(setActiveIndex)(value)
    })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[StyleSheet.absoluteFillObject]}>
            <Animated.Image
                key={`image-${activeIndex}`}
                source={{ uri: images[activeIndex] }}
                style={{ flex: 1 }}
            />
        </View>
      <Marquee
        spacing={_spacing}
        position={offset}
      >
        <View style={{ flexDirection: 'row', gap: _spacing }}>
            {images.map((image, index) => (
                <Item 
                    image={image}
                    index={index}
                    key={`image-${index}`}
                />
            ))}
        </View>
      </Marquee>
    </SafeAreaView>
  )
}

export default AppleInvite