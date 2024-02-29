import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
      routeLink: 'admin/trang-chu',
      icon: 'fal fa-home',
      label: 'Trang Chủ',

  },
  {
      routeLink: 'admin/san-pham',
      icon: 'fal fa-box-open',
      label: 'Sản Phẩm',
      roles: ['NVSanPham','Admin'],
      items: [
        {
            routeLink: 'admin/san-pham/danh-sach-san-pham',
            label: 'Danh sách sản phẩm',

        },
        {
            routeLink: 'admin/san-pham/danh-sach-danh-muc-san-pham',
            label: 'Danh sách danh mục sản phẩm',
        },
        {
          routeLink: 'admin/san-pham/danh-sach-nhom-danh-muc-san-pham',
          label: 'Danh sách nhóm danh mục sản phẩm',
        }
    ]
  },
  {
    routeLink: 'admin/nguoi-dung',
    icon: 'fal fa-user',
    label: 'Người dùng',
    expanded: true,
    roles: ['NVNhanSu','Admin'],
    items: [
        {
            routeLink: 'admin/nguoi-dung/danh-sach-nguoi-dung',
            label: 'Danh sách người dùng'
        },
        {
            routeLink: 'admin/nguoi-dung/quyen',
            label: 'Quyền'
        }
    ]
  },

  {
    routeLink: 'admin/cai-dat',
    icon: 'fal fa-cog',
    label: 'Chỉnh Sửa',
    expanded: true,
    items: [
        {
            routeLink: 'admin/chinh-sua/ho-so',
            label: 'Hồ Sơ'
        },
        {
            routeLink: 'admin/chinh-sua/dang-xuat',
            label: 'Tùy Chỉnh'
        }
    ]
},
{
  routeLink: 'admin/chi-nhanh',
  icon: 'fal fa-city',
  label: 'Chi Nhánh',
  roles: ['Admin', 'NVKho','NVNhanSu']
},
{
  routeLink: 'admin/don-hang',
  icon: 'fal fa-truck fa-fast ',
  label: 'Đơn hàng',
  expanded: true,
  roles: ['NVNhanSu','Admin'],
  items: [
      {
          routeLink: 'admin/don-hang/danh-sach-don-hang',
          label: 'Danh sách đơn hàng'
      },
      {
          routeLink: 'admin/don-hang/don-hang-chi-tiet',
          label: 'Đơn hàng chi tiết'
      }
  ]
},
{
  routeLink: 'admin/nha-cung-cap',
  icon: 'fal fa-boxes',
  label: 'Nhà cung cấp',
  roles: ['Admin', 'NVKho',]
},
{
  routeLink: 'admin/kho',
  icon: 'fal fa-warehouse',
  label: 'Kho',
  roles: ['Admin', 'NVKho',],
  expanded: true,
    items: [
      {
        routeLink: 'admin/kho/danh-sach-kho',
        label: 'Danh sách kho'
      },
        {
            routeLink: 'admin/kho/danh-muc-kho',
            label: 'Danh mục kho'
        },
        {
            routeLink: 'admin/kho/kho-chi-tiet',
            label: 'Kho chi tiết'
        }
    ]

},


];
