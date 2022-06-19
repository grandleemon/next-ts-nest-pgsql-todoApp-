import {IsBoolean, IsNotEmpty} from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  @IsBoolean()
  readonly done: boolean
}