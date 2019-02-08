import React, { Component, Fragment } from 'react'
import {FlatList, View, ActivityIndicator} from 'react-native';
import { styles } from './styles';
import {api} from 'utils/api/agent';
import debounce from 'lodash/debounce';
import EmptyView from '../emptyView';
import TryAgain from '../tryAgain';
import Spinner from 'components/spinner';

export function createDynamicFlatList(url, query = null) {
    class DynamicFlatList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                current_page: 1,
                last_page: 1,
                loading: false,
                refreshing: false,
                user_account_id: '',
                responseServerCode: 200,
            }
        }
        request = async (isRefresh = false) => {
            const {current_page, last_page, loading} = this.state;
            try {
                if (last_page >= current_page && loading === false) {
                    const page = isRefresh === true ? 1 : current_page + 1;
                    await this.setState({loading: true});
                    const response = await api.get(`${url}`, { page: page, ...query});
                    await this.setState({
                        loading: false,
                        data: isRefresh ? response.data.data  : [...this.state.data, ...response.data.data],
                        current_page: response.data.current_page,
                        last_page: response.data.last_page,
                        refreshing: false,
                        responseServerCode: response.status,
                    });
                }
            }
            catch (e) {
                await this.setState({
                    loading: false,
                    refreshing: false,
                    responseServerCode: e.status
                });
            }
        };
        onEndReached = async () => {
            const {current_page, last_page, loading} = this.state;
            if(current_page !== last_page && loading === false)
                await this.request()
        };
        onRefresh = async () => {
            await this.setState({refreshing: true});
            await this.request(true)
        };
        componentDidMount = async () => {
            await this.request(true); // true when you wanna refresh state of page
        };
        renderFooter = (loading) => {
            if (!loading) return null;

            return (
                <View
                    style={styles.footer}
                >
                    <ActivityIndicator animating size="large"/>
                </View>
            );
        };
        ListEmptyComponent = () => {
            const {loading} = this.state;
            return loading === false ? <EmptyView/> : <Fragment/>
        };
        tryAgainHandleButton = async () => {
            await this.setState({responseServerCode: 200});
            await this.request();
        };
        renderErrorCatching = () => {
            const {loading} = this.state;
            return (
                <Fragment>
                    <Spinner visible={loading} />
                    <TryAgain handleButton={this.tryAgainHandleButton} />
                </Fragment>
            )
        };
        keyExtractor = item => item.id;
        render() {
            const {style, renderItems, ...props} = this.props;
            const {data = [], loading, refreshing, responseServerCode } = this.state;
            return (
                <Fragment>
                    {responseServerCode === 200 || responseServerCode === 201 ?
                        <FlatList
                            style={style}
                            contentContainerStyle={data.length === 0 && styles.emptySet}
                            onEndReached={debounce(this.onEndReached, 1)}
                            onRefresh={this.onRefresh}
                            refreshing={refreshing}
                            onEndReachedThreshold={0.01}
                            data={data}
                            ListFooterComponent={this.renderFooter(loading)}
                            renderItem={({item}) => renderItems(item)}
                            keyExtractor={this.keyExtractor}
                            ListEmptyComponent={this.ListEmptyComponent}
                            {...props}
                        /> :
                        <View style={styles.emptySet}>
                            {this.renderErrorCatching()}
                        </View>
                    }
                </Fragment>
            )
        }
    }
    return DynamicFlatList;
}

