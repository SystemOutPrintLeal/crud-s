import { Injectable } from '@angular/core';

 let TODOS = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  toggle(selected: any){
    selected.isDone = !selected.isDone;
    return Promise.resolve();
  }

  deleteCompleted(){
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => todo.isDone === true);
      resolve(TODOS)
    })
  }

  delete(selected: any){
    return new Promise(resolve =>{
      const index = TODOS.findIndex(todo => todo === selected)
      TODOS.splice(index,1)
      resolve(true)
    })
  }

  put(changed: any){
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed)
      TODOS[index].title = changed.title;
      resolve(changed)
    })
  }

  add(data: any){
    return new Promise(resolve => {
      TODOS.push(data)
      resolve(data)
    })
  }

  get(query = ''){
    return new Promise(resolve => {
      let data : any;

      if(query === 'completed' || query === 'active')
      {
        const isCompleted = query === 'completed'
        data = TODOS.filter(todo => todo.isDone === isCompleted)
      }
      else
      {
        data = TODOS
      }
      resolve(data)
    })
  }
}
