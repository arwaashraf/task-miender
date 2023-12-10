import { TaskStaus } from './status.enum';

export interface TaskModel {
  id?: number;
  userId: number;
  desc: string;
  status: TaskStaus;
  users?: UsersModal;
}

export interface UsersModal {
  id?: number;
  image: string;
}
