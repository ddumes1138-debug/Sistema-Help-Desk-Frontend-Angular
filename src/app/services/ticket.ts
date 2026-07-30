import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private http: HttpClient) { }

  obtenerTickets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearTicket(ticket: any): Observable<any> {
    return this.http.post(this.apiUrl, ticket);
  }

  actualizarTicket(id: string, ticket: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ticket);
  }

  eliminarTicket(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}