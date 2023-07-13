import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogEdit, ResponseMessage } from 'src/app/models';
import { CatalogService } from 'src/app/services/catalog.service';
import { showError, showMessage } from 'src/app/share/helpers/toastr-helper';

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.css'],
})
export class EditCatalogComponent {
  catalogForm!: FormGroup;
  catalogId!: number;
  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.catalogForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.catalogId = params['id'];
    });
  }

  ngAfterViewInit() {
    if (this.catalogId != null) {
      this.catalogService.getById(this.catalogId).subscribe(
        (values) => {
          this.catalogForm.patchValue({
            name: values.name,
          });
        },
        (err: any) => showError(err, this.toastr)
      );
    }
  }

  submitCatalog() {
    const data: CatalogEdit = {
      name: this.catalogForm.value.name,
    };

    if (this.catalogId != null) {
      this.catalogService.updateCatalog(this.catalogId, data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/catalog']);
        },
        (err: any) => showError(err, this.toastr)
      );
    } else {
      this.catalogService.addCatalog(data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/catalog']);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.router.navigate(['/catalog']);
        }
      );
    }
  }
}
