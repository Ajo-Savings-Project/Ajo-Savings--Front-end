import { useNotifications, NotificationList } from '@magicbell/magicbell-react';


export default function NotificationsPage() {
    const notifications = useNotifications();

    return (
        <div className="p-20">
            <h1 className="text-3xl mb-8">
                {notifications?.total} Notifications
            </h1>
            <h1>Hello world</h1>
            <NotificationList notifications={notifications} />
        </div>
    );
}