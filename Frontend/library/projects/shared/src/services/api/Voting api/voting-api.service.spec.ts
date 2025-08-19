import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VotingApiService} from './voting-api.service';
import { Voting, VotingResults } from '../../../public-api';
import { Quote } from '../../../public-api';
import { environment } from '../../../environment';

describe('VotingApiService', () => {
  let service: VotingApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://localhost:8080/api/vote';
  const mockQuoteUrl = 'http://localhost:8080/api'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VotingApiService,
        { provide: environment, useValue: { apiUrl: 'http://localhost:4200/api' } }
      ]
    });
    service = TestBed.inject(VotingApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSessionDetails', () => {
    it('should fetch voting session details', () => {
      const mockVoting: Voting = {
        sessionUuid: 'session-123',
        corporateUuid: 'corp-123',
        votingEndsAt: [2023, 12, 31],
        isActive: true,
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Task Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.getSessionDetails('session-123').subscribe(session => {
        expect(session.sessionUuid).toBe('session-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/session/session-123/results`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVoting);
    });
  });

  describe('createSession', () => {
    it('should create a new voting session with proper date formatting', () => {
      const testDate = new Date('2023-12-31T23:59:59');
      const mockVoting: Voting = {
          sessionUuid: 'session-123',
          taskUuid: 'task-123',
          corporateUuid: 'corp-123',
          votingEndsAt: [2023, 12, 31],
          isActive: true,
          uuid: '',
          title: '',
          des: '',
          status: '',
          scheduled_date: new Date(),
          approved: false,
          approvalStatus: '',
          buuid: '',
          tuuid: ''
      };

      service.createSession('task-123', 'corp-123', testDate).subscribe(session => {
        expect(session.sessionUuid).toBe('session-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/session`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        taskUuid: 'task-123',
        coporateUuid: 'corp-123',
        votingEndsAt: '2023-12-31T23:59:59'
      });
      req.flush(mockVoting);
    });
  });

  describe('getSessions', () => {
    it('should fetch all voting sessions', () => {
      const mockVotings: Voting[] = [
        {
            sessionUuid: 'session-1',
            corporateUuid: 'corp-123',
            votingEndsAt: [2023, 12, 31],
            isActive: true,
            uuid: '',
            title: '',
            des: '',
            status: '',
            scheduled_date: new Date(),
            approved: false,
            approvalStatus: '',
            buuid: '',
            tuuid: ''
        },
        {
            sessionUuid: 'session-2',
            corporateUuid: 'corp-456',
            votingEndsAt: [2024, 1, 31],
            isActive: false,
            uuid: '',
            title: '',
            des: '',
            status: '',
            scheduled_date: new Date(),
            approved: false,
            approvalStatus: '',
            buuid: '',
            tuuid: ''
        }
      ];

      service.getSessions().subscribe(sessions => {
        expect(sessions.length).toBe(2);
        expect(sessions[0].sessionUuid).toBe('session-1');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/sessions`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVotings);
    });
  });

  describe('getSessionFromTaskId', () => {
    it('should fetch session by task ID', () => {
      const mockVoting: Voting = {
          sessionUuid: 'session-123',
          taskUuid: 'task-123',
          corporateUuid: 'corp-123',
          votingEndsAt: [2023, 12, 31],
          isActive: true,
          uuid: '',
          title: '',
          des: '',
          status: '',
          scheduled_date: new Date(),
          approved: false,
          approvalStatus: '',
          buuid: '',
          tuuid: ''
      };

      service.getSessionFromTaskId('task-123').subscribe(session => {
        expect(session.taskUuid).toBe('task-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/task/task-123/session`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVoting);
    });
  });

  describe('getTaskFromSessionId', () => {
    it('should fetch task by session ID', () => {
      const mockVoting: Voting = {
          sessionUuid: 'session-123',
          taskUuid: 'task-123',
          corporateUuid: 'corp-123',
          votingEndsAt: [2023, 12, 31],
          isActive: true,
          uuid: 'task-123',
          title: 'Test Task',
          des: 'Task Description',
          status: 'pending',
          scheduled_date: new Date(),
          approved: false,
          approvalStatus: '',
          buuid: '',
          tuuid: ''
      };

      service.getTaskFromSessionId('session-123').subscribe(task => {
        expect(task.taskUuid).toBe('task-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/session/session-123/task`);
      expect(req.request.method).toBe('GET');
      req.flush(mockVoting);
    });
  });

  describe('castVote', () => {
    it('should submit a vote with correct parameters', () => {
      service.castVote('session-123', 'quote-123', 'voter-123', true).subscribe(response => {
        expect(response).toBe('Vote recorded');
      });

      const req = httpMock.expectOne(mockApiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        sessionUuid: 'session-123',
        quoteUuid: 'quote-123',
        voterUuid: 'voter-123',
        isTrustee: true,
        voteFor: true
      });
      req.flush('Vote recorded');
    });
  });

  describe('getVoteResults', () => {
    it('should fetch voting results', () => {
      const mockResults: VotingResults = {
        sessionUuid: 'session-123',
        taskUuid: 'task-123',
        votingEnded: true,
        winningQuoteUuid: 'quote-123',
        results: [
          { quoteUuid: 'quote-123', votesFor: 5 },
          { quoteUuid: 'quote-456', votesFor: 3 }
        ]
      };

      service.getVoteResults('session-123').subscribe(results => {
        expect(results.winningQuoteUuid).toBe('quote-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/session/session-123/results`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResults);
    });
  });

  describe('getQuote', () => {
    it('should fetch a quote by ID', () => {
      const mockQuote: Quote = {
        uuid: 'quote-123',
        t_uuid: 'task-123',
        c_uuid: 'contractor-123',
        amount: 1000,
        submitted_on: 1,
        doc: 'quote.pdf',
        status: 'PENDING',
        expiry_date: ''
      };

      service.getQuote('quote-123').subscribe(quote => {
        expect(quote.uuid).toBe('quote-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/vote/quote-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockQuote);
    });
  });

  describe('updateQuote', () => {
    it('should update quote status', () => {
      const mockQuote: Quote = {
        uuid: 'quote-123',
        t_uuid: 'task-123',
        c_uuid: 'contractor-123',
        amount: 1000,
        submitted_on: 1,
        doc: 'quote.pdf',
        status: 'APPROVED',
        expiry_date: ''
      };

      service.updateQuoteStatus('quote-123', 'APPROVED').subscribe(quote => {
        expect(quote.status).toBe('APPROVED');
      });

      const req = httpMock.expectOne(`${mockQuoteUrl}/quote/quote-123`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body.status).toBe('APPROVED');
      req.flush(mockQuote);
    });
  });
});