import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogEdit } from 'src/app/models';
import { CatalogService } from 'src/app/services/catalog.service';

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
        (error: any) => {
          console.log(error);
        }
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
          this.toastr.success(response[0].value, response[0].key);
        },
        (error: any) => {
          if (error[0]) this.toastr.error(error[0].value, error[0].key);
          else this.toastr.error('Something went wrong!', 'Error');
        }
      );
    } else {
      this.catalogService.addCatalog(data).subscribe(
        (resp) => {
          this.toastr.success(resp.body[0].value, resp.body[0].key);
        },
        (error: any) => {
          if (error[0]) this.toastr.error(error[0].value, error[0].key);
          else this.toastr.error('Something went wrong!', 'Error');
        }
      );
    }
    this.router.navigate(['/catalog']);
  }
}
