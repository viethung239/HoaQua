import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhoService } from '../../../../services/kho.service';
import { KhoctService } from '../../../../services/khoct.service';
import { NccService } from '../../../../services/ncc.service';
import { DmkhoService } from '../../../../services/dmkho.service';
import { ProductService } from '../../../../services/product.service';
import { BranchService } from '../../../../services/branch.service';

@Component({
  selector: 'app-w-kho-details',
  templateUrl: './w-kho-details.component.html',
  styleUrl: './w-kho-details.component.scss'
})
export class WKhoDetailsComponent {
  SanPham: any[] =[];
  ChiNhanh: any[] =[];
  Kho: any[] = [];
  DMKho: any[] =[];
  NCC: any[] = [];
  idKhoChiTiet: string | null;
  khoct: any;

  constructor(private route: ActivatedRoute,
    private khoService: KhoService,
    private khodetailService: KhoctService,
    private nccService:NccService,
    private dmkhoService:DmkhoService,
    private productService: ProductService,
    private branchService:BranchService,
     ) {
    this.idKhoChiTiet = null;

  }

  ngOnInit(): void {
    this.khoService.getListKho().subscribe({
      next: (data: any) => {
        this.Kho = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.nccService.getListNCC().subscribe({
      next: (data: any) => {
        this.NCC = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.dmkhoService.getListDMKho().subscribe({
      next: (data: any) => {
        this.DMKho = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.ChiNhanh = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.idKhoChiTiet = this.route.snapshot.paramMap.get('id')!;

    this.getKhoDetail(this.idKhoChiTiet);
  }
  getTenSanPham(idSanPham: string): string {
    const sanPham = this.SanPham.find(c => c.idSanPham === idSanPham);
    return sanPham ? sanPham.tenSanPham : '';
  }
  getTenKho(idKho: string): string {
    const kho = this.Kho.find(c => c.idKho=== idKho);
    return kho ? kho.tenKho : '';
  }
  getKhoDetail(id: string): void {
    this.khodetailService.getKhoCTById(id).subscribe((data: any) => {
      this.khoct = data;
    });
  }
}
