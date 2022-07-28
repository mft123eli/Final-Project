import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <p>navbar works!</p>
    <header>
      <div class="navbar navbar-dark bg-secondary shadow-sm">
        <div class="navbar-brand align-item-center d-flex">
          <i style="font-size: 40px" class="fas fa-shipping-fast">
            <strong></strong>
          </i>
        </div>
        <button class="btn btn-primary"></button>
      </div>
    </header>
  `,
  styles: [``],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
