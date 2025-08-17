import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RatingService, RatingPayload } from './ratings-api.service';
import { Rating } from '../../../models/rating.model';

describe('RatingService', () => {
  let service: RatingService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/rating';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RatingService]
    });
    service = TestBed.inject(RatingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllRatings', () => {
    it('should fetch all ratings with display fields', () => {
      const mockRatings: Rating[] = [
        {
          uuid: '1',
          contractorUuid: 'contractor-1',
          contractorName: 'John Doe',
          comment: 'Great work',
          rating: 5,
          taskUuid: 'task-1',
          taskName: 'Website Redesign',
          trusteeUuid: 'trustee-1',
          createdAt: '2023-01-01T00:00:00Z'
        },
        {
          uuid: '2',
          contractorUuid: 'contractor-2',
          contractorName: 'Jane Smith',
          comment: 'Good job',
          rating: 4,
          taskUuid: 'task-2',
          taskName: 'Mobile App Development',
          trusteeUuid: 'trustee-2',
          createdAt: '2023-01-02T00:00:00Z'
        }
      ];

      service.getAllRatings().subscribe(ratings => {
        expect(ratings).toEqual(mockRatings);
        expect(ratings[0].contractorName).toBe('John Doe');
        expect(ratings[1].taskName).toBe('Mobile App Development');
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockRatings);
    });

    it('should handle ratings without optional fields', () => {
      const mockRating: Rating = {
        uuid: '3',
        contractorUuid: 'contractor-3',
        comment: 'Satisfactory',
        rating: 3,
        taskUuid: 'task-3',
        trusteeUuid: 'trustee-3'
      };

      service.getAllRatings().subscribe(ratings => {
        expect(ratings[0].uuid).toBe('3');
        expect(ratings[0].contractorName).toBeUndefined();
        expect(ratings[0].createdAt).toBeUndefined();
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush([mockRating]);
    });
  });

  describe('createRating', () => {
    it('should create a new rating without display fields', () => {
      const payload: RatingPayload = {
        contractorUuid: 'contractor-1',
        comment: 'Excellent service',
        rating: 5,
        taskUuid: 'task-1',
        trusteeUuid: 'trustee-1'
      };

      const mockResponse: Rating = {
        uuid: '4',
        ...payload,
        createdAt: '2023-01-03T00:00:00Z'
        // contractorName and taskName not included in response
      };

      service.createRating(payload).subscribe(rating => {
        expect(rating.uuid).toBe('4');
        expect(rating.contractorName).toBeUndefined();
        expect(rating.createdAt).toBe('2023-01-03T00:00:00Z');
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle rating creation with all fields', () => {
      const payload: RatingPayload = {
        contractorUuid: 'contractor-2',
        comment: 'Great communication',
        rating: 4,
        taskUuid: 'task-2',
        trusteeUuid: 'trustee-2'
      };

      const mockResponse: Rating = {
        uuid: '5',
        ...payload,
        contractorName: 'Alice Johnson',
        taskName: 'API Integration',
        createdAt: '2023-01-04T00:00:00Z'
      };

      service.createRating(payload).subscribe(rating => {
        expect(rating.contractorName).toBe('Alice Johnson');
        expect(rating.taskName).toBe('API Integration');
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(mockResponse);
    });
  });
});