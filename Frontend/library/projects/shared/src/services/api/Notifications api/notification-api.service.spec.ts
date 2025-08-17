import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationsApiService, InviteWithTrustee2 } from './notifications-api.service';
import { Notification } from '../../../public-api';
import { environmentMobile } from '../../../environment';

describe('NotificationsApiService', () => {
  let service: NotificationsApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://localhost:4200/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotificationsApiService,
        { provide: environmentMobile, useValue: { apiUrl: mockApiUrl } }
      ]
    });
    service = TestBed.inject(NotificationsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createNotifications', () => {
    it('should send a POST request to create a notification', () => {
      const mockNotification: Notification = {
          recipientType: 'user',
          recipientUuid: 'user-123',
          message: 'Test notification',
          isRead: false,
          notificationType: 'test'
      };

      service.createNotifications(mockNotification).subscribe(response => {
        expect(response).toEqual(mockNotification);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/notifications`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockNotification);
      req.flush(mockNotification);
    });

    it('should handle errors when creating notification', (done) => {
      const mockNotification: Notification = {
        recipientType: 'user',
        recipientUuid: 'user-123',
        message: 'Test notification',
        isRead: false,
        notificationType: 'test'
      };

      service.createNotifications(mockNotification).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${mockApiUrl}/notifications`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getNotifications', () => {
    it('should send a GET request with query parameters', () => {
      const recipientType = 'user';
      const recipientId = 'user-123';
      const mockNotifications: Notification[] = [
        {
          recipientType: 'user',
          recipientUuid: 'user-123',
          message: 'Notification 1',
          isRead: false,
          notificationType: 'test'
        },
        {
          recipientType: 'user',
          recipientUuid: 'user-123',
          message: 'Notification 2',
          isRead: true,
          notificationType: 'test'
        }
      ];

      service.getNotifications(recipientType, recipientId).subscribe(response => {
        expect(response).toEqual(mockNotifications);
      });

      const req = httpMock.expectOne(
        `${mockApiUrl}/notifications?recipientType=${recipientType}&recipientUuid=${recipientId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockNotifications);
    });

    it('should handle empty response', () => {
      const recipientType = 'user';
      const recipientId = 'user-123';

      service.getNotifications(recipientType, recipientId).subscribe(response => {
        expect(response).toEqual([]);
      });

      const req = httpMock.expectOne(
        `${mockApiUrl}/notifications?recipientType=${recipientType}&recipientUuid=${recipientId}`
      );
      req.flush(null);
    });
  });

  describe('markNotificationsAsRead', () => {
    it('should send a PUT request to mark notification as read', () => {
      const notificationId = 'notif-123';
      const mockNotification: Notification = {
        recipientType: 'user',
          recipientUuid: 'user-123',
          message: 'Notification 1',
          isRead: true,
          notificationType: 'test'
      };

      service.markNotificationsAsRead(notificationId).subscribe(response => {
        expect(response).toEqual(mockNotification);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/notifications/${notificationId}/read`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({});
      req.flush(mockNotification);
    });

    it('should handle errors when marking as read', (done) => {
      const notificationId = 'notif-123';

      service.markNotificationsAsRead(notificationId).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${mockApiUrl}/notifications/${notificationId}/read`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getInviteById', () => {
    it('should send a GET request for invite by ID', () => {
      const inviteUuid = 'invite-123';
      const mockInvite: InviteWithTrustee2 = {
        inviteUuid,
        status: 'pending',
        invitedOn: '2023-01-01',
        trusteeUuid: 'trustee-123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      };

      service.getInviteById(inviteUuid).subscribe(response => {
        expect(response).toEqual(mockInvite);
      });

      const req = httpMock.expectOne(`/api/invites/${inviteUuid}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockInvite);
    });

    it('should handle errors when getting invite', (done) => {
      const inviteUuid = 'invite-123';

      service.getInviteById(inviteUuid).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`/api/invites/${inviteUuid}`);
      req.error(new ErrorEvent('Network error'));
    });
  });
});