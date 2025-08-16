import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskProgresApiService } from './task-progress.service';
import { TaskProgress } from '../../../public-api';
import { environmentMobile } from '../../../environment';

describe('TaskProgresApiService', () => {
  let service: TaskProgresApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://localhost:4200/api/task-progress';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskProgresApiService,
        { provide: environmentMobile, useValue: { apiUrl: 'http://localhost:4200/api' } }
      ]
    });
    service = TestBed.inject(TaskProgresApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createProgress', () => {
    it('should create task progress with all required fields', () => {
      const mockResponse: TaskProgress = {
        progressUuid: 'progress-123',
        submissionDate: [2023, 1, 1],
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        progressPercentage: 50,
        workDescription: 'Completed first phase',
        quantityUsed: 10,
        remarks: null,
        lastUpdated: [2023, 1, 1]
      };

      service.createProgress(
        'contractor-123',
        'task-123',
        'image-123',
        'Completed first phase',
        'inventory-123',
        10,
        50
      ).subscribe(progress => {
        expect(progress.progressUuid).toBe('progress-123');
      });

      const req = httpMock.expectOne(mockApiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        imageId: 'image-123',
        workDescription: 'Completed first phase',
        inventoryUsageUuid: 'inventory-123',
        quantityUsed: 10,
        progressPercentage: 50
      });
      req.flush(mockResponse);
    });

    it('should handle optional fields', () => {
      const mockResponse: TaskProgress = {
        progressUuid: 'progress-123',
        submissionDate: [2023, 1, 1],
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        progressPercentage: 50,
        workDescription: 'Completed first phase',
        quantityUsed: 0,
        remarks: null,
        lastUpdated: [2023, 1, 1]
      };

      service.createProgress(
        'contractor-123',
        'task-123',
        '', // empty imageId
        'Completed first phase',
        '', // empty inventoryUsageId
        0, // zero quantity
        50
      ).subscribe(progress => {
        expect(progress.progressUuid).toBe('progress-123');
      });

      const req = httpMock.expectOne(mockApiUrl);
      expect(req.request.body).toEqual({
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        imageId: '',
        workDescription: 'Completed first phase',
        inventoryUsageUuid: '',
        quantityUsed: 0,
        progressPercentage: 50
      });
      req.flush(mockResponse);
    });
  });

  describe('getTaskProgressById', () => {
    it('should fetch task progress by ID', () => {
      const mockProgress: TaskProgress[] = [{
        progressUuid: 'progress-123',
        submissionDate: [2023, 1, 1],
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        progressPercentage: 50,
        workDescription: 'Completed first phase',
        quantityUsed: 10,
        remarks: null,
        lastUpdated: [2023, 1, 1]
      }];

      service.getTaskProgressById('progress-123').subscribe(progress => {
        expect(progress[0].progressUuid).toBe('progress-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/progress-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProgress);
    });
  });

  describe('getTaskProgressByTaskId', () => {
    it('should fetch all progress records for a task', () => {
      const mockProgressList: TaskProgress[] = [
        {
          progressUuid: 'progress-1',
          submissionDate: [2023, 1, 1],
          contractorUuid: 'contractor-123',
          taskUuid: 'task-123',
          progressPercentage: 30,
          workDescription: 'Initial work',
          quantityUsed: 5,
          remarks: null,
          lastUpdated: [2023, 1, 1]
        },
        {
          progressUuid: 'progress-2',
          submissionDate: [2023, 1, 2],
          contractorUuid: 'contractor-123',
          taskUuid: 'task-123',
          progressPercentage: 60,
          workDescription: 'More work done',
          quantityUsed: 10,
          remarks: 'On schedule',
          lastUpdated: [2023, 1, 2]
        }
      ];

      service.getTaskProgressByTaskId('task-123').subscribe(progressList => {
        expect(progressList.length).toBe(2);
        expect(progressList[0].progressPercentage).toBe(30);
        expect(progressList[1].progressPercentage).toBe(60);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/task/task-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProgressList);
    });
  });

  describe('updateProgressPercentage', () => {
    it('should update progress percentage', () => {
      const mockResponse: TaskProgress = {
        progressUuid: 'progress-123',
        submissionDate: [2023, 1, 1],
        contractorUuid: 'contractor-123',
        taskUuid: 'task-123',
        progressPercentage: 75,
        workDescription: 'Completed first phase',
        quantityUsed: 10,
        remarks: null,
        lastUpdated: [2023, 1, 2]
      };

      service.updateProgressPercentage('task-123', 75).subscribe(progress => {
        expect(progress.progressPercentage).toBe(75);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/task/task-123`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        progressPercentage: 75
      });
      req.flush(mockResponse);
    });
  });

  describe('deleteTaskProgress', () => {
    it('should delete a progress record', () => {
      service.deleteTaskProgress('progress-123').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/progress-123`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});