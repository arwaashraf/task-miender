export interface TaskModel {
  id?: number;
  userId: number;
  desc: string;
  status: TaskStaus;
}

export enum TaskStaus {
  ToDo,
  Inprogress,
  Done,
}
