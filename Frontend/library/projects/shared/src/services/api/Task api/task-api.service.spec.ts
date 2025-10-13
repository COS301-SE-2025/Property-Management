import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskApiService } from './task-api.service';
import { MaintenanceTask } from '../../../public-api';
import { Quote } from '../../../public-api';
import { environmentMobile } from '../../../environment';

describe('TaskApiService', () => {
  let service: TaskApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = environmentMobile.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskApiService,
        { provide: environmentMobile, useValue: { apiUrl: mockApiUrl } }
      ]
    });
    service = TestBed.inject(TaskApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123',
        priority: 'high'
    };

    const testDate = new Date();

    service.createTask(
    'Test Task',
    'Test Description',
    testDate,
    'building-123',
    'trustee-123',
    'img-123',
    'creator-123',
    true,
    false,
    'high'
    ).subscribe(task => {
    expect(task.uuid).toBe('task-123');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/maintenance/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('isOwner')).toBe('true');
    expect(req.request.headers.get('isBodyCorporate')).toBe('false');
    
    const requestDate = req.request.body.scheduledDate;
    expect(requestDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    
    req.flush({ ...mockTask, taskUuid: 'task-123' });
    });
  });

  describe('getAllTasks', () => {
    it('should fetch all tasks', () => {
      const mockTasks: MaintenanceTask[] = [
        { uuid: 'task-1', title: 'Task 1', des: 'Desc 1', status: 'pending', scheduled_date: new Date(), approved: false, approvalStatus: 'PENDING', buuid: 'b1', tuuid: 't1' },
        { uuid: 'task-2', title: 'Task 2', des: 'Desc 2', status: 'done', scheduled_date: new Date(), approved: true, approvalStatus: 'APPROVED', buuid: 'b2', tuuid: 't2' }
      ];

      service.getAllTasks().subscribe(tasks => {
        expect(tasks.length).toBe(2);
        expect(tasks[0].title).toBe('Task 1');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('should fetch a single task by ID', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.getTaskById('task-123').subscribe(task => {
        expect(task.uuid).toBe('task-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/task-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTask);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task status', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'done',
        scheduled_date: new Date(),
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.updateTaskStatus('done', 'task-123').subscribe(task => {
        expect(task.status).toBe('done');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/task-123`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ status: 'done' });
      req.flush(mockTask);
    });
  });

  describe('updateTaskAssignedContractor', () => {
    it('should update assigned contractor with body corporate header', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: true,
        approvalStatus: 'APPROVED',
        buuid: 'building-123',
        tuuid: 'trustee-123',
        cuuid: 'contractor-123'
      };

      service.updateTaskAssignedContractor('contractor-123', 'task-123').subscribe(task => {
        expect(task.cuuid).toBe('contractor-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/update/task-123`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('isBodyCorporate')).toBe('true');
      expect(req.request.body.contractorUuid).toBe('contractor-123');
      expect(req.request.body.approvalStatus).toBe('APPROVED');
      req.flush(mockTask);
    });
  });

  describe('updateTaskApproval', () => {
    it('should update approval status with body corporate header', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: true,
        approvalStatus: 'APPROVED',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.updateTaskApproval('APPROVED', 'task-123', true).subscribe(task => {
        expect(task.approvalStatus).toBe('APPROVED');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/update/task-123`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('isBodyCorporate')).toBe('true');
      expect(req.request.body.approvalStatus).toBe('APPROVED');
      req.flush(mockTask);
    });
  });

  describe('updateTaskScheduledDate', () => {
    it('should update scheduled date with body corporate header', () => {
      const testDate = new Date();
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: testDate,
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.updateTaskScheduledDate('task-123', testDate).subscribe(task => {
        expect(task.scheduled_date).toEqual(testDate);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/update/task-123`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('isBodyCorporate')).toBe('true');
      expect(req.request.body.scheduledDate).toBeDefined();
      req.flush(mockTask);
    });
  });

  describe('assignContractorsToTask', () => {
    it('should assign multiple contractors with body corporate header', () => {
      const mockTask: MaintenanceTask = {
        uuid: 'task-123',
        title: 'Test Task',
        des: 'Test Description',
        status: 'pending',
        scheduled_date: new Date(),
        approved: false,
        approvalStatus: 'PENDING',
        buuid: 'building-123',
        tuuid: 'trustee-123'
      };

      service.assignContractorsToTask(['contractor-1', 'contractor-2'], 'task-123').subscribe(task => {
        expect(task).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/assign-contractors`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('isBodyCorporate')).toBe('true');
      expect(req.request.body.contractorUuids).toEqual(['contractor-1', 'contractor-2']);
      req.flush(mockTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', () => {
      service.deleteTask('task-123').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance/task-123`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('getQuoteFromTaskId', () => {
    it('should get quotes for a task', () => {
      const mockQuotes: Quote[] = [
        {
          uuid: 'quote-1', t_uuid: 'task-123', amount: 100, status: 'PENDING', c_uuid: '1', submitted_on: 1, doc: '',
          expiry_date: ''
        },
        {
          uuid: 'quote-2', t_uuid: 'task-123', amount: 150, status: 'APPROVED', c_uuid: '2', submitted_on: 1, doc: '',
          expiry_date: ''
        }
      ];

      service.getQuoteFromTaskId('task-123').subscribe(quotes => {
        expect(quotes.length).toBe(2);
        expect(quotes[0].t_uuid).toBe('task-123');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/quote/task/task-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockQuotes);
    });
  });

  describe('getTasksForTrustee', () => {
    it('should get tasks for a trustee', () => {
      const mockTasks: MaintenanceTask[] = [
        { uuid: 'task-1', title: 'Task 1', des: 'Desc 1', status: 'pending', scheduled_date: new Date(), approved: false, approvalStatus: 'PENDING', buuid: 'b1', tuuid: 't1' }
      ];

      service.getTasksForTrustee('trustee-123').subscribe(tasks => {
        expect(tasks.length).toBe(1);
        expect(tasks[0].tuuid).toBe('t1');
      });

      const req = httpMock.expectOne(`/api/maintenance/trustee/trustee-123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });
});