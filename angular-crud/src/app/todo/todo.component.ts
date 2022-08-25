import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import  { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  public toDos : any;
  public activeTasks : any;
  public newTodo: any;
  public path: any;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  toggleTodo(todo: any){
    this.todoService.toggle(todo).then(()=>{
      return this.getAll()
    })
  }

  clearCompleted(){
    this.todoService.deleteCompleted().then(()=>{
      return this.getAll()
    })
  }

  destroyTodo(todo:any){
    this.todoService.delete(todo).then(()=>{
      return this.getAll()
    })
  }

  updateTodo(todo:any, newValue:any){
    todo.title = newValue;
    return this.todoService.put(todo).then(()=>{
      todo.editing = false;
      return this.getAll();
    });
  }

  addTodo(){
    this.todoService.add({title : this.newTodo , isDone: false}).then(() => {
      return this.getAll();
    }).then(()=>{
      this.newTodo = '';
    })
  };

  getAll(query = ''){
    return this.todoService.get(query).then(toDos =>{
      this.toDos = toDos;
      this.activeTasks = this.toDos.filter((toDo:any) => !toDo.isDone).length;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status']
      this.getAll(this.path);
    })
  }

}
