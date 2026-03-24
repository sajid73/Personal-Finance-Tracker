import { useSignIn, useAuth } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function Page() {
  const { signIn, errors, fetchStatus } = useSignIn()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      identifier: emailAddress,
      password,
    })

    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log(session?.currentTask)
          return
        }
        router.replace('/')
      },
    })
  }

  // Already signed in — render nothing
  if (isSignedIn) {
    return null
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
        <Text style={styles.title}>Welcome Back</Text>

        {errors.fields.identifier ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{errors.fields.identifier.message}</Text>
          </View>
        ) : null}

        {errors.fields.password ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{errors.fields.password.message}</Text>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, errors.fields.identifier && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#4FC3F7"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, errors.fields.password && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#4FC3F7"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onSignInPress}
          disabled={!emailAddress || !password || fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}