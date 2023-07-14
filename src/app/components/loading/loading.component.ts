import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingComponent {
  constructor(public loader: LoaderService) {}
}
