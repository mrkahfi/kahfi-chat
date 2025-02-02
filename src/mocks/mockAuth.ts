export function generateMockJWT(
  payload: { username: string; role: string },
  secret = 'mock-secret',
  expiresIn = '1h'
) {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const encodedHeader = btoa(header);
  const encodedPayload = btoa(
    JSON.stringify({ ...payload, exp: Date.now() + expiresInToMs(expiresIn) })
  );

  const signature = btoa(secret);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

enum TimeUnit {
  Hours = 'h',
  Minutes = 'm',
  Seconds = 's',
}

export function expiresInToMs(expiresIn: string): number {
  const units: { [key in TimeUnit]: number } = {
    [TimeUnit.Hours]: 3600000,
    [TimeUnit.Minutes]: 60000,
    [TimeUnit.Seconds]: 1000,
  };

  const match = expiresIn.match(/^(\d+)([hms])$/);

  if (match) {
    const [, value, unit] = match;
    const timeUnit = unit as TimeUnit;
    if (units[timeUnit]) {
      return parseInt(value, 10) * units[timeUnit];
    }
  }
  return 0;
}
export function mockAuthenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<string> {
  const mockUser = {
    username: 'testuser',
    password: 'password123',
    role: 'customer',
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === mockUser.username && password === mockUser.password) {
        const jwt = generateMockJWT({
          username: mockUser.username,
          role: mockUser.role,
        });
        resolve(jwt); // Resolve the promise with the JWT
      } else {
        reject(new Error('Invalid username or password')); // Reject on failure
      }
    }, 1000);
  });
}
