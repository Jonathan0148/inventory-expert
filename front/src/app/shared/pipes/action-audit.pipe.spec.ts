import { ActionAuditPipe } from './action-audit.pipe';

describe('ActionAuditPipe', () => {
  it('create an instance', () => {
    const pipe = new ActionAuditPipe();
    expect(pipe).toBeTruthy();
  });
});
