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
                title: 'Usuarios',
                iconType: 'nzIcon',
                icon: 'user',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/roles',
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
                title: 'Clientes',
                iconType: 'nzIcon',
                icon: 'contacts',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/contactos/proveedores',
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
                title: 'Gastos',
                iconType: 'nzIcon',
                icon: 'solution',
                iconTheme: 'outline',
                submenu: []
            }, 
            {
                path: '/contabilidad/ventas',
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
                path: '/inventario/categorias',
                title: 'Categorías',
                iconType: 'nzIcon',
                icon: 'tags',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/local',
                title: 'Local',
                iconType: 'nzIcon',
                icon: 'appstore',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/marcas',
                title: 'Marcas',
                iconType: 'nzIcon',
                icon: 'tags',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/inventario/productos',
                title: 'Productos',
                iconType: 'nzIcon',
                icon: 'shop',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    },
]    