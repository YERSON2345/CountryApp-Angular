import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {

    byCapital: {term:'', countries: []},
    byCountries: {term:'', countries: []},
    byRegion: {region:'',countries : []},
  }
  constructor(private http: HttpClient) {

    this.loadToLocalStorage();
  }

  //Llamar cada vez que se hagan modificaciones
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }
//lamar en el constructor donde empieza a construirse la aplicación para que cargue los datos
  private loadToLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)

  }
  private getCountriuesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    //Manejar el error (se envia un arreglo vacio cuando no hallan resultados- utilizar el of)
    .pipe(
      catchError(() => of ([]))
    );

  }

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

    return this.getCountriuesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term:term, countries:countries}),
      tap(() => this.saveToLocalStorage())
    );
  }
  searchByCountry(term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

     return this.getCountriuesRequest(url)
     .pipe(
      tap( countries => this.cacheStore.byCountries = {term:term, countries: countries}),
      tap(() => this.saveToLocalStorage())
     )
  }

  searchByRegion(term:Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;

    return this.getCountriuesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region:term, countries:countries}),
      tap(() => this.saveToLocalStorage())
    )
  }
}
