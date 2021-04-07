import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'airport';

  constructor(private toaster: ToastrService) {
  }

  showToast(): void {
    this.toaster.success('Text!', 'Title');
}
}
