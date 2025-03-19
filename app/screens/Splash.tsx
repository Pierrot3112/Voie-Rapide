import { useEffect } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../../styles/splash.style';
import { checkToken, getRole } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface SplashProps {
    navigation: SplashScreenNavigationProp;
    route?: SplashScreenRouteProp;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    const text1Position = useSharedValue(-200);
    const text2Position = useSharedValue(200);
    const loaderOpacity = useSharedValue(0);
    const loaderRotation = useSharedValue(0);

    useEffect(() => {
        text1Position.value = withTiming(0, { duration: 1000, easing: Easing.ease });
        text2Position.value = withTiming(0, { duration: 1000, easing: Easing.ease });

        const timeout1 = setTimeout(() => {
            text1Position.value = withTiming(200, { duration: 1000, easing: Easing.ease });
            text2Position.value = withTiming(-200, { duration: 1000, easing: Easing.ease });
        }, 4000);

        const checkAuth = async () => {
            try {
                const token = await checkToken();
                if (!token) {
                    navigation.replace('Login');
                    return;
                }

                const role = await getRole(token);
                navigation.replace(role === 'client' ? 'HomeClient' : 'Login');
            } catch (error) {
                navigation.replace('Login');
            }
        };

        checkAuth();

        loaderOpacity.value = withTiming(1, { duration: 3000, easing: Easing.linear });
        loaderRotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);

        return () => {
            clearTimeout(timeout1);
        };
    }, [navigation]);

    const animatedText1Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text1Position.value }]
    }));

    const animatedText2Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text2Position.value }]
    }));

    const loaderStyle = useAnimatedStyle(() => ({
        opacity: loaderOpacity.value,
    }));

    const loaderIconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${loaderRotation.value}deg` }]
    }));

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.container}>
                <Animated.Text style={[styles.text, animatedText1Style]}>Voie Rapide</Animated.Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                </View>

                {/* Loader with rotation animation */}
                <Animated.View style={[styles.loaderContainer, loaderStyle]}>
                    <Animated.View style={loaderIconStyle}>
                        <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                    </Animated.View>
                    <Animated.View style={loaderIconStyle}>
                        <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                    </Animated.View>
                    <Animated.View style={loaderIconStyle}>
                        <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                    </Animated.View>
                </Animated.View>
                <Animated.Text style={[styles.text, animatedText2Style]}>Tongasoa !</Animated.Text>
            </View>
        </SafeAreaView>
    );
};

export default Splash;
