import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../services/ticket';

@Component({
  selector: 'app-ticket-list',
  imports: [],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit {

  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets() {

    this.ticketService.obtenerTickets().subscribe({

      next: (data) => {

        this.tickets = [...data];

        console.log('Tickets cargados:', data);

        this.cd.detectChanges();

      },

      error: (error) => {

        console.error('Error al cargar tickets:', error);

      }

    });

  }


  eliminarTicket(id: string) {

    this.ticketService.eliminarTicket(id).subscribe({

      next: () => {

        console.log('Ticket eliminado');

        this.cargarTickets();

      },

      error: (error) => {

        console.error('Error al eliminar:', error);

      }

    });

  }


  editarTicket(ticket: any) {

    const nuevoTitulo = prompt(
      'Nuevo título:',
      ticket.titulo
    );

    const nuevaDescripcion = prompt(
      'Nueva descripción:',
      ticket.descripcion
    );


    if (nuevoTitulo && nuevaDescripcion) {

      const ticketActualizado = {

        titulo: nuevoTitulo,

        descripcion: nuevaDescripcion,

        estado: ticket.estado,

        prioridad: ticket.prioridad

      };


      this.ticketService.actualizarTicket(
        ticket._id,
        ticketActualizado
      )
      .subscribe({

        next: () => {

          console.log('Ticket actualizado');

          this.cargarTickets();

        },

        error: (error) => {

          console.error('Error al actualizar:', error);

        }

      });

    }

  }

}