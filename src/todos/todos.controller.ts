import {Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {TodosService} from "./todos.service";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Controller('todos')
export class TodosController {

  constructor(private readonly todoService: TodosService) {
  }

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos()
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.todoService.getTodoById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto)
  }

  @Patch(':id')
  updateTodo(@Body() dto: UpdateTodoDto, @Param('id') id: string) {
    return this.todoService.update(dto, id)
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(id)
  }
}
