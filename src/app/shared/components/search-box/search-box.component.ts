import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{




  private debouncer: Subject<string>= new Subject<string>();
  //Para manejar las subscripciones
  private debouncerSubsciption?: Subscription;

  @Input()
  initialValue:string = '';

  @Input()
  placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

//debounce para agregar pipes por ser un observable de tipo Subject
  ngOnInit(): void {
    this.debouncerSubsciption = this.debouncer
    .pipe(
      //Tiempo de espera
      debounceTime(500)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value);
      console.log('debounce value:', value)
    })
  }
//Por buenas practicas se utiliza el ngDestroy para destruir todas las subcripciones cuando se termina de utilizar el componente
  ngOnDestroy(): void {
    this.debouncerSubsciption?.unsubscribe();
    console.log("Destruido")
  }
  emitValue(value:string): void{

    this.onValue.emit(value);
  }

  //Metodo para hacer la petición cuando el usuario deja de escribir
  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)

  }
}
