import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, finalize } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class UploadImageService {

  public urlImage: BehaviorSubject<string> = new BehaviorSubject<string>( '' );

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFile ( e: Event ) {
    const event = ( e.target as HTMLInputElement );
    const image = event.files![ 0 ];

    const name = `${ image.name }`;
    const ref = this.storage.ref( name );
    const task = this.storage.upload( name, image );

    task.snapshotChanges().pipe( finalize( () => {
      const urlImage = ref.getDownloadURL();
      urlImage.subscribe( url => {
        this.urlImage.next( url );
      } );
    } ) ).subscribe();
  }
}
