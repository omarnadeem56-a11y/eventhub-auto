import { NewUser } from '../types/user';

export function createUser(): NewUser {
  const password = 'Lantern7^Quiet!Fig';

  return {
    email: `omar+${Date.now()}@test.com`,
    password,
    confirmPassword: password,
  };
}