import React from 'react';
import { Link, Route } from 'dva/router';
import { Layout, Menu } from 'antd';
import ItineraryManage from './ItineraryManage';
import CustomerList from '../components/Customer/CustomerList';
import BusinessList from '../components/Business/BusinessList';
import ExchangeLogin from '../components/Login/ExchangeLogin';
import Welcome from '../components/Login/Welcome';
import ItimerarySummary from '../components/ItinerarySummary/ItinerarySummary';
import TrafficList from '../components/ResourcesManage/TrafficList';
import HotelList from '../components/ResourcesManage/HotelList';
import LanmarkList from '../components/ResourcesManage/LanmarkList';
import LocationList from '../components/ResourcesManage/LocationList';
import POIList from '../components/ResourcesManage/POIList';
import RestaurantList from '../components/ResourcesManage/RestaurantList';
import ResourceConfigList from '../components/ResourcesManage/ResourceConfigList';
import PreviewPage from '../components/ItineraryContent/Content/PreviewPage';


const SubMenu = Menu.SubMenu;
const { Content, Sider } = Layout;

function MainLayout({ match }) {
    return (
      <Layout
        className="layoutwrapper"
        style={{ height: '100%',
            minWidth: '1280px',
            width: '1280px',
            margin: '0 auto',
        }}
      >
        <Layout style={{ height: '100%' }}>
          <Content style={{ height: '100%', backgroundColor: '#efeff1' }}>
            <Route exact path={`${match.url}`} component={ItineraryManage} />
            <Route exact path={`${match.url}/businessList`} component={BusinessList} />
            <Route exact path={`${match.url}/customerList`} component={CustomerList} />
            {/* <Route exact path={`${match.url}/summary`} component={ItimerarySummary} /> */}
            <Route exact path={`${match.url}/trafficlist`} component={TrafficList} />
            <Route exact path={`${match.url}/hotellist`} component={HotelList} />
            <Route exact path={`${match.url}/lanmarklist`} component={LanmarkList} />
            <Route exact path={`${match.url}/locationlist`} component={LocationList} />
            <Route exact path={`${match.url}/poilist`} component={POIList} />
            <Route exact path={`${match.url}/restaurantlist`} component={RestaurantList} />
            <Route exact path={`${match.url}/resourceConfigList`} component={ResourceConfigList} />
            <Route exact path={`${match.url}/preview`} component={PreviewPage} />
          </Content>
        </Layout>
      </Layout>
    );
}

export default MainLayout;
