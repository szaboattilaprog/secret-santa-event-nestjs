import { ParticipantAuthGuard } from '@/src/auth/participant-auth-guard/participant-auth.guard';

describe('ParticipantAuthGuard', () => {
  it('should be defined', () => {
    expect(new ParticipantAuthGuard()).toBeDefined();
  });
});