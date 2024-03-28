import { Observable } from 'rxjs';
export declare class AppService {
    private notificationSubject;
    sendNotification(message: string): void;
    getNotificationStream(): Observable<string>;
}
