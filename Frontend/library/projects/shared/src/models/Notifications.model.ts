export interface Notification{
    notificationUuid?: string;
    createdAt?: string;
    createdAtDate?: Date;
    notificationType: string;
    message: string;
    recipientType: string;
    recipientUuid: string;
    isRead: boolean;
    relatedTaskUuid?: string;
    relatedQuoteUuid?: string;
    relatedSessionUuid?: string;
    relatedInviteUuid?: string;
}