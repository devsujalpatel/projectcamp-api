export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type UserRoleType = `${UserRole}`; // "user" | "admin"
