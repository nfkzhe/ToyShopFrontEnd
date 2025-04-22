// TabContent.js
import React from 'react';
import ProfileInfo from './ProfileInfo';
import Orders from './Orders';
import Favorites from './FavoritesProduct';
import ShippingAddresses from './ShippingAddresses';
import Settings from './Settings';

const TabContent = ({ activeTab, user , orderHistory , shippingAddresses, favoriteProducts, setShowAvatarUploader, BASE_URL}) => {
  switch (activeTab) {
    case 'profile':
      return <ProfileInfo user={user} setShowAvatarUploader={setShowAvatarUploader} BASE_URL={BASE_URL}/>;
    case 'orders':
      return <Orders orderHistory={orderHistory} />;
    case 'favorites':
      return <Favorites favoriteProducts={favoriteProducts} />;
    case 'addresses':
      return <ShippingAddresses shippingAddresses={shippingAddresses} />;
    case 'settings':
      return <Settings />;
    default:
        return null;
  }
};

export default TabContent;
