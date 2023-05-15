import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code:string): Observable<Country | null>{

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
          //Manejar el error (se envia un arreglo vacio cuando no hallan resultados- utilizar el of)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError(error =>{
        console.log(error)
        return of(null)
      }
      )
    );
  }

  searchByCapital(term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;

    return this.http.get<Country[]>(url)
          //Manejar el error (se envia un arreglo vacio cuando no hallan resultados- utilizar el of)
    .pipe(
      catchError(error =>{
        console.log(error)
        return of([])
      }
      )
    );
  }
  searchByCountry(term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url)
          //Manejar el error (se envia un arreglo vacio cuando no hallan resultados- utilizar el of)
    .pipe(
      catchError(error =>{
        console.log(error)
        return of([])
      }
      )
    );
  }
  searchByRegion(term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;

    return this.http.get<Country[]>(url)
          //Manejar el error (se envia un arreglo vacio cuando no hallan resultados- utilizar el of)
    .pipe(
      catchError(error =>{
        console.log(error)
        return of([])
      }
      )
    );
  }
}
