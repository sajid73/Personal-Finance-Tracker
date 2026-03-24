import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          router.replace("/");
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  // Already signed in — render nothing
  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  // Pending email verification step
  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {errors.fields.code ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{errors.fields.code.message}</Text>
          </View>
        ) : null}

        <TextInput
          style={[styles.verificationInput, errors.fields.code && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text style={styles.buttonText}>Resend code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Sign-up form
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i2.png")} style={styles.illustration} />

        <Text style={styles.title}>Create Account</Text>

        {errors.fields.emailAddress ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{errors.fields.emailAddress.message}</Text>
          </View>
        ) : null}

        {errors.fields.password ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{errors.fields.password.message}</Text>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, errors.fields.emailAddress && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, errors.fields.password && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onSignUpPress}
          disabled={!emailAddress || !password || fetchStatus === "fetching"}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Required for Clerk's bot sign-up protection */}
        <View nativeID="clerk-captcha" />
      </View>
    </KeyboardAwareScrollView>
  );
}