// app/index.jsx
import { useAuth } from '@clerk/expo'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null

  if (isSignedIn) {
    return <Redirect href="/(root)" />
  }

  return <Redirect href="/(auth)/sign-in" />
}