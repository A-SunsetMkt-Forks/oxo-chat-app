import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'
import QRCode from 'react-native-qrcode-svg'
import { WhiteSpace, Button } from '@ant-design/react-native'
import ViewAlert from '../../../component/ViewAlert'
import tw from '../../../lib/tailwind'
import ButtonPrimary from '../../../component/ButtonPrimary'

//地址标记
const AvatarSeedQrcodeScreen = (props) => {
  const [qrcode, seQrcode] = useState('xxx')
  const [visible, showModal] = useState(false)

  const viewSeedAlert = () => {
    showModal(true)
  }

  const onClose = () => {
    showModal(false)
  }

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      let json = { "Name": props.avatar.get('Name'), "Seed": props.avatar.get('Seed') }
      seQrcode(JSON.stringify(json))
    })
  })

  return (
    <View style={tw`h-full bg-neutral-200 dark:bg-neutral-800 p-5px`}>
      <View style={tw`items-center bg-neutral-100 dark:bg-neutral-600 p-32px`}>
        <QRCode
          value={qrcode}
          size={350}
          logo={require('../../../assets/app.png')}
          logoSize={50}
          backgroundColor={tw.color(`neutral-200 dark:neutral-800`)}
          color={tw.color(`neutral-800 dark:neutral-200`)}
          logoBackgroundColor='grey'
        />
      </View>

      <View style={tw`px-25px`}>
        <Text style={tw`text-base text-neutral-500`}>
          {`注意：查看种子二维码，应回避具备视觉的生物或设备，应在私密可控环境下。`}
        </Text>
        <ButtonPrimary title='查看种子' bg='bg-indigo-500' onPress={viewSeedAlert} />
      </View>

      <ViewAlert
        visible={visible}
        onClose={onClose}
        msg="查看种子，应回避具备视觉的生物或设备，应在私密可控环境下。
确定要查看种子吗？"
        onPress={() => props.navigation.navigate('AvatarSeed')}
      />
    </View>
  )
}

const ReduxAvatarSeedQrcodeScreen = connect((state) => {
  return {
    avatar: state.avatar
  }
})(AvatarSeedQrcodeScreen)

export default function (props) {
  const navigation = useNavigation()
  const route = useRoute()
  return <ReduxAvatarSeedQrcodeScreen{...props} navigation={navigation} route={route} />
}