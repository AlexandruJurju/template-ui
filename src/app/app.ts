import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'template-ui';

  constructor(
    private router: Router,
  ) {
  }

  goToTest() {
    void this.router.navigate(['/test']);
  }
}
