import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesServise:CountriesService,
    private router: Router
    ){

  }

  //Mostrar el ID en consola
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(( {id}) => this.countriesServise.searchCountryByAlphaCode(id)),
      )
      .subscribe( country => {

        if(!country ){
          return this.router.navigateByUrl('')
        }

        console.log("Excelente")
         return this.country = country;
      // console.log({params: id})
    });
  }
}


