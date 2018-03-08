import React from 'react';
import { observer } from 'mobx-react';

import NotificationSystem from 'react-notification-system';

export const Notif = observer(() => {

    var _notificationSystem = null;

    return (
        <div>
            <button onClick={(e) => _addNotification(e)}>Add notification</button>
            <NotificationSystem ref="notificationSystem" />
        </div>
    );

    function _addNotification(event) {
        event.preventDefault();
        _notificationSystem.addNotification({
          message: 'Notification message',
          level: 'success'
        });
    }

    function componentDidMount() {
        _notificationSystem = this.refs.notificationSystem;
      }

});