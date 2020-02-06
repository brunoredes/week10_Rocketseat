import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'
import { forFadeFromBottomAndroid } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/CardStyleInterpolators'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            }
        }
    },
        {
            defaultNavigationOptions: {
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#7D40E7',
                }
            }
        })
)

export default Routes