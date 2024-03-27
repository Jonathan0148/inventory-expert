import { SideNavInterface } from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
    {
        path: '/panel-control',
        title: 'Dashboard',
        iconType: 'nzIcon',
        icon: 'pie-chart',
        iconTheme: 'outline',
        submenu: []
    },
    {
        title: 'Configuración',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'setting',
        path: '',
        submenu: [
            {
                path: '/usuarios',
                code: 12,
                title: 'Usuarios',
                iconType: 'nzIcon',
                icon: 'user',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/roles',
                code: 11,
                title: 'Roles',
                iconType: 'nzIcon',
                icon: 'safety-certificate',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Contactos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'team',
        submenu: [
            {
                path: '/contactos/clientes',
                code: 17,
                title: 'Clientes',
                iconType: 'nzIcon',
                icon: 'contacts',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/contactos/proveedores',
                code: 20,
                title: 'Proveedores',
                iconType: 'nzIcon',
                icon: 'team',
                iconTheme: 'outline',
                submenu: []
            },
        ]
    },
    {
        path: '',
        title: 'Contabilidad',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'bank',
        submenu: [
            {
                path: '/contabilidad/gastos',
                code: 19,
                title: 'Gastos',
                iconType: 'nzIcon',
                icon: 'solution',
                iconTheme: 'outline',
                submenu: []
            }, 
            {
                path: '/contabilidad/ventas',
                code: 18,
                title: 'Ventas',
                iconType: 'nzIcon',
                icon: 'shopping',
                iconTheme: 'outline',
                submenu: []
            },
        ]
    },
    {
        path: '',
        title: 'Inventario',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'book',
        submenu: [
            {
                path: '/inventario/local',
                code: 13,
                title: 'Distribución del Local',
                iconType: 'nzIcon',
                icon: 'appstore',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/categorias',
                code: 15,
                title: 'Categorías',
                iconType: 'nzIcon',
                icon: 'tags',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/marcas',
                code: 14,
                title: 'Marcas',
                iconType: 'nzIcon',
                icon: 'shopping',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/productos',
                code: 16,
                title: 'Productos',
                iconType: 'nzIcon',
                icon: 'shop',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/bajas',
                code: 22,
                title: 'Bajas',
                iconType: 'nzIcon',
                icon: 'delete',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    },
]    