import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

type Form = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  title = signal<string>('simple-form-spa');
  form = signal<Form>({ title: '', description: '' });
  formId = signal<string>('cf39ec32-d08b-0629-0ece-8d9b1dc97fcf');
  url = computed(() => `${environment.api}/form/${this.formId()}`);

  async ngOnInit() {
    const res = await firstValueFrom(this.http.get<Form>(this.url()));
    this.form.set(res);
  }
}
