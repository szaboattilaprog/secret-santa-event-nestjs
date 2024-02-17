import { OrganizerAuthGuard } from '@/src/auth/organizer-auth-guard/organizer-auth.guard';

describe('OrganizerAuthGuard', () => {
  it('should be defined', () => {
    expect(new OrganizerAuthGuard()).toBeDefined();
  });
});