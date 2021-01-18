import { Component, OnInit, } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { isNullOrUndefined } from 'util';
import { FirebaseServiceAutoService } from 'src/app/services/firebase-service-auto.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  closeResult = '';

  autoForm: FormGroup;

  idfirebaseactualizar: string;
  actualizar: boolean;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService,
    private authServ: FirebaseServiceAutoService
  ) { }

  config: any;
  collection = { count: 0, data: [] }

  ngOnInit(): void {

    this.idfirebaseactualizar = "";
    this.actualizar = false;

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.autoForm = this.fb.group({

      id: ['', Validators.required],
      nombre: ['', Validators.required],
      modelo: ['', Validators.required],
      precio: ['', Validators.required],

    });

    this.firebaseServiceService.getAutos().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          modelo: e.payload.doc.data().modelo,
          precio: e.payload.doc.data().precio,
          idfirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }

    );
  }

  onLogout(){
    this.authServ.logout();
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }
  eliminar(item: any): void {
    this.firebaseServiceService.deleteAuto(item.idfirebase);

  }

  guardarAuto(): void {

    this.firebaseServiceService.createAuto(this.autoForm.value).then(rep => {
      this.autoForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)

    })
  }
  actualizarAuto() {

    if (!isNullOrUndefined(this.idfirebaseactualizar)) {
      this.firebaseServiceService.updateAuto(this.idfirebaseactualizar, this.autoForm.value).then(resp => {
        this.autoForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }

  }

  openEditar(content, item: any) {
    this.autoForm.setValue({
      id: item.id,
      nombre: item.nombre,
      modelo: item.modelo,
      precio: item.precio,
    })
    this.idfirebaseactualizar = item.idfirebase;
    this.actualizar = true;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
