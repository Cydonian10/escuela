import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TramitesService } from '../../../core/services/tramites.service';

@Component( {
  selector: 'app-form-create-tramite',
  templateUrl: './form-create-tramite.component.html',
  styleUrls: [ './form-create-tramite.component.scss' ]
} )
export class FormCreateTramiteComponent implements OnInit {

  private suscriptions: Subscription = new Subscription();

  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit (): void {
  }

  ngOnDestroY () { }

}
