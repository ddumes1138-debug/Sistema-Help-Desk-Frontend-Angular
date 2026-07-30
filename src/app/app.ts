import { Component, ViewChild } from '@angular/core';
import { TicketForm } from './ticket-form/ticket-form';
import { TicketList } from './ticket-list/ticket-list';

@Component({
  selector: 'app-root',
  imports: [TicketForm, TicketList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  @ViewChild(TicketList) lista!: TicketList;

  actualizarLista() {

    setTimeout(() => {

      this.lista.cargarTickets();

    }, 300);

  }

}