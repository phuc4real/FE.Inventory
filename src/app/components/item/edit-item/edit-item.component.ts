import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateItem, Catalog } from 'src/app/models';
import {
  ItemService,
  CatalogService,
  UploadImageService,
} from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent {
  itemForm!: FormGroup;
  itemId!: string;
  img!: string;
  catalogs!: Catalog[];
  selectedValue!: number;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private catalogService: CatalogService,
    private uploadImage: UploadImageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.itemForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      imageUrl: new FormControl(''),
      catalogId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });

    this.img =
      'http://res.cloudinary.com/dhnoew5bj/image/upload/v1688537725/No-Image-Placeholder.svg_o0smur.png';

    this.getCatalog();
  }

  ngAfterViewInit() {
    if (this.itemId != null) {
      this.itemService.getById(this.itemId).subscribe(
        (values) => {
          if (values.imageUrl != '') this.img = values.imageUrl;
          this.itemForm.patchValue({
            code: values.code,
            name: values.name,
            description: values.description,
            imageUrl: values.imageUrl != '' ? values.imageUrl : this.img,
            catalogId: values.catalog.id,
          });
          this.selectedValue = values.catalog.id;
        },
        (err: any) => showError(err, this.toastr)
      );
    } else {
      this.itemForm.patchValue({
        imageUrl: this.img,
      });
    }
  }

  getCatalog() {
    this.catalogService.getList().subscribe(
      (value) => {
        this.catalogs = value;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  onFileSelected(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.uploadImage.uploadImg(file!).subscribe(
        (response) => {
          console.log(response);
          this.img = response.url;
          this.itemForm.patchValue({
            imageUrl: response.url,
          });
          this.isLoading = false;
        },
        (error: any) => {
          this.toastr.warning(
            'Upload image error, please try again!',
            'Upload error'
          );
          console.log(error);
        }
      );
    }
  }

  submitItem() {
    const data: UpdateItem = {
      code: this.itemForm.value.code,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      imageUrl: this.itemForm.value.imageUrl,
      catalogId: parseInt(this.itemForm.value.catalogId),
    };

    if (this.itemId != null) {
      this.itemService.update(this.itemId, data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/item/' + this.itemId]);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.router.navigate(['/item' + this.itemId]);
        }
      );
    } else {
      this.itemService.create(data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/' + response.headers.get('Location')]);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.router.navigate(['/item']);
        }
      );
    }
  }
}
