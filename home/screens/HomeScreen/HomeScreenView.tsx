import { borderRadius, spacing } from '@expo/styleguide-native';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { View, Divider, Spacer, Text } from 'expo-dev-client-components';
import * as React from 'react';
import { Alert, AppState, NativeEventSubscription, Platform, StyleSheet } from 'react-native';

import FeatureFlags from '../../FeatureFlags';
import ApiV2HttpClient from '../../api/ApiV2HttpClient';
import ApolloClient from '../../api/ApolloClient';
import Connectivity from '../../api/Connectivity';
import ScrollView from '../../components/NavigationScrollView';
import { PressableOpacity } from '../../components/PressableOpacity';
import RefreshControl from '../../components/RefreshControl';
import { SectionHeader } from '../../components/SectionHeader';
import ThemedStatusBar from '../../components/ThemedStatusBar';
import {
  HomeScreenDataDocument,
  HomeScreenDataQuery,
  HomeScreenDataQueryVariables,
} from '../../graphql/types';
import { HomeStackRoutes } from '../../navigation/Navigation.types';
import HistoryActions from '../../redux/HistoryActions';
import { DevSession, HistoryList } from '../../types';
import addListenerWithNativeCallback from '../../utils/addListenerWithNativeCallback';
import getSnackId from '../../utils/getSnackId';
import { DevelopmentServerListItem } from './DevelopmentServerListItem';
import { DevelopmentServersHeader } from './DevelopmentServersHeader';
import { DevelopmentServersOpenQR } from './DevelopmentServersOpenQR';
import { DevelopmentServersOpenURL } from './DevelopmentServersOpenURL';
import { DevelopmentServersPlaceholder } from './DevelopmentServersPlaceholder';
import { HomeScreenHeader } from './HomeScreenHeader';
import { ProjectsSection } from './ProjectsSection';
import { RecentlyOpenedHeader } from './RecentlyOpenedHeader';
import { RecentlyOpenedSection } from './RecentlyOpenedSection';
import { SnacksSection } from './SnacksSection';

const PROJECT_UPDATE_INTERVAL = 10000;

type Props = NavigationProps & {
  dispatch: (data: any) => any;
  isFocused: boolean;
  recentHistory: HistoryList;
  allHistory: HistoryList;
  isAuthenticated: boolean;
  theme: string;
  accountName?: string;
  initialData?: HomeScreenDataQuery;
};

type State = {
  projects: DevSession[];
  isNetworkAvailable: boolean;
  isRefreshing: boolean;
  data?: Exclude<HomeScreenDataQuery['account']['byName'], null>;
  loading: boolean;
};

type NavigationProps = StackScreenProps<HomeStackRoutes, 'Home'>;

export class HomeScreenView extends React.Component<Props, State> {
  private _projectPolling?: ReturnType<typeof setInterval>;
  private _changeEventListener?: NativeEventSubscription;

  state: State = {
    projects: [],
    isNetworkAvailable: Connectivity.isAvailable(),
    isRefreshing: false,
    data: this.props.initialData?.account.byName,
    loading: !this.props.initialData?.account.byName, // if there is initial data, we're not loading
  };

  componentDidMount() {
    AppState.addEventListener('change', this._maybeResumePollingFromAppState);
    Connectivity.addListener(this._updateConnectivity);

    // @evanbacon: Without this setTimeout, the state doesn't update correctly and the "Recently in Development" items don't load for 10 seconds.
    setTimeout(() => {
      this._startPollingForProjects();
    }, 1);

    // NOTE(brentvatne): if we add QR code button to the menu again, we'll need to
    // find a way to move this listener up to the root of the app in order to ensure
    // that it has been registered regardless of whether we have been on the project
    // screen in the home app
    addListenerWithNativeCallback('ExponentKernel.showQRReader', async () => {
      // @ts-ignore
      this.props.navigation.navigate('QRCode');
      return { success: true };
    });
  }

  componentWillUnmount() {
    this._stopPollingForProjects();
    this._changeEventListener?.remove();
    Connectivity.removeListener(this._updateConnectivity);
  }

  render() {
    const { projects, isRefreshing, data } = this.state;

    return (
      <View style={styles.container}>
        <HomeScreenHeader currentUser={data} loading={this.state.loading} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={this._handleRefreshAsync} />
          }
          key={Platform.OS === 'ios' ? this.props.allHistory.count() : 'scroll-view'}
          style={styles.container}
          contentContainerStyle={[styles.contentContainer]}>
          <DevelopmentServersHeader onHelpPress={this._handlePressHelpProjects} />
          {projects?.length ? (
            <View bg="default" rounded="large" border="hairline" overflow="hidden">
              {projects.map((project, i) => (
                <React.Fragment key={project.url}>
                  <DevelopmentServerListItem
                    url={project.url}
                    image={
                      project.source === 'desktop'
                        ? require('../../assets/cli.png')
                        : require('../../assets/snack.png')
                    }
                    imageStyle={styles.projectImageStyle}
                    title={project.description}
                    platform={project.platform}
                    subtitle={project.url}
                  />
                  {projects.length > 1 && i !== projects.length - 1 ? <Divider /> : null}
                </React.Fragment>
              ))}
              {FeatureFlags.ENABLE_PROJECT_TOOLS && FeatureFlags.ENABLE_QR_CODE_BUTTON ? (
                <DevelopmentServersOpenQR />
              ) : null}
              {FeatureFlags.ENABLE_PROJECT_TOOLS && FeatureFlags.ENABLE_CLIPBOARD_BUTTON ? (
                <DevelopmentServersOpenURL />
              ) : null}
            </View>
          ) : (
            <DevelopmentServersPlaceholder />
          )}
          {this.props.recentHistory.count() ? (
            <>
              <Spacer.Vertical size="medium" />
              <RecentlyOpenedHeader onClearPress={this._handlePressClearHistory} />
              <RecentlyOpenedSection recentHistory={this.props.recentHistory} />
            </>
          ) : null}
          {this.props.accountName ? (
            data?.apps.length && this.props.accountName ? (
              <>
                <Spacer.Vertical size="medium" />
                <SectionHeader header="Projects" />
                <ProjectsSection
                  accountName={this.props.accountName}
                  apps={data.apps.slice(0, 3)}
                  showMore={data.apps.length > 3}
                />
              </>
            ) : null
          ) : (
            <>
              <Spacer.Vertical size="medium" />
              <SectionHeader header="Projects" />
              <PressableOpacity
                onPress={() => this.props.navigation.navigate('Account')}
                hitSlop={16}
                style={{
                  padding: spacing[4],
                }}
                containerProps={{ bg: 'default', border: 'hairline' }}
                borderRadius={borderRadius.large}>
                <Text type="InterRegular" style={{ lineHeight: 20 }}>
                  Log in or create an Expo account to view your projects.
                </Text>
              </PressableOpacity>
            </>
          )}

          {data?.snacks.length && this.props.accountName ? (
            <>
              <Spacer.Vertical size="medium" />
              <SectionHeader header="Snacks" />
              <SnacksSection
                accountName={this.props.accountName}
                snacks={data.snacks.slice(0, 3)}
                showMore={data.snacks.length > 3}
              />
            </>
          ) : null}
        </ScrollView>
        <ThemedStatusBar />
      </View>
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this._fetchProjectsAsync();
    }

    if (prevProps.isAuthenticated && !this.props.isAuthenticated) {
      // Remove all projects except Snack, because they are tied to device id
      // Fix this lint warning when converting to hooks
      // eslint-disable-next-line
      this.setState(({ projects }) => ({
        projects: projects.filter((p) => p.source === 'snack'),
      }));
    }
  }

  private _updateConnectivity = (isAvailable: boolean): void => {
    if (isAvailable !== this.state.isNetworkAvailable) {
      this.setState({ isNetworkAvailable: isAvailable });
    }
  };

  private _maybeResumePollingFromAppState = (nextAppState: string): void => {
    if (nextAppState === 'active' && !this._projectPolling) {
      this._startPollingForProjects();
    } else {
      this._stopPollingForProjects();
    }
  };

  private _handlePressClearHistory = () => {
    this.props.dispatch(HistoryActions.clearHistory());
  };

  private _startPollingForProjects = async () => {
    await this._fetchProjectsAsync();
    this.setState({ loading: false });
    this._projectPolling = setInterval(this._fetchProjectsAsync, PROJECT_UPDATE_INTERVAL);
  };

  private _stopPollingForProjects = async () => {
    if (this._projectPolling) {
      clearInterval(this._projectPolling);
    }
    this._projectPolling = undefined;
  };

  private _fetchProjectsAsync = async () => {
    const { accountName } = this.props;

    try {
      const api = new ApiV2HttpClient();

      const [projects, graphQLResponse] = await Promise.all([
        api.getAsync('development-sessions', {
          deviceId: getSnackId(),
        }),
        accountName
          ? ApolloClient.query<HomeScreenDataQuery, HomeScreenDataQueryVariables>({
              query: HomeScreenDataDocument,
              variables: {
                accountName,
              },
            })
          : new Promise<undefined>((resolve) => {
              resolve(undefined);
            }),
      ]);

      this.setState({ projects, data: graphQLResponse?.data.account.byName });
    } catch (e) {
      // this doesn't really matter, we will try again later
      if (__DEV__) {
        console.error(e);
      }
    }
  };

  private _handleRefreshAsync = async () => {
    this.setState({ isRefreshing: true });

    try {
      await Promise.all([
        this._fetchProjectsAsync(),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    } catch {
      // not sure what to do here, maybe nothing?
    } finally {
      this.setState({ isRefreshing: false });
    }
  };

  private _handlePressHelpProjects = () => {
    if (!this.state.isNetworkAvailable) {
      Alert.alert(
        'No network connection available',
        `You must be connected to the internet to view a list of your projects open in development.`
      );
    }

    const baseMessage = `Make sure you are signed in to the same Expo account on your computer and this app. Also verify that your computer is connected to the internet, and ideally to the same Wi-Fi network as your mobile device. Lastly, ensure that you are using the latest version of Expo CLI. Pull to refresh to update.`;
    const message = Platform.select({
      ios: Constants.isDevice
        ? baseMessage
        : `${baseMessage} If this still doesn't work, press the + icon on the header to type the project URL manually.`,
      android: baseMessage,
    });
    Alert.alert('Troubleshooting', message);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
    paddingBottom: 80,
  },
  projectImageStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 32, 0.1)',
  },
});
