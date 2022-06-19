import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import {Todo} from "./models/todo.model";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Injectable()
export class TodosService {

  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.findAll()
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.todoModel.findOne({where: {id}})
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();

    todo.title = dto.title
    todo.done = dto.done

    return todo.save()
  }

  async update(dto: UpdateTodoDto, id: string): Promise<[affectedCount: number, affectedRows: Todo[]]> {
    return this.todoModel.update(
      {...UpdateTodoDto},
      {
        where: {id},
        returning: true
      })
  }

  async delete(id: string): Promise<void> {
    const todo = await this.todoModel.findOne({where: {id}})
    await todo.destroy()
  }
}
