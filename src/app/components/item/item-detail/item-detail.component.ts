import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, UserService } from 'src/app/services';
import { FormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  itemForm!: FormGroup;
  itemId!: number;
  img!: string;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private UserService: UserService,
    private router: Router
  ) {
    this.itemForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      unit: new FormControl(''),
      useUnit: new FormControl(''),
      createdAt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedAt: new FormControl(''),
      updatedBy: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
  }

  ngAfterViewInit() {
    this.itemService.getById(this.itemId).subscribe(
      (response) => {
        if (response.data.imageUrl != '') {
          this.img = response.data.imageUrl;
        } else {
          this.img =
            'http://res.cloudinary.com/dhnoew5bj/image/upload/v1688537725/No-Image-Placeholder.svg_o0smur.png';
        }

        this.itemForm.patchValue({
          code: response.data.code,
          name: response.data.name,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
          category: response.data.category.name,
          unit: response.data.unit,
          useUnit: response.data.useUnit,
          createdAt: FormatDate(response.data.createdAt),
          createdBy: response.data.createdBy,
          updatedAt: FormatDate(response.data.updatedAt),
          updatedBy: response.data.updatedBy,
        });
      },
      (err: any) => {
        if (err.status == 404) this.router.navigate(['/notfound']);
      }
    );
  }
}
