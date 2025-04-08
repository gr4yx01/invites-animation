import { View, Text, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Marquee } from '@animatereactnative/marquee'
import Animated, { FadeIn, FadeInUp, FadeOut, runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated'
import { Stagger } from '@animatereactnative/stagger'

const images = [
    'https://i.pinimg.com/236x/68/8d/22/688d22eb10f521d52f5b0112a87a3d63.jpg',
    'https://i.pinimg.com/474x/8b/3c/53/8b3c538da9e499440fed360b349f7099.jpg',
    'https://i.pinimg.com/474x/f3/b2/6d/f3b26d591f029903fb71a8b1d879a015.jpg',
    'https://i.pinimg.com/474x/dd/45/b2/dd45b2037e7ddb05b333d8847f1f1b8c.jpg',
    'https://i.pinimg.com/236x/66/62/13/6662132466ec9e74bc1d8ad13e774a7e.jpg'
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
        const floatIndex = ((offset.value + width / 2) / _itemSize) % images.length
        return Math.abs(Math.floor(floatIndex))
    }, (value) => {
        // console.log(value)
        runOnJS(setActiveIndex)(value)
    })

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
        <View style={[StyleSheet.absoluteFillObject, {
            opacity: 0.5
        }]}>
            <Animated.Image
                key={`image-${activeIndex}`}
                source={{ uri: images[activeIndex] }}
                style={{ flex: 1 }}
                blurRadius={40}
                entering={FadeIn.duration(1000)}
                exiting={FadeOut.duration(1000)}
            />
        </View>
      <Marquee
        spacing={_spacing}
        position={offset}
      >
        <Animated.View 
            style={{ flexDirection: 'row', gap: _spacing }}
            entering={FadeInUp.duration(1000)}
        >
            {images.map((image, index) => (
                <Item 
                    image={image}
                    index={index}
                    key={`image-${index}`}
                />
            ))}
        </Animated.View>
      </Marquee>
      <Stagger stagger={100} style={{ justifyContent: 'center', alignItems: 'center', flex: .5 }}>
        <Text style={{ color: 'white', fontWeight: '500', opacity: 0.6 }}>Welcome to</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Animate React Native.com</Text>
        <Text style={{ color: 'gray', fontSize: 14 }}>An extensive collection of more than 135+ react native animations meticulously crafted and ready-to-use</Text>
      </Stagger>
    </SafeAreaView>
  )
}

export default AppleInvite