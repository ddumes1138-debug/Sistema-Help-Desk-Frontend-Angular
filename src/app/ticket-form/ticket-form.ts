import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket';

@Component({
  selector: 'app-ticket-form',
  imports: [FormsModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm {

  @Output() ticketCreado = new EventEmitter<void>();

  ticket = {
    titulo: '',
    descripcion: '',
    estado: 'Abierto',
    prioridad: 'Alta'
  };

  constructor(private ticketService: TicketService) {}

  guardarTicket() {

    if (!this.ticket.titulo || !this.ticket.descripcion) {
    alert('Complete todos los campos');
    return;
  }

    this.ticketService.crearTicket(this.ticket).subscribe({
      next: (respuesta) => {
        console.log('Ticket creado:', respuesta);

        this.ticket = {
          titulo: '',
          descripcion: '',
          estado: 'Abierto',
          prioridad: 'Alta'
        };
        this.ticketCreado.emit();
        console.log('Evento enviado para actualizar lista');
      },

      error: (error) => {
        console.error('Error al crear ticket:', error);
      }
    });

  }

}