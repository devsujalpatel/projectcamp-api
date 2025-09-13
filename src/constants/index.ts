export enum UserRoleEnum {
  MEMBER = 'member',
  PROJECT_ADMIN = 'project_admin',
  ADMIN = 'admin',
}

export const AvailableUserRole = Object.values(UserRoleEnum);


export enum TaskStatusEnum {
    TODO = "todo", 
    IN_PROGRESS = "in_progress",
    DONE = "done"
}
export const AvailableTaskStatus = Object.values(TaskStatusEnum);