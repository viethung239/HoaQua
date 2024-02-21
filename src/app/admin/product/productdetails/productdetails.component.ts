import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { DmproductService } from '../../../services/dmproduct.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {

  DMSanPham: any[] =[];
  idSanPham: string | null;
  product: any;

  constructor(private route: ActivatedRoute,  private productService: ProductService, private dmproductService : DmproductService ) {
    this.idSanPham = null;

  }

  ngOnInit(): void {
    this.dmproductService.getListDMProduct().subscribe({
      next: (data: any) => {
        this.DMSanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
    this.idSanPham = this.route.snapshot.paramMap.get('id')!;

    this.getProductDetail(this.idSanPham);
  }

  getProductDetail(id: string): void {
    this.productService.getProductById(id).subscribe((data: any) => {
      this.product = data;
    });
  }
}

