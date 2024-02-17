import React from 'react'
import { Image } from 'react-native'
import tw from '../lib/tailwind'

export default function AvatarImage(props) {
  return (
    <Image
      style={tw`h-50px w-50px border-2 border-gray-300 dark:border-gray-700`}
      defaultSource={require('../assets/defult_avatar.png')}
      source={{ uri: `https://www.gravatar.com/avatar/${props.address}?s=${50}&d=retro&r=g` }}
      resizeMode='stretch'>
    </Image>
  )
}
