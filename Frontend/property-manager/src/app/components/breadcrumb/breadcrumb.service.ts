import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Breadcrumb {
  label: string;
  route: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class BreadCrumbService {
    private crumb = new BehaviorSubject<Breadcrumb[] | null>(null);
    breadCrumbs = this.crumb.asObservable();

    setBreadCrumbs(breadcrumbs: Breadcrumb[])
    {
        this.crumb.next(breadcrumbs);
    }
    clearBreadCrumb()
    {
        this.crumb.next(null);
    }
}