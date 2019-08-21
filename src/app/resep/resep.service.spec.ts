import { TestBed } from '@angular/core/testing';

import { ResepService } from './resep.service';

describe('ResepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResepService = TestBed.get(ResepService);
    expect(service).toBeTruthy();
  });
});
